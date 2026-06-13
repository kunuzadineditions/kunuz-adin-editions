"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="py-24 px-4 bg-card border-t border-border">
      <div className="max-w-xl mx-auto text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-gold-dark" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-12 bg-gold-dark" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-text font-light mb-4">
          Rester informé
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-10">
          Nouveautés, articles et ressources spirituelles — directement dans votre boîte mail. Pas de bruit, seulement l&rsquo;essentiel.
        </p>

        {status === "success" ? (
          <div className="border border-gold-dark bg-gold/5 px-8 py-6">
            <p className="font-display text-xl text-gold mb-1">
              Barak Allahu fik
            </p>
            <p className="text-text-secondary text-sm">
              Vous êtes bien inscrit. Nous reviendrons vers vous avec soin.
            </p>
          </div>
        ) : (
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
        )}

        <p className="text-text-secondary/50 text-xs mt-5 tracking-wide">
          Désabonnement possible à tout moment.
        </p>
      </div>
    </section>
  );
}
