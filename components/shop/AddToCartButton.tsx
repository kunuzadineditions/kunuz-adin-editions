"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Props {
  priceId: string;
  title: string;
  price: string;
  coverImage?: string;
  coverColor: string;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  priceId,
  title,
  price,
  coverImage,
  coverColor,
  quantity = 1,
  className,
}: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart({ priceId, title, price, coverImage, coverColor }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button onClick={handleClick} className={className}>
      {added ? (
        <span className="inline-flex items-center gap-2">
          <CheckIcon />
          Ajouté
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          <CartIcon />
          Ajouter au panier
        </span>
      )}
    </button>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
