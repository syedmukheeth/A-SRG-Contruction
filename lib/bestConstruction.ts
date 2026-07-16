/**
 * Content for the /best-construction-in-kurnool landing page.
 *
 * Targets the "best construction in Kurnool" family of queries, which sit
 * alongside (not inside) the "best construction company" set the blog post
 * covers. Every claim here has to be backed by something on the site —
 * a delivered project, a real review, or the stated process. No invented
 * awards, certifications or numbers.
 */

import { site, projects, faqs, stats } from "./site";

const { city, region } = site.location;

export const bestConstructionContent = {
  intro: [
    `"Best construction in ${city}" is a claim every contractor in town makes and almost none of them back. ASRG Construction has been building here for ${site.yearsOfExperience} years, which is long enough that the work argues for itself: ${stats[1].value}${stats[1].suffix} projects delivered, ${stats[2].value}${stats[2].suffix} families handed keys, and elevations standing across ${city} that you can drive past today.`,
    `This page lays out what "best" actually means when you're choosing who builds your home or commercial block in ${city}, ${region}, and how ASRG Construction measures against each point. Judge the answers, not the adjective.`,
  ],

  /** Each pillar is a criterion a buyer can verify, plus what ASRG does about it. */
  pillars: [
    {
      title: "Work you can go and look at",
      body: `Renders and stock photos prove nothing. ${projects.length} of ASRG Construction's builds are on this site with their real category, storey count and year: Jeelani Mansion (G+4), the ASRG Traders Showroom, the Medical Complex (G+2), and residential elevations from G+1 to G+4. They're in ${city}. You can see them standing before you sign anything.`,
    },
    {
      title: "A dated schedule agreed before the foundation is dug",
      body: `Delays are where most ${city} builds turn sour. Every ASRG Construction project runs on a schedule committed up front, not a verbal "eight or nine months". A standard villa runs 9–14 months depending on scope, soil and finishes, and that range is set against your actual plot, not a brochure.`,
    },
    {
      title: "Stage-linked billing, no arbitrary demands",
      body: `Payments are tied to verified progress milestones across the eight build stages. You pay for work that exists. That structure is the clearest signal a contractor is confident in their own pace — the ones who ask for large sums ahead of progress are usually funding someone else's site with your money.`,
    },
    {
      title: "One team, design through handover",
      body: `Survey, architecture, structural drawings, approvals and execution run in-house. Nobody hands your project between three firms and points at each other when a slab detail goes wrong. The same site team that pours the foundation is there at snagging.`,
    },
    {
      title: `${site.yearsOfExperience} years of ${city} ground under one contractor`,
      body: `${city} soil changes block to block, and footing design has to change with it. ${site.yearsOfExperience} years of local foundations means ASRG Construction prices and schedules against what a ${city} plot actually does, rather than padding every quote against the worst case. ${site.owner}, ${site.ownerTitle}, is on site through it.`,
    },
    {
      title: "Reviews from clients, not from us",
      body: `The testimonials on this site come from Justdial and Google — real clients describing quotation clarity, response speed and cost. Ask any contractor in ${city} for the same and see how quickly they change the subject.`,
    },
  ],

  /** Verification checklist a reader can take to any other Kurnool contractor. */
  checklist: [
    "Can they show completed projects with real addresses you can visit?",
    "Will they commit to a dated schedule in writing before work starts?",
    "Is billing tied to verified progress, or to arbitrary demands?",
    "Do they run their own site team, or subcontract every stage?",
    "Is design and structural work in-house, or brokered out?",
    "Do they answer the phone once the advance is paid?",
  ],

  coverage: `ASRG Construction builds across ${city} and the wider ${city} district, including Nandyal and Adoni, and mobilises statewide across ${region} for landmark projects. Residential construction, commercial construction, civil contracting, centering works, renovation and consultation all run under the same team and the same quality controls.`,

  /** Featured proof — the strongest, most varied delivered work. */
  featuredProjectIds: ["jeelani-mansion", "asrg-traders-showroom", "charcoal-elevation"],

  faq: [
    {
      q: `Which is the best construction company in ${city}?`,
      a: `ASRG Construction has built residential and commercial projects across ${city} for ${site.yearsOfExperience} years, with ${stats[1].value}${stats[1].suffix} projects delivered, transparent stage-linked billing and a dated schedule agreed before work starts. Rather than take the claim on trust, check any ${city} contractor against the six questions on this page.`,
    },
    {
      q: `What does the best construction in ${city} actually cost?`,
      a: `Cost depends on plot, scope, storey count and finish level, so any contractor quoting a firm price before surveying your site is guessing. ASRG Construction runs a site survey and feasibility study first, then issues a stage-linked quotation you can read line by line.`,
    },
    {
      q: `How do I verify a construction company in ${city} before hiring?`,
      a: `Ask to visit a completed project, ask for the schedule in writing, and ask how payments are linked to progress. A contractor confident in their work answers all three without hesitation.`,
    },
    {
      q: `Does ASRG Construction handle both homes and commercial buildings in ${city}?`,
      a: `Yes. Residential construction runs alongside commercial work — showrooms, medical complexes and multi-storey blocks — with scale, structure and finish tailored to the use of the building.`,
    },
  ],
} as const;

/** Site-wide FAQs worth repeating on this page, pulled by question text. */
export const bestConstructionSharedFaqs = faqs.filter((f) =>
  ["Why choose ASRG Construction?", "Do you provide turnkey construction projects?"].includes(f.q),
);

export const bestConstructionProjects = bestConstructionContent.featuredProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is (typeof projects)[number] => Boolean(p));
