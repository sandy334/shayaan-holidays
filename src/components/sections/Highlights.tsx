import { highlights } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function Highlights() {
  return (
    <section id="highlights" aria-label="Service highlights" className="relative z-10 bg-navy-950 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] lg:grid-cols-4">
          {highlights.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": i * 90 } as React.CSSProperties}
              className={`group flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-7 ${
                i % 2 === 0 ? "border-r border-navy-900/10" : ""
              } ${i < 2 ? "border-b border-navy-900/10 lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-900 transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-950">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold text-navy-950">{item.title}</span>
                <span className="mt-0.5 block text-sm text-ink/70">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
