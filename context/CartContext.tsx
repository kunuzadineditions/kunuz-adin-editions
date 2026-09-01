"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type CartItem = {
  priceId: string;
  title: string;
  price: string;       // "26,50 €"
  priceAmount: number; // 26.50
  quantity: number;
  coverImage?: string;
  coverColor: string;
};

type AddPayload = Omit<CartItem, "quantity" | "priceAmount">;

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: AddPayload, quantity?: number) => void;
  removeFromCart: (priceId: string) => void;
  updateQuantity: (priceId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function parseAmount(price: string): number {
  return parseFloat(price.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

const STORAGE_KEY = "kunuz-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items,  setItems]  = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Rehydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const openCart  = useCallback(() => setIsOpen(true),  []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback((payload: AddPayload, quantity = 1) => {
    const priceAmount = parseAmount(payload.price);
    setItems((prev) => {
      const existing = prev.find((i) => i.priceId === payload.priceId);
      if (existing) {
        return prev.map((i) =>
          i.priceId === payload.priceId
            ? { ...i, quantity: Math.min(10, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { ...payload, priceAmount, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((priceId: string) => {
    setItems((prev) => prev.filter((i) => i.priceId !== priceId));
  }, []);

  const updateQuantity = useCallback((priceId: string, quantity: number) => {
    const q = Math.min(10, Math.max(1, quantity));
    setItems((prev) =>
      prev.map((i) => (i.priceId === priceId ? { ...i, quantity: q } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = items.reduce((sum, i) => sum + i.priceAmount * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
