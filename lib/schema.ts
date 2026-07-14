import { site, testimonials, type Service } from "./site";

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

/** Root Organization/LocalBusiness node — emitted once, in the root layout. */
export function organizationNode() {
  return {
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    image: `${site.url}${site.ownerImage}`,
    logo: `${site.url}/icon`,
    email: site.email,
    telephone: site.phone,
    priceRange: "₹₹",
    foundingDate: String(new Date().getFullYear() - site.yearsOfExperience),
    founder: {
      "@type": "Person",
      name: site.owner,
      jobTitle: site.ownerTitle,
    },
    areaServed: [
      { "@type": "City", name: site.location.city },
      { "@type": "State", name: site.location.region },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.address,
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.geo.latitude,
      longitude: site.location.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(testimonials.length),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.owner },
      reviewBody: t.quote,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    })),
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
    description: site.description,
    publisher: { "@id": orgId },
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
