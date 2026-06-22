"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import type { SeriesGroup, Episode } from "@/lib/rss";

export default function AudioPlayer({ groups }: { groups: SeriesGroup[] }) {
  const [activeId,  setActiveId]  = useState(groups[0]?.id ?? 0);
  const [currentEp, setCurrentEp] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [elapsed,   setElapsed]   = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  const activeGroup  = groups.find((g) => g.id === activeId);
  const allEpisodes  = groups.flatMap((g) => g.episodes);

  const playEpisode = (ep: Episode) => {
    if (currentEp?.audioUrl === ep.audioUrl) { togglePlay(); return; }
    setCurrentEp(ep);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying((p) => !p);
  };

  const skip = useCallback((dir: 1 | -1) => {
    if (!currentEp) return;
    const idx  = allEpisodes.findIndex((e) => e.audioUrl === currentEp.audioUrl);
    const next = allEpisodes[idx + dir];
    if (next) setCurrentEp(next);
  }, [currentEp, allEpisodes]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime =
      ((e.clientX - r.left) / r.width) * audioRef.current.duration;
  };

  useEffect(() => {
    if (!audioRef.current || !currentEp) return;
    audioRef.current.src = currentEp.audioUrl;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, [currentEp]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
      const m = Math.floor(a.currentTime / 60);
      const s = String(Math.floor(a.currentTime % 60)).padStart(2, "0");
      setElapsed(`${m}:${s}`);
    };
    const onEnded = () => skip(1);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnded);
    };
  }, [skip]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Sidebar séries */}
      <aside className="lg:w-64 flex-shrink-0 space-y-1">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3 px-1">Séries</p>
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveId(g.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border transition-all ${
              activeId === g.id
                ? "border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C]"
                : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/60"
            }`}
          >
            {g.coverUrl && (
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={g.coverUrl} alt={g.title} fill className="object-cover" sizes="40px" />
              </div>
            )}
            <div className="text-left min-w-0">
              <p className="text-sm font-medium leading-snug line-clamp-2">{g.title}</p>
              <p className="text-xs opacity-50 mt-0.5">{g.episodes.length} épisodes</p>
            </div>
          </button>
        ))}
      </aside>

      {/* Zone principale */}
      <div className="flex-1 min-w-0 space-y-3">

        {/* Player sticky */}
        {currentEp && (
          <div className="bg-zinc-900 border border-[#C9A84C]/30 rounded-2xl p-4 sticky top-4 z-10">
            <p className="text-white text-sm font-medium truncate mb-3">{currentEp.title}</p>
            <div
              className="w-full h-1.5 bg-zinc-700 rounded-full cursor-pointer mb-3"
              onClick={seek}
            >
              <div
                className="h-full bg-[#C9A84C] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-xs">{elapsed}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => skip(-1)}
                  aria-label="Épisode précédent"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Lecture"}
                  className="w-10 h-10 bg-[#C9A84C] rounded-full flex items-center justify-center hover:bg-[#b8923e] transition-colors"
                >
                  {isPlaying
                    ? <Pause size={16} className="text-black" />
                    : <Play  size={16} className="text-black ml-0.5" />}
                </button>
                <button
                  onClick={() => skip(1)}
                  aria-label="Épisode suivant"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <SkipForward size={18} />
                </button>
              </div>
              <span className="text-zinc-500 text-xs">{currentEp.duration}</span>
            </div>
            <audio ref={audioRef} className="hidden" />
          </div>
        )}

        {/* Liste épisodes */}
        {activeGroup && (
          <div className="space-y-1.5">
            {activeGroup.episodes.map((ep, i) => {
              const active = currentEp?.audioUrl === ep.audioUrl;
              return (
                <button
                  key={i}
                  onClick={() => playEpisode(ep)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    active
                      ? "border-[#C9A84C]/50 bg-[#C9A84C]/10"
                      : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    active ? "bg-[#C9A84C]" : "bg-zinc-800"
                  }`}>
                    {active && isPlaying
                      ? <Pause size={13} className="text-black" />
                      : <Play  size={13} className={active ? "text-black" : "text-zinc-400 ml-0.5"} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${active ? "text-[#C9A84C]" : "text-white"}`}>
                      {ep.title}
                    </p>
                    {ep.pubDate && (
                      <p className="text-zinc-600 text-xs mt-0.5">{ep.pubDate}</p>
                    )}
                  </div>
                  <span className="text-zinc-500 text-xs flex-shrink-0">{ep.duration}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
