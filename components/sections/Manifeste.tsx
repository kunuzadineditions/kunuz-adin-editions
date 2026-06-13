export default function Manifeste() {
  return (
    <section className="py-28 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-gold-dark" />
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Notre identité
          </p>
          <div className="h-px w-12 bg-gold-dark" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-text font-light mb-10 leading-snug">
          Manifeste éditorial
        </h2>

        {/* Quote Ibn al-Qayyim */}
        <blockquote className="relative mb-10">
          <div
            className="text-gold-dark/30 font-display text-8xl leading-none absolute -top-6 left-0 select-none"
            aria-hidden
          >
            &ldquo;
          </div>
          <p
            className="font-arabic text-xl sm:text-2xl text-gold leading-loose relative z-10 px-4"
            dir="rtl"
            lang="ar"
          >
            إن في القلب شعثاً لا يلمّه إلا الإقبال على الله
          </p>
          <footer className="mt-4 text-xs tracking-widest text-text-secondary uppercase">
            — Ibn al-Qayyim al-Jawziyya
          </footer>
        </blockquote>

        <div className="h-px w-16 bg-gold-dark mx-auto mb-10" />

        {/* Body */}
        <div className="space-y-5 text-text-secondary leading-relaxed text-left sm:text-center">
          <p>
            KUNUZ ADIN Éditions naît d&rsquo;une conviction simple : la communauté musulmane francophone mérite des livres qui la rejoignent là où elle est, dans sa langue, avec ses questions, sans compromis sur la rigueur du fond.
          </p>
          <p>
            Nous puisons aux sources de la tradition islamique — les maîtres du cœur, les savants de l&rsquo;âme, les héritiers de la révélation — pour en offrir les trésors dans une langue vivante et accessible.
          </p>
          <p className="font-display text-lg sm:text-xl text-text italic">
            Kunuz Adin : les trésors de la religion. Un nom, une promesse.
          </p>
        </div>
      </div>
    </section>
  );
}
