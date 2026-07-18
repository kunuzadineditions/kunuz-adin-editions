"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const fmt = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);

export default function CartDrawer() {
  const { items, totalItems, subtotal, isOpen, closeCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleCheckout() {
    if (!items.length) return;
    setLoading(true);
    setError(null);

    try {
      const res  = await fetch("/api/stripe/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          items: items.map((i) => ({ priceId: i.priceId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Erreur lors de la commande.");
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 z-[199] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className={`fixed inset-y-0 right-0 w-full sm:w-[420px] bg-bg border-l border-border z-[200]
                    flex flex-col transition-transform duration-300 ease-in-out ${
                      isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <CartIcon className="w-5 h-5 text-gold" />
            <span className="font-display text-lg text-text font-light">Panier</span>
            {totalItems > 0 && (
              <span className="text-[10px] tracking-widest text-text-secondary/60 uppercase">
                {totalItems} article{totalItems > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-gold transition-colors duration-200"
          >
            <XIcon />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <CartIcon className="w-10 h-10 text-border" />
              <p className="text-text-secondary/60 text-sm">Ton panier est vide.</p>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {items.map((item) => (
                <li key={item.priceId} className="py-5 flex gap-4">
                  {/* Cover */}
                  <div
                    className="relative flex-shrink-0 w-12 h-16 overflow-hidden"
                    style={{ backgroundColor: item.coverColor }}
                  >
                    {item.coverImage && (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-sm text-text leading-snug line-clamp-2">
                        {item.title}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.priceId)}
                        aria-label={`Supprimer ${item.title}`}
                        className="flex-shrink-0 text-text-secondary/40 hover:text-gold transition-colors duration-200 mt-0.5"
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty selector */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.priceId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Diminuer"
                          className="w-7 h-7 flex items-center justify-center text-gold-dark hover:text-gold hover:bg-gold/5 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-base leading-none"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm text-text tabular-nums select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.priceId, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                          aria-label="Augmenter"
                          className="w-7 h-7 flex items-center justify-center text-gold-dark hover:text-gold hover:bg-gold/5 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-base leading-none"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <p className="text-sm text-gold tabular-nums">
                        {fmt(item.priceAmount * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only when items exist */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-border px-6 py-5 flex flex-col gap-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.2em] text-text-secondary uppercase">
                Sous-total
              </span>
              <span className="font-display text-xl text-gold">{fmt(subtotal)}</span>
            </div>
            <p className="text-[11px] text-text-secondary/50 -mt-2">
              Frais de port et TVA calculés à l&rsquo;étape suivante.
            </p>

            {error && (
              <p className="text-[11px] text-red-400/80 leading-snug">{error}</p>
            )}

            <p className="text-[11px] text-text-secondary/50 leading-relaxed">
              Droit de rétractation de 14 jours. Frais de retour à la charge du client.{" "}
              <Link
                href="/cgv"
                onClick={closeCart}
                className="underline underline-offset-2 hover:text-gold transition-colors duration-200"
              >
                En savoir plus
              </Link>
            </p>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-gold text-bg text-xs tracking-widest uppercase py-4 hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <LoadingDots />
                  Redirection…
                </>
              ) : (
                <>
                  <CartIcon className="w-4 h-4" />
                  Commander · {fmt(subtotal)}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
