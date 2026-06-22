import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { count, error } = await supabase
    .from("fondateurs")
    .select("*", { count: "exact", head: true });

  if (error) return NextResponse.json({ count: 0 });
  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(req: NextRequest) {
  const { prenom, email, pays } = await req.json();

  if (!prenom || !email || !pays) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const { error: dbError } = await supabase
    .from("fondateurs")
    .insert({ prenom: prenom.trim(), email: email.trim().toLowerCase(), pays });

  if (dbError) {
    if (dbError.code === "23505") {
      return NextResponse.json({ error: "Cet email est déjà inscrit." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }

  console.log('RESEND_KEY présente:', !!process.env.RESEND_API_KEY);
  const resendResult = await resend.emails.send({
    from: "KUNUZ ADIN ÉDITIONS <noreply@kunuz-adin-editions.com>",
    to: email.trim().toLowerCase(),
    subject: "Votre pré-inscription Fondateur est confirmée",
    html: `<!DOCTYPE html>
<html>
<body style="background:#0D0D0D;color:#fff;font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;">
  <div style="text-align:center;margin-bottom:32px;">
    <p style="color:#C9A84C;font-size:12px;letter-spacing:4px;text-transform:uppercase;">KUNUZ ADIN ÉDITIONS</p>
    <h1 style="font-size:28px;margin:8px 0;">بَارَكَ اللَّهُ فِيكَ</h1>
    <p style="color:#C9A84C;font-size:18px;">${prenom.trim()}, votre pré-inscription est confirmée</p>
  </div>

  <div style="background:#1a1a1a;border:1px solid #C9A84C33;border-radius:16px;padding:24px;margin-bottom:24px;">
    <p style="color:#999;font-size:14px;line-height:1.8;">
      Vous avez réservé votre place parmi les premiers soutiens de
      <strong style="color:#C9A84C;">KUNUZ ADIN ÉDITIONS</strong>,
      une maison d'édition islamique en français engagée dans la diffusion
      du savoir authentique.
    </p>
  </div>

  <div style="margin-bottom:24px;">
    <p style="color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Vos privilèges Fondateur</p>
    <ul style="color:#ccc;font-size:14px;line-height:2;padding-left:20px;">
      <li>Pack Fondateur : <strong style="color:#fff;">38€</strong> au lancement (port France offert)</li>
      <li>-5% sur tous les futurs livres KUNUZ ADIN ÉDITIONS, à vie</li>
      <li>Bonus et contenus exclusifs annoncés progressivement</li>
    </ul>
  </div>

  <div style="background:#C9A84C11;border:1px solid #C9A84C33;border-radius:12px;padding:20px;margin-bottom:32px;">
    <p style="color:#C9A84C;font-size:13px;margin:0;line-height:1.8;">
      ⚠️ <strong>Votre statut Fondateur sera définitivement confirmé à l'achat</strong>,
      lors du lancement officiel des éditions. Dès que les livres sont disponibles,
      vous recevrez votre lien de paiement exclusif. Aucune action requise pour l'instant.
    </p>
  </div>

  <p style="color:#555;font-size:12px;text-align:center;">
    KUNUZ ADIN ÉDITIONS · kunuz-adin-editions.com<br/>
    Vous recevez cet email car vous vous êtes pré-inscrit comme Fondateur.
  </p>
</body>
</html>`,
  });

  console.log('Resend résultat:', JSON.stringify(resendResult));
  if (resendResult.error) {
    console.log('Resend erreur complète:', JSON.stringify(resendResult.error));
  }

  return NextResponse.json({ ok: true });
}
