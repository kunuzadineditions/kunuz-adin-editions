export type Quote = {
  label?: string;
  text: string;
  source: string;
};

export type Scholar = {
  slug: string;
  name: string;
  nameArabic: string;
  title?: string;
  fullName: string;
  nameExplained?: string;
  image?: string;
  dates: string;
  birth: string;
  death: string;
  school: string;
  way: string;
  bio: string[];
  knownFor: string[];
  students?: string[];
  majorWorks?: string[];
  editorialNote?: string;
  featuredQuote: Quote;
  quotes: Quote[];
  teacherSlug?: string;
  studentSlugs?: string[];
};

export const scholars: Scholar[] = [
  {
    slug: "ibn-taymiyya",
    name: "Ibn Taymiyya",
    nameArabic: "رحمه الله",
    title: "Shaykh al-Islâm",
    image: "/images/scholars/ibn-taymiyya.jpg",
    fullName:
      "Taqî ad-Dîn Ahmad ibn ʿAbd al-Halîm ibn ʿAbd as-Salâm ibn Taymiyya al-Harrânî",
    dates: "661–728 H / 1263–1328",
    birth: "661 H (1263) à Harrân (aujourd'hui au sud-est de la Turquie)",
    death: "728 H (1328) à Damas, dans la citadelle, emprisonné pour ses positions",
    school: "Hanbalite",
    way: "Salaf, attachement au Coran, à la Sunna et à la voie des pieux prédécesseurs (as-Salaf as-Sâlih)",
    bio: [
      "Sa famille quitte Harrân face à l'avancée mongole et s'installe à Damas, où son père était responsable d'une madrasa. Il y reçoit une éducation solide, mémorise le Coran très jeune, et se distingue par une maîtrise exceptionnelle des sciences islamiques. Il atteint le rang de savant apte à enseigner et à donner des fatwas avant l'âge de vingt ans. Il enseigne notamment l'exégèse coranique à la mosquée des Omeyyades de Damas.",
    ],
    knownFor: [
      "Son attachement rigoureux au Coran et à la Sunna",
      "Son combat contre les innovations (bidʿa) et les déviations doctrinales",
      "Ses nombreuses fatwas et ouvrages couvrant le tawhîd, le fiqh, l'ʿaqîda, le tasawwuf sunnite",
      "Ses emprisonnements à plusieurs reprises à cause de ses positions, jusqu'à sa mort en détention dans la citadelle de Damas",
    ],
    students: ["Ibn al-Qayyim al-Jawziyya", "Ibn Kathîr", "adh-Dhahabî", "entre autres"],
    featuredQuote: {
      label: "Sur la santé du cœur",
      text: "Il y a dans le corps un morceau de chair : s'il est sain, tout le corps est sain ; et s'il est corrompu, tout le corps est corrompu. En vérité, c'est le cœur.",
      source: "Hadith du Prophète ﷺ rapporté par al-Bukhârî et Muslim, cité dans Amrâd al-Qulûb wa Shifâʾuhâ",
    },
    quotes: [
      {
        label: "Sur la santé du cœur",
        text: "Il y a dans le corps un morceau de chair : s'il est sain, tout le corps est sain ; et s'il est corrompu, tout le corps est corrompu. En vérité, c'est le cœur.",
        source:
          "Hadith du Prophète ﷺ rapporté par al-Bukhârî et Muslim. Ibn Taymiyya cite et commente longuement ce hadith dans son traité Amrâd al-Qulûb wa Shifâʾuhâ (« Les maladies des cœurs et leurs remèdes »), ainsi que dans Majmûʿ al-Fatâwâ, où il explique que la rectitude du cœur ne s'obtient que par la patience, l'obéissance à Allah, le dhikr, la prière nocturne et la fréquentation des gens vertueux.",
      },
    ],
    studentSlugs: ["ibn-al-qayyim"],
  },

  {
    slug: "ibn-al-qayyim",
    name: "Ibn al-Qayyim al-Jawziyya",
    nameArabic: "رحمه الله",
    image: "/images/scholars/ibn-al-qayyim.jpg",
    fullName:
      "Abû ʿAbdillâh Shams ad-Dîn Muhammad ibn Abî Bakr ibn Ayyûb az-Zarʿî ad-Dimashqî al-Hanbalî",
    nameExplained:
      "Ibn Qayyim al-Jawziyya (« le fils du responsable de l'école al-Jawziyya »)",
    dates: "691–751 H / 1292–1350",
    birth:
      "7 Safar 691 H (29 janvier 1292) au village de Zarʿ (Azraʿ), près de Damas",
    death:
      "nuit du jeudi 13 Rajab 751 H (15 septembre 1350) à Damas, enterré auprès de son père au cimetière de Bâb as-Saghîr",
    school: "Hanbalite",
    way: "Salaf, disciple majeur de Shaykh al-Islâm Ibn Taymiyya",
    bio: [
      "Issu d'une famille de savoir, son père était le responsable (qayyim) de l'école al-Jawziyya à Damas, d'où son surnom. Il apprend dès son jeune âge le Coran, le hadith, la langue arabe et le fiqh. Sa rencontre avec Ibn Taymiyya vers 712 H marque un tournant décisif : il reste à ses côtés environ seize ans, jusqu'à la mort de son maître en 728 H, et devient son élève le plus renommé.",
    ],
    knownFor: [
      "Sa science du cœur (ʿilm al-qalb) et des maladies spirituelles",
      "Ses ouvrages de tazkiyat an-nafs et de guidance du croyant",
      "Son style profond, spirituel et accessible, alliant rigueur textuelle et finesse psychologique",
    ],
    majorWorks: [
      "Madârij as-Sâlikîn",
      "Ighâthat al-Lahfân",
      "Zâd al-Maʿâd",
      "al-Fawâʾid",
      "al-Rûh",
    ],
    editorialNote:
      "C'est directement de cette tradition des « maladies du cœur et leurs remèdes » (amrâd al-qulûb wa adwiyatuhâ) que notre livre Tu pries, mais tu ne t'apaises pas s'inspire.",
    featuredQuote: {
      label: "Sur la tranquillité dans la prière",
      text: "Lorsque son propriétaire entre dans la prière, toutes ses angoisses et ses soucis mondains le quittent, et il trouve difficile de quitter la prière.",
      source: "Ibn al-Qayyim, Ighâthat al-Lahfân",
    },
    quotes: [
      {
        label: "Sur les désordres du cœur et leur unique remède",
        text: "Dans le cœur, il y a des désordres qui ne peuvent être guéris qu'en répondant à Allah. En lui, il y a un sentiment de solitude qui ne peut être enlevé que par l'intimité avec Lui. En lui, il y a une tristesse qui ne partira que par le bonheur de Le connaître et la sincérité dans ses relations avec Lui. En lui, il y a une angoisse que rien n'apaise, sauf le fait de se rassembler pour Lui et de fuir vers Lui. En lui, il y a un feu de regret qui ne s'éteint que par l'agrément de Ses ordres, de Ses interdits et de Son décret, en patientant jusqu'à Le rencontrer. En lui, il y a un désir intense qui ne cessera que lorsqu'Il sera le seul recherché. En lui, il y a un vide qui ne peut être comblé que par Son amour, le retour vers Lui, Son évocation constante et la sincérité envers Lui. Si l'on donnait à une personne le monde entier et tout ce qu'il contient, cela ne comblerait jamais ce vide.",
        source:
          "Ibn al-Qayyim, Madârij as-Sâlikîn, tome 3 (chapitre sur les stations des voyageurs vers Allah).",
      },
      {
        label: "Sur la tranquillité dans la prière",
        text: "Lorsque son propriétaire entre dans la prière, toutes ses angoisses et ses soucis mondains le quittent, et il trouve difficile de quitter la prière.",
        source: "Ibn al-Qayyim, Ighâthat al-Lahfân.",
      },
      {
        label: "Sur le Coran comme guérison des cœurs",
        text: "Le Coran est une guérison de ce qui est dans les poitrines (c'est-à-dire les cœurs) ; il en fait sortir ce que le diable y jette comme doutes, désirs et mauvaises intentions.",
        source: "Ibn al-Qayyim, dans ses écrits sur le cœur et le Coran.",
      },
    ],
    teacherSlug: "ibn-taymiyya",
  },
];

export function getScholarBySlug(slug: string): Scholar | undefined {
  return scholars.find((s) => s.slug === slug);
}

export function buildChain(all: Scholar[]): Scholar[] {
  const root = all.find((s) => !s.teacherSlug);
  if (!root) return all;
  const chain: Scholar[] = [root];
  let current = root;
  while (current.studentSlugs?.length) {
    const next = all.find((s) => s.slug === current.studentSlugs![0]);
    if (!next) break;
    chain.push(next);
    current = next;
  }
  return chain;
}
