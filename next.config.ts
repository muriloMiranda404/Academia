import type { NextConfig } from "next";

// Mesmo critério de src/data/site.ts: prévia até NEXT_PUBLIC_PREVIEW=false
const isPreview = process.env.NEXT_PUBLIC_PREVIEW !== "false";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind CSS v4 processado pelo loader do Turbopack
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async headers() {
    // Prévia não oficial: fora dos buscadores para não concorrer com os canais da academia
    if (!isPreview) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
