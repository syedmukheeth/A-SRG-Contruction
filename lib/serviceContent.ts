import {
  services,
  projects,
  faqs,
  chapters,
  interiors,
  renders,
  heroPhoto,
  site,
  type Photo,
} from "./site";

export interface ServiceContent {
  slug: string;
  intro: string[];
  included: string[];
  process: string;
  /** Delivered buildings from `projects`. */
  projectIds: string[];
  /** Work-in-progress or detail photos from the story/interiors sets, by src. */
  photoSrcs: string[];
  faqQuestions: string[];
  related: string[];
}

const { city } = site.location;
const years = site.yearsOfExperience;

export const serviceContent: Record<string, ServiceContent> = {
  "residential-construction": {
    slug: "residential-construction",
    intro: [
      `Most of what ASRG Construction builds is houses: independent homes, duplexes and multi-storey family buildings across ${city}. ${site.owner} has run this work for ${years} years, with the same people on site from the footings to the last coat of paint.`,
      "A house is lived in for decades, so the decisions that matter most are the ones nobody sees after handover: how deep the footings go, how the slab is reinforced, where the wiring runs. Those get agreed before work starts.",
    ],
    included: [
      "Site visit and a look at the plot before any drawing",
      "Footings, columns, beams and slabs",
      "Brickwork, plastering and centering",
      "Electrical and plumbing laid in with the structure",
      "Flooring, joinery, paint and exterior finishes",
      "Handover walkthrough with the owner",
    ],
    process: "A house goes up in the same order every time: ground, steel, frame, finish, lights on. The homepage follows one real build through each of those stages, with the date each photo was taken.",
    projectIds: ["jeelani-mansion", "garden-house", "lattice-tower"],
    photoSrcs: [],
    faqQuestions: ["Can I see finished work before I decide?", "How do I get a quote?"],
    related: ["civil-contracting", "renovation", "consultation"],
  },

  "commercial-construction": {
    slug: "commercial-construction",
    intro: [
      `ASRG Construction builds shops and commercial blocks in ${city} alongside its residential work. A commercial building usually needs longer spans, heavier electrical loads and finishes that stand up to daily foot traffic, and those have to be planned before the footings go in.`,
      "The same site team that builds the houses on this site runs the commercial jobs, so there is no hand-off between a structural crew and a finishing crew.",
    ],
    included: [
      "Structural planning for larger spans and loads",
      "Footings, frame and slabs",
      "Centering and formwork for wider floor plates",
      "Electrical and plumbing sized for commercial use",
      "Hard-wearing floors and finishes",
    ],
    process: "Commercial work follows the same ground, steel, frame and finish sequence as a house, with more of the planning done up front because services are hard to move once a slab is cast.",
    projectIds: ["medical-complex"],
    photoSrcs: ["/images/site/scaffold-block.jpg"],
    faqQuestions: ["Do you build shops and commercial blocks, or only homes?", "How do I get a quote?"],
    related: ["civil-contracting", "centering-works", "consultation"],
  },

  "civil-contracting": {
    slug: "civil-contracting",
    intro: [
      "Civil contracting is the structure: footings, columns, beams and slabs. It is the part of a building that disappears behind plaster, and the part that decides whether the building lasts.",
      `ASRG Construction takes civil work in ${city} on its own or as part of a full build. The crew that ties the steel is the crew that pours the slab.`,
    ],
    included: [
      "Excavation and footings",
      "Column and beam reinforcement",
      "Slab decks, poured by pump",
      "Centering and formwork (see Centering Works)",
      "Working alongside your architect or other contractors",
    ],
    process: "Civil work is the ground and steel stages of the build. The photos below are from ASRG sites in Kurnool: footings curing in March 2026, and a slab pour with the crew and Jeelani on the deck.",
    projectIds: [],
    photoSrcs: ["/images/site/footings-red-soil.jpg", "/images/site/crew-slab-pour.jpg"],
    faqQuestions: ["Do you take only civil or centering work?", "Which areas do you build in?"],
    related: ["centering-works", "commercial-construction", "residential-construction"],
  },

  "centering-works": {
    slug: "centering-works",
    intro: [
      "Centering is the formwork and shuttering that holds concrete in shape while it sets. Once the concrete cures nobody sees it again, which is why it is easy to do badly and expensive when it goes wrong.",
      `ASRG Construction does centering in ${city} as part of its own builds and as a standalone job for other builders.`,
    ],
    included: [
      "Formwork for footings, columns, beams and slabs",
      "Shuttering set up and checked before the pour",
      "Standalone centering contracts",
      "Centering within a full ASRG build",
    ],
    process: "Centering sits inside the ground and steel stages. Formwork goes up, gets checked, the concrete goes in, and the shuttering comes off once the concrete has cured.",
    projectIds: [],
    photoSrcs: ["/images/site/column-cages.jpg", "/images/site/jeelani-on-slab.jpg"],
    faqQuestions: ["Do you take only civil or centering work?", "How do I get a quote?"],
    related: ["civil-contracting", "residential-construction", "commercial-construction"],
  },

  renovation: {
    slug: "renovation",
    intro: [
      `Renovation in ${city} usually starts with an older building that has cracked, leaked or outgrown its layout. ASRG Construction looks at the structure first and fixes what it needs before any new finishes go on.`,
      "Interior finishing is part of the same job: ceilings, kitchens, flooring and paint, done by the team that knows what is behind the walls.",
    ],
    included: [
      "Inspection of the existing structure",
      "Structural repairs where needed",
      "New electrical and plumbing where the old services are worn out",
      "False ceilings, kitchens, flooring and paint",
    ],
    process: "A renovation uses only the stages the building needs. Structural repairs come first, then services, then finishes.",
    projectIds: [],
    photoSrcs: ["/images/proof/gallery-ceiling-lighting.jpg", "/images/proof/gallery-kitchen-fitout.jpg"],
    faqQuestions: ["Can I see finished work before I decide?", "How do I get a quote?"],
    related: ["consultation", "civil-contracting", "residential-construction"],
  },

  consultation: {
    slug: "consultation",
    intro: [
      "Not every project starts with a fixed plan. A consultation is a site visit and a conversation about what the plot allows, what it will roughly cost, and what order things should happen in.",
      "You get the answer from the contractor who would actually build it, before you sign anything.",
    ],
    included: [
      "Site visit",
      "A look at your plan or design, or help shaping one",
      "Rough scope and budget",
      "Advice on approvals and the order of work",
    ],
    process: "A consultation covers the thinking before the ground stage: what to build, in what order, and what it is likely to cost. Design renders like the ones below help settle the look before work starts.",
    projectIds: [],
    photoSrcs: ["/images/site/arch-villa-render.jpg", "/images/site/louvre-g2-render.jpg"],
    faqQuestions: ["How do I get a quote?", "Which areas do you build in?"],
    related: ["residential-construction", "renovation", "civil-contracting"],
  },
};

const allPhotos: Photo[] = [
  heroPhoto,
  ...chapters.flatMap((c) => c.photos),
  ...interiors,
  ...renders,
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedProjects(ids: string[]) {
  return ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
}

export function getPhotos(srcs: string[]): Photo[] {
  return srcs.map((src) => {
    const photo = allPhotos.find((p) => p.src === src);
    if (!photo) throw new Error(`Unknown photo ${src}`);
    return photo;
  });
}

export function getFaqsByQuestions(questions: string[]) {
  return faqs.filter((f) => questions.includes(f.q));
}
