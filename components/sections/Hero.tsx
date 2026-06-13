import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top ornament */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
      </div>

      {/* Arabic title */}
      <h1
        className="font-arabic text-5xl sm:text-6xl md:text-7xl text-gold text-center leading-relaxed mb-4"
        dir="rtl"
        lang="ar"
      >
        كنوز الدين
      </h1>

      {/* Latin brand name */}
      <p className="font-display text-sm sm:text-base tracking-[0.4em] text-text-secondary uppercase text-center mb-8">
        KUNUZ ADIN ÉDITIONS
      </p>

      {/* Thin divider */}
      <div className="h-px w-24 bg-gold-dark mb-10" />

      {/* Tagline */}
      <p className="font-display text-2xl sm:text-3xl md:text-4xl text-text text-center max-w-xl leading-snug font-light italic mb-14">
        Des livres qui nourrissent le cœur
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/livres"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-bg text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300 min-w-[200px]"
        >
          Découvrir nos livres
        </Link>
        <Link
          href="/auteur"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-gold text-gold text-sm tracking-widest uppercase font-medium hover:bg-gold/10 transition-colors duration-300 min-w-[200px]"
        >
          Notre histoire
        </Link>
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center gap-4 mt-16">
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="h-px w-16 sm:w-24 bg-gold-dark" />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] tracking-[0.3em] text-text-secondary uppercase">
          Défiler
        </span>
        <div className="w-px h-8 bg-gold-dark animate-pulse" />
      </div>
    </section>
  );
}
