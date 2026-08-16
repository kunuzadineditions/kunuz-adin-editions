// 19 sept 2026 00h00 Paris (CEST UTC+2) = 18 sept 2026 22h00 UTC
const PACK_SWITCH_TIMESTAMP = 1789768800;

function isPackNewPrice(): boolean {
  return Math.floor(Date.now() / 1000) >= PACK_SWITCH_TIMESTAMP;
}

export function isPackLaunchPrice(): boolean {
  return Math.floor(Date.now() / 1000) < PACK_SWITCH_TIMESTAMP;
}

export function getPackDisplayPrice(): string {
  return isPackNewPrice() ? "39 €" : "30 €";
}

export function getPackStripePrice(): string {
  return isPackNewPrice()
    ? (process.env.STRIPE_PRICE_PACK_39 ?? "")
    : (process.env.STRIPE_PRICE_PACK ?? "");
}
