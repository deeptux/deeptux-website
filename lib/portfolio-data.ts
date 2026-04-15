export const brand = {
  name: "DEEPTUX IT SOLUTIONS",
  tagline: "Tailored Tech. Professional Depth. Solutions that fit.",
  founded: "March 2025",
  location: "Megaworld Capital Town, City of San Fernando, Pampanga, Philippines",
  preparedBy: "Engr. Mhel Handrian A. Pineda",
};

/** Hero intro — brief; full story lives in following sections */
export const heroLead =
  "We ship secured e‑commerce, bespoke business systems, IoT & field security for brands delivering international-grade. Led by Engr. Mhel Handrian Pineda, Full Stack Solutions Architect & Electronics R&D lead w/ deep fintech, insurance & IoT experience. Focuses on outcomes you can run in prod, not pitch decks.";

export const founder = {
  title: "Full Stack Software Engineer & Electronics R&D Specialist",
  summary:
    "Nearly a decade across fintech, insurance, outsourcing & IoT, translating complex stacks into practical delivery w/industry-standard practices.",
  stack: ["React", "Next.js", "FastAPI", "AWS", "IoT", "AI"],
  highlights: [
    // "CITCO",
    // "Alliant Insurance Services",
    // "MVP Asia Pacific",
    // "Ramcar (embedded IoT)",
  ],
};

export const about = {
  background:
    "Home for professional BPO talent & IT specialists delivering secured, tech-forward business solutions. From e-commerce & bespoke systems to mobile, network & IoT integration w/an eye toward smart townships & better lives through technology.",
  vision:
    "Transform people’s lives & businesses into premier smart-driven technology on world-class systems powered by Filipino craftsmanship & DeepTux innovation.",
  mission:
    "Harness elite local BPO & IT expertise to close tech gaps across Philippine industries through e-commerce excellence, bespoke application & secured IoT integration that moves from theory to measurable impact, building the digital infrastructure of the future at a five-star standard.",
};

export const services = [
  {
    id: "iot",
    title: "IoT systems & integration",
    body:
      "Smart infrastructure through sensor arrays & hardware, software integration that are data-driven, future-ready operations bridging physical & digital.",
  },
  {
    id: "web",
    title: "Websites & e-commerce",
    body:
      "Brand sites, storefronts & automations tied to social channels & on-the-ground operations.",
  },
  {
    id: "apps",
    title: "Custom app & cloud deploys",
    body:
      "SaaS, mobile & business systems on secured cloud, bespoke integration, automation & AI where it matters.",
  },
  {
    id: "security",
    title: "Security & automations",
    body:
      "Remote access, proactive surveillance & automation that turns standard security into a responsive guardian for your business.",
  },
] as const;

export const liveWebsites = [
  { name: "Pueblo de Oro Development Corporation", href: "https://pueblodeoro.com" },
  { name: "Juan Carlo", href: "https://juancarlo.ph/" },
  { name: "Ralph's Wines & Spirits", href: "https://ralphs.com.ph/" },
  { name: "Healthmax Care", href: "https://healthmaxcare.ph/" },
  { name: "Hanabishi", href: "https://myhanabishi.com/" },
  { name: "Overland Kings", href: "https://oklifestyle.club/" },
  { name: "Arctic", href: "https://arctic.ph/" },
] as const;

export const liveDemos = [
  {
    name: "Point-of-Sale/E-commerce",
    role: "Ordering & operations",
    href: "https://handrian.space/login",
  },
  {
    name: "Production Order Planner",
    role: "Production planning",
    href: "https://apptest-production-order-planner.vercel.app/", 
  },
  {
    name: "B2B E-Commerce",
    role: "Commerce analytics",
    href: "https://apptest-zagu-ecommerce.vercel.app/",
  },
] as const;

export const bespokeClients = [
  "Fresh Options Meatshop",
  "Colegio de Sebastian Pampanga",
  "ACLC",
  "Teresita R. Razon (Halo-halo & Palabok)",
  "RDF Feed, Livestock & Foods",
  "Roberto's",
  "City College of San Fernando Pampanga",
  "Alliant",
  "Meats & Match",
  "POPIC Captive Solutions",
] as const;

export const cctvProjects = [
  {
    name: "ABI Gas Station",
    place: "Caloocan, Manila",
    caption: "Site works, control-room commissioning, and handover.",
  },
  {
    name: "Milktealicious",
    place: "Retail footprint",
    caption: "Install, monitoring wall, and live multi-camera operations.",
  },
  {
    name: "JADN Trading Ltd.",
    place: "Field & yard coverage",
    caption: "Survey, elevated runs, and yard-wide visibility.",
  },
] as const;

export const contact = {
  phones: ["+63 954 293 8207", "+63 962 126 4405"],
  email: "deeptuxph2025@gmail.com",
};

export const sectionIds = [
  "hero",
  "story",
  "about",
  "services",
  "work-web",
  "work-demos",
  "work-bespoke",
  "work-cctv",
  "contact",
] as const;
