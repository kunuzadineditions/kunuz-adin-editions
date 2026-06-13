import Link from "next/link";

export default function CoeurVivant() {
  return (
    <section className="py-24 px-4 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-5">
              Série
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-text font-light leading-tight mb-2">
              Cœur Vivant
            </h2>
            <p
              className="font-arabic text-2xl text-gold-dark mb-8"
              dir="rtl"
              lang="ar"
            >
              القلب الحيّ
            </p>

            <p className="text-text-secondary leading-relaxed mb-5">
              Une collection dédiée à la médecine des cœurs — l&rsquo;une des sciences les plus nobles et les plus négligées de la tradition islamique. Chaque titre de cette série accompagne le lecteur dans le travail intérieur sur lui-même.
            </p>
            <p className="text-text-secondary leading-relaxed mb-10">
              Carnets de pratique, essais de fond, textes traduits des maîtres : la série Cœur Vivant est un programme complet pour qui veut revenir à l&rsquo;essentiel.
            </p>

            <Link
              href="/series/coeur-vivant"
              className="inline-flex items-center gap-3 text-sm tracking-widest text-gold uppercase hover:text-gold-light transition-colors duration-300"
            >
              Découvrir la série
              <span aria-hidden className="text-gold-dark">→</span>
            </Link>
          </div>

          {/* Visual accent */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-56 h-72">
              {/* Stacked book silhouettes */}
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 border border-gold-dark"
                style={{ backgroundColor: "#0E1210" }}
              />
              <div
                className="absolute inset-0 translate-x-2 translate-y-2 border border-gold-dark/50"
                style={{ backgroundColor: "#111410" }}
              />
              <div
                className="absolute inset-0 border border-gold/30 flex flex-col items-center justify-center gap-4 p-6"
                style={{ backgroundColor: "#13100A" }}
              >
                <div className="h-px w-10 bg-gold" />
                <p
                  className="font-arabic text-3xl text-gold text-center leading-relaxed"
                  dir="rtl"
                  lang="ar"
                >
                  القلب الحيّ
                </p>
                <p className="font-display text-xs tracking-[0.25em] text-gold-dark uppercase text-center">
                  Cœur Vivant
                </p>
                <div className="h-px w-10 bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
