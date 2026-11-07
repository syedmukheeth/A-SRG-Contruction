import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "ASRG",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#15161a",
    theme_color: "#15161a",
    icons: [
      { src: "/images/brand/asrg-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/brand/asrg-icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/images/brand/asrg-icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
