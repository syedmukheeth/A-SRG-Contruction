import type { MetadataRoute } from "next";
import { site, services, projects, chapters, interiors, heroPhoto } from "@/lib/site";
import { posts } from "@/lib/blog";

const lastModified = new Date();

/** Real site and finished-work photography, surfaced for Image search. */
const proofImages = [
  heroPhoto.src,
  ...chapters.flatMap((c) => c.photos.map((p) => p.src)),
  ...projects.map((p) => p.image),
  ...interiors.map((p) => p.src),
].map((src) => `${site.url}${src}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: proofImages,
    },
    {
      url: `${site.url}/best-construction-in-kurnool`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: projects.slice(0, 3).map((p) => `${site.url}${p.image}`),
    },
    {
      url: `${site.url}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
