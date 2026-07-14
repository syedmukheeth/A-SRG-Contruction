import { services, projects, faqs, site } from "./site";

export interface ServiceContent {
  slug: string;
  intro: string[];
  included: string[];
  process: string;
  local: string;
  featured: { projectIds: string[]; note: string };
  faqQuestions: string[];
  related: string[];
}

const { city, region } = site.location;

export const serviceContent: Record<string, ServiceContent> = {
  "residential-construction": {
    slug: "residential-construction",
    intro: [
      `Residential construction is where ASRG Construction started, and it's still the work the company is best known for in ${city}. Villas, independent houses and multi-storey family homes across ${region} have gone up under the same site team for ${site.yearsOfExperience} years: not a rotating cast of subcontractors, but people who know the soil, the suppliers and the local approval process.`,
      `A residential build is a long relationship. It runs from the first site visit to the day keys are handed over. Every decision in between, foundation depth, slab thickness, wiring layout, finish quality, compounds over the decades a family lives in the house. ASRG Construction treats each one as a structure meant to outlast the people who commissioned it, not just meet the handover date.`,
    ],
    included: [
      "Site survey and soil assessment before design begins",
      "Architectural planning and structural drawings, in-house",
      "Local approvals and documentation handled on your behalf",
      "Foundation, superstructure and slab work to engineered specification",
      "Electrical and plumbing rough-in coordinated with the build schedule, not bolted on after",
      "Plaster, flooring, joinery and paint finishing",
      "Snagging and a clean handover with keys",
    ],
    process: `Every residential project runs the same eight-stage sequence: planning and feasibility, design and approvals, foundation, structure, roof, electrical and plumbing rough-in, finishing, and handover. For a home, the stages that matter most are foundation and structure. A villa built on a poorly assessed site will show it in five years, not fifty, so soil testing and footing design get more time here than on a straightforward commercial shed. Finishing is the other stage families care about most, since it's the part they touch every day: flooring, joinery, paint and fixture quality are agreed and priced before work starts, not decided mid-build.`,
    local: `${city} sits on a mix of rocky and alluvial soil typical of this part of ${region}, which changes footing design from plot to plot. That's a detail that only shows up if someone actually surveys the site rather than reusing a standard foundation plan. Building locally for ${site.yearsOfExperience} years means ASRG Construction has already seen most of what a ${city} plot can throw at a foundation crew, and prices and schedules residential work accordingly rather than padding every quote for the worst case.`,
    featured: {
      projectIds: ["jeelani-mansion", "netaji-facade", "tree-mural-villa"],
      note: `Jeelani Mansion (G+4), the Contemporary Residence on Netaji Road (G+3), and the Courtyard Villa (G+2) are three recent residential builds in ${city}, each a different scale and brief, all delivered by the same core team.`,
    },
    faqQuestions: [
      "How long does a typical residential build take?",
      "How do payments work?",
      "Why choose ASRG Construction?",
    ],
    related: ["civil-contracting", "renovation", "consultation"],
  },

  "commercial-construction": {
    slug: "commercial-construction",
    intro: [
      `Commercial construction carries different pressure than a home build: a retail unit or office that sits unfinished costs its owner rent, staff time and momentum every week it's delayed. ASRG Construction runs commercial projects in ${city} and across ${region} with the same eight-stage process used on residential work, but with schedule discipline weighted higher. A dated handover is agreed before the first brick, because a business opening is usually tied to it.`,
      `Workspaces and retail space also carry different structural and services demands than a house: larger clear spans, heavier electrical and MEP loads, and finishes chosen for durability under daily foot traffic rather than a family's taste. ASRG Construction's civil contracting and centering-works background, formwork and structural shuttering at scale, is what makes commercial spans possible without over-building the structure.`,
    ],
    included: [
      "Site survey and structural planning sized for commercial spans and loads",
      "Approvals and documentation for commercial-use structures",
      "Centering and formwork engineered for larger floor plates",
      "Structure and slab work built to commercial load specifications",
      "Commercial-grade electrical and MEP rough-in",
      "Durable finishing suited to retail or office foot traffic",
      "Handover coordinated against your opening date",
    ],
    process: `On a commercial job, the planning and design stages carry more weight up front. Clear spans, load calculations and MEP routing have to be right before foundation work starts, since retrofitting them into a commercial slab later is expensive and slow. Foundation and structure follow the same engineered approach as residential work, scaled to commercial loads, and centering works, ASRG Construction's own specialty, is what lets the structure stage move at commercial speed without cutting corners on the concrete work itself. Finishing is selected for durability first, appearance second, and handover is scheduled against a real opening date rather than a soft estimate.`,
    local: `${city} and the wider ${region} market has a steady flow of retail and small-office construction, and ASRG Construction prices commercial work with the area's real material and labour costs rather than a generic statewide rate card. A local contractor also means someone is reachable on-site within the hour if an approval query or a supplier delay needs resolving, not a regional office managing the job remotely.`,
    featured: {
      projectIds: ["asrg-traders-showroom", "medical-complex"],
      note: `The ASRG Traders showroom and a medical complex, both in ${city}, are recent commercial builds delivered by the same site team and centering-works crew behind ASRG Construction's residential portfolio.`,
    },
    faqQuestions: [
      "Do you build commercial and industrial projects, or only homes?",
      "How do payments work?",
      "Do you provide turnkey construction projects?",
    ],
    related: ["civil-contracting", "centering-works", "consultation"],
  },

  "civil-contracting": {
    slug: "civil-contracting",
    intro: [
      `Civil contracting is infrastructure work: the part of construction that doesn't always get photographed but is what everything else stands on. ASRG Construction takes civil contracts in ${city} and across ${region} at any scale, standalone or as part of a larger residential or commercial build, with the same quality controls either way.`,
      `Because ASRG Construction runs its own centering and formwork crews rather than subcontracting them out, civil work here isn't handed between three different companies before it's finished. One team owns the excavation, the footings, the concrete pour and the structural work that follows, which is also why standalone civil contracts are accepted without requiring the client to also commission a full building.`,
    ],
    included: [
      "Site survey, feasibility and civil scope definition",
      "Excavation, footings and concrete pour",
      "Formwork and structural shuttering (see Centering Works)",
      "Structural columns, beams and slab work",
      "Coordination with architects or other contractors on mixed projects",
      "Quality-controlled concrete work to engineered specification",
    ],
    process: `Civil contracting draws most heavily on the planning, foundation and structure stages of ASRG Construction's build process. Planning here means a proper site survey and feasibility check before any excavation begins, since soil conditions in and around ${city} vary enough that assumptions from a different plot don't transfer safely. Foundation work is excavation, footings and concrete pour to specification, and structure covers the columns, beams and slabs that carry the load above. Because centering works is an in-house specialty rather than a subcontracted trade, formwork quality is controlled directly rather than inherited from whoever was cheapest that month.`,
    local: `Civil contracting demand in ${city} and across ${region} ranges from small residential footings to larger infrastructure and site-development work. ASRG Construction's ${site.yearsOfExperience} years locally means the team has priced and executed civil work across most of the soil and site conditions this region presents, and can scope a civil contract accurately from a single site visit rather than a generic estimate.`,
    featured: {
      projectIds: [],
      note: `Civil contracting work is embedded inside every project ASRG Construction has photographed. The stone-clad elevation, the twin-tone bungalow, the ASRG Traders showroom and the medical complex all rest on foundations and structural work executed by the same civil crew profiled here. Dedicated civil-contracting project photography will be added as standalone contracts are documented.`,
    },
    faqQuestions: [
      "What about centering and civil contracting only?",
      "Do you handle design as well as construction?",
      "Why choose ASRG Construction?",
    ],
    related: ["centering-works", "commercial-construction", "residential-construction"],
  },

  "centering-works": {
    slug: "centering-works",
    intro: [
      `Centering works, formwork and structural shuttering, is the trade ASRG Construction's founder, ${site.owner}, built the company's early reputation on, and it's still taken on as a standalone contract, not just bundled into larger builds. Formwork quality is invisible once the concrete cures, which is exactly why it's easy for it to be done poorly: nobody sees a weak shutter until the pour goes wrong.`,
      `ASRG Construction runs centering and formwork crews as an in-house team rather than a subcontracted trade, on projects of any scale across ${city} and ${region}, from a single residential footing to structural shuttering on a larger commercial or civil contract.`,
    ],
    included: [
      "Formwork design for footings, columns, beams and slabs",
      "Structural shuttering sized to load and pour sequence",
      "On-site formwork assembly and quality checks before every pour",
      "Standalone centering contracts, independent of a full build",
      "Centering works as part of a larger residential, commercial or civil contract",
    ],
    process: `Centering works sits inside the foundation and structure stages of a build, but it's specialised enough that ASRG Construction treats it as its own discipline: formwork has to be designed for the specific pour, not reused generically, and checked before concrete goes in rather than after a problem shows. On a standalone centering contract, the process is planning (scope and load requirements), formwork design and assembly, pre-pour inspection, and handover of the shuttered structure to whichever team executes the concrete pour. That's often ASRG Construction's own civil crew, sometimes a client's separate contractor.`,
    local: `${city}'s construction sector has enough independent contractors and small builders that standalone centering and formwork subcontracts are common, and enough variability in formwork quality that it's a frequent point of failure on projects not run by ASRG Construction. Decades of centering work across ${region} means the shuttering designs used here have already been tested against the loads and pour conditions local sites actually produce.`,
    featured: {
      projectIds: [],
      note: `Every project in ASRG Construction's portfolio, from the stone-clad elevation to the ASRG Traders showroom, was shuttered by this same centering-works team before a single wall went up. Standalone centering-contract photography will be added as those projects are documented separately.`,
    },
    faqQuestions: [
      "What about centering and civil contracting only?",
      "Why choose ASRG Construction?",
      "How do payments work?",
    ],
    related: ["civil-contracting", "residential-construction", "commercial-construction"],
  },

  renovation: {
    slug: "renovation",
    intro: [
      `Renovation work in ${city} usually starts with a structure that's aged, damaged, or simply outgrown its original layout, and it needs a contractor willing to properly assess what's actually there before proposing what to do about it. ASRG Construction takes on structural assessment and remedial work first, then finishing, rather than jumping straight to cosmetic changes over unresolved structural issues.`,
      `A renovation is judged by a different standard than a new build: the finished result has to work with what already exists (an existing foundation, an existing structural grid, existing services) rather than a blank plot. That constraint is exactly why ASRG Construction's centering-works and civil-contracting background is useful here: structural remediation, underpinning or reinforcement is the same discipline as new-build structural work, just applied to an older structure.`,
    ],
    included: [
      "Structural assessment of the existing building",
      "Remedial structural works where needed",
      "Updated electrical and plumbing where the existing services are outdated",
      "Finishing (plaster, flooring, joinery and paint) to the same standard as new-build work",
      "Renovation carried out under the same quality controls as ground-up construction",
    ],
    process: `Renovation compresses ASRG Construction's usual eight-stage process into whichever stages the existing structure actually needs. Planning starts with an honest structural assessment rather than an assumption that the existing building is sound; if remedial structural work is required, it follows the same foundation-and-structure discipline as a new build. From there, electrical, plumbing and finishing proceed as they would on any project. The difference is working around occupied or partially standing structures rather than an empty plot, which changes sequencing more than it changes the quality bar.`,
    local: `${city} has a meaningful stock of older residential and commercial structures, some decades old, that were built before current standards for waterproofing, electrical load or structural reinforcement became common. Renovation demand here tends to follow visible damage (cracking, water ingress, outdated wiring) rather than pure aesthetic preference, and ASRG Construction assesses each one on the structure's actual condition rather than assuming a standard package applies.`,
    featured: {
      projectIds: [],
      note: `ASRG Construction's photographed portfolio to date covers new-build work; renovation projects draw on the same structural and finishing team behind every completed project shown here. Renovation-specific project photography will be added as completed projects are documented.`,
    },
    faqQuestions: [
      "What is included in your renovation service?",
      "How do payments work?",
      "Can I get a consultation before committing to a project?",
    ],
    related: ["consultation", "civil-contracting", "residential-construction"],
  },

  consultation: {
    slug: "consultation",
    intro: [
      `Not every project starts with a confirmed brief. Consultation is where ASRG Construction works through site survey, feasibility and strategy with a client before committing to a full construction contract, so the budget, timeline and scope are clear before ground is broken, not discovered halfway through.`,
      `Because ASRG Construction handles design, architecture and structural drawings in-house rather than outsourcing them, consultation isn't a sales conversation before handing the client to a separate design firm. It's the same team that will run the eventual build, thinking through the project from the start.`,
    ],
    included: [
      "Site survey and feasibility assessment",
      "Budget planning based on real local material and labour costs",
      "Architectural and structural strategy before committing to a full contract",
      "Guidance on approvals and documentation requirements",
      "A clear, dated project plan handed over at the end of consultation",
    ],
    process: `Consultation is effectively the planning and design stages of ASRG Construction's build process, offered on their own before a client commits to the remaining six stages. A site survey establishes what the plot and soil actually allow; feasibility and budget discussion follows from that survey rather than a generic price list; and structural or architectural strategy is worked out enough that a client can decide, with real numbers, whether and how to proceed to foundation work and beyond.`,
    local: `${city} and the surrounding ${region} market has enough variation in soil, plot size and local approval requirements that a consultation grounded in an actual site visit is worth more than a remote estimate. ASRG Construction's ${site.yearsOfExperience} years of building locally means consultation advice reflects what has actually worked on comparable plots nearby, not general construction theory.`,
    featured: {
      projectIds: [],
      note: `Every project in ASRG Construction's portfolio, from Jeelani Mansion to the ASRG Traders showroom, began with the same site-survey and planning process offered here as a standalone consultation service.`,
    },
    faqQuestions: [
      "Can I get a consultation before committing to a project?",
      "Do you handle design as well as construction?",
      "Why choose ASRG Construction?",
    ],
    related: ["residential-construction", "renovation", "civil-contracting"],
  },
};

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedProjects(ids: string[]) {
  return projects.filter((p) => ids.includes(p.id));
}

export function getFaqsByQuestions(questions: string[]) {
  return faqs.filter((f) => questions.includes(f.q));
}
