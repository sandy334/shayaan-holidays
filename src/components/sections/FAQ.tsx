"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { contact, faqs, links } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="Questions"
            title="Good to Know"
            intro={
              <>
                Can&apos;t find what you&apos;re looking for? Call us on{" "}
                <a href={links.tel} className="font-semibold text-navy-900 underline decoration-gold underline-offset-4">
                  {contact.phoneDisplay}
                </a>
                .
              </>
            }
          />
        </div>

        <div className="divide-y divide-navy-900/10 border-y border-navy-900/10 lg:col-span-8" data-reveal>
          {faqs.map((item, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg text-navy-950 transition-colors group-hover:text-gold-deep sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                        open ? "rotate-45 border-gold bg-gold text-navy-950" : "border-navy-900/20 text-navy-900"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${
                    open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-12 text-base leading-relaxed text-ink/80">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
