import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";
import { posts } from "@/lib/blog";
import { breadcrumbNode, pageGraph } from "@/lib/schema";

const url = `${site.url}/blog`;
const title = `Construction Insights & Guides for ${site.location.city}, ${site.location.region}`;
const description = `Guides on choosing a construction company in ${site.location.city}, civil contracting, and building in ${site.location.region} from ASRG Construction.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url,
    siteName: site.name,
    title: `Insights · ${site.name}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Insights · ${site.name}`,
    description,
    images: ["/opengraph-image"],
  },
};

const jsonLd = pageGraph([
  breadcrumbNode([
    { name: "Home", url: site.url },
    { name: "Insights", url },
  ]),
]);

export default function BlogIndex() {
  return (
    <article>
      <Section className="pt-40">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <li>
                <Link href="/" className="hover:text-copper">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text">Insights</li>
            </ol>
          </nav>

          <p className="eyebrow mb-6">Insights</p>
          <h1 className="font-display text-giant uppercase leading-[0.9] text-text">
            Construction guides
            <br />
            <span className="text-copper">
              for {site.location.city}, {site.location.region}.
            </span>
          </h1>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border-b border-text/10 pb-8"
              >
                <h2 className="font-display text-2xl font-bold uppercase text-text transition-colors group-hover:text-copper">
                  {post.title}
                </h2>
                <p className="mt-4 text-muted">{post.excerpt}</p>
                <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.15em] text-copper">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
