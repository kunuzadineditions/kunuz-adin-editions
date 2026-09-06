import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medias.podcastics.com",
      },
    ],
  },
  turbopack: {
    // Force Turbopack to use this project root (avoids lockfile collision with parent dir)
    root: path.resolve("."),
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
