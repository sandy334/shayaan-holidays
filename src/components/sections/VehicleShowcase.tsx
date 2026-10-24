import Image from "next/image";
import { vehicle } from "@/config/site";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function VehicleShowcase() {
  return (
    <section id="traveller" aria-labelledby="traveller-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Oversized outline type as a quiet backdrop */}
      <div
        className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(5rem,16vw,15rem)] font-bold leading-none text-navy-900/[0.035] before:content-['Traveller']"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="gold-rule" aria-hidden="true" />
              Our Traveller
            </p>
            <h2 id="traveller-title" className="text-display-lg mt-4 text-navy-950">
              {vehicle.name} <span className="whitespace-nowrap"><span className="text-gold-deep">—</span> {vehicle.configuration}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">{vehicle.description}</p>
          </div>
          <div data-reveal style={{ "--reveal-delay": 150 } as React.CSSProperties}>
            <a
              href={whatsappUrl(messages.vehicle)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <figure
            data-reveal="clip"
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-mist lg:col-span-8 lg:aspect-auto lg:min-h-[32rem]"
          >
            <Image
              src="/images/traveller-leh-manali.jpg"
              alt="Side view of a white Force Traveller 12-seater on a mountain highway"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover object-[40%_60%]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(255_255_255/0.18),transparent_60%)]" aria-hidden="true" />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-navy-900 backdrop-blur">
              {vehicle.colour} {vehicle.name} · {vehicle.seats} seats
            </figcaption>
          </figure>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {vehicle.features.map((f, i) => (
              <li
                key={f.title}
                data-reveal
                style={{ "--reveal-delay": 100 + i * 90 } as React.CSSProperties}
                className="group flex gap-4 rounded-2xl border border-navy-900/10 bg-white p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-950">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-navy-950">{f.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink/70">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
