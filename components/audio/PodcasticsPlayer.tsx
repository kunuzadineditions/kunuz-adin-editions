"use client";

import { useEffect, useRef } from "react";

export default function PodcasticsPlayer({ sId }: { sId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.setAttribute("data-format", "playlist");
    script.setAttribute("data-pId", "6887");
    script.setAttribute("data-sId", sId);
    script.src = `https://players.podcastics.com/podcastics/player.js?v=${sId}`;
    script.async = true;

    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [sId]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden"
      style={{ minHeight: "465px" }}
    />
  );
}
