import { Mail, MapPin, Phone } from "lucide-react";
import { contact, links, site } from "@/config/site";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 rounded-[2rem] border border-navy-900/10 bg-mist p-7 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div data-reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="gold-rule" aria-hidden="true" />
              Contact
            </p>
            <h2 id="contact-title" className="text-display-lg mt-4 text-navy-950">
              {site.name}
            </h2>
            <p className="mt-2 font-display text-lg italic text-ink/70">{site.tagline}</p>

            <dl className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-950 text-gold">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Phone</span>
                </dt>
                <dd>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-ink/60">Phone &amp; WhatsApp</span>
                  <a
                    href={links.tel}
                    className="mt-1 block font-display text-2xl text-navy-950 transition-colors hover:text-gold-deep sm:text-3xl"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              {contact.email && (
                <div className="flex items-start gap-4">
                  <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-950 text-gold">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Email</span>
                  </dt>
                  <dd>
                    <a href={`mailto:${contact.email}`} className="text-lg text-navy-950 hover:text-gold-deep">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              )}
              {contact.address && (
                <div className="flex items-start gap-4">
                  <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-950 text-gold">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Address</span>
                  </dt>
                  <dd className="text-lg text-navy-950">{contact.address}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="flex flex-col gap-4 lg:items-end" data-reveal style={{ "--reveal-delay": 120 } as React.CSSProperties}>
            <a
              href={whatsappUrl(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full !min-h-14 !text-base lg:w-80"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <a href={links.tel} className="btn btn-navy w-full !min-h-14 !text-base lg:w-80">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {contact.phoneDisplay}
            </a>
            <a href="#enquiry" className="btn btn-outline-navy w-full !min-h-14 !text-base lg:w-80">
              Send a trip enquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
