import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KUNUZ ADIN Éditions",
    template: "%s · KUNUZ ADIN Éditions",
  },
  description:
    "Maison d'édition islamique francophone fondée par Ahmed K. Livres, séries et ressources pour la communauté musulmane francophone.",
  keywords: ["islam", "livres islamiques", "éditions", "francophone", "kunuz adin"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} ${amiri.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
