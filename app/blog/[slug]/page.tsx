import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/content/blog/_index";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-secondary mb-14 tracking-widest uppercase">
          <Link href="/" className="hover:text-gold transition-colors duration-300">
            Accueil
          </Link>
          <span className="text-border">／</span>
          <Link href="/blog" className="hover:text-gold transition-colors duration-300">
            Blog
          </Link>
          <span className="text-border">／</span>
          <span className="text-text-secondary/50 truncate max-w-[140px]">{post.category}</span>
        </nav>

        {/* Article header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
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

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text font-light leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-text-secondary leading-relaxed text-base italic">
            {post.excerpt}
          </p>

          <div className="h-px w-16 bg-gold-dark mt-8" />
        </header>

        {/* MDX content */}
        <article>
          <Post />
        </article>

        {/* Footer nav */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/blog"
            className="text-xs tracking-widest text-text-secondary hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2"
          >
            ← Tous les articles
          </Link>
          <Link
            href="/livres"
            className="text-xs tracking-widest text-gold hover:text-gold-light uppercase transition-colors duration-300 inline-flex items-center gap-2"
          >
            Découvrir nos livres →
          </Link>
        </div>
      </div>
    </div>
  );
}
