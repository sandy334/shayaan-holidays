/**
 * Central configuration for the Shayaan Holidays website.
 *
 * Every business detail, price, service and destination shown on the site
 * lives here. Edit this file to update content — components read from it and
 * never hardcode business information.
 *
 * Items marked `TODO(confirm)` are sensible editable defaults that the business
 * should verify before launch.
 */

export const site = {
  name: "Shayaan Holidays",
  tagline: "Journeys Beyond Destinations",
  description:
    "Shayaan Holidays offers comfortable group travel in a white Force Traveller 12-seater. Enquire on WhatsApp for family trips, outstation journeys and weekend getaways — AC from ₹22/km and non-AC from ₹20/km.",
  /**
   * Set NEXT_PUBLIC_SITE_URL in your hosting environment once the domain is
   * known (e.g. https://www.yourdomain.in). Used for canonical URLs, Open
   * Graph and the sitemap.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
} as const;

export const contact = {
  phoneDisplay: "+91 95384 01859",
  phoneE164: "+919538401859",
  whatsappNumber: "919538401859",
  /** Add only verified details. Leave as null to hide. */
  email: null as string | null,
  address: null as string | null,
  socials: [] as { label: string; href: string }[],
} as const;

export const links = {
  whatsapp: `https://wa.me/${contact.whatsappNumber}`,
  tel: `tel:${contact.phoneE164}`,
} as const;

export const vehicle = {
  name: "Force Traveller",
  configuration: "12 Seater",
  colour: "White",
  seats: 12,
  description:
    "Our white Force Traveller is set up for groups who want to travel together — one vehicle, one driver, and room for everyone to enjoy the road.",
  /** TODO(confirm): verify each feature with the business before launch. */
  features: [
    { icon: "users", title: "12-seater configuration", text: "Seating for groups of up to 12 passengers." },
    { icon: "snowflake", title: "AC & non-AC options", text: "Choose the option that suits your trip and budget." },
    { icon: "luggage", title: "Space for luggage", text: "Tell us what you're carrying and we'll plan for it." },
    { icon: "sofa", title: "Comfortable group travel", text: "Travel together instead of splitting into cars." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Pricing — update rates here and every card, message and estimate follows. */
/* -------------------------------------------------------------------------- */

export type RateId = "ac" | "non-ac";

export interface Rate {
  id: RateId;
  label: string;
  shortLabel: string;
  perKm: number;
  highlight: boolean;
  blurb: string;
}

export const pricing = {
  currency: "INR",
  rates: [
    {
      id: "ac",
      label: "With AC",
      shortLabel: "AC",
      perKm: 22,
      highlight: true,
      blurb: "Air-conditioned comfort for long drives and warm days.",
    },
    {
      id: "non-ac",
      label: "Without AC",
      shortLabel: "Non-AC",
      perKm: 20,
      highlight: false,
      blurb: "A great-value option for cooler routes and hill drives.",
    },
  ] satisfies Rate[],
  driverBata: {
    amount: 800,
    /** Charged per day of the trip. */
    unit: "day",
    label: "Driver bata",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Traveller", href: "#traveller" },
  { label: "Pricing", href: "#pricing" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Highlights strip                                                           */
/* -------------------------------------------------------------------------- */

/** TODO(confirm): keep only categories the business offers. */
export const highlights = [
  { icon: "users", title: "Group Travel", text: "One vehicle for up to 12" },
  { icon: "route", title: "Outstation Trips", text: "Enquire for any route" },
  { icon: "snowflake", title: "AC & Non-AC", text: "From ₹20 per km" },
  { icon: "message", title: "Easy Booking", text: "Plan it all on WhatsApp" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

/** TODO(confirm): remove any service the business does not offer. */
export const services: Service[] = [
  {
    slug: "family-trips",
    title: "Family Trips",
    description: "Bring the whole family together in one vehicle, with time to stop wherever the view is worth it.",
    image: "/images/kemmangundi-sunset.jpg",
    alt: "Sunset over the hills at Kemmangundi with a viewing tower silhouetted",
  },
  {
    slug: "group-outings",
    title: "Group Outings",
    description: "Friends, colleagues or a community group — travel as one and arrive together.",
    image: "/images/rohtang-vehicles.jpg",
    alt: "Tourists and vehicles gathered on a snowy mountain pass",
  },
  {
    slug: "outstation-travel",
    title: "Outstation Travel",
    description: "Longer journeys between cities, planned around your route and schedule.",
    image: "/images/karnataka-highway.jpg",
    alt: "A tree-lined highway in Karnataka stretching into the distance",
  },
  {
    slug: "weekend-getaways",
    title: "Weekend Getaways",
    description: "Short escapes to the hills, the coast or the countryside — leave the driving to us.",
    image: "/images/ooty-tea-mist.jpg",
    alt: "A quiet road through misty tea gardens in the Nilgiris",
  },
  {
    slug: "sightseeing",
    title: "Sightseeing",
    description: "Day trips that string together waterfalls, viewpoints and heritage sites at your pace.",
    image: "/images/jog-falls.jpg",
    alt: "Jog Falls cascading through monsoon mist",
  },
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    description: "Group pickups and drops with space for everyone and their bags.",
    image: "/images/blr-airport.jpg",
    alt: "Palm-lined approach to the Kempegowda International Airport terminal",
  },
];

/* -------------------------------------------------------------------------- */
/*  Destinations                                                               */
/* -------------------------------------------------------------------------- */

export interface Destination {
  slug: string;
  name: string;
  region: string;
  description: string;
  image: string;
  alt: string;
}

/**
 * Example destinations to enquire about — not fixed packages or itineraries.
 * TODO(confirm): replace with the routes the business actually covers.
 * Each slug can later back a dedicated SEO landing page (/destinations/[slug]).
 */
export const destinations: Destination[] = [
  {
    slug: "coorg",
    name: "Coorg",
    region: "Kodagu, Karnataka",
    description: "Rolling coffee country, misty hills and quiet paddy fields.",
    image: "/images/coorg-hills.jpg",
    alt: "Green hills and paddy fields in Coorg under a cloudy sky",
  },
  {
    slug: "ooty",
    name: "Ooty",
    region: "Nilgiris, Tamil Nadu",
    description: "Layered blue mountains and endless terraces of tea.",
    image: "/images/hero-ooty-ranges.jpg",
    alt: "Tea terraces and layered blue mountain ranges of the Nilgiris",
  },
  {
    slug: "mysuru",
    name: "Mysuru",
    region: "Karnataka",
    description: "Palaces, gardens and the grandeur of a royal city.",
    image: "/images/mysuru-palace.jpg",
    alt: "The front facade of Mysore Palace with its domes and arches",
  },
  {
    slug: "chikkamagaluru",
    name: "Chikkamagaluru",
    region: "Karnataka",
    description: "Karnataka's highest peaks and endless Western Ghats views.",
    image: "/images/chikmagalur-ghats.jpg",
    alt: "Forested ridges of the Western Ghats seen from Mullayanagiri",
  },
  {
    slug: "goa",
    name: "Goa",
    region: "Konkan Coast",
    description: "Wide beaches, river mouths and long coastal sunsets.",
    image: "/images/goa-mandrem.jpg",
    alt: "Mandrem beach and river mouth in Goa with beach shacks",
  },
  {
    slug: "hampi",
    name: "Hampi",
    region: "Vijayanagara, Karnataka",
    description: "Boulder landscapes and the ruins of an ancient empire.",
    image: "/images/hampi-hemakuta.jpg",
    alt: "A stone mandapa on Hemakuta Hill overlooking the Virupaksha Temple",
  },
];

/* -------------------------------------------------------------------------- */
/*  Why choose us / booking steps / FAQ                                        */
/* -------------------------------------------------------------------------- */

export const reasons = [
  { icon: "users", title: "Convenient group travel", text: "Keep everyone in one comfortable vehicle instead of coordinating several cars." },
  { icon: "badge", title: "Clear per-km pricing", text: "Simple, published rates for AC and non-AC travel, plus a transparent driver bata." },
  { icon: "message", title: "Simple WhatsApp communication", text: "Share your plans, ask questions and get a quotation in the app you already use." },
  { icon: "calendar", title: "Flexible trip enquiries", text: "Day trips, weekend breaks or longer journeys — tell us what you have in mind." },
] as const;

export const bookingSteps = [
  { title: "Share your plans", text: "Tell us your pickup point, destination, travel dates and group size." },
  { title: "Discuss on WhatsApp", text: "We'll talk through your route, AC preference and any special requirements." },
  { title: "Confirm directly", text: "Confirm availability, the final quotation and booking details with Shayaan Holidays." },
] as const;

const ac = pricing.rates[0];
const nonAc = pricing.rates[1];

export const faqs = [
  {
    q: "How can I enquire about a trip?",
    a: "Fill in the enquiry form on this page and it will open WhatsApp with your trip details ready to send. You can also message or call us directly on " +
      contact.phoneDisplay + ".",
  },
  {
    q: "How is the fare calculated?",
    a: `Travel is charged per kilometre — ₹${ac.perKm}/km with AC and ₹${nonAc.perKm}/km without AC — plus a driver bata of ₹${pricing.driverBata.amount} per ${pricing.driverBata.unit}. Use the estimator above for a rough figure; the final quotation is always confirmed by Shayaan Holidays.`,
  },
  {
    q: "How do I check vehicle availability?",
    a: "Send us your travel dates on WhatsApp or by phone. Availability is confirmed directly by Shayaan Holidays — submitting the website form does not reserve the vehicle.",
  },
  {
    q: "What information should I provide for a quotation?",
    a: "Your pickup location, destination, travel and return dates, number of passengers, AC or non-AC preference, and any stops or special requirements along the way.",
  },
  {
    q: "Can I enquire about outstation travel?",
    a: "Yes. Share your route and dates and we'll let you know about availability and the quotation for your journey.",
  },
  {
    q: "How can I contact Shayaan Holidays?",
    a: `Call or WhatsApp us on ${contact.phoneDisplay}. The WhatsApp button at the bottom of every page opens a chat with us directly.`,
  },
] as const;
