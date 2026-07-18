import type { Metadata } from "next";
import RetractationClient from "./RetractationClient";

export const metadata: Metadata = {
  title: "Droit de rétractation — KUNUZ ADIN ÉDITIONS",
  description:
    "Exercez votre droit de rétractation en ligne. Formulaire gratuit et accessible pour annuler un achat dans les 14 jours suivant la réception.",
};

export default function RetractationPage() {
  return <RetractationClient />;
}
