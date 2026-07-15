import type { Metadata } from "next";
import PreventeClient from "./PreventeClient";

export const metadata: Metadata = {
  title: "Prévente — Première impression limitée",
  description:
    "Réservez \"Tu pries, mais tu ne t'apaises pas\" et le Carnet de cheminement Cœur Vivant à -20% pour les 100 premiers exemplaires de chaque titre. Sans paiement, expédition mi-août in shâ Allah.",
  openGraph: {
    title: "Prévente — KUNUZ ADIN ÉDITIONS",
    description:
      "100 premiers exemplaires de chaque titre à -20%. Réservation sans paiement.",
    images: ["/images/covers/tu-pries-cover.jpg"],
  },
};

export default function PreventePage() {
  return <PreventeClient />;
}
