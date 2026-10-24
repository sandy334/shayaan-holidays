import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { destinations } from "@/config/site";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Mirrored editorial layout on large screens: tall feature left, then right. */
const layout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-5 lg:col-start-1 lg:row-start-3",
  "lg:col-span-5 lg:col-start-1 lg:row-start-4",
  "lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:row-span-2",
];

export function Destinations() {
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="destinations-title"
            eyebrow="Where to next"
            title="Destinations Worth the Drive"
            intro="A few favourite road-trip ideas to inspire your next journey. Pick one, or tell us your own — every trip is planned around your group."
          />
        </div>

        <ul className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:auto-rows-[17rem] lg:grid-cols-12">
          {destinations.map((d, i) => (
            <li
              key={d.slug}
              data-reveal
              style={{ "--reveal-delay": (i % 3) * 100 } as React.CSSProperties}
              className={`w-[85%] shrink-0 snap-start md:w-auto ${i === 0 ? "md:col-span-2" : ""} ${layout[i % layout.length]}`}
            >
              <article className="group relative isolate flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-navy-900 md:min-h-[20rem] lg:min-h-0">
                <Image
                  src={d.image}
                  alt={d.alt}
                  fill
                  sizes={i === 0 || i === 5 ? "(min-width: 1024px) 58vw, (min-width: 768px) 100vw, 85vw" : "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 85vw"}
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 from-10% via-navy-950/65 via-50% to-navy-950/5" aria-hidden="true" />
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
                  <div className="max-w-sm">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {d.region}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-white sm:text-4xl">{d.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{d.description}</p>
                  </div>
                  <a
                    href={whatsappUrl(messages.destination(d.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-white/95 px-5 text-sm font-bold text-navy-950 transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:bg-gold sm:self-auto"
                  >
                    Plan This Trip<span className="sr-only"> to {d.name}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/75">
          Destinations shown are ideas for your enquiry, not fixed packages. Routes, availability and quotations are
          confirmed directly with Shayaan Holidays.
        </p>
      </div>
    </section>
  );
}
