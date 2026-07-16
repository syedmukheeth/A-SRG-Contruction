import { site } from "./site";

/**
 * The "best-construction-company-in-kurnool" post used to live here. It duplicated
 * the thesis, checklist and FAQs of /best-construction-in-kurnool, so the two
 * pages competed for one query and split their link equity. The post is now
 * permanently redirected to that page in next.config.ts — do not re-add a post on the
 * "best construction company" theme; strengthen the landing page instead.
 */
export const posts = [
  {
    slug: "choosing-a-civil-contractor-andhra-pradesh",
    title: "How to Choose a Civil Contractor in Andhra Pradesh",
    description:
      "A practical checklist for selecting a civil contractor in Andhra Pradesh: scope, centering works, structural quality and payment terms.",
    date: "2026-06-15",
    excerpt:
      "Civil contracting mistakes are expensive and hard to reverse. This checklist covers what to verify before signing.",
    body: [
      `Civil contracting covers everything from foundation and centering works to full structural execution, and mistakes here are the hardest and most expensive to fix later. Before signing with a civil contractor in ${site.location.region}, verify their approach to formwork and shuttering (centering works), their structural quality-control process, and whether they run their own site team or subcontract everything.`,
      `ASRG Construction handles centering works and civil contracting at any scale, from standalone contracts to full-service builds, with the same quality controls applied across residential and commercial work. ${site.location.city} soil and site conditions vary block to block, so a contractor with deep local experience, not just statewide reach, matters for foundation decisions.`,
      "Payment structure is the clearest signal of a contractor's confidence: stage-linked milestones tied to verified progress protect both sides and avoid the surprises that derail most builds.",
    ],
    faq: [
      {
        q: "What is centering work in construction?",
        a: "Centering (formwork/shuttering) is the temporary structure that holds concrete in place while it cures. Quality here directly affects structural integrity.",
      },
      {
        q: "Does ASRG Construction take civil contracting only, without full construction?",
        a: "Yes, standalone centering works and civil contracts are taken at any scale, with the same quality controls as a full build.",
      },
    ],
  },
] as const;

export type Post = (typeof posts)[number];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
