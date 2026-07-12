import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const lastModified = new Date("2026-07-12");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
