export type PurchaseLink = {
  label: string;
  sublabel: string;
  url: string;
  icon: "book" | "kindle" | "audio";
};

export type Book = {
  slug: string;
  title: string;
  series: string | null;
  seriesLabel: string | null;
  price: string;
  summaryShort: string;
  summaryLong: string[];
  purchaseLinks: PurchaseLink[];
  isbn: string;
  format: string;
  pages: number;
  coverColor: string;
};

export const books: Book[] = [
  {
    slug: "tu-pries-mais-tu-ne-tapaises-pas",
    title: "Tu pries mais tu ne t'apaises pas",
    series: "coeur-vivant",
    seriesLabel: "Cœur Vivant",
    price: "26,50 €",
    summaryShort:
      "Une exploration profonde du paradoxe de la prière sans paix intérieure. Pourquoi le cœur reste-t-il agité malgré la salah ? Un livre qui interroge la présence, la sincérité et la guérison par l'acte d'adoration.",
    summaryLong: [
      "Tu pries. Cinq fois par jour, tu te prosternes. Tu récites. Et pourtant, à peine le salam prononcé, l'angoisse revient. Le cœur ne s'est pas apaisé.",
      "Ce livre part de ce paradoxe vécu par des milliers de musulmans francophones : la prière est là, mais la paix intérieure reste absente. Pourquoi ? Que nous enseigne cette distance entre l'acte extérieur et l'état intérieur ?",
      "En puisant dans les écrits d'Ibn al-Qayyim al-Jawziyya, maître incontesté de la médecine des cœurs, l'auteur explore les conditions de la présence (khushū'), les obstacles que nous portons sans les nommer, et le chemin d'un retour au cœur vivant.",
      "Un essai à la fois ancré dans la tradition et adressé à notre époque : pour ceux qui prient et cherchent encore.",
    ],
    purchaseLinks: [
      { label: "Commander", sublabel: "Broché — Amazon", url: "#", icon: "book" },
      { label: "Lire", sublabel: "Kindle — Amazon", url: "#", icon: "kindle" },
      { label: "Écouter", sublabel: "INaudio", url: "#", icon: "audio" },
    ],
    isbn: "978-2-XXXXX-XX-X",
    format: "14 × 21,6 cm (5,5 × 8,5 in) — Broché",
    pages: 224,
    coverColor: "#13100A",
  },
  {
    slug: "carnet-coeur-vivant",
    title: "Carnet Cœur Vivant",
    series: "coeur-vivant",
    seriesLabel: "Cœur Vivant",
    price: "16,90 €",
    summaryShort:
      "Un carnet de travail spirituel conçu pour accompagner la purification du cœur au quotidien. Réflexions guidées, espaces d'écriture et extraits des maîtres de la tradition islamique.",
    summaryLong: [
      "Le Carnet Cœur Vivant est un outil de travail intérieur. Pas un journal intime — un espace structuré pour observer, questionner et transformer.",
      "Conçu comme compagnon de la série Cœur Vivant, il propose des réflexions guidées, des extraits commentés des maîtres classiques, et des espaces d'écriture pour ancrer le travail dans le quotidien.",
      "Chaque double page invite le lecteur à s'arrêter : sur une notion de tazkiyya, un verset, une parole de sagesse. Puis à écrire — ce qu'il observe dans son cœur, ce qu'il veut changer, ce qu'il demande.",
      "Un objet à tenir dans les mains, à annoter, à reprendre. Pour que le travail sur soi ne reste pas une intention.",
    ],
    purchaseLinks: [
      { label: "Commander", sublabel: "Broché — Amazon", url: "#", icon: "book" },
      { label: "Lire", sublabel: "Kindle — Amazon", url: "#", icon: "kindle" },
      { label: "Écouter", sublabel: "INaudio", url: "#", icon: "audio" },
    ],
    isbn: "978-2-XXXXX-XX-X",
    format: "14 × 21,6 cm (5,5 × 8,5 in) — Broché",
    pages: 128,
    coverColor: "#0E1210",
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export type SeriesMeta = {
  slug: string;
  label: string;
  arabic: string;
  tagline: string;
  description: string[];
  theme: string;
};

export const seriesMeta: SeriesMeta[] = [
  {
    slug: "coeur-vivant",
    label: "Cœur Vivant",
    arabic: "القلب الحيّ",
    tagline: "La science du cœur pour ceux qui cherchent encore.",
    description: [
      "La série Cœur Vivant est née d'un constat simple : parmi toutes les sciences de l'islam, celle du cœur — tazkiyat al-nafs, médecine des âmes — est à la fois la plus fondamentale et la plus négligée dans la production francophone contemporaine.",
      "Chaque titre de la collection aborde un aspect de ce travail intérieur : la prière et la présence, les maladies du cœur et leurs remèdes, l'attachement aux créatures, la contemplation, la gratitude. Des thèmes traités par les maîtres classiques avec une précision que nous cherchons à restituer dans une langue accessible.",
      "La série se compose d'essais de fond et de carnets de pratique, conçus pour se compléter. Lire et faire. Comprendre et agir. C'est la même exigence.",
    ],
    theme: "Tazkiyat al-nafs — purification du cœur",
  },
];

export function getSeriesBySlug(slug: string): SeriesMeta | undefined {
  return seriesMeta.find((s) => s.slug === slug);
}

export function getBooksBySeries(slug: string): Book[] {
  return books.filter((b) => b.series === slug);
}

export const series: Record<string, string> = {
  "coeur-vivant": "Cœur Vivant",
};
