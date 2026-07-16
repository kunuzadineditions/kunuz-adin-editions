"use client";

import { useState, useEffect, useLayoutEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { Check, ChevronRight, ChevronDown, Minus, Plus } from "lucide-react";

const PAYS = [
  "France", "Belgique", "Suisse", "Luxembourg", "Monaco",
  "Maroc", "Algérie", "Tunisie", "Sénégal", "Côte d'Ivoire",
  "Mali", "Mauritanie", "Guinée", "Burkina Faso", "Niger",
  "Cameroun", "Gabon", "Madagascar", "Réunion", "Martinique", "Guadeloupe",
  "Allemagne", "Espagne", "Italie", "Pays-Bas", "Portugal", "Royaume-Uni",
  "Canada", "États-Unis", "Australie",
  "Autre",
];

const PRIX_LIVRE_NORMAL  = 26.5;
const PRIX_LIVRE_REMISE  = 21;
const PRIX_CARNET_NORMAL = 16.9;
const PRIX_CARNET_REMISE = 13.5;
const PRIX_PACK_NORMAL   = 43.4;
const PRIX_PACK_REMISE   = 30;

const DETAIL_LIVRE = [
  "Partie I, le diagnostic : la psychologie islamique comme science oubliée, la fitra, et les racines du cœur malade.",
  "Partie II, les traitements : la purification du cœur, la thérapie de l'invocation, les racines cachées du mal-être, et le repentir comme science de la renaissance.",
  "Partie III, l'application : le programme des 90 jours, l'art de la persévérance, et al-qalb al-salîm, l'excellence de l'ihsân. Glossaire des termes et concepts clés inclus.",
];

const DETAIL_CARNET = [
  "Le socle : intention, pacte d'engagement, diagnostic du cœur, cartographie des déclencheurs et plan de protection.",
  "La pharmacie du cœur : les Noms d'Allah présentés comme remèdes, à invoquer selon son état.",
  "L'itinéraire 90 jours en trois phases : purification (jours 1 à 30), construction (jours 31 à 60), élévation (jours 61 à 90), avec suivi quotidien du wird et bilans hebdomadaires et mensuels de l'état intérieur.",
];

function formatEur(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

type Stock = {
  places_livre_restantes: number;
  places_carnet_restantes: number;
};

type SuccessSnapshot = {
  qtePack: number;
  qteLivre: number;
  qteCarnet: number;
  prixPack: number;
  prixLivre: number;
  prixCarnet: number;
  remisePack: boolean;
  remiseLivre: boolean;
  remiseCarnet: boolean;
  total: number;
};

function QtySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
        className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:opacity-30 transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="w-5 text-center font-semibold text-white text-sm">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(9, value + 1))}
        className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function DetailRepliable({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors"
      >
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {open ? "Réduire" : "Voir le détail"}
      </button>
      {open && (
        <ul className="mt-2 space-y-1.5 pl-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#C9A84C] flex-shrink-0 mt-0.5">·</span>
              <span className="text-zinc-400 text-xs leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PreventeClient() {
  const [stock, setStock] = useState<Stock>({
    places_livre_restantes: 100,
    places_carnet_restantes: 100,
  });
  const [stockLoaded, setStockLoaded] = useState(false);

  const [qtePack,   setQtePack]   = useState(0);
  const [qteLivre,  setQteLivre]  = useState(0);
  const [qteCarnet, setQteCarnet] = useState(0);

  const [prenom, setPrenom] = useState("");
  const [email,  setEmail]  = useState("");
  const [pays,   setPays]   = useState("");

  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [done,     setDone]     = useState(false);
  const [snapshot, setSnapshot] = useState<SuccessSnapshot | null>(null);

  const fetchStock = () => {
    fetch("/api/prevente/stock")
      .then((r) => r.json())
      .then((d: Stock) => { setStock(d); setStockLoaded(true); })
      .catch(() => setStockLoaded(true));
  };

  useEffect(() => {
    fetchStock();
    const id = setInterval(fetchStock, 30_000);
    return () => clearInterval(id);
  }, []);

  // Mirrors server logic : pack en premier, puis livre, puis carnet
  const remisePack =
    stockLoaded && qtePack > 0 &&
    stock.places_livre_restantes  >= qtePack &&
    stock.places_carnet_restantes >= qtePack;

  const placesLivreApresPack  = stock.places_livre_restantes  - (remisePack ? qtePack : 0);
  const placesCarnetApresPack = stock.places_carnet_restantes - (remisePack ? qtePack : 0);

  const remiseLivre  = stockLoaded && qteLivre  > 0 && placesLivreApresPack  >= qteLivre;
  const remiseCarnet = stockLoaded && qteCarnet > 0 && placesCarnetApresPack >= qteCarnet;

  const prixPackUnit   = remisePack   ? PRIX_PACK_REMISE   : PRIX_PACK_NORMAL;
  const prixLivreUnit  = remiseLivre  ? PRIX_LIVRE_REMISE  : PRIX_LIVRE_NORMAL;
  const prixCarnetUnit = remiseCarnet ? PRIX_CARNET_REMISE : PRIX_CARNET_NORMAL;

  const totalIndicatif =
    qtePack   * prixPackUnit +
    qteLivre  * prixLivreUnit +
    qteCarnet * prixCarnetUnit;
  const portOffert = totalIndicatif >= 49;

  // Ref mis à jour après chaque commit (useLayoutEffect = safe en concurrent mode,
  // contrairement à une mutation pendant le rendu qui peut être rejoué).
  const submitValuesRef = useRef({
    qtePack: 0, qteLivre: 0, qteCarnet: 0,
    prenom: "", email: "", pays: "",
    prixPackUnit: PRIX_PACK_NORMAL,
    prixLivreUnit: PRIX_LIVRE_NORMAL,
    prixCarnetUnit: PRIX_CARNET_NORMAL,
    remisePack: false, remiseLivre: false, remiseCarnet: false,
    totalIndicatif: 0,
  });
  useLayoutEffect(() => {
    submitValuesRef.current = {
      qtePack, qteLivre, qteCarnet,
      prenom, email, pays,
      prixPackUnit, prixLivreUnit, prixCarnetUnit,
      remisePack, remiseLivre, remiseCarnet,
      totalIndicatif,
    };
  });

  // Efface l'erreur dès que l'utilisateur modifie une quantité
  useEffect(() => {
    setError("");
  }, [qtePack, qteLivre, qteCarnet]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const {
      qtePack, qteLivre, qteCarnet,
      prenom, email, pays,
      prixPackUnit, prixLivreUnit, prixCarnetUnit,
      remisePack, remiseLivre, remiseCarnet,
      totalIndicatif,
    } = submitValuesRef.current;

    if (qtePack === 0 && qteLivre === 0 && qteCarnet === 0) {
      setError("Sélectionnez au moins un produit.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/prevente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom, email, pays,
          qte_pack:   qtePack,
          qte_livre:  qteLivre,
          qte_carnet: qteCarnet,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
        return;
      }
      setSnapshot({
        qtePack, qteLivre, qteCarnet,
        prixPack: prixPackUnit, prixLivre: prixLivreUnit, prixCarnet: prixCarnetUnit,
        remisePack, remiseLivre, remiseCarnet,
        total: totalIndicatif,
      });
      fetchStock();
      setDone(true);
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setLoading(false);
    }
  };

  if (done && snapshot) {
    return <SuccessView prenom={prenom} email={email} snap={snapshot} />;
  }

  // Disponibilité pack : les deux stocks doivent avoir au moins 1 place
  const packDisponible = stockLoaded
    ? stock.places_livre_restantes > 0 && stock.places_carnet_restantes > 0
    : true;

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6">
            Première impression limitée
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Prévente
          </h1>
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
            100 premiers exemplaires de chaque titre à{" "}
            <span className="text-[#C9A84C] font-semibold">-20%</span>.
            Le prix est figé au moment de la réservation.
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-2xl px-6 py-4 mx-auto text-sm">
            <span className="text-[#C9A84C] font-semibold">Réservation sans paiement</span>
            <span className="hidden sm:block text-[#C9A84C]/40">|</span>
            <span className="text-zinc-300">Nous vous recontactons au lancement</span>
          </div>
          <p className="mt-4 text-zinc-500 text-sm">
            Première expédition mi-août au plus tard, possible avant in shâ Allah
          </p>
        </div>
      </section>

      {/* ── Compteurs stock ── */}
      <section className="max-w-2xl mx-auto px-6 pb-10">
        <div className="grid sm:grid-cols-2 gap-4">
          <StockBadge
            label="Tu pries, mais tu ne t'apaises pas"
            places={stock.places_livre_restantes}
            loaded={stockLoaded}
          />
          <StockBadge
            label="Carnet de cheminement Cœur Vivant"
            places={stock.places_carnet_restantes}
            loaded={stockLoaded}
          />
        </div>
      </section>

      {/* ── Produits ── */}
      <section className="max-w-2xl mx-auto px-6 pb-6">
        <div className="space-y-4">

          {/* ── Pack en vedette ── */}
          <div className="relative bg-zinc-900 border-2 border-[#C9A84C]/50 rounded-2xl p-5 pt-7">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#C9A84C] text-black text-xs font-bold px-5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                Recommandé
              </span>
            </div>

            <p className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Pack complet</p>
            <p className="font-bold text-base mb-1">Les deux ouvrages ensemble</p>
            <p className="text-[#C9A84C]/80 text-xs italic mb-4">
              Le livre pour comprendre, le carnet pour cheminer.
            </p>

            {/* Deux couvertures */}
            <div className="flex gap-3 mb-4">
              <div className="relative w-14 h-20 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/covers/tu-pries-cover.jpg"
                  alt="Tu pries, mais tu ne t'apaises pas"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="relative w-14 h-20 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/covers/carnet-cover.jpg"
                  alt="Carnet de cheminement Cœur Vivant"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 text-xs text-zinc-400 leading-relaxed self-center">
                <span className="text-zinc-300">Tu pries, mais tu ne t&apos;apaises pas</span>
                {" + "}
                <span className="text-zinc-300">Carnet de cheminement Cœur Vivant</span>
              </div>
            </div>

            {/* Prix pack */}
            {!stockLoaded ? (
              <div className="h-7 bg-zinc-800 rounded w-36 animate-pulse mb-1" />
            ) : packDisponible ? (
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[#C9A84C] font-bold text-xl">{formatEur(PRIX_PACK_REMISE)}</span>
                <span className="text-zinc-600 text-sm line-through">{formatEur(PRIX_PACK_NORMAL)}</span>
                <span className="text-xs text-[#C9A84C]/70">-20%</span>
              </div>
            ) : (
              <div className="mb-1">
                <p className="text-white font-semibold text-base">{formatEur(PRIX_PACK_NORMAL)}</p>
                <p className="text-zinc-500 text-xs mt-0.5">Tarif normal (offre -20% épuisée sur l&apos;un des titres)</p>
              </div>
            )}

            {packDisponible && stockLoaded && (
              <p className="text-zinc-500 text-xs mb-3">
                Séparément en prévente : {formatEur(PRIX_LIVRE_REMISE + PRIX_CARNET_REMISE)}, vous économisez {formatEur((PRIX_LIVRE_REMISE + PRIX_CARNET_REMISE) - PRIX_PACK_REMISE)} de plus
              </p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <span className="text-xs text-zinc-500">Quantité</span>
              <QtySelector value={qtePack} onChange={setQtePack} />
            </div>
          </div>

          {/* ── Séparateur ── */}
          <div className="relative flex items-center py-1">
            <div className="flex-1 border-t border-zinc-800" />
            <span className="mx-4 text-zinc-600 text-xs uppercase tracking-widest">Ou à l&apos;unité</span>
            <div className="flex-1 border-t border-zinc-800" />
          </div>

          {/* ── Livre seul ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex gap-4 items-start mb-4">
              <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/images/covers/tu-pries-cover.jpg"
                  alt="Tu pries, mais tu ne t'apaises pas"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Livre</p>
                <p className="font-semibold text-sm leading-snug mb-1">
                  Tu pries, mais tu ne t&apos;apaises pas
                </p>
                <p className="text-[#C9A84C]/80 text-xs italic mb-2">
                  Le diagnostic d&apos;une génération en apnée.
                </p>
                <PrixDisplay
                  prixNormal={PRIX_LIVRE_NORMAL}
                  prixRemise={PRIX_LIVRE_REMISE}
                  placesRestantes={stock.places_livre_restantes}
                  loaded={stockLoaded}
                />
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              Jamais nous n&apos;avons autant pratiqué, et jamais nous n&apos;avons été aussi anxieux.
              Ce livre aborde le décalage silencieux entre la pratique extérieure et la paix
              intérieure : ce cœur qui se prosterne cinq fois par jour et continue de courir
              dans le vide. Loin de réduire l&apos;anxiété à une simple affaire de chimie ou la foi
              à de simples rituels, il jette un pont entre santé mentale et santé spirituelle.
              En s&apos;appuyant sur la psychologie islamique et l&apos;héritage d&apos;Ibn al-Qayyim, il
              t&apos;apprend à identifier tes voiles, à soigner tes plaies, à trouver refuge auprès
              d&apos;Allah par Ses Noms, et à rebâtir un qalb salîm, un cœur sain.
              Un livre qui refuse les raccourcis : on ne le lit pas pour se rassurer, on le
              traverse pour renaître.
            </p>
            <DetailRepliable items={DETAIL_LIVRE} />
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <span className="text-xs text-zinc-500">Quantité</span>
              <QtySelector value={qteLivre} onChange={setQteLivre} />
            </div>
          </div>

          {/* ── Encart complémentarité ── */}
          <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl px-5 py-4 text-center">
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">Deux outils, une démarche</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              <span className="text-white font-medium">Le livre</span> pour comprendre.{" "}
              <span className="text-white font-medium">Le carnet</span> pour cheminer.
              Chacun se suffit à lui-même, tous deux sont conçus pour aller ensemble.
            </p>
          </div>

          {/* ── Carnet seul ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex gap-4 items-start mb-4">
              <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/images/covers/carnet-cover.jpg"
                  alt="Carnet de cheminement Cœur Vivant"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Carnet</p>
                <p className="font-semibold text-sm leading-snug mb-1">
                  Carnet de cheminement Cœur Vivant
                </p>
                <p className="text-[#C9A84C]/80 text-xs italic mb-2">
                  De la compréhension à l&apos;action concrète.
                </p>
                <PrixDisplay
                  prixNormal={PRIX_CARNET_NORMAL}
                  prixRemise={PRIX_CARNET_REMISE}
                  placesRestantes={stock.places_carnet_restantes}
                  loaded={stockLoaded}
                />
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              Le livre t&apos;a donné la compréhension, ce carnet te donne l&apos;action. Bien plus
              qu&apos;un planning, c&apos;est un véritable atelier du cœur. On y commence par un pacte
              et un diagnostic sincère, on y découvre les fondements (l&apos;équilibre entre le
              corps, le cœur, l&apos;âme et l&apos;intellect, les quinze principes de guérison
              d&apos;Ibn al-Qayyim), puis on apprend à invoquer Allah par Ses Noms, présentés comme
              une véritable pharmacie du cœur, chaque Nom étant un remède. On y cartographie
              ses déclencheurs de rechute, on dresse son plan de protection, et on structure sa
              remontée. Chaque section répond à un chapitre du livre. À remplir avec sincérité,
              à ton rythme, entre toi et Allah.
            </p>
            <DetailRepliable items={DETAIL_CARNET} />
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <span className="text-xs text-zinc-500">Quantité</span>
              <QtySelector value={qteCarnet} onChange={setQteCarnet} />
            </div>
          </div>

        </div>

        <p className="text-center text-zinc-600 text-xs mt-4">
          Frais de port offerts dès 49 euros d&apos;achat (à titre indicatif, calcul définitif au lancement)
        </p>
      </section>

      {/* ── Formulaire ── */}
      <section className="max-w-md mx-auto px-6 pb-24">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5"
        >
          <div>
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-0.5">
              Votre réservation
            </p>
            <p className="text-zinc-500 text-xs">Aucun paiement maintenant.</p>
          </div>

          {(qtePack > 0 || qteLivre > 0 || qteCarnet > 0) && (
            <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 space-y-2">
              {qtePack > 0 && (
                <RecapLine
                  label="Pack Cœur Vivant (livre + carnet)"
                  qte={qtePack}
                  prixUnit={prixPackUnit}
                  remise={remisePack}
                  prixNormal={PRIX_PACK_NORMAL}
                />
              )}
              {qteLivre > 0 && (
                <RecapLine
                  label="Tu pries, mais tu ne t'apaises pas"
                  qte={qteLivre}
                  prixUnit={prixLivreUnit}
                  remise={remiseLivre}
                  prixNormal={PRIX_LIVRE_NORMAL}
                />
              )}
              {qteCarnet > 0 && (
                <RecapLine
                  label="Carnet Cœur Vivant"
                  qte={qteCarnet}
                  prixUnit={prixCarnetUnit}
                  remise={remiseCarnet}
                  prixNormal={PRIX_CARNET_NORMAL}
                />
              )}
              <div className="pt-2 border-t border-zinc-700 flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Total indicatif
                  {portOffert && (
                    <span className="ml-2 text-[#C9A84C]">+ port offert</span>
                  )}
                </span>
                <span className="font-bold text-white">{formatEur(totalIndicatif)}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="prenom">Prénom</label>
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
              <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="email">Email</label>
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
              <label className="block text-xs text-zinc-400 mb-1.5" htmlFor="pays">Pays</label>
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
            disabled={loading || (qtePack === 0 && qteLivre === 0 && qteCarnet === 0)}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-black font-bold px-6 py-4 rounded-full hover:bg-[#b8923e] transition-colors disabled:opacity-50"
          >
            {loading ? "Envoi en cours..." : "Réserver ma commande"}
            {!loading && <ChevronRight size={16} />}
          </button>

          <p className="text-zinc-600 text-xs text-center">
            Aucun paiement prélevé. Votre prix est figé à la réservation.
          </p>
        </form>
      </section>

    </main>
  );
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function StockBadge({ label, places, loaded }: { label: string; places: number; loaded: boolean }) {
  if (!loaded) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 animate-pulse">
        <div className="h-3 bg-zinc-800 rounded w-2/3 mb-2" />
        <div className="h-4 bg-zinc-800 rounded w-1/3" />
      </div>
    );
  }
  return (
    <div className={`rounded-xl px-4 py-3 border ${places === 0 ? "bg-zinc-900 border-zinc-700" : "bg-[#C9A84C]/5 border-[#C9A84C]/20"}`}>
      <p className="text-zinc-500 text-xs mb-1 truncate">{label}</p>
      {places === 0 ? (
        <p className="text-zinc-400 text-xs font-medium">Offre -20% épuisée sur ce titre, tarif normal</p>
      ) : (
        <p className="text-[#C9A84C] font-semibold text-sm">
          {places} place{places > 1 ? "s" : ""} à -20% restante{places > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

function PrixDisplay({
  prixNormal, prixRemise, placesRestantes, loaded,
}: {
  prixNormal: number; prixRemise: number; placesRestantes: number; loaded: boolean;
}) {
  if (!loaded) return <div className="h-5 bg-zinc-800 rounded w-24 animate-pulse" />;
  if (placesRestantes === 0) {
    return <p className="text-white font-semibold text-sm">{formatEur(prixNormal)}</p>;
  }
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[#C9A84C] font-bold text-base">{formatEur(prixRemise)}</span>
      <span className="text-zinc-600 text-xs line-through">{formatEur(prixNormal)}</span>
      <span className="text-xs text-[#C9A84C]/70">-20%</span>
    </div>
  );
}

function RecapLine({
  label, qte, prixUnit, remise, prixNormal,
}: {
  label: string; qte: number; prixUnit: number; remise: boolean; prixNormal: number;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white truncate">{label}</p>
        {remise && (
          <p className="text-[10px] text-[#C9A84C]">
            {formatEur(prixUnit)} au lieu de {formatEur(prixNormal)}
          </p>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-xs text-zinc-400">x{qte}</span>
        <span className="ml-2 text-xs font-semibold text-white">{formatEur(qte * prixUnit)}</span>
      </div>
    </div>
  );
}

function SuccessView({ prenom, email, snap }: { prenom: string; email: string; snap: SuccessSnapshot }) {
  const portOffert = snap.total >= 49;

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white flex items-start justify-center pt-28 pb-20 px-6">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-[#C9A84C]/30 rounded-2xl p-8 text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#C9A84C]/20 flex items-center justify-center mx-auto mb-5">
            <Check size={24} className="text-[#C9A84C]" />
          </div>
          <p className="text-2xl font-bold mb-2">بَارَكَ اللَّهُ فِيكَ، {prenom}</p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Votre réservation est confirmée. Un email a été envoyé à{" "}
            <span className="text-white">{email}</span>.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-4">Récapitulatif</p>
          <div className="space-y-3">
            {snap.qtePack > 0 && (
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-white">Pack Cœur Vivant (livre + carnet)</p>
                  {snap.remisePack
                    ? <p className="text-xs text-[#C9A84C]">Prix de lancement -20% garanti</p>
                    : <p className="text-xs text-zinc-500">Tarif normal</p>}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-zinc-500">x{snap.qtePack}</p>
                  <p className="text-sm font-semibold">{formatEur(snap.qtePack * snap.prixPack)}</p>
                </div>
              </div>
            )}
            {snap.qteLivre > 0 && (
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-white">Tu pries, mais tu ne t&apos;apaises pas</p>
                  {snap.remiseLivre && <p className="text-xs text-[#C9A84C]">Prix de lancement -20% garanti</p>}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-zinc-500">x{snap.qteLivre}</p>
                  <p className="text-sm font-semibold">{formatEur(snap.qteLivre * snap.prixLivre)}</p>
                </div>
              </div>
            )}
            {snap.qteCarnet > 0 && (
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-white">Carnet de cheminement Cœur Vivant</p>
                  {snap.remiseCarnet && <p className="text-xs text-[#C9A84C]">Prix de lancement -20% garanti</p>}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-zinc-500">x{snap.qteCarnet}</p>
                  <p className="text-sm font-semibold">{formatEur(snap.qteCarnet * snap.prixCarnet)}</p>
                </div>
              </div>
            )}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Total indicatif</p>
                {portOffert && <p className="text-xs text-[#C9A84C]">Frais de port offerts</p>}
              </div>
              <p className="text-lg font-bold text-[#C9A84C]">{formatEur(snap.total)}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl px-5 py-4 space-y-2">
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">Aucun paiement prélevé à ce stade.</p>
          </div>
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              Première expédition mi-août au plus tard, possible avant in shâ Allah.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              Vous serez recontacté par email au lancement pour finaliser votre commande.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
