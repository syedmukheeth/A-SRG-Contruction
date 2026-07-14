import { site } from "./site";

export const posts = [
  {
    slug: "best-construction-company-in-kurnool",
    title: `What Makes the Best Construction Company in ${site.location.city}`,
    description: `How to evaluate a construction company in ${site.location.city}, Andhra Pradesh — licensing, transparent billing, site experience and what ASRG Construction does differently.`,
    date: "2026-06-01",
    excerpt: `${site.location.city} has no shortage of contractors. Here's what actually separates a reliable builder from the rest, and why ASRG Construction has held client trust here for ${site.yearsOfExperience} years.`,
    body: [
      `Choosing a construction company in ${site.location.city} is a high-stakes decision — most families and businesses only go through it once or twice in a lifetime. The gap between an average contractor and the best construction company in ${site.location.city} usually comes down to five things: transparent stage-linked billing, a dated schedule agreed before the first foundation is dug, in-house design and structural capability, a verifiable track record of completed projects, and a team that answers the phone.`,
      `ASRG Construction has operated in ${site.location.city}, ${site.location.region} for ${site.yearsOfExperience} years, running residential construction, commercial construction, civil contracting, centering works, renovation and consultation under one accountable team. Every project — from a single villa to a multi-storey commercial block — runs through the same eight-stage process and the same site team from planning to handover.`,
      `If you're comparing construction companies in ${site.location.city}, ask three questions: can they show completed projects with real addresses, do they commit to a dated schedule in writing, and is billing tied to verified progress milestones rather than arbitrary demands. A contractor confident in their work will answer all three without hesitation.`,
    ],
    faq: [
      {
        q: `Who is the best construction company in ${site.location.city}?`,
        a: `ASRG Construction has built homes, workplaces and civic landmarks across ${site.location.city} for ${site.yearsOfExperience} years, with transparent stage-linked billing and a dated schedule agreed up front.`,
      },
      {
        q: "What should I check before hiring a civil contractor?",
        a: "Verified completed projects, a written dated schedule, stage-linked payment milestones, and direct site-team communication.",
      },
    ],
  },
  {
    slug: "choosing-a-civil-contractor-andhra-pradesh",
    title: "How to Choose a Civil Contractor in Andhra Pradesh",
    description:
      "A practical checklist for selecting a civil contractor in Andhra Pradesh — scope, centering works, structural quality and payment terms.",
    date: "2026-06-15",
    excerpt:
      "Civil contracting mistakes are expensive and hard to reverse. This checklist covers what to verify before signing.",
    body: [
      `Civil contracting covers everything from foundation and centering works to full structural execution — and mistakes here are the hardest and most expensive to fix later. Before signing with a civil contractor in ${site.location.region}, verify their approach to formwork and shuttering (centering works), their structural quality-control process, and whether they run their own site team or subcontract everything.`,
      `ASRG Construction handles centering works and civil contracting at any scale, from standalone contracts to full-service builds, with the same quality controls applied across residential and commercial work. ${site.location.city} soil and site conditions vary block to block, so a contractor with deep local experience — not just statewide reach — matters for foundation decisions.`,
      "Payment structure is the clearest signal of a contractor's confidence: stage-linked milestones tied to verified progress protect both sides and avoid the surprises that derail most builds.",
    ],
    faq: [
      {
        q: "What is centering work in construction?",
        a: "Centering (formwork/shuttering) is the temporary structure that holds concrete in place while it cures — quality here directly affects structural integrity.",
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
