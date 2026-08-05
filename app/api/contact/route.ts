import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "RESEND_API_KEY non configurée." }, { status: 500 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return Response.json({ error: "ADMIN_EMAIL non configuré." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const nom          = typeof body?.nom          === "string" ? body.nom.trim()          : "";
  const organisation = typeof body?.organisation === "string" ? body.organisation.trim() : "";
  const email        = typeof body?.email        === "string" ? body.email.trim()        : "";
  const quantite     = typeof body?.quantite     === "string" ? body.quantite.trim()     : "";
  const message      = typeof body?.message      === "string" ? body.message.trim()      : "";

  if (!nom || !email || !message) {
    return Response.json({ error: "Champs requis manquants (nom, email, message)." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from:    "KUNUZ ADIN ÉDITIONS <noreply@kunuz-adin-editions.com>",
    to:      adminEmail,
    replyTo: email,
    subject: `Commande groupée — ${organisation || nom}`,
    html: `<!DOCTYPE html>
<html>
<body style="background:#0D0D0D;color:#fff;font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;">
  <p style="color:#C9A84C;font-size:12px;letter-spacing:4px;text-transform:uppercase;margin-bottom:24px;">
    KUNUZ ADIN ÉDITIONS — Commande groupée
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
    <tr>
      <td style="color:#888;padding:8px 0;border-bottom:1px solid #222;width:140px;">Nom</td>
      <td style="color:#fff;padding:8px 0;border-bottom:1px solid #222;">${nom}</td>
    </tr>
    <tr>
      <td style="color:#888;padding:8px 0;border-bottom:1px solid #222;">Organisation</td>
      <td style="color:#fff;padding:8px 0;border-bottom:1px solid #222;">${organisation || "—"}</td>
    </tr>
    <tr>
      <td style="color:#888;padding:8px 0;border-bottom:1px solid #222;">Email</td>
      <td style="padding:8px 0;border-bottom:1px solid #222;">
        <a href="mailto:${email}" style="color:#C9A84C;">${email}</a>
      </td>
    </tr>
    <tr>
      <td style="color:#888;padding:8px 0;border-bottom:1px solid #222;">Quantité</td>
      <td style="color:#fff;padding:8px 0;border-bottom:1px solid #222;">${quantite || "—"}</td>
    </tr>
  </table>
  <div style="background:#1a1a1a;border:1px solid #333;padding:20px;border-radius:4px;">
    <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-top:0;">Message</p>
    <p style="color:#ccc;font-size:14px;line-height:1.8;white-space:pre-wrap;margin-bottom:0;">${message}</p>
  </div>
  <p style="color:#444;font-size:11px;margin-top:24px;">
    Répondre à cet email contacte directement ${email}.
  </p>
</body>
</html>`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return Response.json({ error: `Erreur envoi email : ${error.message}` }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
