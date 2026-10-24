"use client";

import { useEffect, useState } from "react";
import { links, site } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Sections that already carry WhatsApp buttons; the float steps aside there on small screens. */
const yieldTo = ["#enquiry", "#contact"];

export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = yieldTo.map((s) => document.querySelector(s)).filter((el): el is Element => el !== null);
    const mq = window.matchMedia("(max-width: 767px)");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(mq.matches && visible.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    const onChange = () => setHidden(mq.matches && visible.size > 0);
    mq.addEventListener("change", onChange);
    return () => {
      observer.disconnect();
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 transition-[opacity,translate] duration-300 ${
        hidden ? "pointer-events-none translate-y-6 opacity-0" : ""
      }`}
    >
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${site.name} on WhatsApp`}
        tabIndex={hidden ? -1 : undefined}
        className="hero-rise group relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.6)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105 sm:h-16 sm:w-16"
        style={{ "--d": 1400 } as React.CSSProperties}
      >
        <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        <span
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 md:block md:translate-x-2"
          aria-hidden="true"
        >
          Chat with us
        </span>
      </a>
    </div>
  );
}
