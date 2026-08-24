import Link from "next/link";
import type { Scholar } from "@/lib/scholars";

function Medallion({ scholar, isRoot }: { scholar: Scholar; isRoot: boolean }) {
  const outer = isRoot ? 120 : 96;
  const inner = isRoot ? 104 : 80;

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div
        className="relative flex items-center justify-center rounded-full border border-gold/50 bg-bg group-hover:border-gold transition-colors duration-300"
        style={{ width: outer, height: outer }}
      >
        <div
          className="absolute rounded-full border border-gold/20"
          style={{ width: inner, height: inner }}
        />
        <div className="relative flex flex-col items-center gap-1 px-3 text-center z-10">
          <span className="text-gold/35 text-[7px]" aria-hidden>✦</span>
          <p
            className="font-display leading-tight text-gold"
            style={{ fontSize: isRoot ? 10 : 9 }}
          >
            {scholar.name}
          </p>
        </div>
      </div>
      <div className="mt-3 text-center" style={{ maxWidth: outer + 24 }}>
        {scholar.title && (
          <p className="text-[8px] tracking-[0.2em] text-gold-dark uppercase">
            {scholar.title}
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

                  {/* Mobile: vertical list with left rail */}
                  <div className="sm:hidden relative pl-12 self-start ml-[calc(50%-48px)]">
                    <div className="absolute left-0 top-0 bottom-6 w-px bg-gold/20" />
                    <div className="flex flex-col gap-8">
                      {students.map((student) => (
                        <div key={student.slug} className="relative">
                          <div className="absolute -left-12 top-12 w-12 h-px bg-gold/20" />
                          <Link href={`/aux-sources/${student.slug}`}>
                            <Medallion scholar={student} isRoot={false} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop: horizontal tree */}
                  <div className="hidden sm:flex relative w-full max-w-2xl mx-auto">
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
                        className="flex-1 flex flex-col items-center"
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
