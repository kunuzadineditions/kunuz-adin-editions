import Stripe from "stripe";

const ALLOWED_PRICES = new Set([
  process.env.STRIPE_PRICE_LIVRE1,
  process.env.STRIPE_PRICE_CARNET,
  process.env.STRIPE_PRICE_PACK,
  process.env.STRIPE_PRICE_PACK_39,
]);

type LineItem = { priceId: string; quantity: number };

type RelayPoint = {
  id: string;
  name: string;
  address: string;
  postal: string;
  city: string;
  country: string;
};

type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

function clampQty(q: unknown): number {
  return Math.min(10, Math.max(1, Math.round(Number(q) || 1)));
}

function truncate(s: unknown, max = 500): string {
  const str = String(s ?? "");
  return str.length > max ? str.slice(0, max) : str;
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl   = process.env.NEXT_PUBLIC_URL;

  if (!secretKey || secretKey.includes("REMPLACE")) {
    return Response.json({ error: "STRIPE_SECRET_KEY non configurée." }, { status: 500 });
  }

  if (!baseUrl) {
    return Response.json({ error: "NEXT_PUBLIC_URL non configurée sur le serveur." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);

  // Accept both { items: [...] } (cart) and { priceId, quantity } (legacy single item)
  let lineItems: LineItem[];

  if (Array.isArray(body?.items) && body.items.length > 0) {
    lineItems = body.items.map((i: { priceId: unknown; quantity: unknown }) => ({
      priceId:  String(i.priceId ?? ""),
      quantity: clampQty(i.quantity),
    }));
  } else if (body?.priceId) {
    lineItems = [{ priceId: String(body.priceId), quantity: clampQty(body.quantity) }];
  } else {
    return Response.json({ error: "Aucun article fourni." }, { status: 400 });
  }

  // Validate every price ID against the allow-list
  const invalid = lineItems.find((i) => !ALLOWED_PRICES.has(i.priceId));
  if (invalid) {
    return Response.json({ error: `Price ID invalide : ${invalid.priceId}` }, { status: 400 });
  }

  // Relay point + customer info (optional for legacy callers, required for /checkout page)
  const relay: RelayPoint | null    = body?.relayPoint    ?? null;
  const customer: CustomerInfo | null = body?.customerInfo ?? null;

  const metadata: Record<string, string> = {};
  if (relay) {
    metadata.relay_id      = truncate(relay.id, 100);
    metadata.relay_name    = truncate(relay.name, 200);
    metadata.relay_address = truncate(relay.address, 300);
    metadata.relay_postal  = truncate(relay.postal, 20);
    metadata.relay_city    = truncate(relay.city, 100);
    metadata.relay_country = truncate(relay.country, 10);
  }
  if (customer) {
    metadata.customer_name  = truncate(customer.name, 200);
    metadata.customer_phone = truncate(customer.phone, 50);
  }

  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode:   "payment",
      locale: "fr",
      line_items: lineItems.map((i) => ({ price: i.priceId, quantity: i.quantity })),
      shipping_options: [
        { shipping_rate: "shr_1TiaLwHsvBneNqFikoyuvsqV" },
        { shipping_rate: "shr_1TiaNzHsvBneNqFil7RRMZeC" },
        { shipping_rate: "shr_1TiaPIHsvBneNqFi4w8p2zh2" },
      ],
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MA", "TN", "DZ", "SN", "CI"],
      },
      customer_creation: "if_required",
      automatic_tax:     { enabled: true },
      payment_method_types: ["card"],
      ...(customer?.email ? { customer_email: customer.email } : {}),
      ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/checkout`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe inconnue";
    console.error("[checkout] Stripe error:", message);
    return Response.json({ error: `Erreur paiement : ${message}` }, { status: 500 });
  }
}
