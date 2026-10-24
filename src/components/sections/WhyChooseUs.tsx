import { reasons, site } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-gold-deep">
            <span className="gold-rule" aria-hidden="true" />
            Why {site.name}
          </p>
          <h2 id="why-title" className="text-display-lg mt-4 text-balance text-navy-950">
            Group travel, <em className="text-gold-deep">without the guesswork.</em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
            Clear rates, one comfortable vehicle and a direct line to the people planning your trip. That&apos;s it —
            and that&apos;s the point.
          </p>
          <blockquote className="mt-10 border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-navy-900">
            {site.tagline}.
          </blockquote>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-[1.75rem] bg-navy-900/10 sm:grid-cols-2 lg:col-span-7">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              data-reveal
              style={{ "--reveal-delay": i * 90 } as React.CSSProperties}
              className="group flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-mist sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold-deep transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy-950">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl text-navy-900/15" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-xl text-navy-950">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
