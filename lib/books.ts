export type PurchaseLink = {
  label: string;
  sublabel: string;
  url: string;
  icon: "book" | "kindle" | "audio";
  primary?: boolean;
  stripePrice?: string;
};

export type Book = {
  slug: string;
  title: string;
  companion?: string;
  series: string | null;
  seriesLabel: string | null;
  price: string;
  originalPrice?: string;
  detailPage?: boolean;
  isBundle?: boolean;
  summaryShort: string;
  summaryLong: string[];
  purchaseLinks: PurchaseLink[];
  isbn: string;
  format: string;
  pages: number;
  coverColor: string;
  coverImage?: string;
  galleryImages?: string[];
  extractPdf?: string;
  flipbookPages?: string[];
};

export const books: Book[] = [
  {
    slug: "tu-pries-mais-tu-ne-tapaises-pas",
    title: "Tu pries mais tu ne t'apaises pas",
    series: "coeur-vivant",
    seriesLabel: "Cœur Vivant",
    price: "26,50 €",
    summaryShort:
      "Il y a 1400 ans, le Prophète ﷺ a décrit exactement ce que tu vis. Le vide malgré la pratique. La lourdeur malgré le dhikr. Ce que la tradition islamique a toujours su guérir, et que nous avons oublié. Le remède existe. Il t'attend.",
    summaryLong: [
      "Il y a plus de 1400 ans, le Messager d'Allah ﷺ a décrit exactement ce que tu vis aujourd'hui.",
      "Des musulmans qui prient, qui jeûnent, qui pratiquent mais dont les cœurs ne s'apaisent plus. Une génération entière qui fait tout en apparence, mais qui porte en silence un poids que personne ne nomme : l'anxiété malgré la foi, le vide malgré la pratique, la lourdeur malgré le dhikr. On pratique plus que jamais. On consomme du contenu islamique à n'en plus finir. Et pourtant le cœur reste lourd, fermé, absent à lui-même.",
      "Ce n'est pas ta faiblesse. C'est une époque prophétisée.",
      "Et les savants de l'islam ont laissé à ceux qui viendraient après eux le diagnostic précis de ce mal et son remède. Ce remède a guéri des cœurs pendant des siècles, à Damas, à Bagdad, en Andalousie. Cette même médecine peut guérir le tien aujourd'hui. Parce que le cœur humain n'a pas changé. Ses maladies non plus. Et c'est vers Allah seul que les cœurs trouvent leur apaisement.",
      "Ce livre ne fait pas le grand écart entre l'islam et les méthodes contemporaines. Il ne rebaptise rien. Il ne réconcilie rien. Il revient simplement à ce que les savants ont toujours enseigné sur le cœur, cette science que beaucoup ont délaissée pour des raccourcis qui promettent beaucoup et guérissent peu.",
    ],
    purchaseLinks: [
      {
        label: "Commander", sublabel: "Relié", url: "#", icon: "book", primary: true,
        stripePrice: process.env.STRIPE_PRICE_LIVRE1,
      },
      { label: "Commander", sublabel: "Broché · Amazon", url: "https://www.amazon.fr/dp/2489151002", icon: "book" },
    ],
    isbn: "978-2-489151-00-8",
    format: "148 × 210 mm",
    pages: 278,
    coverColor: "#13100A",
    coverImage: "/images/covers/tu-pries-cover.jpg",
    galleryImages: [
      "/images/covers/tu-pries-cover.jpg",
      "/images/tu-pries/1.jpg",
      "/images/tu-pries/2.png",
      "/images/tu-pries/3.png",
      "/images/tu-pries/4.png",
      "/images/tu-pries/5.png",
      "/images/tu-pries/6.png",
      "/images/tu-pries/7.jpeg",
      "/images/tu-pries/8.png",
    ],
    extractPdf: "/extraits/extrait-tu-pries.pdf",
    flipbookPages: Array.from({ length: 20 }, (_, i) =>
      `/extraits/pages/page-${String(i + 1).padStart(2, "0")}.jpg`
    ),
  },
  {
    slug: "carnet-coeur-vivant",
    title: "Carnet de cheminement Cœur Vivant",
    companion: "Tu pries mais tu ne t'apaises pas",
    series: "coeur-vivant",
    seriesLabel: "Cœur Vivant",
    price: "16,90 €",
    summaryShort:
      "Un carnet de travail spirituel conçu pour accompagner la purification du cœur au quotidien. Réflexions guidées, espaces d'écriture et extraits des maîtres de la tradition islamique.",
    summaryLong: [
      "Le Carnet de cheminement Cœur Vivant est un outil de travail intérieur. Pas un journal intime, mais un espace structuré pour observer, questionner et transformer.",
      "Conçu comme compagnon de la série Cœur Vivant, il propose des réflexions guidées, des extraits commentés des maîtres classiques, et des espaces d'écriture pour ancrer le travail dans le quotidien.",
      "Chaque double page invite le lecteur à s'arrêter : sur une notion de tazkiyya, un verset, une parole de sagesse. Puis à écrire : ce qu'il observe dans son cœur, ce qu'il veut changer, ce qu'il demande.",
      "Un objet à tenir dans les mains, à annoter, à reprendre. Pour que le travail sur soi ne reste pas une intention.",
    ],
    purchaseLinks: [
      {
        label: "Commander", sublabel: "Broché", url: "#", icon: "book", primary: true,
        stripePrice: process.env.STRIPE_PRICE_CARNET,
      },
      { label: "Commander", sublabel: "Broché · Amazon", url: "#", icon: "book" },
    ],
    isbn: "978-2-489151-01-5",
    format: "152 × 228 mm",
    pages: 181,
    coverColor: "#0E1210",
    coverImage: "/images/covers/carnet-cover.jpg",
    galleryImages: [
      "/images/covers/carnet-cover.jpg",
      "/images/coeur/1.png",
      "/images/coeur/2.jpeg",
      "/images/coeur/3.png",
      "/images/coeur/4.png",
      "/images/coeur/5.png",
      "/images/coeur/6.png",
      "/images/coeur/7.png",
      "/images/coeur/8.png",
      "/images/coeur/9.jpeg",
      "/images/coeur/10.png",
    ],
  },
  {
    slug: "pack-livre-carnet",
    title: "Pack Fondateur",
    series: "coeur-vivant",
    seriesLabel: "Cœur Vivant",
    price: "30 €",
    isBundle: true,
    summaryShort:
      "Le livre Tu pries, mais tu ne t'apaises pas et le carnet de cheminement Cœur Vivant, réunis pour comprendre puis avancer.",
    summaryLong: [
      "Le Pack réunit le livre Tu pries, mais tu ne t'apaises pas et le carnet de cheminement Cœur Vivant, pour un accompagnement complet.",
      "Le livre pose le diagnostic et propose le remède, issu de la tradition islamique. Le carnet de cheminement offre l'espace pour ancrer ce travail au quotidien : réflexions guidées, extraits commentés des maîtres classiques, espaces d'écriture pour observer et transformer.",
    ],
    purchaseLinks: [
      {
        label: "Commander", sublabel: "Pack complet", url: "#", icon: "book", primary: true,
        stripePrice: process.env.STRIPE_PRICE_PACK,
      },
    ],
    isbn: "",
    format: "",
    pages: 0,
    coverColor: "#0D0C08",
    coverImage: "/images/covers/pack-cover.jpg",
    galleryImages: [
      "/images/covers/pack-cover.jpg",
      "/images/pack-fondateur/1.jpeg",
      "/images/pack-fondateur/2.png",
      "/images/pack-fondateur/3.png",
      "/images/pack-fondateur/4.png",
      "/images/pack-fondateur/5.png",
      "/images/pack-fondateur/6.png",
      "/images/pack-fondateur/7.png",
      "/images/pack-fondateur/8.png",
      "/images/pack-fondateur/9.png",
      "/images/pack-fondateur/10.png",
      "/images/pack-fondateur/11.png",
      "/images/pack-fondateur/12.jpeg",
      "/images/pack-fondateur/13.png",
    ],
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
      "La série Cœur Vivant est née d'un constat simple : parmi toutes les sciences de l'islam, celle du cœur, tazkiyat al-nafs (médecine des âmes), est à la fois la plus fondamentale et la plus négligée dans la production francophone contemporaine.",
      "Chaque titre de la collection aborde un aspect de ce travail intérieur : la prière et la présence, les maladies du cœur et leurs remèdes, l'attachement aux créatures, la contemplation, la gratitude. Des thèmes traités par les maîtres classiques avec une précision que nous cherchons à restituer dans une langue accessible.",
      "La série se compose d'essais de fond et de carnets de pratique, conçus pour se compléter. Lire et faire. Comprendre et agir. C'est la même exigence.",
    ],
    theme: "Tazkiyat al-nafs : purification du cœur",
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
