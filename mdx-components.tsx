import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className="font-display text-4xl sm:text-5xl text-text font-light leading-tight mt-16 mb-6 first:mt-0"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="font-display text-2xl sm:text-3xl text-text font-light leading-snug mt-14 mb-5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-display text-xl text-gold font-normal tracking-wide mt-10 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-text-secondary leading-loose text-base mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold pl-6 my-8 space-y-3">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="text-text font-medium">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-text-secondary italic">{children}</em>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold-dark transition-colors duration-300"
      >
        {children}
      </Link>
    ),
    hr: () => (
      <div className="flex items-center justify-center gap-4 my-14">
        <div className="h-px w-12 bg-gold-dark" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="h-px w-12 bg-gold-dark" />
      </div>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2 mb-6 pl-5">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2 mb-6 pl-5 list-decimal marker:text-gold-dark">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-text-secondary leading-relaxed text-base relative before:absolute before:-left-4 before:top-2.5 before:w-1.5 before:h-px before:bg-gold-dark [ol_&]:before:hidden">
        {children}
      </li>
    ),
    ...components,
  };
}
