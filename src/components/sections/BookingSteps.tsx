import { bookingSteps } from "@/config/site";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function BookingSteps() {
  return (
    <section aria-labelledby="steps-title" className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="steps-title"
          tone="light"
          align="center"
          eyebrow="How booking works"
          title="Three Simple Steps to the Road"
        />

        <ol className="relative mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          {/* Connecting line */}
          <span
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0 md:block"
            aria-hidden="true"
          />
          {bookingSteps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": i * 140 } as React.CSSProperties}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-navy-950 font-display text-xl text-gold-light">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl text-white">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-center gap-4" data-reveal>
          <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" />
            Start on WhatsApp
          </a>
          <p className="max-w-md text-center text-xs text-white/55">
            Sending an enquiry doesn&apos;t confirm a booking. Availability and booking details are always confirmed
            directly with Shayaan Holidays.
          </p>
        </div>
      </div>
    </section>
  );
}
