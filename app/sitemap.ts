import type { MetadataRoute } from "next";
import { site, services, projects, gallery } from "@/lib/site";
import { posts } from "@/lib/blog";

const lastModified = new Date();

/**
 * Delivered-work photography, surfaced as an image sitemap. These files are
 * only reachable through client-rendered galleries, so without this Google has
 * no reliable path to them and the whole proof library stays out of Image
 * search — where "construction company Kurnool" gets a lot of its browsing.
 */
const proofImages = [
  ...projects.map((p) => `${site.url}${p.image}`),
  ...gallery.map((g) => `${site.url}${g.image}`),
];

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
