import { NextRequest } from "next/server";

// In-memory dedup — one email per sessionId per serverless instance lifetime
const sentSessions = new Set<string>();

type Message = { role: "user" | "assistant"; content: string };

function buildHtml(messages: Message[], timestamp: string): string {
  const date = new Date(timestamp).toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const rows = messages
    .map((m) => {
      const isUser = m.role === "user";
      return `
      <tr>
        <td style="padding:12px 16px;vertical-align:top;width:70px;">
          <span style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${isUser ? "#C9A84C" : "#8a7a6a"};">
            ${isUser ? "Visiteur" : "Agent"}
          </span>
        </td>
        <td style="padding:12px 16px;font-size:14px;color:#d0c8b8;line-height:1.7;border-left:1px solid #2a2620;">
          ${m.content.replace(/\n/g, "<br>")}
        </td>
      </tr>
      <tr><td colspan="2" style="height:1px;background:#1e1c18;"></td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f0e0c;font-family:Georgia,serif;color:#e8e0d0;">
<div style="max-width:640px;margin:0 auto;padding:40px 24px;">

  <div style="text-align:center;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid #3a3020;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a84c;">
      KUNUZ ADIN Éditions
    </p>
    <h1 style="margin:0 0 6px;font-size:20px;font-weight:400;color:#f0e8d8;">
      Conversation chatbot
    </h1>
    <p style="margin:0;font-size:12px;color:#8a7a6a;">${date}</p>
  </div>

  <table style="width:100%;border-collapse:collapse;background:#161410;border:1px solid #2a2620;border-radius:6px;overflow:hidden;">
    ${rows}
  </table>

  <p style="margin-top:28px;font-size:11px;color:#444;text-align:center;">
    ${messages.filter((m) => m.role === "user").length} question(s) — ${messages.length} message(s) au total
  </p>
</div>
</body>
</html>`;
}

async function sendBrevoEmail(subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[chat/recap] BREVO_API_KEY manquante");
    return;
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { name: "KUNUZ ADIN Éditions", email: "contact@kunuz-adin-editions.com" },
      to: [{ email: "kunuzadineditions@gmail.com", name: "KUNUZ ADIN Éditions" }],
      subject,
      htmlContent,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[chat/recap] Échec envoi Brevo:", res.status, text);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const sessionId: string =
    typeof body?.sessionId === "string" ? body.sessionId : "";
  const messages: Message[] = Array.isArray(body?.messages) ? body.messages : [];
  const timestamp: string =
    typeof body?.timestamp === "string" ? body.timestamp : new Date().toISOString();

  // Ignore empty or already-sent sessions
  if (!sessionId || !messages.some((m) => m.role === "user")) {
    return new Response(null, { status: 204 });
  }
  if (sentSessions.has(sessionId)) {
    return new Response(null, { status: 204 });
  }
  sentSessions.add(sessionId);

  const date = new Date(timestamp).toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await sendBrevoEmail(
    `Conversation chatbot — ${date}`,
    buildHtml(messages, timestamp)
  );

  return new Response(null, { status: 204 });
}
