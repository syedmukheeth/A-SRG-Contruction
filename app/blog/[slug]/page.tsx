import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { site, tel } from "@/lib/site";
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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = pageGraph([
    breadcrumbNode([
      { name: "Home", url: site.url },
      { name: "Guides", url: `${site.url}/blog` },
      { name: post.title, url: `${site.url}/blog/${post.slug}` },
    ]),
    articleNode(post),
    faqNode(post.faq),
  ]);

  return (
    <article>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides", href: "/blog" }, { label: post.title }]}
        marker={`Guide · ${new Date(post.date).getFullYear()}`}
        title={post.title}
      />

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[720px] space-y-6 text-lg leading-relaxed text-ink-soft">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="border-t border-rule px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-display text-title text-ink">Questions</h2>
          <dl className="mt-8 space-y-8">
            {post.faq.map((f) => (
              <div key={f.q} className="border-t border-ink pt-5">
                <dt className="text-xl font-semibold text-ink">{f.q}</dt>
                <dd className="mt-3 text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12">
            <Button href={tel(site.phone)}>Call {site.ownerShort}</Button>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
