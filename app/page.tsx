"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function HomePage() {
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

      {/* Arabic title */}
      <h1
        className="font-arabic text-5xl sm:text-6xl md:text-7xl text-gold text-center leading-relaxed mb-4"
        dir="rtl"
        lang="ar"
      >
        كنوز الدين
      </h1>

      {/* Brand name */}
      <p className="font-display text-sm sm:text-base tracking-[0.4em] text-text-secondary uppercase text-center mb-8">
        KUNUZ ADIN ÉDITIONS
      </p>

      <div className="h-px w-24 bg-gold-dark mb-10" />

      {/* Welcome */}
      <p className="font-display text-xl sm:text-2xl text-text text-center max-w-lg leading-relaxed font-light mb-5">
        Al hamdulillah, la boutique est ouverte.
      </p>
      <p className="text-text-secondary text-sm sm:text-base text-center max-w-md leading-relaxed mb-10">
        Une maison d&rsquo;édition islamique francophone, dédiée aux sciences du cœur et à l&rsquo;histoire de l&rsquo;Islam. Des livres, et bien plus à venir <span dir="rtl" lang="ar" className="font-arabic">إن شاء الله</span>, pour nourrir la foi et accompagner le cheminement.
      </p>

      {/* CTA boutique */}
      <Link
        href="/boutique"
        className="inline-flex items-center gap-2 bg-gold text-bg text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300 mb-16"
      >
        Découvrir la boutique
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Newsletter */}
      <div className="w-full max-w-md">
        <p className="text-xs tracking-[0.3em] text-gold-dark uppercase text-center mb-5">
          Recevoir nos actualités
        </p>

        {status === "success" ? (
          <div className="border border-gold-dark bg-gold/5 px-8 py-7 text-center">
            <p
              className="font-arabic text-2xl text-gold mb-2 leading-relaxed"
              dir="rtl"
              lang="ar"
            >
              بارك الله فيك
            </p>
            <p className="font-display text-lg text-gold mb-1">Barak Allahu fik</p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Vous êtes inscrit à nos actualités.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="newsletter-email"
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
                {status === "loading" ? "…" : "S'inscrire"}
              </button>
            </form>

            {status === "duplicate" && (
              <p className="text-gold/70 text-xs text-center mt-4 tracking-wide">
                Cette adresse est déjà enregistrée.
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
