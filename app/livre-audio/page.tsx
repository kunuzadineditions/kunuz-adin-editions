import type { Metadata } from "next";
import { Headphones } from "lucide-react";
import { fetchSeriesGroups } from "@/lib/rss";
import AudioPlayer from "@/components/audio/AudioPlayer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Audios · KUNUZ ADIN ÉDITIONS",
  description: "Des séries audio pour approfondir ta foi, comprendre ta religion et nourrir ton cœur.",
};

const FEED_URL =
  "https://feeds.podcastics.com/podcastics/podcasts/rss/6887_cd9ab1f67e41a10062a0b84c51bfff4f.rss";

export default async function LivreAudioPage() {
  const groups = await fetchSeriesGroups(FEED_URL);
  const totalEpisodes = groups.reduce((n, g) => n + g.episodes.length, 0);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <section className="pt-24 pb-10 px-6 text-center border-b border-zinc-800">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">
          KUNUZ ADIN · كنوز الدين
        </p>
        <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
          <Headphones className="text-[#C9A84C]" size={32} />
          Audios
        </h1>
        <p className="text-zinc-500 text-sm">
          {totalEpisodes} épisodes · {groups.length} séries
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <AudioPlayer groups={groups} />
      </section>
    </main>
  );
}
