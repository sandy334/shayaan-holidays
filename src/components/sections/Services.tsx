import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/config/site";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionHeading
              id="services-title"
              eyebrow="Travel services"
              title="Trips Made for Travelling Together"
              intro="Whatever brings your group together, tell us the plan and we'll help you get there. Tap any service to start a WhatsApp enquiry."
            />
            <a href="#enquiry" className="btn btn-navy mt-8 hidden lg:inline-flex" data-reveal>
              Plan a custom trip
            </a>
          </div>
        </div>

        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:col-span-8 lg:pb-16">
          {services.map((service, i) => (
            <li
              key={service.slug}
              data-reveal
              style={{ "--reveal-delay": (i % 2) * 120 } as React.CSSProperties}
              className={`w-[82%] shrink-0 snap-start sm:w-auto ${i % 2 === 1 ? "sm:translate-y-16" : ""}`}
            >
              <article className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-navy-900">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 82vw"
                  className="-z-20 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 from-15% via-navy-950/70 via-45% to-navy-950/0" aria-hidden="true" />
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold tracking-[0.2em] text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-white sm:text-[1.7rem]">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{service.description}</p>
                  <a
                    href={whatsappUrl(messages.service(service.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-light after:absolute after:inset-0 after:content-['']"
                  >
                    Enquire on WhatsApp
                    <span className="sr-only"> about {service.title.toLowerCase()}</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
