"use client";

import { useEffect, useRef } from "react";
import type { TimelineEntry } from "@/lib/scholars";

export default function ScholarTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  if (!timeline || timeline.length === 0) return null;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll<HTMLElement>("[data-entry]");
    if (!items) return;

    const observer = new IntersectionObserver(
      (observations) => {
        observations.forEach((obs) => {
          if (obs.isIntersecting) {
            (obs.target as HTMLElement).style.opacity = "1";
            (obs.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(obs.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-10">
        <p className="text-[10px] tracking-[0.25em] text-gold uppercase whitespace-nowrap">
          Son histoire
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div ref={containerRef} className="relative">
        {/* Ligne verticale dorée */}
        <div
          className="absolute top-3 bottom-3 w-px bg-gold/20"
          style={{ left: "7px" }}
          aria-hidden
        />

        <div className="flex flex-col gap-10">
          {timeline.map((entry, i) => (
            <div
              key={i}
              data-entry
              className="relative pl-9"
              style={{
                opacity: 0,
                transform: "translateY(14px)",
                transition: `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`,
              }}
            >
              {/* Point doré */}
              <span
                className="absolute top-[5px] flex items-center justify-center w-[15px] h-[15px] rounded-full border border-gold/50 bg-bg"
                style={{ left: 0 }}
                aria-hidden
              >
                <span className="w-[5px] h-[5px] rounded-full bg-gold" />
              </span>

              {/* Année */}
              <p className="font-display text-xl text-gold leading-none mb-2">
                {entry.year}
              </p>

              {/* Texte */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
