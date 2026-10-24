import { Phone } from "lucide-react";
import { contact, links, navItems, site } from "@/config/site";
import { Brand } from "@/components/ui/Brand";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="bg-navy-950 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pb-10 pt-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Brand size={56} />
            <p className="mt-6 max-w-sm font-display text-xl italic text-white/80">{site.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Comfortable group travel in a white Force Traveller 12-seater. Enquire on WhatsApp to plan your trip.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow text-gold">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-8 items-center text-white/70 transition-colors hover:text-gold-light">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="inline-flex min-h-8 items-center text-white/70 transition-colors hover:text-gold-light">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-4">
            <h2 className="eyebrow text-gold">Get in touch</h2>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-3 text-white/85 transition-colors hover:text-gold-light"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-[#062b16]">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                WhatsApp {contact.phoneDisplay}
              </a>
              <a
                href={links.tel}
                className="group inline-flex min-h-11 items-center gap-3 text-white/85 transition-colors hover:text-gold-light"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                Call {contact.phoneDisplay}
              </a>
              {contact.socials.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-4 text-sm">
                  {contact.socials.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-gold-light">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 text-xs text-white/50">
          <p>
            © <CurrentYear fallback={new Date().getFullYear()} /> {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
