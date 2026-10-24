"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { contact, links, navItems } from "@/config/site";
import { Brand } from "@/components/ui/Brand";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll, trap Escape and move focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          solid ? "bg-navy-950/92 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.45)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="rounded-full"
           
            onClick={() => setOpen(false)}
          >
            <Brand />
          </a>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative px-3 py-2 text-sm font-semibold text-white/85 transition-colors duration-200 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#enquiry" className="btn btn-gold hidden !min-h-11 !px-5 !text-sm sm:inline-flex">
              Book Your Trip
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 overflow-y-auto bg-navy-950 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 xl:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-white/10">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-2xl text-white transition-colors hover:text-gold-light"
                    >
                      {item.label}
                      <span className="text-sm text-gold" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 grid gap-3">
              <a href="#enquiry" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                Book Your Trip
              </a>
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <a href={links.tel} className="btn btn-outline-light w-full">
                <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
