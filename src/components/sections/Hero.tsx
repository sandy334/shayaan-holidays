"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { pricing, vehicle } from "@/config/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "16%"]);
  const vehicleY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-7%"]);
  const [ac, nonAc] = pricing.rates;

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-24 pt-[calc(var(--header-h)+2.5rem)] lg:pb-28"
    >
      {/* Scenic background layer */}
      <motion.div className="absolute inset-0 -z-20 will-change-transform" style={{ y: bgY }} aria-hidden="true">
        <Image
          src="/images/hero-ooty-ranges.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-fade scale-110 object-cover object-[60%_40%] opacity-60"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#071B3A_0%,rgb(7_27_58/0.94)_38%,rgb(7_27_58/0.55)_70%,rgb(7_27_58/0.35)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-950 to-transparent"
        aria-hidden="true"
      />
      {/* Gold orbit — a nod to the arc in the logo */}
      <div
        className="hero-fade pointer-events-none absolute -right-40 top-1/2 -z-10 hidden h-[46rem] w-[46rem] -translate-y-1/2 rounded-full border border-gold/25 lg:block"
        style={{ "--d": 600 } as React.CSSProperties}
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="hero-rise eyebrow flex items-center gap-3 text-gold" style={{ "--d": 100 } as React.CSSProperties}>
            <span className="gold-rule" aria-hidden="true" />
            Your journey, our priority
          </p>
          <h1 id="hero-title" className="text-display-xl mt-6 text-balance text-white">
            <span className="hero-line block" style={{ "--d": 120 } as React.CSSProperties}>
              Every Journey Deserves Something
            </span>
            <span className="hero-line block italic text-gold-light" style={{ "--d": 260 } as React.CSSProperties}>
              Extraordinary.
            </span>
          </h1>
          <p
            className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ "--d": 500 } as React.CSSProperties}
          >
            Discover comfortable group travel with Shayaan Holidays. From family getaways to memorable road trips,
            make every mile part of the experience.
          </p>
          <div
            className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ "--d": 640 } as React.CSSProperties}
          >
            <a href="#enquiry" className="btn btn-gold group">
              Book Your Trip
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#traveller" className="btn btn-outline-light">
              Explore Our Traveller
            </a>
          </div>
          <p
            className="hero-rise mt-8 font-display text-sm italic tracking-wide text-white/60"
            style={{ "--d": 780 } as React.CSSProperties}
          >
            Shayaan Holidays — Journeys Beyond Destinations
          </p>
        </div>

        <motion.div className="relative lg:col-span-6 xl:col-span-6" style={{ y: vehicleY }}>
          <div className="hero-rise relative" style={{ "--d": 420 } as React.CSSProperties}>
            {/* Offset gold frame */}
            <div
              className="absolute -right-3 -top-3 bottom-6 left-6 rounded-[1.75rem] rounded-tl-[6rem] border border-gold/60 sm:-right-4 sm:-top-4 sm:rounded-tl-[8rem]"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] rounded-tl-[6rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] sm:rounded-tl-[8rem]">
              <Image
                src="/images/traveller-leh-manali.jpg"
                alt="White Force Traveller 12-seater parked beside a mountain highway"
                fill
                priority
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                className="object-cover object-[30%_60%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" aria-hidden="true" />
            </div>

            <div className="absolute -bottom-8 left-4 right-4 flex flex-col gap-1 rounded-2xl border border-white/10 bg-navy-900/95 px-5 py-4 shadow-xl backdrop-blur sm:left-auto sm:right-8 sm:w-auto">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">
                {vehicle.name} · {vehicle.configuration}
              </p>
              <p className="font-display text-lg text-white">
                AC ₹{ac.perKm}/km <span className="mx-1.5 text-gold/70" aria-hidden="true">|</span> Non-AC ₹{nonAc.perKm}/km
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#highlights"
        className="hero-fade group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-gold-light md:flex"
        style={{ "--d": 1200 } as React.CSSProperties}
        aria-label="Scroll to explore"
      >
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="scroll-cue-dot absolute inset-x-0 top-0 h-1/3 bg-gold" />
        </span>
      </a>
    </section>
  );
}
