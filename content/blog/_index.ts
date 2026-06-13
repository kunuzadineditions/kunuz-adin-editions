export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
};

export const posts: PostMeta[] = [
  {
    slug: "maladies-du-coeur",
    title: "Les maladies du cœur — diagnose et remèdes selon Ibn al-Qayyim",
    excerpt:
      "Ibn al-Qayyim distingue deux grandes familles de maladies qui affectent le cœur : les doutes (shubuhāt) et les désirs déréglés (shahawāt). Comprendre leur mécanisme est le premier pas vers la guérison.",
    date: "2026-05-20",
    readingTime: "10 min",
    category: "Cœur & spiritualité",
  },
  {
    slug: "khushu-dans-la-salah",
    title: "Le khushū' dans la salah — la présence du cœur dans la prière",
    excerpt:
      "Pourquoi le corps se prosterne-t-il quand le cœur est ailleurs ? Ibn al-Qayyim consacre une partie entière de ses œuvres à cette question. Analyse et remèdes.",
    date: "2026-06-02",
    readingTime: "8 min",
    category: "Salah & présence",
  },
];

export function getPostBySlug(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}
