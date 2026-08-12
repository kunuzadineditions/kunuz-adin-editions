"use client";

import { useState } from "react";

export default function TemoignageForm() {
  const [nom,     setNom]     = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot invisible
  const [status,  setStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/temoignages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, message, website }),
      });
      if (res.status === 201) {
        setStatus("success");
        setNom("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Une erreur est survenue.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Impossible de contacter le serveur.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/30 bg-gold/5 px-6 py-10 text-center">
        <p className="font-display text-2xl text-gold font-light mb-3">
          Merci pour votre témoignage.
        </p>
        <p className="text-text-secondary text-sm leading-relaxed">
          Il sera lu avec attention et publié après validation, in shā' Allah.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot — masqué aux humains, les bots le remplissent */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div>
        <label className="block text-[10px] tracking-[0.25em] text-gold uppercase mb-2">
          Prénom ou nom
        </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          maxLength={80}
          placeholder="Votre prénom"
          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-text-secondary/30 focus:outline-none focus:border-gold-dark transition-colors duration-200"
        />
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] text-gold uppercase mb-2">
          Témoignage
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          maxLength={1500}
          rows={6}
          placeholder="Partagez ce que cette lecture vous a apporté…"
          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-text-secondary/30 focus:outline-none focus:border-gold-dark transition-colors duration-200 resize-none leading-relaxed"
        />
        <p className="text-[10px] text-text-secondary/30 mt-1 text-right tabular-nums">
          {message.length} / 1500
        </p>
      </div>

      {errorMsg && (
        <p className="text-[12px] text-red-400/80 leading-snug">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start px-8 py-3.5 bg-gold text-bg text-xs tracking-widest uppercase hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-wait"
      >
        {status === "loading" ? "Envoi en cours…" : "Laisser un témoignage"}
      </button>

      <p className="text-[10px] text-text-secondary/40 leading-relaxed -mt-2">
        Votre témoignage sera relu et publié après validation.
        Aucun email ni donnée personnelle sensible n'est collecté.
      </p>
    </form>
  );
}
