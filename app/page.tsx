"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 201) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 200) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top ornament */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
      </div>

      {/* Arabic logo */}
      <h1
        className="font-arabic text-5xl sm:text-6xl md:text-7xl text-gold text-center leading-relaxed mb-4"
        dir="rtl"
        lang="ar"
      >
        كنوز الدين
      </h1>

      {/* Latin brand name */}
      <p className="font-display text-sm sm:text-base tracking-[0.4em] text-text-secondary uppercase text-center mb-8">
        KUNUZ ADIN ÉDITIONS
      </p>

      {/* Thin divider */}
      <div className="h-px w-24 bg-gold-dark mb-10" />

      {/* Tagline */}
      <p className="font-display text-xl sm:text-2xl text-text-secondary text-center max-w-md leading-relaxed font-light italic mb-16">
        Une maison d&rsquo;édition islamique francophone.{" "}
        <span className="text-text not-italic">Bientôt disponible.</span>
      </p>

      {/* Form or confirmation */}
      <div className="w-full max-w-md">
        {status === "success" ? (
          <div className="border border-gold-dark bg-gold/5 px-8 py-7 text-center">
            <p className="font-arabic text-2xl text-gold mb-2 leading-relaxed" dir="rtl" lang="ar">
              بارك الله فيك
            </p>
            <p className="font-display text-lg text-gold mb-1">Barak Allahu fik</p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Nous vous contacterons à l&rsquo;ouverture.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <label htmlFor="waitlist-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 bg-bg border border-border text-text placeholder:text-text-secondary/50 px-5 py-3.5 text-sm focus:outline-none focus:border-gold-dark transition-colors duration-300 sm:border-r-0"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-gold text-bg text-xs tracking-widest uppercase px-7 py-3.5 hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "…" : "M'avertir du lancement"}
              </button>
            </form>

            {status === "duplicate" && (
              <p className="text-gold/70 text-xs text-center mt-4 tracking-wide">
                Cette adresse est déjà enregistrée — nous vous contacterons à l&rsquo;ouverture.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400/70 text-xs text-center mt-4 tracking-wide">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
          </>
        )}
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center gap-4 mt-16">
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
      </div>
    </section>
  );
}
