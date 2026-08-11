"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  coverColor: string;
}

export default function BookGallery({ images, title, coverColor }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-52 lg:w-full max-w-[280px] flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative w-full aspect-[3/4] overflow-hidden"
        style={{
          backgroundColor: coverColor,
          boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.15), 8px 12px 40px rgba(0,0,0,0.7)",
        }}
      >
        <Image
          src={images[active]}
          alt={active === 0 ? title : `${title} — image ${active + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 208px, 280px"
          priority={active === 0}
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
              className={`relative flex-shrink-0 w-11 h-[58px] overflow-hidden transition-opacity duration-200 outline-none ${
                i === active
                  ? "ring-1 ring-gold opacity-100"
                  : "ring-1 ring-border opacity-40 hover:opacity-70"
              }`}
              style={{ backgroundColor: coverColor }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
                sizes="44px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
