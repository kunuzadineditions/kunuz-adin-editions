import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRIX_LIVRE_NORMAL  = 26.5;
const PRIX_LIVRE_REMISE  = 21;
const PRIX_CARNET_NORMAL = 16.9;
const PRIX_CARNET_REMISE = 13.5;
const PRIX_PACK_NORMAL   = 43.4;  // 26,50 + 16,90
const PRIX_PACK_REMISE   = 30;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prenom, email, pays, qte_livre, qte_carnet, qte_pack } = body;

  if (!prenom || !email || !pays) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const qteLivre  = parseInt(qte_livre,  10) || 0;
  const qteCarnet = parseInt(qte_carnet, 10) || 0;
  const qtePack   = parseInt(qte_pack,   10) || 0;

  if (qteLivre < 0 || qteCarnet < 0 || qtePack < 0) {
    return NextResponse.json({ error: "Quantités invalides" }, { status: 400 });
  }
  if (qteLivre === 0 && qteCarnet === 0 && qtePack === 0) {
    return NextResponse.json({ error: "Sélectionnez au moins un produit" }, { status: 400 });
  }

  // Lecture des places -20% restantes (service role, bypass RLS)
  const { data: stock, error: stockError } = await supabaseAdmin
    .from("v_stock_prevente")
    .select("places_livre_restantes, places_carnet_restantes")
    .single();

  if (stockError) {
    console.error("Erreur lecture stock:", stockError);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }

  // Calcul des prix côté serveur : pack en premier (consomme les deux slots)
  let placesLivre  = stock?.places_livre_restantes  ?? 0;
  let placesCarnet = stock?.places_carnet_restantes ?? 0;

  const remisePack = qtePack > 0 && placesLivre >= qtePack && placesCarnet >= qtePack;
  if (remisePack) {
    placesLivre  -= qtePack;
    placesCarnet -= qtePack;
  }

  const remiseLivre  = qteLivre  > 0 && placesLivre  >= qteLivre;
  const remiseCarnet = qteCarnet > 0 && placesCarnet >= qteCarnet;

  const prixPack   = qtePack   > 0 ? (remisePack   ? PRIX_PACK_REMISE   : PRIX_PACK_NORMAL)   : null;
  const prixLivre  = qteLivre  > 0 ? (remiseLivre  ? PRIX_LIVRE_REMISE  : PRIX_LIVRE_NORMAL)  : null;
  const prixCarnet = qteCarnet > 0 ? (remiseCarnet ? PRIX_CARNET_REMISE : PRIX_CARNET_NORMAL) : null;

  const totalIndicatif =
    (qtePack   > 0 ? qtePack   * prixPack!   : 0) +
    (qteLivre  > 0 ? qteLivre  * prixLivre!  : 0) +
    (qteCarnet > 0 ? qteCarnet * prixCarnet! : 0);

  // Insertion en base
  const { error: dbError } = await supabaseAdmin.from("preventes").insert({
    prenom:               prenom.trim(),
    email:                email.trim().toLowerCase(),
    pays,
    qte_livre:            qteLivre,
    qte_carnet:           qteCarnet,
    qte_pack:             qtePack,
    prix_livre_unitaire:  prixLivre,
    carnet_prix_unitaire: prixCarnet,
    prix_pack_unitaire:   prixPack,
    remise_livre:         remiseLivre,
    remise_carnet:        remiseCarnet,
    remise_pack:          remisePack,
    total_indicatif:      totalIndicatif,
  });

  if (dbError) {
    console.error("Erreur insertion prevente:", dbError);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }

  const lignesRecap = buildRecapLines(
    qtePack,   prixPack,   remisePack,
    qteLivre,  prixLivre,  remiseLivre,
    qteCarnet, prixCarnet, remiseCarnet,
  );

  const clientEmailResult = await resend.emails.send({
    from: "KUNUZ ADIN ÉDITIONS <noreply@kunuz-adin-editions.com>",
    to: email.trim().toLowerCase(),
    subject: "Votre réservation prévente est confirmée — KUNUZ ADIN ÉDITIONS",
    html: buildEmailHtml(prenom.trim(), lignesRecap, totalIndicatif),
  });
  if (clientEmailResult.error) {
    console.error("[prevente] Échec email client:", JSON.stringify(clientEmailResult.error));
  }

  const adminEmailResult = await resend.emails.send({
    from: "KUNUZ ADIN ÉDITIONS <noreply@kunuz-adin-editions.com>",
    to: "contact@kunuz-adin-editions.com",
    subject: `Nouvelle réservation prévente — ${prenom.trim()} (${formatEur(totalIndicatif)})`,
    html: buildAdminEmailHtml(prenom.trim(), email.trim().toLowerCase(), pays, lignesRecap, totalIndicatif),
  });
  if (adminEmailResult.error) {
    console.error("[prevente] Échec email admin:", JSON.stringify(adminEmailResult.error));
  }

  return NextResponse.json({ ok: true });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface ProduitRecap {
  label: string;
  qte: number;
  prixUnitaire: number;
  remise: boolean;
  prixNormal: number;
  sousTotal: number;
}

function buildRecapLines(
  qtePack:   number, prixPack:   number | null, remisePack:   boolean,
  qteLivre:  number, prixLivre:  number | null, remiseLivre:  boolean,
  qteCarnet: number, prixCarnet: number | null, remiseCarnet: boolean,
): ProduitRecap[] {
  const lines: ProduitRecap[] = [];

  if (qtePack > 0 && prixPack !== null) {
    lines.push({
      label:        "Pack Coeur Vivant (livre + carnet)",
      qte:          qtePack,
      prixUnitaire: prixPack,
      remise:       remisePack,
      prixNormal:   PRIX_PACK_NORMAL,
      sousTotal:    qtePack * prixPack,
    });
  }
  if (qteLivre > 0 && prixLivre !== null) {
    lines.push({
      label:        "Tu pries, mais tu ne t'apaises pas",
      qte:          qteLivre,
      prixUnitaire: prixLivre,
      remise:       remiseLivre,
      prixNormal:   PRIX_LIVRE_NORMAL,
      sousTotal:    qteLivre * prixLivre,
    });
  }
  if (qteCarnet > 0 && prixCarnet !== null) {
    lines.push({
      label:        "Carnet de cheminement Coeur Vivant",
      qte:          qteCarnet,
      prixUnitaire: prixCarnet,
      remise:       remiseCarnet,
      prixNormal:   PRIX_CARNET_NORMAL,
      sousTotal:    qteCarnet * prixCarnet,
    });
  }
  return lines;
}

function formatEur(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

function buildAdminEmailHtml(
  prenom: string,
  email: string,
  pays: string,
  produits: ProduitRecap[],
  total: number
): string {
  const rowsHtml = produits.map((p) => `
    <tr>
      <td style="padding:10px 14px;color:#fff;font-size:13px;">${p.label}</td>
      <td style="padding:10px 14px;color:#ccc;font-size:13px;text-align:center;">${p.qte}</td>
      <td style="padding:10px 14px;font-size:13px;text-align:right;">
        ${p.remise
          ? `<span style="color:#C9A84C;font-weight:700;">${formatEur(p.prixUnitaire)}</span> <span style="color:#888;font-size:11px;">(remise -20%)</span>`
          : `<span style="color:#fff;">${formatEur(p.prixUnitaire)}</span> <span style="color:#888;font-size:11px;">(tarif normal)</span>`}
      </td>
      <td style="padding:10px 14px;color:#fff;font-size:13px;font-weight:700;text-align:right;">${formatEur(p.sousTotal)}</td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html>
<body style="background:#0D0D0D;color:#fff;font-family:sans-serif;padding:32px 20px;max-width:600px;margin:0 auto;">
  <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">KUNUZ ADIN ÉDITIONS — Alerte prévente</p>
  <h2 style="font-size:20px;margin:0 0 20px;">Nouvelle réservation</h2>

  <div style="background:#141414;border:1px solid #333;border-radius:12px;padding:16px 20px;margin-bottom:16px;">
    <p style="margin:0 0 6px;font-size:13px;color:#ccc;">Prénom : <strong style="color:#fff;">${prenom}</strong></p>
    <p style="margin:0 0 6px;font-size:13px;color:#ccc;">Email : <strong style="color:#fff;">${email}</strong></p>
    <p style="margin:0;font-size:13px;color:#ccc;">Pays : <strong style="color:#fff;">${pays}</strong></p>
  </div>

  <div style="background:#141414;border:1px solid #C9A84C33;border-radius:12px;overflow:hidden;margin-bottom:16px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#1a1a1a;">
          <th style="padding:8px 14px;text-align:left;color:#C9A84C;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Produit</th>
          <th style="padding:8px 14px;text-align:center;color:#C9A84C;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Qté</th>
          <th style="padding:8px 14px;text-align:right;color:#C9A84C;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Prix unit.</th>
          <th style="padding:8px 14px;text-align:right;color:#C9A84C;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Sous-total</th>
        </tr>
      </thead>
      <tbody style="border-top:1px solid #222;">
        ${rowsHtml}
      </tbody>
      <tfoot>
        <tr style="border-top:1px solid #333;background:#1a1a1a;">
          <td colspan="3" style="padding:10px 14px;color:#fff;font-size:14px;font-weight:700;">Total indicatif</td>
          <td style="padding:10px 14px;color:#C9A84C;font-size:15px;font-weight:700;text-align:right;">${formatEur(total)}</td>
        </tr>
      </tfoot>
    </table>
  </div>

  <p style="color:#555;font-size:11px;text-align:center;margin:0;">
    Alerte automatique · KUNUZ ADIN ÉDITIONS
  </p>
</body>
</html>`;
}

function buildEmailHtml(prenom: string, produits: ProduitRecap[], total: number): string {
  const rowsHtml = produits.map((p) => `
    <tr>
      <td style="padding:12px 16px;color:#fff;font-size:14px;line-height:1.5;">
        <div style="font-weight:600;">${p.label}</div>
        ${p.remise
          ? `<div style="color:#C9A84C;font-size:12px;margin-top:2px;">Prix de lancement -20% (garanti a la commande)</div>`
          : `<div style="color:#888;font-size:12px;margin-top:2px;">Tarif standard</div>`}
      </td>
      <td style="padding:12px 16px;color:#ccc;font-size:14px;text-align:center;">${p.qte}</td>
      <td style="padding:12px 16px;font-size:14px;text-align:right;white-space:nowrap;">
        ${p.remise
          ? `<span style="color:#888;text-decoration:line-through;font-size:12px;margin-right:6px;">${formatEur(p.prixNormal)}</span><span style="color:#C9A84C;font-weight:700;">${formatEur(p.prixUnitaire)}</span>`
          : `<span style="color:#fff;">${formatEur(p.prixUnitaire)}</span>`}
      </td>
      <td style="padding:12px 16px;color:#fff;font-size:14px;font-weight:700;text-align:right;white-space:nowrap;">${formatEur(p.sousTotal)}</td>
    </tr>`).join("");

  const portHtml = total >= 49
    ? `<tr style="border-top:1px solid #C9A84C44;">
        <td colspan="3" style="padding:10px 16px;color:#C9A84C;font-size:13px;">Frais de port</td>
        <td style="padding:10px 16px;color:#C9A84C;font-weight:700;text-align:right;">Offerts</td>
       </tr>`
    : "";

  return `<!DOCTYPE html>
<html>
<body style="background:#0D0D0D;color:#fff;font-family:sans-serif;padding:40px 20px;max-width:620px;margin:0 auto;">

  <div style="text-align:center;margin-bottom:36px;">
    <p style="color:#C9A84C;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 8px;">KUNUZ ADIN ÉDITIONS</p>
    <h1 style="font-size:26px;margin:0 0 8px;font-weight:700;">بَارَكَ اللَّهُ فِيكَ</h1>
    <p style="color:#C9A84C;font-size:17px;margin:0;">${prenom}, votre réservation est confirmée</p>
  </div>

  <div style="background:#141414;border:1px solid #C9A84C33;border-radius:16px;overflow:hidden;margin-bottom:24px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#1a1a1a;border-bottom:1px solid #C9A84C33;">
          <th style="padding:10px 16px;text-align:left;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Produit</th>
          <th style="padding:10px 16px;text-align:center;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Qté</th>
          <th style="padding:10px 16px;text-align:right;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Prix unit.</th>
          <th style="padding:10px 16px;text-align:right;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Sous-total</th>
        </tr>
      </thead>
      <tbody style="border-top:1px solid #C9A84C22;">
        ${rowsHtml}
      </tbody>
      <tfoot>
        ${portHtml}
        <tr style="border-top:1px solid #C9A84C44;background:#1a1a1a;">
          <td colspan="3" style="padding:12px 16px;color:#fff;font-size:15px;font-weight:700;">Total indicatif</td>
          <td style="padding:12px 16px;color:#C9A84C;font-size:16px;font-weight:700;text-align:right;">${formatEur(total)}</td>
        </tr>
      </tfoot>
    </table>
  </div>

  <div style="background:#C9A84C11;border:1px solid #C9A84C33;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
    <p style="color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Important</p>
    <p style="color:#ccc;font-size:14px;line-height:1.8;margin:0;">
      Aucun paiement n'est prélevé à ce stade. Cette réservation garantit votre prix.
      Le règlement s'effectuera uniquement au moment du lancement officiel,
      via un lien qui vous sera envoyé par email.
    </p>
  </div>

  <div style="background:#141414;border:1px solid #333;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
    <p style="color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Informations livraison</p>
    <ul style="color:#ccc;font-size:14px;line-height:2;padding-left:20px;margin:0;">
      <li>Première expédition : <strong style="color:#fff;">mi-août au plus tard, in shâ Allah</strong>, possiblement avant</li>
      <li>Frais de port offerts dès 49 € d'achat</li>
      <li>Première impression en quantité limitée</li>
    </ul>
  </div>

  <div style="background:#141414;border:1px solid #333;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
    <p style="color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Ces deux ouvrages sont conçus pour aller ensemble</p>
    <p style="color:#ccc;font-size:14px;line-height:1.8;margin:0;">
      <strong style="color:#fff;">Le livre</strong> pour comprendre,
      <strong style="color:#fff;">le carnet</strong> pour cheminer.
      Deux outils distincts, une seule démarche de paix intérieure.
    </p>
  </div>

  <p style="color:#555;font-size:12px;text-align:center;line-height:1.8;margin:0;">
    KUNUZ ADIN ÉDITIONS · kunuz-adin-editions.com<br/>
    Vous recevez cet email car vous avez réservé sur notre page prévente.
  </p>

</body>
</html>`;
}
