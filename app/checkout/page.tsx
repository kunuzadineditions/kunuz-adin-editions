"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

type RelayPoint = {
  id: string;
  name: string;
  address: string;
  postal: string;
  city: string;
  country: string;
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Échec chargement : ${src}`));
    document.head.appendChild(s);
  });
}


export default function CheckoutPage() {
  const { items, subtotal, hydrated, clearCart } = useCart();
  const router = useRouter();

  const [fullName,    setFullName]    = useState("");
  const [email,       setEmail]       = useState("");
  const [phone,       setPhone]       = useState("");
  const [relayPoint,  setRelayPoint]  = useState<RelayPoint | null>(null);
  const [widgetReady, setWidgetReady] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  // Redirect to boutique once hydrated if cart is empty
  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/boutique");
    }
  }, [hydrated, items.length, router]);

  // Load jQuery → MR widget → init
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        await loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
        await loadScript(
          "https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js"
        );
        if (cancelled) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const $ = (window as any).jQuery;
        $("#Zone_Widget").MR_ParcelShopPicker({
          Target:          "#MR_SelectedRelay",
          Brand:           "CC240PWQ",
          Country:         "FR",
          NbResults:       7,
          EnableGeolocate: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          OnParcelShopSelected: (relay: Record<string, any>) => {
            setRelayPoint({
              id:      String(relay.ID ?? relay.Num_Point ?? ""),
              name:    String(relay.Nom ?? ""),
              address: [relay.Adresse1, relay.Adresse2, relay.Adresse3]
                .filter(Boolean)
                .join(", "),
              postal:  String(relay.CP ?? ""),
              city:    String(relay.Ville ?? ""),
              country: String(relay.Pays || "FR"),
            });
          },
        });

        if (!cancelled) setWidgetReady(true);
      } catch (err) {
        console.error("[MR widget]", err);
        if (!cancelled) setWidgetError(true);
      }
    }

    boot();
    return () => { cancelled = true; };
  }, []);

  const canSubmit =
    fullName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    phone.trim().replace(/[\s\-().]/g, "").length >= 8 &&
    relayPoint !== null &&
    items.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ priceId: i.priceId, quantity: i.quantity })),
          relayPoint,
          customerInfo: { name: fullName, email, phone },
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "Erreur lors de la création de la commande.");
        setLoading(false);
        return;
      }

      clearCart();
      window.location.href = data.url;
    } catch {
      setError("Impossible de contacter le serveur.");
      setLoading(false);
    }
  }

  // Prevent flash redirect before cart hydrates
  if (!hydrated) return null;

  return (
    <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-dark" />
              <p className="text-xs tracking-[0.3em] text-gold uppercase">Finaliser</p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-2">
              Votre commande
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              Choisissez votre point relais Mondial Relay, puis passez au paiement sécurisé.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-14">

            {/* ── 1. Informations de contact ─────────────────────────────── */}
            <section>
              <SectionDivider label="1 — Vos informations" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                <Field
                  id="fullName"
                  label="Nom complet *"
                  type="text"
                  autoComplete="name"
                  placeholder="Prénom Nom"
                  value={fullName}
                  onChange={setFullName}
                />
                <Field
                  id="email"
                  label="Email *"
                  type="email"
                  autoComplete="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={setEmail}
                />
                <div className="sm:col-span-2">
                  <Field
                    id="phone"
                    label="Téléphone *"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
              </div>
            </section>

            {/* ── 2. Point relais ────────────────────────────────────────── */}
            <section>
              <SectionDivider label="2 — Point relais Mondial Relay" />

              <p className="text-text-secondary text-sm leading-relaxed mt-6 mb-6">
                Entrez votre code postal pour afficher les points relais proches de chez vous.
                La livraison est disponible uniquement en France métropolitaine.
              </p>

              {/* Hidden target populated by the widget */}
              <input type="hidden" id="MR_SelectedRelay" />

              {/* Widget render zone */}
              <div
                id="Zone_Widget"
                className="w-full overflow-x-hidden"
                style={{ minHeight: "420px" }}
              />

              {/* Loading / error states */}
              {!widgetReady && !widgetError && (
                <p className="mt-4 text-xs text-text-secondary/50 animate-pulse">
                  Chargement de la carte…
                </p>
              )}
              {widgetError && (
                <p className="mt-4 text-xs text-red-400/70 leading-relaxed">
                  Le widget Mondial Relay n&rsquo;a pas pu se charger. Vérifiez votre connexion
                  internet et rechargez la page.
                </p>
              )}

              {/* Selected relay confirmation */}
              {relayPoint && (
                <div className="mt-6 border border-gold/40 bg-gold/5 px-5 py-4 flex items-start gap-3">
                  <CheckIcon className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-text font-medium">{relayPoint.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {relayPoint.address}, {relayPoint.postal} {relayPoint.city}
                    </p>
                  </div>
                </div>
              )}

              {widgetReady && !relayPoint && (
                <p className="mt-4 text-xs text-text-secondary/50 leading-relaxed">
                  ↑ Sélectionnez un point relais sur la carte pour continuer.
                </p>
              )}
            </section>

            {/* ── 3. Récapitulatif + CTA ─────────────────────────────────── */}
            <section>
              <SectionDivider label="3 — Récapitulatif" />

              <ul className="flex flex-col divide-y divide-border mt-8 mb-6">
                {items.map((item) => (
                  <li key={item.priceId} className="flex items-center justify-between py-3">
                    <span className="text-sm text-text leading-snug">
                      {item.title}
                      {item.quantity > 1 && (
                        <span className="text-text-secondary ml-1.5">× {item.quantity}</span>
                      )}
                    </span>
                    <span className="text-sm text-gold tabular-nums shrink-0 ml-4">
                      {fmt(item.priceAmount * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between py-3 border-t border-border mb-2">
                <span className="text-xs tracking-[0.2em] text-text-secondary uppercase">
                  Sous-total articles
                </span>
                <span className="font-display text-xl text-gold">{fmt(subtotal)}</span>
              </div>

              <p className="text-[11px] text-text-secondary/50 leading-relaxed mb-8">
                Les frais de livraison sont calculés à l&rsquo;étape suivante sur Stripe.{" "}
                <Link
                  href="/cgv"
                  className="underline underline-offset-2 hover:text-gold transition-colors duration-200"
                >
                  CGV
                </Link>{" "}
                — Droit de rétractation 14 jours.
              </p>

              {error && (
                <p className="text-[11px] text-red-400/80 leading-snug mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full bg-gold text-bg text-xs tracking-widest uppercase py-4 hover:bg-gold-light transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <LoadingDots />
                    Redirection vers le paiement…
                  </>
                ) : (
                  <>
                    <LockIcon className="w-3.5 h-3.5" />
                    Payer sur Stripe · {fmt(subtotal)}
                  </>
                )}
              </button>

              {!canSubmit && !loading && (
                <p className="mt-3 text-[11px] text-text-secondary/50 text-center leading-relaxed">
                  {!relayPoint
                    ? "Choisissez un point relais pour activer le paiement."
                    : "Remplissez tous les champs obligatoires."}
                </p>
              )}
            </section>

          </form>
        </div>
      </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border" />
      <p className="text-[10px] tracking-[0.3em] text-gold uppercase shrink-0">{label}</p>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function Field({
  id, label, type, autoComplete, placeholder, value, onChange,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] tracking-[0.25em] text-gold uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-bg border border-border text-text placeholder:text-text-secondary/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-dark transition-colors duration-300 w-full"
      />
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LoadingDots() {
  return (
    <span className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
