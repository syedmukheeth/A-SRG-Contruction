/**
 * Static, typed company data for A SRG Construction.
 * Shaped to swap to a CMS later with no component changes.
 */

/** Unsplash image URL builder (swap host/source when real photography lands). */
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const site = {
  name: "A SRG Construction",
  legalName: "A SRG Construction",
  tagline: "We don't build houses. We build legacies.",
  description:
    "A SRG Construction — 46 years of civil contracting, centering works, and premium residential & commercial construction in Kurnool, Andhra Pradesh.",
  yearsOfExperience: 46,
  url: "https://asrgconstruction.com",
  email: "hello@asrgconstruction.com",
  phone: "+91 00000 00000",
  location: {
    city: "Kurnool",
    region: "Andhra Pradesh",
    country: "IN",
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
    image: img("1570168007204-dfb528c6958f"),
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    blueprint: "Plan B-04",
    summary: "Workspaces and retail built to command presence.",
    image: img("1449157291145-7efd050a4d0e"),
  },
  {
    id: "civil",
    title: "Civil Contracting",
    blueprint: "Plan C-12",
    summary: "Infrastructure executed with precision and scale.",
    image: img("1503387762-592deb58ef4e"),
  },
  {
    id: "centering",
    title: "Centering Works",
    blueprint: "Plan D-07",
    summary: "Formwork and structural shuttering, done right.",
    image: img("1504307651254-35680f356dfd"),
  },
  {
    id: "renovation",
    title: "Renovation",
    blueprint: "Plan E-03",
    summary: "Old structures, reimagined and restored.",
    image: img("1582510003544-4d00b7f74220"),
  },
  {
    id: "consultation",
    title: "Consultation",
    blueprint: "Plan F-09",
    summary: "Strategy from site survey to handover.",
    image: img("1598977123118-4e30ba3c4f5b"),
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

export const projects = [
  {
    id: "the-ridgeline",
    title: "The Ridgeline Residence",
    category: "Residential",
    year: "2024",
    location: "Kurnool",
    area: "6,200 sq ft",
    accent: "#C7853E",
    image: img("1600585154340-be6161a56a0c"),
  },
  {
    id: "meridian-tower",
    title: "Meridian Commercial Tower",
    category: "Commercial",
    year: "2023",
    location: "Kurnool",
    area: "48,000 sq ft",
    accent: "#7E8CA0",
    image: img("1449157291145-7efd050a4d0e"),
  },
  {
    id: "courtyard-villa",
    title: "Courtyard Villa",
    category: "Residential",
    year: "2022",
    location: "Andhra Pradesh",
    area: "8,900 sq ft",
    accent: "#9A6A3C",
    image: img("1600596542815-ffad4c1539a9"),
  },
  {
    id: "civic-precinct",
    title: "Civic Precinct Works",
    category: "Civil",
    year: "2021",
    location: "Kurnool",
    area: "2.1 acres",
    accent: "#6F7A6A",
    image: img("1503387762-592deb58ef4e"),
  },
] as const;

export type Project = (typeof projects)[number];

export const testimonials = [
  {
    id: "rao",
    owner: "Venkat Rao",
    project: "The Ridgeline Residence",
    year: "2024",
    quote:
      "They treated our home like their own legacy. Forty-six years of craft showed in every joint and every finish.",
    accent: "#C7853E",
    image: img("1564013799919-ab600027ffc6"),
  },
  {
    id: "lakshmi",
    owner: "Lakshmi Reddy",
    project: "Courtyard Villa",
    year: "2022",
    quote:
      "On time, on budget, and beyond what we imagined. The courtyard alone changed how our family lives.",
    accent: "#9A6A3C",
    image: img("1541888946425-d81bb19240f5"),
  },
  {
    id: "imran",
    owner: "Imran Sheikh",
    project: "Meridian Commercial Tower",
    year: "2023",
    quote:
      "Complex commercial scope, zero drama. Their structural discipline is the reason we lease at a premium.",
    accent: "#7E8CA0",
    image: img("1600566753190-17f0baa2a6c3"),
  },
] as const;

export type Testimonial = (typeof testimonials)[number];

export const gallery = [
  { id: "g1", caption: "Cast-in-place concrete", span: "tall", image: img("1581092160562-40aa08e78837") },
  { id: "g2", caption: "Structural steel frame", span: "wide", image: img("1504307651254-35680f356dfd") },
  { id: "g3", caption: "Glass curtain wall", span: "", image: img("1487958449943-2429e8be8625") },
  { id: "g4", caption: "Timber & finishes", span: "", image: img("1600607687939-ce8a6c25118c") },
  { id: "g5", caption: "Foundation works", span: "wide", image: img("1416331108676-a22ccb276e35") },
  { id: "g6", caption: "Handover detail", span: "tall", image: img("1512917774080-9991f1c4c750") },
] as const;

export type GalleryItem = (typeof gallery)[number];

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "Kurnool and across Andhra Pradesh. For landmark projects we mobilise statewide.",
  },
  {
    q: "Do you handle design as well as construction?",
    a: "Yes — survey, architecture, structural drawings, approvals and execution under one roof.",
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
