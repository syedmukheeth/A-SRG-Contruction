import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { MagneticButton } from "@/components/MagneticButton";
import { site } from "@/lib/site";
import { posts, getPostBySlug } from "@/lib/blog";
import { breadcrumbNode, faqNode, articleNode, pageGraph } from "@/lib/schema";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { robots: { index: false, follow: false } };

  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url,
      siteName: site.name,
      title: post.title,
      description: post.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = pageGraph([
    breadcrumbNode([
      { name: "Home", url: site.url },
      { name: "Insights", url: `${site.url}/blog` },
      { name: post.title, url: `${site.url}/blog/${post.slug}` },
    ]),
    articleNode(post),
    faqNode(post.faq),
  ]);

  return (
    <article>
      <Section className="pt-40">
        <div className="mx-auto max-w-[900px]">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <li>
                <Link href="/" className="hover:text-copper">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blog" className="hover:text-copper">
                  Insights
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text">{post.title}</li>
            </ol>
          </nav>

          <h1 className="font-display text-giant uppercase leading-[0.9] text-text">
            {post.title}
          </h1>

          <div className="mt-12 max-w-3xl space-y-6 text-lg text-muted">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="surface-concrete">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            FAQs
          </h2>
          <dl className="mt-8 space-y-8">
            {post.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-xl font-semibold uppercase text-text">
                  {f.q}
                </dt>
                <dd className="mt-2 max-w-2xl text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-[900px] flex-col items-start gap-8">
          <h2 className="font-display text-giant uppercase leading-[0.9] text-text">
            Talk to
            <br />
            <span className="text-copper">the team.</span>
          </h2>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <MagneticButton href="/#contact">Talk to the team</MagneticButton>
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="font-mono text-sm text-muted hover:text-copper"
            >
              {site.phone}
            </a>
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
