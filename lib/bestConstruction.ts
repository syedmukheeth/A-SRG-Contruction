/**
 * Content for /best-construction-in-kurnool.
 *
 * Every claim here has to point at something on the site: a photo, a finished
 * building, the review, or a fact the owner confirmed. No invented counts,
 * schedules, payment terms or awards.
 */

import { site, projects, faqs, traders } from "./site";

const { city, region } = site.location;

export const bestConstructionContent = {
  intro: [
    `Every contractor in ${city} calls themselves the best. ASRG Construction would rather show you. ${site.owner} has been building here for ${site.yearsOfExperience} years, and the buildings on this site are standing in ${city} today.`,
    "Below are the things worth checking before you hand anyone your plot, and what ASRG has to show for each.",
  ],

  pillars: [
    {
      title: "Buildings you can go and see",
      body: `${projects.length} finished buildings are on this site with real photos, from single-storey houses to G+4 homes and a medical complex. All of them are in ${city}. Ask to see one before you decide.`,
    },
    {
      title: "Photos from the site, not a stock library",
      body: "The construction photos here carry the date the camera stamped on them: footings curing in March 2026, a block under scaffolding in April. Design renders are labelled as renders.",
    },
    {
      title: "The contractor is on the slab",
      body: `${site.owner} sits out on the deck during a pour. The photos are on the homepage.`,
    },
    {
      title: "One team, footings to finish",
      body: "The crew that ties the steel and pours the slab is the same team that does the cladding and the final coats. Nobody hands your building to another firm halfway through.",
    },
    {
      title: `${site.yearsOfExperience} years in one town`,
      body: `Since ${site.established}, in ${city}. That is a long time to keep a name in a town where everyone knows who built what.`,
    },
    {
      title: "A materials store under the same name",
      body: `${traders.name} on Nandikotkur Road sells paints, sanitaryware, hardware and electricals, so you can see and choose fittings in person.`,
    },
  ],

  checklist: [
    "Can they take you to a finished building they built?",
    "Are their site photos real, and dated?",
    "Who is on site on the day the slab is poured?",
    "Does the same team do structure and finishing?",
    "Will they visit the plot before quoting?",
    "Can you show the fittings and finishes before they go in?",
  ],

  coverage: `ASRG Construction builds in ${city} and the nearby towns of ${site.location.nearbyTowns.join(", ")}, ${region}: houses, shops and commercial blocks, plus civil and centering work on its own.`,

  featuredProjectIds: ["jeelani-mansion", "lattice-tower", "medical-complex"],

  faq: [
    {
      q: `Which is the best construction company in ${city}?`,
      a: `Judge any ${city} builder by what you can go and see. ASRG Construction has ${site.yearsOfExperience} years of buildings standing in ${city}, real site photos, and a contractor who is on the slab during pours. Use the checklist on this page with anyone you are considering.`,
    },
    {
      q: `What does construction cost in ${city}?`,
      a: "It depends on the plot, the number of floors and the finishes. A fair quote comes after a site visit, not before.",
    },
    {
      q: `How do I check a builder in ${city} before hiring?`,
      a: "Visit a building they finished, ask who will be on site each day, and ask to see their site photos.",
    },
  ],
} as const;

export const bestConstructionSharedFaqs = faqs.filter((f) =>
  ["Do you build shops and commercial blocks, or only homes?", "How do I get a quote?"].includes(f.q),
);

export const bestConstructionProjects = bestConstructionContent.featuredProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is (typeof projects)[number] => Boolean(p));
