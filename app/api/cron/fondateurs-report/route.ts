import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("fondateurs")
    .select("prenom, email, pays, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const fondateurs = data ?? [];
  const date = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const rows = fondateurs.map((f) => `
    <tr style="border-bottom:1px solid #222;">
      <td style="padding:10px 14px;color:#fff;">${f.prenom}</td>
      <td style="padding:10px 14px;color:#ccc;">${f.email}</td>
      <td style="padding:10px 14px;color:#ccc;">${f.pays}</td>
      <td style="padding:10px 14px;color:#888;font-size:12px;">${new Date(f.created_at).toLocaleDateString("fr-FR")}</td>
    </tr>`).join("");

  const html = `<!DOCTYPE html>
<html>
<body style="background:#0D0D0D;color:#fff;font-family:sans-serif;padding:40px;max-width:700px;margin:0 auto;">
  <div style="margin-bottom:32px;">
    <p style="color:#C9A84C;font-size:12px;letter-spacing:4px;text-transform:uppercase;margin:0;">KUNUZ ADIN ÉDITIONS</p>
    <h1 style="font-size:22px;margin:8px 0 4px;">Rapport Fondateurs</h1>
    <p style="color:#888;font-size:13px;margin:0;">${date}</p>
  </div>

  <div style="background:#141414;border:1px solid #C9A84C33;border-radius:12px;overflow:hidden;margin-bottom:24px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#1a1a1a;">
          <th style="padding:10px 14px;text-align:left;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Prénom</th>
          <th style="padding:10px 14px;text-align:left;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Email</th>
          <th style="padding:10px 14px;text-align:left;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Pays</th>
          <th style="padding:10px 14px;text-align:left;color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Inscription</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>

  <div style="background:#C9A84C22;border:1px solid #C9A84C44;border-radius:8px;padding:16px 20px;">
    <p style="margin:0;font-size:15px;">
      Total fondateurs : <strong style="color:#C9A84C;">${fondateurs.length}</strong>
    </p>
  </div>

  <p style="color:#555;font-size:11px;margin-top:32px;text-align:center;">
    Rapport automatique · KUNUZ ADIN ÉDITIONS
  </p>
</body>
</html>`;

  await resend.emails.send({
    from: "KUNUZ ADIN ÉDITIONS <noreply@kunuz-adin-editions.com>",
    to: process.env.ADMIN_EMAIL!,
    subject: `KUNUZ ADIN — Rapport Fondateurs [${date}]`,
    html,
  });

  return NextResponse.json({ success: true, count: fondateurs.length });
}
