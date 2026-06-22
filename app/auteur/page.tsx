import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ahmed K. · Auteur",
  description:
    "Ahmed K., auteur et réalisateur audiovisuel, fondateur de KUNUZ ADIN ÉDITIONS. Auteur de la série Cœur Vivant.",
};

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
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Auteur</p>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-text font-light leading-tight mb-2">
            Ahmed K.
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
              style={{ background: "linear-gradient(160deg, #1A1510 0%, #0C0C0C 100%)" }}
            >
              <div>
                <div className="h-px w-8 bg-gold mb-3" />
                <p className="font-display text-text-secondary text-sm leading-snug">Ahmed K.</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                Ahmed K. est auteur et réalisateur audiovisuel, documentaire, publicité, contenus de marque.
                Dès 2010, il collabore avec plusieurs maisons d&rsquo;édition islamiques, prête sa voix à de
                nombreux livres audio, et réalise des vidéos pour des marques et promotions islamiques, dont
                il assure aussi la voix off, parmi les premiers à le faire sur YouTube. Cette expérience le
                mène ensuite vers de grandes marques internationales, télévision nationale, sport extrême,
                hôtellerie de luxe, innovation automobile, dont il raconte les histoires à travers le monde.
              </p>
              <p>
                Le cœur, sa purification, sa proximité avec Allah est au centre de sa vie depuis toujours,
                bien avant que la caméra ou le micro n&rsquo;entrent en scène. Depuis des années, il lit,
                apprend, approfondit, nourri par l&rsquo;enseignement des grands savants de l&rsquo;islam,
                Ibn al-Qayyim, Ibn Taymiyya et par ses études de psychologie islamique. Une quête patiente
                pour comprendre ce mal silencieux qui touche tant de musulmans pratiquants : le vide malgré
                la pratique, la lourdeur malgré le dhikr.
              </p>
              <p>
                De cette double expérience l&rsquo;art de raconter et l&rsquo;exigence de la science du
                cœur, est née la série <span className="text-text">Cœur Vivant</span>, et avec elle,{" "}
                <span className="text-text">KUNUZ ADIN ÉDITIONS</span>, la maison qu&rsquo;il a fondée.
              </p>
              <p>
                Ahmed K. écrit pour celles et ceux qui pratiquent sans que leur cœur ne s&rsquo;apaise
                avec une exigence constante : rester fidèle à la source, sans jamais la diluer.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-8">

            {/* Influences */}
            <div>
              <h2 className="font-display text-xl text-text font-light mb-6">
                Références intellectuelles
              </h2>
              <div className="flex flex-col gap-5">
                {influences.map((inf) => (
                  <div key={inf.name} className="border-l-2 border-gold-dark pl-5 py-1">
                    <p
                      className="font-arabic text-gold text-xl mb-1 text-right"
                      dir="rtl"
                      lang="ar"
                    >
                      {inf.arabic}
                    </p>
                    <p className="text-text text-sm font-medium mb-1">{inf.name}</p>
                    <p className="text-text-secondary text-xs leading-relaxed">{inf.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editions info */}
            <div className="border border-border p-5">
              <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-4">
                KUNUZ ADIN ÉDITIONS
              </p>
              <p className="text-text-secondary text-xs leading-relaxed mb-4">
                Maison d&rsquo;édition islamique francophone. Fondée pour transmettre les trésors
                de la tradition islamique dans la langue de ses lecteurs.
              </p>
              <p className="font-arabic text-2xl text-gold text-right" dir="rtl" lang="ar">
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
