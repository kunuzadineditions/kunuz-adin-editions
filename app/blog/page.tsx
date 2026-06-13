import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog/_index";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles de KUNUZ ADIN Éditions sur la psychologie du cœur, la spiritualité islamique et la tradition classique.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-18">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              Réflexions
            </p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Blog
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-lg">
            Articles sur la psychologie du cœur, la tradition islamique classique et la vie spirituelle en contexte contemporain.
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8 mb-16" />
        </div>

        {/* Post list */}
        <div className="flex flex-col divide-y divide-border">
          {sorted.map((post) => (
            <article key={post.slug} className="group py-10 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.25em] text-gold uppercase">
                    {post.category}
                  </span>
                  <span className="text-border">·</span>
                  <time
                    dateTime={post.date}
                    className="text-[10px] tracking-widest text-text-secondary/60 uppercase"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="text-border">·</span>
                  <span className="text-[10px] tracking-widest text-text-secondary/60 uppercase">
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl text-text font-light leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <span className="text-xs tracking-widest text-gold-dark group-hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2">
                  Lire l&rsquo;article
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
