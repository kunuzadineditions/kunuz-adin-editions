import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ahmed Kartaba — Auteur",
  description:
    "Ahmed Kartaba, auteur et réalisateur franco-algérien, fondateur de KUNUZ ADIN Éditions. Penseur ancré dans la tradition islamique classique.",
};

const references = [
  { name: "France Télévisions", domain: "Audiovisuel public" },
  { name: "Red Bull Media", domain: "Documentaire & contenu" },
  { name: "Royal Mansour", domain: "Hôtellerie de luxe" },
  { name: "NamX", domain: "Technologie & énergie" },
];

const influences = [
  {
    name: "Ibn al-Qayyim al-Jawziyya",
    arabic: "ابن قيم الجوزية",
    desc: "Maître de la médecine des cœurs, auteur du Madārij al-Sālikīn.",
  },
  {
    name: "Ibn Taymiyya",
    arabic: "ابن تيمية",
    desc: "Théologien et juriste hanbalite, maître d'Ibn al-Qayyim, figure de la rigueur dans la tradition.",
  },
];

export default function AuteurPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              Auteur
            </p>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-text font-light leading-tight mb-2">
            Ahmed Kartaba
          </h1>
          <p className="text-text-secondary tracking-widest text-sm uppercase">
            Auteur · Réalisateur · Fondateur
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-14 lg:gap-16 items-start">

          {/* Main bio */}
          <div>
            {/* Portrait placeholder */}
            <div
              className="w-full sm:w-72 aspect-square mb-10 flex items-end p-6 border border-border"
              style={{
                background:
                  "linear-gradient(160deg, #1A1510 0%, #0C0C0C 100%)",
              }}
            >
              <div>
                <div className="h-px w-8 bg-gold mb-3" />
                <p className="font-display text-text-secondary text-sm leading-snug">
                  Ahmed Kartaba
                </p>
                <p className="text-[10px] tracking-widest text-text-secondary/50 uppercase mt-1">
                  Paris — Alger
                </p>
              </div>
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                Ahmed Kartaba est auteur et réalisateur franco-algérien. Il travaille à l&rsquo;intersection de la narration, de l&rsquo;image et de la pensée islamique classique. Son œuvre écrite prolonge un travail de longue haleine sur la transmission — comment faire passer, dans la langue de ceux qui grandissent entre deux rives, ce que les maîtres du passé ont compris du cœur humain.
              </p>
              <p>
                Fondateur de <span className="text-text">KUNUZ ADIN Éditions</span>, il y porte un projet éditorial précis : ni vulgarisation approximative, ni érudition inaccessible. Des livres qui exigent du lecteur, sans le perdre. Des livres utiles, au sens fort du terme.
              </p>
              <p>
                Son ancrage intellectuel puise d&rsquo;abord chez <span className="text-text">Ibn al-Qayyim al-Jawziyya</span> (691–751 H.), dont l&rsquo;œuvre constitue l&rsquo;une des contributions les plus rigoureuses à la science de la purification du cœur (<em>tazkiyat al-nafs</em>). Et chez son maître, <span className="text-text">Ibn Taymiyya</span>, pour la méthode, la rigueur du retour aux sources, et le refus des compromis intellectuels.
              </p>
              <p>
                Ces figures ne sont pas des références de façade. Elles structurent une manière de lire, d&rsquo;écrire et de comprendre ce que l&rsquo;islam a à dire à l&rsquo;homme d&rsquo;aujourd&rsquo;hui — avec précision, sans condescendance.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-16 bg-gold-dark my-12" />

            {/* Pro background */}
            <div>
              <h2 className="font-display text-2xl text-text font-light mb-6">
                Parcours professionnel
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Avant de fonder KUNUZ ADIN Éditions, Ahmed Kartaba a exercé comme réalisateur et directeur de création dans des environnements exigeants — documentaire, publicité de prestige, contenus de marque. Ce parcours a forgé une discipline du récit, une attention au mot juste, et une exigence formelle que l&rsquo;on retrouve dans ses livres.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div
                    key={ref.name}
                    className="border border-border px-5 py-4 hover:border-gold-dark transition-colors duration-300"
                  >
                    <p className="text-text text-sm font-medium">{ref.name}</p>
                    <p className="text-text-secondary text-xs tracking-wide mt-0.5">
                      {ref.domain}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — influences */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-8">

            {/* Influences */}
            <div>
              <h2 className="font-display text-xl text-text font-light mb-6">
                Références intellectuelles
              </h2>
              <div className="flex flex-col gap-5">
                {influences.map((inf) => (
                  <div
                    key={inf.name}
                    className="border-l-2 border-gold-dark pl-5 py-1"
                  >
                    <p
                      className="font-arabic text-gold text-xl mb-1 text-right"
                      dir="rtl"
                      lang="ar"
                    >
                      {inf.arabic}
                    </p>
                    <p className="text-text text-sm font-medium mb-1">
                      {inf.name}
                    </p>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {inf.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editions info */}
            <div className="border border-border p-5">
              <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-4">
                KUNUZ ADIN Éditions
              </p>
              <p className="text-text-secondary text-xs leading-relaxed mb-4">
                Maison d&rsquo;édition islamique francophone. Fondée pour transmettre les trésors de la tradition islamique dans la langue de ses lecteurs.
              </p>
              <p
                className="font-arabic text-2xl text-gold text-right"
                dir="rtl"
                lang="ar"
              >
                كنوز الدين
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/livres"
              className="inline-flex items-center justify-center gap-2 border border-gold text-gold text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-gold/10 transition-colors duration-300"
            >
              Découvrir les livres →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
