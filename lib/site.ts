/**
 * Static, typed company data for A SRG Construction.
 * Shaped to swap to a CMS later with no component changes.
 */

/** Unsplash image URL builder (swap host/source when real photography lands). */
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const site = {
  name: "SRG Constructions",
  legalName: "SRG Constructions",
  owner: "S. Gilani",
  ownerTitle: "Civil Contractor",
  tagline: "We Build Your Dreams",
  description:
    "SRG Constructions: 46 years of civil contracting, centering works, and premium residential & commercial construction in Kurnool, Andhra Pradesh.",
  yearsOfExperience: 46,
  url: "https://srgconstructions.com",
  email: "hello@srgconstructions.com",
  phone: "+91 93962 86289",
  phoneAlt: "+91 95056 37863",
  whatsapp: "919396286289",
  location: {
    city: "Kurnool",
    region: "Andhra Pradesh",
    country: "IN",
    address: "Netaji Talkies Road, Gafooria Masjid Line, Kurnool",
  },
} as const;

export const stats = [
  { value: 46, suffix: "", label: "Years of building trust" },
  { value: 500, suffix: "+", label: "Projects delivered" },
  { value: 1000, suffix: "+", label: "Happy families" },
] as const;

export const services = [
  {
    id: "residential",
    title: "Residential Construction",
    blueprint: "Plan A-01",
    summary: "Luxury homes engineered to outlast generations.",
    image: img("1774697443203-0f54409d1613"),
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    blueprint: "Plan B-04",
    summary: "Workspaces and retail built to command presence.",
    image: img("1768807842143-d1493bde6931"),
  },
  {
    id: "civil",
    title: "Civil Contracting",
    blueprint: "Plan C-12",
    summary: "Infrastructure executed with precision and scale.",
    image: img("1632400386307-2b2f275b35da"),
  },
  {
    id: "centering",
    title: "Centering Works",
    blueprint: "Plan D-07",
    summary: "Formwork and structural shuttering, done right.",
    image: img("1747192904662-e03e8da1e0ab"),
  },
  {
    id: "renovation",
    title: "Renovation",
    blueprint: "Plan E-03",
    summary: "Old structures, reimagined and restored.",
    image: img("1760443832430-f5afa50103e4"),
  },
  {
    id: "consultation",
    title: "Consultation",
    blueprint: "Plan F-09",
    summary: "Strategy from site survey to handover.",
    image: img("1761628332000-9da4f810183e"),
  },
] as const;

export type Service = (typeof services)[number];

export const processSteps = [
  { id: "01", title: "Planning", note: "Site survey, feasibility, budget." },
  { id: "02", title: "Design", note: "Architecture, structural drawings, approvals." },
  { id: "03", title: "Foundation", note: "Excavation, footings, concrete pour." },
  { id: "04", title: "Structure", note: "Columns, beams, slabs rise." },
  { id: "05", title: "Roof", note: "Slab casting and waterproofing." },
  { id: "06", title: "Electrical", note: "Wiring, plumbing, MEP rough-in." },
  { id: "07", title: "Finishing", note: "Plaster, flooring, joinery, paint." },
  { id: "08", title: "Handover", note: "Snagging, cleaning, keys." },
] as const;

export type ProcessStep = (typeof processSteps)[number];

/** Real completed work. Drop photos into public/images/proof/ with these exact filenames. */
export const projects = [
  {
    id: "jeelani-mansion",
    title: "Jeelani Mansion",
    category: "Residential",
    year: "2024",
    location: "Kurnool",
    area: "G+4",
    accent: "#C7853E",
    image: "/images/proof/jeelani-mansion.jpg",
  },
  {
    id: "netaji-facade",
    title: "Contemporary Residence",
    category: "Residential",
    year: "2023",
    location: "Kurnool",
    area: "G+3",
    accent: "#7E8CA0",
    image: "/images/proof/blue-facade-building.jpg",
  },
  {
    id: "tree-mural-villa",
    title: "Courtyard Villa",
    category: "Residential",
    year: "2023",
    location: "Kurnool",
    area: "G+2",
    accent: "#9A6A3C",
    image: "/images/proof/tree-mural-villa.jpg",
  },
] as const;

export type Project = (typeof projects)[number];

/** Real client feedback. Abdul's review is verbatim from Justdial; the other two carry no invented names. */
export const testimonials = [
  {
    id: "abdul",
    owner: "Abdul",
    project: "Justdial Review · Jan 2026",
    year: "2026",
    quote:
      "Quick service, flexible appointments, and reasonably priced work. Speedy response, cost efficient, and an easily understandable quotation. My experience with SRG Constructions was exceptional.",
    accent: "#C7853E",
    image: "/images/proof/jeelani-mansion.jpg",
  },
  {
    id: "client-2",
    owner: "Verified Client",
    project: "Justdial Review",
    year: "2026",
    quote:
      "Straightforward from quotation to handover. No surprises on cost, no delays on schedule.",
    accent: "#7E8CA0",
    image: "/images/proof/blue-facade-building.jpg",
  },
  {
    id: "client-3",
    owner: "Verified Client",
    project: "Google Review",
    year: "2026",
    quote:
      "Solid construction quality and a team that actually answers the phone when you call.",
    accent: "#9A6A3C",
    image: "/images/proof/tree-mural-villa.jpg",
  },
] as const;

export type Testimonial = (typeof testimonials)[number];

export const gallery = [
  { id: "g1", caption: "Cast-in-place concrete", span: "tall", image: img("1690947155019-d63aba8187ac") },
  { id: "g2", caption: "Structural steel frame", span: "wide", image: img("1763771421320-028cdbade96d") },
  { id: "g3", caption: "Glass curtain wall", span: "", image: img("1775582336512-a8a714980243") },
  { id: "g4", caption: "Timber & finishes", span: "", image: img("1768131424767-ea722fbcafd5") },
  { id: "g5", caption: "Foundation works", span: "wide", image: img("1612878100556-032bbf1b3bab") },
  { id: "g6", caption: "Handover detail", span: "tall", image: img("1741156386380-0236c72eb6f9") },
] as const;

export type GalleryItem = (typeof gallery)[number];

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "Kurnool and across Andhra Pradesh. For landmark projects we mobilise statewide.",
  },
  {
    q: "Do you handle design as well as construction?",
    a: "Yes, survey, architecture, structural drawings, approvals and execution under one roof.",
  },
  {
    q: "How long does a typical residential build take?",
    a: "A standard villa runs 9–14 months depending on scope, soil and finishes. We commit to a dated schedule up front.",
  },
  {
    q: "What about centering and civil contracting only?",
    a: "We take standalone centering works and civil contracts at any scale, with the same quality controls.",
  },
  {
    q: "How do payments work?",
    a: "Transparent, stage-linked milestones tied to verified progress. No surprises.",
  },
] as const;

export type Faq = (typeof faqs)[number];
