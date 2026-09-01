import Stripe from "stripe";

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (cents: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);

function formatAddress(a: Stripe.Address | null | undefined | { line1: string | null; line2?: string | null; city: string | null; postal_code: string | null; country: string | null; state?: string | null }): string {
  if (!a) return "—";
  return [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(" "), a.country]
    .filter(Boolean)
    .join(", ");
}

function buildEmailHtml(p: {
  sessionId:    string;
  customerName: string;
  email:        string;
  phone:        string;
  address:      string;
  lineItems:    Stripe.LineItem[];
  subtotal:     number;
  shipping:     number;
  total:        number;
}): string {
  const rows = p.lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2a2620;font-size:14px;color:#d0c8b8;">
          ${item.description ?? "—"}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #2a2620;text-align:center;font-size:14px;color:#d0c8b8;">
          ${item.quantity ?? 1}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #2a2620;text-align:right;font-size:14px;color:#d0c8b8;">
          ${fmt(item.amount_total ?? 0)}
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0e0c;font-family:Georgia,serif;color:#e8e0d0;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

  <!-- En-tête -->
  <div style="text-align:center;margin-bottom:36px;padding-bottom:28px;border-bottom:1px solid #3a3020;">
    <p style="margin:0 0 10px;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a84c;">
      KUNUZ ADIN Éditions
    </p>
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:400;color:#f0e8d8;">
      Nouvelle commande
    </h1>
    <p style="margin:0;font-size:12px;color:#8a7a6a;">
      Session Stripe : ${p.sessionId}
    </p>
  </div>

  <!-- Client -->
  <div style="margin-bottom:32px;">
    <p style="margin:0 0 14px;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#c9a84c;">
      Client
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr>
        <td style="padding:5px 0;color:#8a7a6a;width:130px;vertical-align:top;">Nom</td>
        <td style="padding:5px 0;color:#d0c8b8;">${p.customerName}</td>
      </tr>
      <tr>
        <td style="padding:5px 0;color:#8a7a6a;vertical-align:top;">Email</td>
        <td style="padding:5px 0;color:#d0c8b8;">${p.email}</td>
      </tr>
      <tr>
        <td style="padding:5px 0;color:#8a7a6a;vertical-align:top;">Téléphone</td>
        <td style="padding:5px 0;color:#d0c8b8;">${p.phone}</td>
      </tr>
      <tr>
        <td style="padding:5px 0;color:#8a7a6a;vertical-align:top;">Adresse</td>
        <td style="padding:5px 0;color:#d0c8b8;">${p.address}</td>
      </tr>
    </table>
  </div>

  <!-- Produits -->
  <div style="margin-bottom:32px;">
    <p style="margin:0 0 14px;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#c9a84c;">
      Produits commandés
    </p>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8a7a6a;font-weight:normal;padding-bottom:8px;border-bottom:1px solid #3a3020;">
            Article
          </th>
          <th style="text-align:center;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8a7a6a;font-weight:normal;padding-bottom:8px;border-bottom:1px solid #3a3020;">
            Qté
          </th>
          <th style="text-align:right;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8a7a6a;font-weight:normal;padding-bottom:8px;border-bottom:1px solid #3a3020;">
            Montant
          </th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>

  <!-- Totaux -->
  <div style="padding-top:16px;border-top:1px solid #3a3020;margin-bottom:36px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr>
        <td style="padding:5px 0;color:#8a7a6a;">Sous-total articles</td>
        <td style="padding:5px 0;text-align:right;color:#d0c8b8;">${fmt(p.subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:5px 0;color:#8a7a6a;">Livraison</td>
        <td style="padding:5px 0;text-align:right;color:#d0c8b8;">${fmt(p.shipping)}</td>
      </tr>
      <tr>
        <td style="padding:14px 0 4px;font-size:16px;color:#c9a84c;font-weight:bold;border-top:1px solid #3a3020;">
          Total payé
        </td>
        <td style="padding:14px 0 4px;text-align:right;font-size:16px;color:#c9a84c;font-weight:bold;border-top:1px solid #3a3020;">
          ${fmt(p.total)}
        </td>
      </tr>
    </table>
  </div>

  <!-- Pied de page -->
  <div style="text-align:center;padding-top:20px;border-top:1px solid #3a3020;">
    <p style="margin:0;font-size:11px;color:#8a7a6a;">
      KUNUZ ADIN Éditions · kunuz-adin-editions.com
    </p>
  </div>

</div>
</body>
</html>`;
}

async function sendBrevoEmail(subject: string, htmlContent: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[brevo] BREVO_API_KEY manquante — email non envoyé");
    return;
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method:  "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { name: "KUNUZ ADIN Éditions", email: "contact@kunuz-adin-editions.com" },
      to:     [{ email: "kunuzadineditions@gmail.com", name: "KUNUZ ADIN Éditions" }],
      subject,
      htmlContent,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[brevo] Échec envoi:", res.status, text);
  } else {
    console.log("[brevo] Email envoyé :", subject);
  }
}

// ── Webhook handler ───────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const secretKey     = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret || webhookSecret === "whsec_PLUS_TARD") {
    return Response.json({ received: true });
  }

  const body = await request.text();
  const sig  = request.headers.get("stripe-signature") ?? "";

  const stripe = new Stripe(secretKey);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return Response.json({ error: "Webhook signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("[stripe] commande confirmée:", session.id);

    try {
      const { data: lineItems } = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 20 }
      );

      const shippingDetails = session.collected_information?.shipping_details;
      const customerName = shippingDetails?.name
        ?? session.customer_details?.name
        ?? "Client";

      const html = buildEmailHtml({
        sessionId:    session.id,
        customerName,
        email:    session.customer_details?.email   ?? "—",
        phone:    session.customer_details?.phone   ?? "—",
        address:  formatAddress(shippingDetails?.address),
        lineItems,
        subtotal: session.amount_subtotal           ?? 0,
        shipping: session.shipping_cost?.amount_total ?? 0,
        total:    session.amount_total              ?? 0,
      });

      await sendBrevoEmail(`Nouvelle commande — ${customerName}`, html);
    } catch (err) {
      console.error("[webhook] Erreur email:", err instanceof Error ? err.message : err);
    }
  }

  return Response.json({ received: true });
}
