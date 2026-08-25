import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "@/components/ui/ShareButton";

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
          <div className="flex items-center justify-between mt-8">
            <div className="h-px w-24 bg-gold-dark" />
            <ShareButton title="Ahmed K. · Auteur · KUNUZ ADIN Éditions" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-14 lg:gap-16 items-start">

          {/* Main bio */}
          <div>
            {/* Portrait */}
            <div
              className="relative w-full sm:w-72 aspect-[3/4] mb-10 overflow-hidden"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.2), 6px 10px 32px rgba(0,0,0,0.6)",
              }}
            >
              <Image
                src="/images/covers/Ahmed-K.jpg"
                alt="Ahmed K., auteur"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 288px"
                priority
              />
            </div>

            {/* Bio */}
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                Depuis l&rsquo;enfance, Ahmed K. évolue dans le monde de l&rsquo;audio et du son, dont
                il maîtrise l&rsquo;écriture, la voix et la technique et l&rsquo;ingénierie du son. Ce
                socle nourrit tout son parcours. Devenu auteur et réalisateur audiovisuel, il œuvre dans
                le documentaire, la publicité et les contenus de marque.
              </p>
              <p>
                Dès 2010, il collabore avec plusieurs maisons d&rsquo;édition islamiques et prête sa
                voix à de nombreux livres audio. Il est l&rsquo;un des premiers francophones à assurer
                la voix off de vidéos islamiques, à une époque où le format émergeait à peine, et réalise
                et participe à des séries connues diffusées sur YouTube et Dailymotion. On lui doit le
                premier livre audio islamique francophone vendu en édition.
              </p>
              <p>
                Au fil des années, son travail le mène à travers le monde et vers de grandes marques
                internationales et des univers variés : télévision nationale, sport extrême, hôtellerie
                de luxe, innovation automobile. Il réalise courts métrages, films institutionnels,
                documentaires et podcasts, pour des maisons d&rsquo;édition, des ONG internationales,
                des marques et la télévision. Plus tard, il initie un projet de livres audio et
                d&rsquo;histoires pour enfants, dont il conçoit l&rsquo;idée avant d&rsquo;en
                accompagner la réalisation, sans jamais cesser de réaliser films et séries. Un même fil
                conducteur relie tout son travail : l&rsquo;art de raconter des histoires qui touchent.
              </p>
              <p>
                En parallèle, le cœur, sa purification, sa proximité avec Allah, est au centre de sa
                vie depuis toujours, bien avant que la caméra ou le micro n&rsquo;entrent en scène.
                Depuis des années, il lit, étudie et approfondit, nourri par l&rsquo;enseignement des
                grands savants de l&rsquo;islam, Ibn al-Qayyim, Ibn Taymiyya, par des cours de
                psychologie islamique suivis en institut, et par ce qu&rsquo;il a appris auprès des
                gens de science. Une quête patiente, personnelle et exigeante, pour comprendre ce mal
                silencieux qui touche tant de musulmans pratiquants : le vide malgré la pratique, la
                lourdeur malgré le dhikr.
              </p>
              <p>
                De cette double expérience, l&rsquo;art de raconter et l&rsquo;exigence de la science
                du cœur, est née la série{" "}
                <span className="text-text">Cœur Vivant</span>, et avec elle{" "}
                <span className="text-text">KUNUZ ADIN ÉDITIONS</span>, la maison qu&rsquo;il a fondée.
                Aujourd&rsquo;hui encore, il souhaite porter de beaux projets audiovisuels à travers{" "}
                <span className="text-text">KUNUZ ADIN ÉDITIONS</span>.
              </p>
              <p>
                Ahmed K. écrit pour celles et ceux qui pratiquent sans que leur cœur ne s&rsquo;apaise,
                avec une exigence constante : rester fidèle à la source, sans jamais la diluer.
              </p>
            </div>

            {/* Encart partenariat */}
            <div className="mt-12 border border-gold/30 bg-gold/5 p-6 sm:p-8">
              <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-4">
                Un projet à raconter&nbsp;?
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                KUNUZ ADIN ÉDITIONS est ouverte aux collaborations audiovisuelles : films,
                documentaires, livres audio, contenus de marque. Si vous portez un projet ou souhaitez
                explorer un partenariat, écrivez-nous pour en savoir plus.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gold text-gold text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-gold/10 transition-colors duration-300"
              >
                Nous contacter
              </Link>
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
