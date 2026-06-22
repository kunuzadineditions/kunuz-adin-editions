"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Check, Star, Package, Mail, ChevronRight } from "lucide-react";

const PAYS = [
  "France", "Belgique", "Suisse", "Luxembourg", "Monaco",
  "Maroc", "Algérie", "Tunisie", "Sénégal", "Côte d'Ivoire",
  "Mali", "Mauritanie", "Guinée", "Burkina Faso", "Niger",
  "Cameroun", "Gabon", "Madagascar", "Réunion", "Martinique", "Guadeloupe",
  "Allemagne", "Espagne", "Italie", "Pays-Bas", "Portugal", "Royaume-Uni",
  "Canada", "États-Unis", "Australie",
  "Autre",
];

const BENEFITS = [
  "Les deux livres KUNUZ ADIN livrés chez vous au lancement",
  "Livraison France offerte (économisez 4,90€)",
  "Statut Fondateur à vie, badge exclusif",
  "-5% sur tous les prochains livres KUNUZ ADIN",
  "Accès aux bonus et contenus exclusifs futurs",
];

const STEPS = [
  {
    icon: Package,
    title: "Inscrivez-vous gratuitement",
    desc: "Aucun paiement maintenant. Votre place est réservée.",
  },
  {
    icon: Mail,
    title: "Recevez votre confirmation",
    desc: "Email de confirmation avec votre statut Fondateur officiel.",
  },
  {
    icon: Star,
    title: "Payez au lancement",
    desc: "38€ uniquement à la date de lancement. Privilèges garantis à vie.",
  },
];

export default function FondateurPage() {
  const [prenom, setPrenom]   = useState("");
  const [email, setEmail]     = useState("");
  const [pays, setPays]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [done, setDone]       = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register-fondateur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, email, pays }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Erreur réseau. Réessayez.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <span className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6">
            Pré-inscription Fondateurs
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Devenez Fondateur<br />
            <span className="text-[#C9A84C]">KUNUZ ADIN ÉDITIONS</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            Soutenez la diffusion du savoir islamique en français dès le début
            et bénéficiez de privilèges exclusifs à vie.
          </p>

        </div>
      </section>

      {/* ── Formulaire ── */}
      <section className="max-w-md mx-auto px-6 pb-20">
        {done ? (
          <div className="bg-zinc-900 border border-[#C9A84C]/30 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#C9A84C]/20 flex items-center justify-center mx-auto mb-5">
              <Check size={24} className="text-[#C9A84C]" />
            </div>
            <p className="text-2xl font-bold mb-2">
              بَارَكَ اللَّهُ فِيكَ، {prenom} !
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Ta pré-inscription Fondateur est confirmée. Tu recevras un email
              à <span className="text-white">{email}</span> avec tous les détails
              et ta date de paiement au lancement.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5"
          >
            <div>
              <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">Inscription gratuite</p>
              <p className="text-zinc-400 text-xs">Paiement de 38€ uniquement au lancement officiel.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="prenom">
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Votre prénom"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="pays">
                  Pays
                </label>
                <select
                  id="pays"
                  required
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]/60 transition-colors appearance-none"
                >
                  <option value="" disabled>Sélectionnez votre pays</option>
                  {PAYS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-black font-bold px-6 py-4 rounded-full hover:bg-[#b8923e] transition-colors disabled:opacity-60"
            >
              {loading ? "Inscription en cours…" : "Je veux devenir Fondateur, inscription gratuite"}
              {!loading && <ChevronRight size={16} />}
            </button>

            <p className="text-zinc-600 text-xs text-center">
              Inscription gratuite · Paiement de 38€ uniquement au lancement officiel
            </p>
          </form>
        )}
      </section>

      {/* ── Ce que contient le pack ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-zinc-800">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-6">Le Pack</p>
        <h2 className="text-2xl font-bold mb-8">Deux livres. Une transformation.</h2>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex gap-4 items-start">
            <div className="relative w-14 h-20 flex-shrink-0 overflow-hidden rounded-lg">
              <Image src="/images/covers/tu-pries-cover.jpg" alt="Tu pries mais tu ne t'apaises pas" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <p className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Livre 1</p>
              <p className="font-semibold text-sm leading-snug mb-2">
                Tu pries, mais tu ne t&apos;apaises pas
              </p>
              <p className="text-zinc-500 text-xs">
                Retrouver le khushû&apos;, la présence du cœur dans la prière.
              </p>
              <p className="text-zinc-600 text-xs mt-2 line-through">26,50€</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex gap-4 items-start">
            <div className="relative w-14 h-20 flex-shrink-0 overflow-hidden rounded-lg">
              <Image src="/images/covers/carnet-cover.jpg" alt="Carnet de cheminement Cœur Vivant" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <p className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Livre 2</p>
              <p className="font-semibold text-sm leading-snug mb-2">
                Carnet de cheminement Cœur Vivant
              </p>
              <p className="text-zinc-500 text-xs">
                Un carnet pratique pour approfondir la transformation spirituelle.
              </p>
              <p className="text-zinc-600 text-xs mt-2 line-through">16,90€</p>
            </div>
          </div>
        </div>

        <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Prix Pack Fondateur</p>
            <p className="text-2xl font-bold">38<span className="text-[#C9A84C]">€</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#C9A84C] mb-0.5">Vous économisez</p>
            <p className="text-xl font-bold text-[#C9A84C]">+ 10,30€</p>
            <p className="text-zinc-500 text-xs">(pack + port France)</p>
          </div>
        </div>
      </section>

      {/* ── Statut Fondateur ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-zinc-800">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-6">Le Statut</p>
        <h2 className="text-2xl font-bold mb-3">Fondateur à vie</h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-lg">
          En vous inscrivant, vous rejoignez les premiers soutiens de KUNUZ ADIN ÉDITIONS.
          Ce statut est permanent. Il ne sera plus disponible après le lancement officiel.
        </p>

        <ul className="space-y-3">
          {BENEFITS.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-[#C9A84C]" />
              </div>
              <span className="text-sm text-zinc-300">{b}</span>
            </li>
          ))}
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Star size={12} className="text-[#C9A84C]" />
            </div>
            <span className="text-sm text-zinc-300">
              D&apos;autres privilèges exclusifs seront annoncés progressivement.{" "}
              <span className="text-[#C9A84C]">Les Fondateurs seront les premiers informés.</span>
            </span>
          </li>
        </ul>
      </section>

      {/* ── Comment ça marche ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-zinc-800">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-6">Comment ça marche</p>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mx-auto mb-4">
                <step.icon size={20} className="text-[#C9A84C]" />
              </div>
              <p className="text-xs text-[#C9A84C] font-medium mb-1">Étape {i + 1}</p>
              <p className="font-semibold text-sm mb-1">{step.title}</p>
              <p className="text-zinc-500 text-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-zinc-800 text-center">
        <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
          بَارَكَ اللَّهُ فِيكُمْ. Que ce soutien soit un acte qui vous profite,
          ici-bas et dans l&apos;au-delà.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 bg-[#C9A84C] text-black font-bold px-8 py-4 rounded-full text-base hover:bg-[#b8923e] transition-colors"
        >
          Je veux devenir Fondateur, inscription gratuite
          <ChevronRight size={18} />
        </button>
        <p className="text-zinc-600 text-xs mt-3">
          Inscription gratuite · Paiement de 38€ uniquement au lancement officiel
        </p>
      </section>

    </main>
  );
}
