import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Moderne Formate: Next.js liefert automatisch AVIF/WebP in passenden Größen aus.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
