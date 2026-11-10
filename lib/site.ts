/**
 * Static, typed company data for ASRG Construction.
 *
 * Rule for this file: only facts that can be pointed at — a photo, a flyer,
 * a review, or something the owner confirmed. No invented counts, quotes,
 * timelines or awards.
 *
 * Brand name is always "ASRG Construction" (correct spelling). The
 * "asrgcontruction.com" domain's missing "s" is a URL-only quirk and must
 * never leak into visible copy, schema `name` fields, or alt text.
 */

/** Owner-confirmed founding year; everything else counts from it. */
const established = 1980;
const yearsOfExperience = new Date().getFullYear() - established;

export const site = {
  name: "ASRG Construction",
  legalName: "ASRG Construction",
  owner: "Jeelani Shaik",
  ownerShort: "S. Jeelani",
  ownerTitle: "Civil Contractor",
  /** Verbatim from the company flyer: "S. Jeelani, Civil Contractor". */
  ownerTelugu: "ఎస్. జిలాని, సివిల్ కాంట్రాక్టర్",
  ownerImage: "/images/owner/jeelani-shaik.jpg",
  tagline: `Civil contractor in Kurnool for ${yearsOfExperience} years`,
  description: `ASRG Construction is Jeelani Shaik's civil contracting firm in Kurnool, Andhra Pradesh: houses, shops and multi-storey blocks, from footings to handover, for ${yearsOfExperience} years.`,
  yearsOfExperience,
  established,
  /**
   * The www host is the one the server answers on; the bare domain 308s to it.
   * Canonicals, sitemap and schema must name the host that returns 200, or
   * Google indexes the site under both and splits its signals.
   */
  url: "https://www.asrgcontruction.com",
  /**
   * Google Search Console "HTML tag" token (the `content` value only). Public
   * by nature: it is printed in every page's <head>. Empty until verified.
   */
  googleSiteVerification: "" as string,
  email: "jelanisrg@gmail.com",
  phone: "+91 93962 86289",
  phoneAlt: "+91 95056 37863",
  whatsapp: "919396286289",
  /**
   * Every name this business is searched by, fed to schema.org `alternateName`.
   * Visible copy only ever uses site.name.
   */
  alternateNames: [
    "ASRG",
    "ASRG Constructions",
    "ASRG Contruction",
    "SRG Constructions",
    "SRG Construction",
    "A.S.R.G. Construction",
  ],
  /** Off-site profiles for schema.org `sameAs`. Add each URL only once it is verified. */
  profiles: [] as string[],
  location: {
    city: "Kurnool",
    region: "Andhra Pradesh",
    country: "IN",
    /** Street only; city and region are their own fields. */
    address: "Netaji Talkies Road, Gafooria Masjid Line",
    /** As printed on the business's Google Maps listing. */
    postalCode: "518004",
    nearbyTowns: ["Nandyal", "Adoni", "Dhone", "Yemmiganur", "Nandikotkur"],
  },
} as const;

export const tel = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  `Hi ${site.name}, I'd like to talk about a build.`,
)}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${site.location.address}, ${site.location.city}`,
)}`;

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Site-diary caption, e.g. the camera's own date stamp. */
  stamp?: string;
}

export const heroPhoto: Photo = {
  src: "/images/site/column-cages.jpg",
  alt: "Rows of reinforced concrete columns curing on a red-soil building site in Kurnool under a clear sky",
  width: 1600,
  height: 598,
  stamp: "19.03.2026 · 08:35 · Kurnool",
};

/** Jeelani on the deck before a pour. Only 720px wide: never stretch it full-bleed on desktop. */
export const heroPortrait: Photo = {
  src: "/images/site/jeelani-on-slab.jpg",
  alt: "Jeelani Shaik, owner of ASRG Construction, seated on the rebar deck of a Kurnool site before a slab pour",
  width: 720,
  height: 1024,
  stamp: "On the deck before a pour",
};

/** Kurnool city centre, for the hero's site-board stamp. */
export const coordinates = "15.83° N · 78.04° E";

/** The homepage story, in the order a building actually goes up. */
export interface Chapter {
  id: string;
  label: string;
  title: string;
  body: string;
  photos: Photo[];
}

export const chapters: Chapter[] = [
  {
    id: "ground",
    label: "Ground",
    title: "It starts in red soil.",
    body: "Kurnool's red earth, a heap of gravel and a grid of columns rising out of the footings, wrapped in gunny cloth while the concrete cures. Nothing above ground is better than what goes in here.",
    photos: [
      {
        src: "/images/site/footings-red-soil.jpg",
        alt: "Column reinforcement rising from fresh footings on a red-soil plot in Kurnool, columns wrapped for curing",
        width: 1600,
        height: 598,
        stamp: "19.03.2026 · 08:25 · Kurnool",
      },
    ],
  },
  {
    id: "steel",
    label: "Steel",
    title: "Steel, then concrete.",
    body: "The slab deck is tied bar by bar and the concrete goes in through a pump line. Jeelani sits out on the deck for the pour, where he can see every bay.",
    photos: [
      {
        src: "/images/site/crew-slab-pour.jpg",
        alt: "ASRG crew fixing column steel during a slab pour while Jeelani Shaik supervises from the deck",
        width: 1568,
        height: 618,
        stamp: "Slab pour · Kurnool",
      },
    ],
  },
  {
    id: "frame",
    label: "Frame",
    title: "Then the frame goes up.",
    body: "Scaffolding wraps the whole block. Plaster goes on floor by floor, and a crane swings finished window frames up to the slab while the team guides them in by hand.",
    photos: [
      {
        src: "/images/site/scaffold-block.jpg",
        alt: "Multi-storey block in Kurnool wrapped in red scaffolding during plastering",
        width: 1600,
        height: 598,
        stamp: "25.04.2026 · 18:08 · Kurnool",
      },
      {
        src: "/images/site/crane-frame-lift.jpg",
        alt: "Crane lifting a large timber window frame onto a building while the ASRG team guides it from the slab",
        width: 575,
        height: 1050,
        stamp: "Frame lift",
      },
    ],
  },
  {
    id: "finish",
    label: "Finish",
    title: "The part people see.",
    body: "Stone cladding, wood-finish ceilings, textured wall coats. Same team that poured the slab, still on site for the last coat.",
    photos: [
      {
        src: "/images/site/black-stone-facade.jpg",
        alt: "Black stone cladding, wood-finish ceilings and glass on a Kurnool residence nearing completion",
        width: 1152,
        height: 864,
        stamp: "Facade · finishing stage",
      },
      {
        src: "/images/site/texture-wall-finish.jpg",
        alt: "Close-up of a textured grey wall finish with vertical grooves on a balcony",
        width: 1200,
        height: 1600,
        stamp: "Texture coat",
      },
    ],
  },
  {
    id: "lights-on",
    label: "Lights on",
    title: "Lights on.",
    body: "Handover. The gates swing open, the ceiling lights come on, and the owner walks through every room.",
    photos: [
      {
        src: "/images/site/duplex-dusk.jpg",
        alt: "Completed two-storey house in Kurnool at dusk with ceiling lights on and glass balcony railings",
        width: 1440,
        height: 1080,
        stamp: "Kurnool",
      },
    ],
  },
];

export const handoverVideo = {
  src: "/media/handover-walkthrough.mp4",
  poster: "/media/handover-walkthrough-poster.jpg",
  label: "Handover walkthrough of a finished ASRG house in Kurnool, filmed at night",
};

export const services = [
  {
    id: "residential",
    slug: "residential-construction",
    title: "Residential Construction",
    seoTitle: "House Construction & Home Builders in Kurnool",
    summary: "Independent houses, duplexes and multi-storey family homes, built from footings to handover.",
    image: "/images/proof/jeelani-mansion.jpg",
  },
  {
    id: "commercial",
    slug: "commercial-construction",
    title: "Commercial Construction",
    seoTitle: "Commercial Building Contractors in Kurnool",
    summary: "Shops and commercial blocks with the larger spans and heavier services they need.",
    image: "/images/proof/medical-complex.jpg",
  },
  {
    id: "civil",
    slug: "civil-contracting",
    title: "Civil Contracting",
    seoTitle: "Civil Contractors in Kurnool",
    summary: "Footings, columns, beams and slabs: the structural work everything else stands on.",
    image: "/images/site/crew-slab-pour.jpg",
  },
  {
    id: "centering",
    slug: "centering-works",
    title: "Centering Works",
    seoTitle: "Centering & Shuttering Contractors in Kurnool",
    summary: "Formwork and shuttering for slabs, beams and columns, as part of a build or on its own.",
    image: "/images/site/column-cages.jpg",
  },
  {
    id: "renovation",
    slug: "renovation",
    title: "Renovation",
    seoTitle: "House Renovation & Remodelling in Kurnool",
    summary: "Repair and refit of existing buildings, starting from what the structure actually needs.",
    image: "/images/proof/gallery-ceiling-lighting.jpg",
  },
  {
    id: "consultation",
    slug: "consultation",
    title: "Consultation",
    seoTitle: "Construction Consultation & Site Visit in Kurnool",
    summary: "A site visit and a straight answer on scope and budget before you commit to anything.",
    image: "/images/site/arch-villa-render.jpg",
  },
] as const;

export type Service = (typeof services)[number];

export interface Project {
  id: string;
  title: string;
  category: "Residential" | "Commercial";
  /** Storey count, read off the photo. */
  storeys?: string;
  image: string;
  width: number;
  height: number;
  stamp?: string;
  /** Set only for entries with a genuine in-progress → complete pair. */
  beforeImage?: string;
}

/** Real work, real photos. */
export const projects: Project[] = [
  {
    id: "jeelani-mansion",
    title: "Jeelani Mansion",
    category: "Residential",
    storeys: "G+4",
    image: "/images/proof/jeelani-mansion.jpg",
    width: 577,
    height: 1280,
  },
  {
    id: "lattice-tower",
    title: "Lattice-front residence",
    category: "Residential",
    storeys: "G+3",
    image: "/images/site/lattice-tower-night.jpg",
    width: 719,
    height: 1488,
    stamp: "Night before handover",
  },
  {
    id: "twin-tone-bungalow",
    title: "Twin-tone house",
    category: "Residential",
    storeys: "G+1",
    image: "/images/proof/twin-tone-bungalow-after.jpg",
    beforeImage: "/images/proof/twin-tone-bungalow-before.jpg",
    width: 960,
    height: 1280,
  },
  {
    id: "garden-house",
    title: "Garden house",
    category: "Residential",
    storeys: "G+2",
    image: "/images/site/garden-house.jpg",
    width: 1600,
    height: 590,
    stamp: "29.06.2026 · Kurnool",
  },
  {
    id: "corner-house",
    title: "Corner house",
    category: "Residential",
    storeys: "G+1",
    image: "/images/site/corner-house-dusk.jpg",
    width: 720,
    height: 1050,
    stamp: "Dusk, first lights",
  },
  {
    id: "tree-mural-villa",
    title: "Tree-mural house",
    category: "Residential",
    storeys: "G+2",
    image: "/images/proof/tree-mural-villa.jpg",
    width: 1080,
    height: 1209,
  },
  {
    id: "night-porch-house",
    title: "Porch-lit house",
    category: "Residential",
    image: "/images/site/night-porch-house.jpg",
    width: 1600,
    height: 605,
    stamp: "08.06.2026 · 19:15 · Kurnool",
  },
  {
    id: "charcoal-elevation",
    title: "Charcoal and glass elevation",
    category: "Residential",
    storeys: "G+3",
    image: "/images/proof/charcoal-elevation.jpg",
    width: 720,
    height: 1600,
  },
  {
    id: "medical-complex",
    title: "Medical complex",
    category: "Commercial",
    storeys: "G+2",
    image: "/images/proof/medical-complex.jpg",
    width: 720,
    height: 1280,
  },
];

/** The one review on record, quoted verbatim from Justdial. */
export const review = {
  author: "Abdul",
  source: "Justdial",
  date: "Jan 2026",
  quote:
    "Quick service, flexible appointments, and reasonably priced work. Speedy response, cost efficient, and an easily understandable quotation. My experience with SRG Constructions was exceptional.",
};

/** Design visuals, never presented as built work. */
export const renders: Photo[] = [
  {
    src: "/images/site/arch-villa-render.jpg",
    alt: "Design render of a single-storey house with arched panels, wood cladding and a carport",
    width: 1600,
    height: 914,
    stamp: "Design render · single storey",
  },
  {
    src: "/images/site/louvre-g2-render.jpg",
    alt: "Design render of a G+2 house with timber louvres, stone-textured column and stilt parking",
    width: 2000,
    height: 1466,
    stamp: "Design render · G+2 with stilt parking",
  },
];

/** From the company flyer: villas 94, 95 and 96 on 30×40 plots. */
export const villaRow = { villas: ["94", "95", "96"], plot: "30 × 40" };

export const interiors: Photo[] = [
  {
    src: "/images/proof/gallery-kitchen-fitout.jpg",
    alt: "Finished modular kitchen with granite counter in an ASRG house",
    width: 1512,
    height: 1006,
    stamp: "Kitchen fit-out",
  },
  {
    src: "/images/proof/gallery-ceiling-lighting.jpg",
    alt: "Finished interior corridor with a wood-panel false ceiling and lighting",
    width: 1512,
    height: 1006,
    stamp: "False ceiling · interior",
  },
  {
    src: "/images/site/handover-gate.jpg",
    alt: "Entrance gates and patterned feature wall of a finished ASRG house",
    width: 848,
    height: 478,
    stamp: "Entrance · handover day",
  },
];

/** Sister business, from the ASRG Traders flyer. */
export const traders = {
  name: "ASRG Traders",
  what: "Paints, sanitary, hardware & electricals",
  address: "Yelkur Estate, Nandikotkur Road, beside D-Mart, Kurnool",
  contact: "Altaf Shaik",
  phone: "+91 91777 75367",
  brands: ["Asian Paints", "Berger", "Parryware", "Anchor by Panasonic"],
  image: "/images/proof/asrg-traders-exterior.jpg",
};

export const faqs = [
  {
    q: "Which areas do you build in?",
    a: `Kurnool city and the towns around it, including ${site.location.nearbyTowns.join(", ")}.`,
  },
  {
    q: "Do you take only civil or centering work?",
    a: "Yes. Footings, structure and centering are taken on their own as well as part of a full build.",
  },
  {
    q: "Do you build shops and commercial blocks, or only homes?",
    a: "Both. Houses are most of the work, alongside shops and commercial buildings like the medical complex shown on this site.",
  },
  {
    q: "Can I see finished work before I decide?",
    a: "Yes. Every building on this site stands in Kurnool. Call and ask to see one that matches what you want to build.",
  },
  {
    q: "How do I get a quote?",
    a: `Call ${site.phone} or send a WhatsApp message. A quote starts with a site visit, because the plot decides the foundation and the foundation decides the cost.`,
  },
  {
    q: "Do you sell building materials too?",
    a: "Yes. ASRG Traders on Nandikotkur Road, beside D-Mart, sells paints, sanitaryware, hardware and electricals.",
  },
  {
    q: "Do you build duplex houses and villas in Kurnool?",
    a: "Yes. Independent houses, duplexes, villas and multi-storey family homes are most of what ASRG Construction builds in Kurnool, from footings to handover.",
  },
  {
    q: "Who runs ASRG Construction?",
    a: `${site.owner}, a civil contractor who has been building in ${site.location.city} since ${site.established}.`,
  },
  {
    q: "Where is ASRG Construction in Kurnool?",
    a: `On ${site.location.address}, ${site.location.city}, ${site.location.region}. Call ${site.phone} to fix a time to meet.`,
  },
] as const;

export type Faq = (typeof faqs)[number];
