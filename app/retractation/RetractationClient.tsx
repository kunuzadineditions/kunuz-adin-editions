"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Check, ChevronRight, FileText } from "lucide-react";

function formatDateClient(date: Date): string {
  const fmt = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("day")} ${get("month")} ${get("year")} à ${get("hour")}h${get("minute")}`;
}

export default function RetractationClient() {
  const [nom,              setNom]              = useState("");
  const [prenom,           setPrenom]           = useState("");
  const [email,            setEmail]            = useState("");
  const [numeroCommande,   setNumeroCommande]   = useState("");
  const [detailsCommande,  setDetailsCommande]  = useState("");
  const [loading,          setLoading]          = useState(false);
  const [error,            setError]            = useState("");
  const [done,             setDone]             = useState(false);
  const [submittedAt,      setSubmittedAt]      = useState<Date | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const now = new Date();
    try {
      const res = await fetch("/api/retractation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          numero_commande:  numeroCommande,
          details_commande: detailsCommande,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
        return;
      }
      setSubmittedAt(now);
      setDone(true);
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setLoading(false);
    }
  };

  if (done && submittedAt) {
    return <SuccessView prenom={prenom} email={email} submittedAt={submittedAt} />;
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#C9A84C]/4 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6">
            Droit de rétractation
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Exercer mon droit de rétractation
          </h1>
          <div className="text-zinc-400 text-sm md:text-base leading-relaxed space-y-3 text-left bg-zinc-900/60 border border-zinc-800 rounded-2xl px-6 py-5 max-w-xl mx-auto">
            <p>
              Vous avez <span className="text-white font-medium">14 jours</span> à compter
              de la réception de votre commande pour annuler votre achat, sans avoir à vous
              justifier et sans frais.
            </p>
            <p>
              Utilisez le formulaire ci-dessous pour enregistrer votre demande en ligne.
              Vous recevrez immédiatement un accusé de réception par email, qui fera foi
              de la date de votre rétractation.
            </p>
            <p className="text-zinc-500 text-xs">
              Le formulaire type papier, prévu par la loi, est également disponible
              en bas de cette page si vous préférez cette voie.
            </p>
          </div>
        </div>
      </section>

      {/* ── Formulaire en ligne ── */}
      <section className="max-w-md mx-auto px-6 pb-16">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5"
        >
          <div>
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-0.5">
              Formulaire en ligne
            </p>
            <p className="text-zinc-500 text-xs">
              Tous les champs sont obligatoires.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
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
                <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="nom">
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
                />
              </div>
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
              <p className="text-zinc-600 text-xs mt-1">
                L&apos;accusé de réception sera envoyé à cette adresse.
              </p>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="numero_commande">
                Identification de la commande
              </label>
              <input
                id="numero_commande"
                type="text"
                required
                value={numeroCommande}
                onChange={(e) => setNumeroCommande(e.target.value)}
                placeholder="Numéro de commande ou description (ex. commande du 10 juillet 2026, livre + carnet)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="details_commande">
                Détails de la demande
              </label>
              <textarea
                id="details_commande"
                required
                rows={4}
                value={detailsCommande}
                onChange={(e) => setDetailsCommande(e.target.value)}
                placeholder="Précisez les articles concernés par la rétractation. Le motif est facultatif."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/60 transition-colors resize-none"
              />
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
            {loading ? "Enregistrement en cours..." : "Confirmer ma rétractation"}
            {!loading && <ChevronRight size={16} />}
          </button>

          <p className="text-zinc-600 text-xs text-center">
            Un accusé de réception vous sera envoyé immédiatement par email.
          </p>
        </form>
      </section>

      {/* ── Formulaire type légal ── */}
      <FormulaireType />

    </main>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────

function SuccessView({
  prenom,
  email,
  submittedAt,
}: {
  prenom: string;
  email: string;
  submittedAt: Date;
}) {
  const dateStr = formatDateClient(submittedAt);
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white flex items-start justify-center pt-28 pb-20 px-6">
      <div className="w-full max-w-md">

        <div className="bg-zinc-900 border border-[#C9A84C]/30 rounded-2xl p-8 text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#C9A84C]/20 flex items-center justify-center mx-auto mb-5">
            <Check size={24} className="text-[#C9A84C]" />
          </div>
          <p className="text-xl font-bold mb-2">Demande enregistrée</p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Votre demande de rétractation a bien été reçue, {prenom}.
            Un accusé de réception a été envoyé à{" "}
            <span className="text-white">{email}</span>.
          </p>
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3">
            <p className="text-xs text-zinc-500 mb-0.5">Date et heure de votre demande</p>
            <p className="text-[#C9A84C] font-semibold text-sm">{dateStr}</p>
          </div>
        </div>

        <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl px-5 py-4 space-y-3">
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              Votre demande a bien été enregistrée. Elle fait foi pour votre délai de rétractation.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              Vous devez nous retourner le ou les livres concernés sous 14 jours. Les frais de retour sont à votre charge. Nous vous communiquerons l&apos;adresse de retour par email.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              Le remboursement, frais de livraison initiaux inclus, sera effectué après réception et vérification du ou des livres retournés, dans les délais prévus par la loi.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              Le ou les livres doivent nous revenir dans un état permettant leur revente. En cas de dépréciation résultant d&apos;une manipulation dépassant ce qui est nécessaire pour les examiner (par exemple pages cornées, taches, reliure abîmée, annotations), le remboursement pourra être réduit à hauteur de la dépréciation constatée, comme précisé dans nos{" "}
              <Link href="/cgv" className="text-[#C9A84C] hover:underline">
                conditions générales de vente
              </Link>.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              Pour toute question :{" "}
              <a href="mailto:contact@kunuz-adin-editions.com" className="text-[#C9A84C] hover:underline">
                contact@kunuz-adin-editions.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

// ─── Formulaire type légal ────────────────────────────────────────────────────

function FormulaireType() {
  return (
    <section className="max-w-2xl mx-auto px-6 pb-24">
      <div className="border border-zinc-700 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 bg-zinc-900 border-b border-zinc-700 px-5 py-4">
          <FileText size={16} className="text-[#C9A84C] flex-shrink-0" />
          <div>
            <p className="text-white text-sm font-semibold">
              Formulaire type de rétractation
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">
              Prévu par l&apos;annexe à l&apos;article L. 221-5 du Code de la consommation.
              Vous pouvez envoyer ce formulaire complété par email à{" "}
              <a href="mailto:contact@kunuz-adin-editions.com" className="text-[#C9A84C] hover:underline">
                contact@kunuz-adin-editions.com
              </a>{" "}
              à la place du formulaire en ligne ci-dessus.
            </p>
          </div>
        </div>
        <div className="bg-zinc-900/40 px-5 py-6">
          <div className="font-mono text-sm text-zinc-300 leading-relaxed space-y-4 whitespace-pre-wrap">
            <p className="text-center font-bold text-white uppercase tracking-wider text-xs mb-6">
              FORMULAIRE DE RÉTRACTATION
            </p>
            <p className="text-zinc-500 text-xs italic">
              Veuillez compléter et renvoyer le présent formulaire uniquement si vous
              souhaitez vous rétracter du contrat.
            </p>

            <p>
              À l&apos;attention de :{" "}
              <span className="text-white">
                KOMBOKOM / KUNUZ ADIN ÉDITIONS, Annonay (07100), France,
                contact@kunuz-adin-editions.com
              </span>
            </p>

            <p>
              Je/Nous vous notifie/notifions par la présente ma/notre rétractation du
              contrat portant sur la vente du bien ci-dessous :
            </p>

            <div className="space-y-3 border-t border-zinc-700 pt-4">
              <FormLine label="Commandé le / reçu le" />
              <FormLine label="Nom et prénom du consommateur" />
              <FormLine label="Adresse du consommateur" />
              <FormLine label="Signature (uniquement si ce formulaire est envoyé sur papier)" />
              <FormLine label="Date" />
            </div>

            <p className="text-zinc-600 text-xs pt-2 border-t border-zinc-800">
              Rayez les mentions inutiles si vous envoyez ce formulaire par voie papier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormLine({ label }: { label: string }) {
  return (
    <div>
      <p className="text-zinc-500 text-xs mb-1">{label} :</p>
      <div className="border-b border-zinc-700 pb-1 min-h-[20px]" />
    </div>
  );
}
