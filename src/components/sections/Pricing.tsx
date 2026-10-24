import { Check, Snowflake, Wind } from "lucide-react";
import { pricing, vehicle } from "@/config/site";
import { formatINR, messages, whatsappUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { FareEstimator } from "./FareEstimator";

export function Pricing() {
  const { driverBata } = pricing;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(212_163_67/0.16),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pricing-title"
          tone="light"
          align="center"
          eyebrow="Simple per-km pricing"
          title={
            <>
              Transparent Rates for the <em className="text-gold-light">{vehicle.name}</em>
            </>
          }
          intro={`One ${vehicle.configuration.toLowerCase()} vehicle, two ways to travel. Pick the option that suits your trip.`}
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {pricing.rates.map((rate, i) => {
            const RateIcon = rate.id === "ac" ? Snowflake : Wind;
            return (
              <article
                key={rate.id}
                data-reveal
                style={{ "--reveal-delay": i * 120 } as React.CSSProperties}
                aria-labelledby={`rate-${rate.id}`}
                className={`group relative flex flex-col rounded-[1.75rem] p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-9 ${
                  rate.highlight
                    ? "bg-gradient-to-b from-navy-800 to-navy-900 shadow-[0_30px_70px_-30px_rgb(212_163_67/0.45)] ring-1 ring-gold/70"
                    : "bg-navy-900/60 ring-1 ring-white/10 hover:ring-white/25"
                }`}
              >
                {rate.highlight && (
                  <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent" aria-hidden="true" />
                )}
                <div className="flex items-center justify-between gap-4">
                  <h3 id={`rate-${rate.id}`} className="flex items-center gap-3 text-lg font-bold text-white">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${
                        rate.highlight ? "bg-gold text-navy-950" : "bg-white/10 text-white"
                      }`}
                    >
                      <RateIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {rate.label}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      rate.highlight ? "bg-gold/15 text-gold-light" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {rate.shortLabel}
                  </span>
                </div>

                <p className="mt-8 flex items-baseline gap-2 text-white">
                  <span className="font-display text-[clamp(3.5rem,3rem+3vw,5rem)] font-semibold leading-none">
                    <span className={rate.highlight ? "text-gold-light" : "text-white"}>₹</span>
                    {rate.perKm}
                  </span>
                  <span className="text-lg text-white/60">/ km</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{rate.blurb}</p>

                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-white/85">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {vehicle.name} · {vehicle.configuration}
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {driverBata.label}: {formatINR(driverBata.amount)} per {driverBata.unit}
                  </li>
                </ul>

                <a
                  href={whatsappUrl(messages.rate(rate))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn mt-8 w-full ${rate.highlight ? "btn-gold" : "btn-outline-light"}`}
                  aria-label={`Book ${rate.label} at ₹${rate.perKm} per km on WhatsApp`}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Book on WhatsApp
                </a>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/60" data-reveal>
          Rates are per kilometre travelled, plus a {driverBata.label.toLowerCase()} of {formatINR(driverBata.amount)} per{" "}
          {driverBata.unit}. Your final quotation is confirmed directly by Shayaan Holidays.
        </p>

        <FareEstimator />
      </div>
    </section>
  );
}
