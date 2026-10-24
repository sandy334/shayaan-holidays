import { contact, links, site, vehicle } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { About } from "@/components/sections/About";
import { VehicleShowcase } from "@/components/sections/VehicleShowcase";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Destinations } from "@/components/sections/Destinations";
import { StoryParallax } from "@/components/sections/StoryParallax";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BookingSteps } from "@/components/sections/BookingSteps";
import { FAQ } from "@/components/sections/FAQ";
import { Enquiry } from "@/components/sections/Enquiry";
import { Contact } from "@/components/sections/Contact";

/** Structured data limited to verified details: name, phone, logo, site. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: contact.phoneE164,
  logo: `${site.url}/brand/shayaan-logo-full.png`,
  image: `${site.url}/images/traveller-leh-manali.jpg`,
  sameAs: [links.whatsapp, ...contact.socials.map((s) => s.href)],
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: `${vehicle.name} ${vehicle.configuration} hire` },
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-gold px-5 py-3 font-semibold text-navy-950 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Highlights />
        <About />
        <VehicleShowcase />
        <Pricing />
        <Services />
        <Destinations />
        <StoryParallax />
        <WhyChooseUs />
        <BookingSteps />
        <FAQ />
        <Enquiry />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
