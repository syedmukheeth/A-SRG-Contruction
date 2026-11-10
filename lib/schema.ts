import { site, services, projects, traders, mapsHref, type Service } from "./site";

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

const sameAs = site.profiles;

/** Several real project photos per entity, per Google's local-business guidance. */
const orgImages = [
  `${site.url}${site.ownerImage}`,
  ...projects.slice(0, 6).map((p) => `${site.url}${p.image}`),
];

/** Root Organization/LocalBusiness node — emitted once, in the root layout. */
export function organizationNode() {
  return {
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.alternateNames,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    ...(sameAs.length ? { sameAs } : {}),
    image: orgImages,
    logo: `${site.url}/images/brand/asrg-logo-512.png`,
    email: site.email,
    telephone: site.phone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone,
        email: site.email,
        areaServed: site.location.country,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: site.phoneAlt,
        areaServed: site.location.country,
      },
    ],
    foundingDate: String(site.established),
    founder: {
      "@type": "Person",
      name: site.owner,
      jobTitle: site.ownerTitle,
    },
    // Kurnool first, then the towns the site team actually covers. Naming them
    // individually is what lets the entity surface for "construction company in
    // Nandyal / Adoni" style queries instead of only the Kurnool ones.
    areaServed: [
      { "@type": "City", name: site.location.city },
      ...site.location.nearbyTowns.map((name) => ({ "@type": "City", name })),
      { "@type": "State", name: site.location.region },
    ],
    // Every service as one catalog, each pointing at its own page. Gives Google
    // the full service surface of the business from the root document.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Construction services in ${site.location.city}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${site.url}/services/${s.slug}/#service`,
          name: `${s.title} in ${site.location.city}`,
          description: s.summary,
          url: `${site.url}/services/${s.slug}`,
        },
      })),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.address,
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      postalCode: site.location.postalCode,
      addressCountry: site.location.country,
    },
    hasMap: mapsHref,
    // No aggregateRating/review on purpose: Google treats self-published reviews
    // as self-serving and can disqualify the whole markup.
    subOrganization: {
      "@type": "HardwareStore",
      name: traders.name,
      description: traders.what,
      telephone: traders.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: traders.address,
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
    },
    knowsAbout: [
      "Civil Contracting",
      "Centering Works",
      "Residential Construction",
      "Commercial Construction",
      "Renovation",
      "Construction Consultation",
    ],
  } as const;
}

/** Root WebSite node — emitted once, alongside the organization node. */
export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    alternateName: site.alternateNames,
    description: site.description,
    publisher: { "@id": orgId },
    inLanguage: "en-IN",
  } as const;
}

/** WebPage node for a standalone landing page, tied back to the organization. */
export function webPageNode(page: { name: string; description: string; url: string }) {
  return {
    "@type": "WebPage",
    "@id": `${page.url}/#webpage`,
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    inLanguage: "en-IN",
  } as const;
}

/** Breadcrumb node for any page; items are ordered Home → ... → current. */
export function breadcrumbNode(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

/** FAQPage node from a subset (or all) of the faqs array. */
export function faqNode(items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } as const;
}

/** Service node for a single service, referencing the organization as provider. */
export function serviceNode(service: Service) {
  return {
    "@type": "Service",
    "@id": `${site.url}/services/${service.slug}/#service`,
    name: service.title,
    description: service.summary,
    provider: { "@id": orgId },
    areaServed: {
      "@type": "City",
      name: site.location.city,
    },
    url: `${site.url}/services/${service.slug}`,
  } as const;
}

/** Article node for a blog post. */
export function articleNode(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return {
    "@type": "Article",
    "@id": `${site.url}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  } as const;
}

/** Composes a page's JSON-LD nodes into a single @graph script payload. */
export function pageGraph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
