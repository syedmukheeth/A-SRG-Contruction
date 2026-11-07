import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";
import { posts } from "@/lib/blog";
import { breadcrumbNode, pageGraph } from "@/lib/schema";

const url = `${site.url}/blog`;
const title = `Construction Guides for ${site.location.city}, ${site.location.region}`;
const description = `Plain guides on hiring a builder and civil contractor in ${site.location.city} and ${site.location.region}, from ASRG Construction.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url,
    siteName: site.name,
    title: `Guides · ${site.name}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Guides · ${site.name}`,
    description,
    images: ["/opengraph-image"],
  },
};

const jsonLd = pageGraph([
  breadcrumbNode([
    { name: "Home", url: site.url },
    { name: "Guides", url },
  ]),
]);

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export default function BlogIndex() {
  return (
    <article>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        marker="Guides"
        title={
          <>
            Before you <span className="text-laterite">build.</span>
          </>
        }
      />

      <section className="px-5 py-16 md:px-10 md:py-24">
        <ul className="mx-auto max-w-[1280px] border-t border-ink">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-rule">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-3 py-8 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <time dateTime={post.date} className="stamp">
                  {dateFmt.format(new Date(post.date))}
                </time>
                <div>
                  <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[0.95] text-ink group-hover:text-laterite">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">{post.excerpt}</p>
                </div>
                <span aria-hidden className="font-mono text-lg text-laterite-deep transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
