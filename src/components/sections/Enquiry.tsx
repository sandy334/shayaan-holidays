import Image from "next/image";
import { EnquiryForm } from "./EnquiryForm";

export function Enquiry() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="relative isolate overflow-hidden bg-navy-950 py-24 sm:py-32">
      <Image
        src="/images/coorg-hills.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950 via-navy-950/85 to-navy-950" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="gold-rule" aria-hidden="true" />
            Booking enquiry
          </p>
          <h2 id="enquiry-title" className="text-display-lg mt-4 text-balance text-white">
            Let&apos;s Plan Your <em className="text-gold-light">Next Journey.</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
            Share a few details and we&apos;ll open WhatsApp with your enquiry ready to send. We&apos;ll get back to you
            with availability and a quotation.
          </p>
          <ul className="mt-10 space-y-4 text-sm text-white/80">
            {[
              "Takes under a minute to fill in",
              "Review the message in WhatsApp before you send it",
              "Nothing is booked until you confirm with us directly",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7" data-reveal style={{ "--reveal-delay": 120 } as React.CSSProperties}>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
