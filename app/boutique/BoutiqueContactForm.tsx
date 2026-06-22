"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function BoutiqueContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    nom: "",
    organisation: "",
    email: "",
    quantite: "",
    message: "",
  });

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="border border-gold-dark bg-gold/5 px-8 py-8 text-center">
        <p className="font-display text-2xl text-gold mb-2">Barak Allahu fik</p>
        <p className="text-text-secondary text-sm leading-relaxed">
          Votre demande a bien été reçue. Nous vous répondrons dans les meilleurs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nom" className="text-[10px] tracking-[0.25em] text-gold uppercase">
            Nom *
          </label>
          <input
            id="nom"
            type="text"
            required
            value={form.nom}
            onChange={set("nom")}
            placeholder="Votre nom"
            className="bg-bg border border-border text-text placeholder:text-text-secondary/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-dark transition-colors duration-300"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="organisation" className="text-[10px] tracking-[0.25em] text-gold uppercase">
            Organisation *
          </label>
          <input
            id="organisation"
            type="text"
            required
            value={form.organisation}
            onChange={set("organisation")}
            placeholder="Bibliothèque, mosquée, association…"
            className="bg-bg border border-border text-text placeholder:text-text-secondary/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-dark transition-colors duration-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[10px] tracking-[0.25em] text-gold uppercase">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder="votre@email.com"
            className="bg-bg border border-border text-text placeholder:text-text-secondary/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-dark transition-colors duration-300"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quantite" className="text-[10px] tracking-[0.25em] text-gold uppercase">
            Quantité souhaitée
          </label>
          <input
            id="quantite"
            type="text"
            value={form.quantite}
            onChange={set("quantite")}
            placeholder="Ex. : 20 exemplaires"
            className="bg-bg border border-border text-text placeholder:text-text-secondary/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-dark transition-colors duration-300"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[10px] tracking-[0.25em] text-gold uppercase">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          placeholder="Décrivez votre projet, le ou les livres souhaités, le contexte…"
          className="bg-bg border border-border text-text placeholder:text-text-secondary/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-dark transition-colors duration-300 resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400/70 text-xs tracking-wide">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start bg-gold text-bg text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer la demande"}
      </button>
    </form>
  );
}
