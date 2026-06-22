"use client";

import { useState } from "react";

interface Props {
  priceId: string;
  quantity?: number;
  label: string;
  sublabel: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CheckoutButton({
  priceId,
  quantity = 1,
  label,
  sublabel,
  className,
  children,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res  = await fetch("/api/stripe/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ priceId, quantity }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "Erreur lors de la création de la commande.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Impossible de contacter le serveur. Réessaie dans un instant.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleClick} disabled={loading} className={className}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <LoadingDots />
            Redirection…
          </span>
        ) : (
          children ?? (
            <>
              {label} — {sublabel}
            </>
          )
        )}
      </button>

      {error && (
        <p className="mt-2 text-[11px] text-red-400/80 leading-snug">{error}</p>
      )}
    </div>
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
