import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { pricing, site, vehicle } from "@/config/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="relative lg:col-span-6">
          <div className="absolute -left-4 -top-4 h-40 w-40 rounded-full border border-gold/40 sm:-left-8 sm:-top-8 sm:h-56 sm:w-56" aria-hidden="true" />
          <figure
            data-reveal="clip"
            className="relative mx-auto aspect-square max-w-[34rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgb(7_27_58/0.45)]"
          >
            <Image
              src="/brand/shayaan-logo-full.png"
              alt={`${site.name} logo — a white ${vehicle.name} on a coastal mountain road at sunrise`}
              fill
              sizes="(min-width: 1024px) 544px, 92vw"
              className="object-contain"
            />
          </figure>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <div data-reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="gold-rule" aria-hidden="true" />
              About {site.name}
            </p>
            <h2 id="about-title" className="text-display-lg mt-4 text-balance text-navy-950">
              More Than a Ride. <em className="text-gold-deep">A Better Way</em> to Travel.
            </h2>
          </div>
          <div data-reveal style={{ "--reveal-delay": 120 } as React.CSSProperties} className="mt-6 space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
            <p>
              {site.name} is built around one idea: group journeys should feel easy. Instead of juggling several cars,
              your family or friends travel together in a single {vehicle.colour.toLowerCase()} {vehicle.name}, with the
              road ahead taken care of.
            </p>
            <p>
              Tell us where you want to go and when. We&apos;ll talk through your route on WhatsApp, share a clear
              quotation based on simple per-kilometre rates — ₹{pricing.rates[0].perKm} with AC, ₹{pricing.rates[1].perKm}{" "}
              without — and confirm the details with you directly.
            </p>
          </div>
          <div data-reveal style={{ "--reveal-delay": 220 } as React.CSSProperties} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#enquiry" className="btn btn-navy group">
              Plan Your Journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#pricing" className="btn btn-outline-navy">
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
