"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/shop/AddToCartButton";

interface PurchaseLinkProps {
  label: string;
  sublabel: string;
  url: string;
  stripePrice?: string;
}

interface BookCardProps {
  slug: string;
  title: string;
  price: string;
  seriesLabel: string | null;
  companion?: string;
  summaryShort: string;
  coverColor: string;
  coverImage?: string;
  primaryLink: PurchaseLinkProps;
  secondaryLink?: PurchaseLinkProps;
}

export default function BookCard({
  slug,
  title,
  price,
  seriesLabel,
  companion,
  summaryShort,
  coverColor,
  coverImage,
  primaryLink,
  secondaryLink,
}: BookCardProps) {
  const [quantity, setQuantity] = useState(1);

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(10, q + 1));

  return (
    <article className="flex flex-col sm:flex-row gap-8 border border-border p-6 sm:p-8 hover:border-gold-dark transition-colors duration-500">
      {/* Cover */}
      <div
        className="relative flex-shrink-0 w-full sm:w-32 aspect-[3/4] sm:aspect-auto sm:h-44 overflow-hidden flex flex-col items-center justify-center text-center p-4"
        style={{
          backgroundColor: coverColor,
          boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.15), 4px 6px 24px rgba(0,0,0,0.6)",
        }}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 128px"
          />
        ) : (
          <>
            <div className="h-px w-8 bg-gold mb-3" />
            <p className="font-display text-gold text-sm leading-snug">{title}</p>
            <div className="h-px w-8 bg-gold mt-3" />
          </>
        )}
      </div>

      {/* Info + CTAs */}
      <div className="flex flex-col justify-between flex-1 min-w-0 gap-6">
        <div>
          {seriesLabel && (
            <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-1">
              {seriesLabel}
            </p>
          )}
          <Link href={`/livres/${slug}`}>
            <h2 className="font-display text-xl sm:text-2xl text-text leading-snug hover:text-gold transition-colors duration-300 mb-1">
              {title}
            </h2>
          </Link>
          {companion && (
            <p className="text-[11px] text-text-secondary/60 italic mb-2">
              Compagnon du livre {companion}
            </p>
          )}
          <p className="font-display text-2xl text-gold mb-3">{price}</p>
          <p className="text-text-secondary text-sm leading-relaxed max-w-lg">
            {summaryShort}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Quantity selector — only when Stripe is available */}
          {primaryLink.stripePrice && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.2em] text-text-secondary/60 uppercase">
                Qté
              </span>
              <div className="flex items-center border border-border">
                <button
                  onClick={dec}
                  disabled={quantity <= 1}
                  aria-label="Diminuer la quantité"
                  className="w-8 h-8 flex items-center justify-center text-gold-dark hover:text-gold hover:bg-gold/5 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm text-text tabular-nums select-none">
                  {quantity}
                </span>
                <button
                  onClick={inc}
                  disabled={quantity >= 10}
                  aria-label="Augmenter la quantité"
                  className="w-8 h-8 flex items-center justify-center text-gold-dark hover:text-gold hover:bg-gold/5 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {primaryLink.stripePrice ? (
              <AddToCartButton
                priceId={primaryLink.stripePrice}
                title={title}
                price={price}
                coverImage={coverImage}
                coverColor={coverColor}
                quantity={quantity}
                className="inline-flex items-center justify-center gap-2 bg-gold text-bg text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-light transition-colors duration-300"
              />
            ) : (
              <a
                href={primaryLink.url}
                {...(primaryLink.url !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-flex items-center justify-center gap-2 bg-gold text-bg text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-light transition-colors duration-300"
              >
                {primaryLink.label} — {primaryLink.sublabel}
                <ArrowIcon />
              </a>
            )}

            {secondaryLink && (
              <a
                href={secondaryLink.url}
                {...(secondaryLink.url !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-flex items-center justify-center gap-2 border border-border text-text-secondary text-xs tracking-widest uppercase px-6 py-3 hover:border-gold-dark hover:text-gold transition-colors duration-300"
              >
                {secondaryLink.label} — {secondaryLink.sublabel}
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
