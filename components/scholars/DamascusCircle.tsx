import Link from "next/link";
import type { Scholar } from "@/lib/scholars";

/** Max 3 words inside the circle; full name stays in the label below. */
function circleName(name: string): string {
  const words = name.split(" ");
  return words.length > 3 ? words.slice(0, 3).join(" ") : name;
}

function Medallion({ scholar, isRoot }: { scholar: Scholar; isRoot: boolean }) {
  const outer = isRoot ? 132 : 116;
  const inner = isRoot ? 116 : 100;
  const fontSize = isRoot ? 13 : 12;
  const ringSize = outer + 26; // 26px larger than outer on each axis
  const ringOffset = -13;      // (ringSize - outer) / 2

  return (
    <div className="flex flex-col items-center medallion-zoom">
      {/* Circle */}
      <div
        className="relative flex items-center justify-center rounded-full border border-gold/50 bg-bg hover:border-gold transition-colors duration-300"
        style={{ width: outer, height: outer }}
      >
        {/* Rotating ring — root only */}
        {isRoot && (
          <div
            className="ring-orbit absolute rounded-full pointer-events-none"
            style={{
              width: ringSize,
              height: ringSize,
              top: ringOffset,
              left: ringOffset,
            }}
            aria-hidden
          >
            <svg
              viewBox={`0 0 ${ringSize} ${ringSize}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
            >
              {/* The ring */}
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringSize / 2 - 1}
                stroke="rgba(201,168,76,0.38)"
                strokeWidth="0.9"
              />
              {/* Ornament dot at 12 o'clock */}
              <circle
                cx={ringSize / 2}
                cy="2"
                r="2.2"
                fill="rgba(201,168,76,0.65)"
              />
            </svg>
          </div>
        )}

        {/* Inner decorative ring */}
        <div
          className="absolute rounded-full border border-gold/20"
          style={{ width: inner, height: inner }}
        />

        {/* Name + ornament */}
        <div className="relative flex flex-col items-center gap-1 px-3 text-center z-10">
          <span className="text-gold/40 text-[8px]" aria-hidden>✦</span>
          <p
            className="font-display leading-snug text-gold"
            style={{ fontSize, maxWidth: inner - 16 }}
          >
            {circleName(scholar.name)}
          </p>
        </div>
      </div>

      {/* Label below */}
      <div className="mt-3 text-center" style={{ maxWidth: outer + 24 }}>
        {scholar.title && (
          <p className="text-[8px] tracking-[0.2em] text-gold-dark uppercase">
            {scholar.title}
          </p>
        )}
        {/* Show full name below the circle only if it was shortened */}
        {circleName(scholar.name) !== scholar.name && (
          <p className="text-[9px] text-gold/60 mt-0.5 font-display italic leading-tight">
            {scholar.name}
          </p>
        )}
        <p className="text-[9px] text-text-secondary/40 mt-0.5 leading-tight">
          {scholar.dates}
        </p>
      </div>
    </div>
  );
}

export default function DamascusCircle({ scholars }: { scholars: Scholar[] }) {
  const roots = scholars.filter((s) => !s.teacherSlug);

  function getStudents(slug: string): Scholar[] {
    return scholars.filter((s) => s.teacherSlug === slug);
  }

  return (
    <div className="mb-20">
      <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-12 text-center">
        Cercle de Damas
      </p>

      <div className="flex flex-col items-center">
        {roots.map((root) => {
          const students = getStudents(root.slug);

          return (
            <div key={root.slug} className="flex flex-col items-center w-full">
              {/* Root */}
              <Link href={`/aux-sources/${root.slug}`}>
                <Medallion scholar={root} isRoot />
              </Link>

              {students.length > 0 && (
                <>
                  {/* Stem down from root */}
                  <div className="w-px h-8 bg-gold/25" />

                  {/* Mobile: vertical rail */}
                  <div className="sm:hidden relative pl-12 self-start ml-[calc(50%-48px)]">
                    <div className="absolute left-0 top-0 bottom-6 w-px bg-gold/20" />
                    <div className="flex flex-col gap-10">
                      {students.map((student) => (
                        <div key={student.slug} className="relative">
                          <div className="absolute -left-12 top-14 w-12 h-px bg-gold/20" />
                          <Link href={`/aux-sources/${student.slug}`}>
                            <Medallion scholar={student} isRoot={false} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop: horizontal tree, wraps naturally */}
                  <div className="hidden sm:flex flex-wrap justify-center gap-x-10 gap-y-12 relative w-full max-w-3xl mx-auto">
                    {/* Horizontal connector — top of children area */}
                    {students.length > 1 && (
                      <div
                        className="absolute top-0 h-px bg-gold/25"
                        style={{
                          left: `${50 / students.length}%`,
                          right: `${50 / students.length}%`,
                        }}
                      />
                    )}
                    {students.map((student) => (
                      <div
                        key={student.slug}
                        className="flex flex-col items-center"
                        style={{ minWidth: 140 }}
                      >
                        <div className="w-px h-8 bg-gold/25" />
                        <Link href={`/aux-sources/${student.slug}`}>
                          <Medallion scholar={student} isRoot={false} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
