import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // The blog post duplicated /best-construction-in-kurnool and split the
      // ranking signals for the same query. permanent: true emits a 308, which
      // Google treats like a 301: whatever the old URL earned folds into the
      // page that now owns the keyword.
      {
        source: "/blog/best-construction-company-in-kurnool",
        destination: "/best-construction-in-kurnool",
        permanent: true,
      },
      // Common ways people reach for this page by hand or from print/WhatsApp.
      {
        source: "/best-construction-company-in-kurnool",
        destination: "/best-construction-in-kurnool",
        permanent: true,
      },
      {
        source: "/best-builders-in-kurnool",
        destination: "/best-construction-in-kurnool",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
