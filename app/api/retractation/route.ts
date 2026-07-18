import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function formatDateFr(date: Date): string {
  const fmt = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("day")} ${get("month")} ${get("year")} à ${get("hour")}h${get("minute")}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nom, prenom, email, numero_commande, details_commande } = body;

  if (
    !nom?.trim() ||
    !prenom?.trim() ||
    !email?.trim() ||
    !numero_commande?.trim() ||
    !details_commande?.trim()
  ) {
    return NextResponse.json(
      { error: "Tous les champs sont obligatoires." },
      { status: 400 }
    );
  }

  const now = new Date();

  const { error: dbError } = await supabaseAdmin.from("retractations").insert({
    nom:              nom.trim(),
    prenom:           prenom.trim(),
    email:            email.trim().toLowerCase(),
    numero_commande:  numero_commande.trim(),
    details_commande: details_commande.trim(),
    date_retractation: now.toISOString(),
  });

  if (dbError) {
    console.error("[retractation] Erreur insertion Supabase:", dbError);
    return NextResponse.json(
      { error: "Erreur serveur, veuillez réessayer." },
      { status: 500 }
    );
  }

  const dateStr = formatDateFr(now);

  const clientResult = await resend.emails.send({
    from: "KUNUZ ADIN ÉDITIONS <noreply@kunuz-adin-editions.com>",
    to:   email.trim().toLowerCase(),
    subject: "Accusé de réception de votre demande de rétractation — KUNUZ ADIN ÉDITIONS",
    html: buildClientEmail(
      nom.trim(), prenom.trim(),
      numero_commande.trim(), details_commande.trim(),
      dateStr
    ),
  });
  if (clientResult.error) {
    console.error("[retractation] Échec email client:", JSON.stringify(clientResult.error));
  }

  const adminResult = await resend.emails.send({
    from: "KUNUZ ADIN ÉDITIONS <noreply@kunuz-adin-editions.com>",
    to:   "contact@kunuz-adin-editions.com",
    subject: `Demande de rétractation : ${prenom.trim()} ${nom.trim()} (${dateStr})`,
    html: buildAdminEmail(
      nom.trim(), prenom.trim(),
      email.trim().toLowerCase(),
      numero_commande.trim(), details_commande.trim(),
      dateStr
    ),
  });
  if (adminResult.error) {
    console.error("[retractation] Échec email admin:", JSON.stringify(adminResult.error));
  }

  return NextResponse.json({ ok: true });
}

// ─── Emails ──────────────────────────────────────────────────────────────────

function buildClientEmail(
  nom: string,
  prenom: string,
  numeroCommande: string,
  detailsCommande: string,
  dateStr: string
): string {
  return `<!DOCTYPE html>
<html>
<body style="background:#0D0D0D;color:#fff;font-family:sans-serif;padding:40px 20px;max-width:620px;margin:0 auto;">

  <div style="text-align:center;margin-bottom:36px;">
    <p style="color:#C9A84C;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 8px;">KUNUZ ADIN ÉDITIONS</p>
    <h1 style="font-size:22px;margin:0 0 8px;font-weight:700;">Accusé de réception</h1>
    <p style="color:#aaa;font-size:15px;margin:0;">Votre demande de rétractation a bien été enregistrée.</p>
  </div>

  <div style="background:#141414;border:1px solid #C9A84C33;border-radius:16px;padding:24px;margin-bottom:24px;">
    <p style="color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Récapitulatif de votre demande</p>

    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;color:#888;font-size:13px;width:40%;vertical-align:top;">Nom et prénom</td>
        <td style="padding:8px 0;color:#fff;font-size:13px;font-weight:600;">${prenom} ${nom}</td>
      </tr>
      <tr style="border-top:1px solid #222;">
        <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Commande concernée</td>
        <td style="padding:8px 0;color:#fff;font-size:13px;">${escHtml(numeroCommande)}</td>
      </tr>
      <tr style="border-top:1px solid #222;">
        <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Détails de la demande</td>
        <td style="padding:8px 0;color:#fff;font-size:13px;line-height:1.6;">${escHtml(detailsCommande).replace(/\n/g, "<br/>")}</td>
      </tr>
      <tr style="border-top:1px solid #222;">
        <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Date et heure</td>
        <td style="padding:8px 0;color:#C9A84C;font-size:13px;font-weight:600;">${dateStr}</td>
      </tr>
    </table>
  </div>

  <div style="background:#C9A84C11;border:1px solid #C9A84C33;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
    <p style="color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 14px;">Prochaines étapes</p>
    <ul style="color:#ccc;font-size:14px;line-height:1;padding:0;margin:0;list-style:none;">
      <li style="display:flex;gap:10px;align-items:flex-start;margin-bottom:12px;">
        <span style="color:#C9A84C;font-size:16px;line-height:1.2;flex-shrink:0;">✓</span>
        <span>Votre demande a bien été enregistrée. Elle fait foi pour votre délai de rétractation.</span>
      </li>
      <li style="display:flex;gap:10px;align-items:flex-start;margin-bottom:12px;">
        <span style="color:#C9A84C;font-size:16px;line-height:1.2;flex-shrink:0;">✓</span>
        <span>Vous devez nous retourner le ou les livres concernés sous 14 jours. Les frais de retour sont à votre charge. Nous vous communiquerons l'adresse de retour par email.</span>
      </li>
      <li style="display:flex;gap:10px;align-items:flex-start;margin-bottom:12px;">
        <span style="color:#C9A84C;font-size:16px;line-height:1.2;flex-shrink:0;">✓</span>
        <span>Le remboursement, frais de livraison initiaux inclus, sera effectué après réception et vérification du ou des livres retournés, dans les délais prévus par la loi.</span>
      </li>
      <li style="display:flex;gap:10px;align-items:flex-start;margin-bottom:12px;">
        <span style="color:#C9A84C;font-size:16px;line-height:1.2;flex-shrink:0;">✓</span>
        <span>Le ou les livres doivent nous revenir dans un état permettant leur revente. En cas de dépréciation résultant d'une manipulation dépassant ce qui est nécessaire pour les examiner (par exemple pages cornées, taches, reliure abîmée, annotations), le remboursement pourra être réduit à hauteur de la dépréciation constatée, comme précisé dans nos <a href="https://www.kunuz-adin-editions.com/cgv" style="color:#C9A84C;">conditions générales de vente</a>.</span>
      </li>
      <li style="display:flex;gap:10px;align-items:flex-start;">
        <span style="color:#C9A84C;font-size:16px;line-height:1.2;flex-shrink:0;">✓</span>
        <span>Pour toute question : <a href="mailto:contact@kunuz-adin-editions.com" style="color:#C9A84C;">contact@kunuz-adin-editions.com</a></span>
      </li>
    </ul>
  </div>

  <div style="background:#141414;border:1px solid #333;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
    <p style="color:#888;font-size:13px;line-height:1.8;margin:0;">
      Si vous avez une question, répondez directement à cet email ou contactez-nous à
      <a href="mailto:contact@kunuz-adin-editions.com" style="color:#C9A84C;">contact@kunuz-adin-editions.com</a>.
    </p>
  </div>

  <p style="color:#555;font-size:12px;text-align:center;line-height:1.8;margin:0;">
    KUNUZ ADIN ÉDITIONS · kunuz-adin-editions.com<br/>
    Cet email confirme l'enregistrement de votre demande de rétractation du ${dateStr}.
  </p>

</body>
</html>`;
}

function buildAdminEmail(
  nom: string,
  prenom: string,
  email: string,
  numeroCommande: string,
  detailsCommande: string,
  dateStr: string
): string {
  return `<!DOCTYPE html>
<html>
<body style="background:#0D0D0D;color:#fff;font-family:sans-serif;padding:32px 20px;max-width:600px;margin:0 auto;">
  <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">KUNUZ ADIN ÉDITIONS — Alerte rétractation</p>
  <h2 style="font-size:20px;margin:0 0 20px;">Nouvelle demande de rétractation</h2>

  <div style="background:#141414;border:1px solid #C9A84C33;border-radius:12px;padding:16px 20px;margin-bottom:16px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;color:#888;font-size:13px;width:40%;vertical-align:top;">Nom et prénom</td>
        <td style="padding:8px 0;color:#fff;font-size:13px;font-weight:600;">${prenom} ${nom}</td>
      </tr>
      <tr style="border-top:1px solid #222;">
        <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Email</td>
        <td style="padding:8px 0;font-size:13px;">
          <a href="mailto:${email}" style="color:#C9A84C;">${email}</a>
        </td>
      </tr>
      <tr style="border-top:1px solid #222;">
        <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Commande concernée</td>
        <td style="padding:8px 0;color:#fff;font-size:13px;">${escHtml(numeroCommande)}</td>
      </tr>
      <tr style="border-top:1px solid #222;">
        <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Détails</td>
        <td style="padding:8px 0;color:#fff;font-size:13px;line-height:1.6;">${escHtml(detailsCommande).replace(/\n/g, "<br/>")}</td>
      </tr>
      <tr style="border-top:1px solid #222;">
        <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Date et heure</td>
        <td style="padding:8px 0;color:#C9A84C;font-size:13px;font-weight:600;">${dateStr}</td>
      </tr>
    </table>
  </div>

  <p style="color:#555;font-size:11px;text-align:center;margin:0;">
    Alerte automatique · KUNUZ ADIN ÉDITIONS
  </p>
</body>
</html>`;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
