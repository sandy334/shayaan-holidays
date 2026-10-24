"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function StoryParallax() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Background drifts slowly; the foreground copy moves a touch the other way.
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-12%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0px", "0px"] : ["40px", "-40px"]);

  return (
    <section
      ref={ref}
      aria-labelledby="story-title"
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-navy-950 py-28"
    >
      <motion.div className="absolute inset-x-0 -inset-y-[14%] -z-20 will-change-transform" style={{ y: bgY }} aria-hidden="true">
        <Image src="/images/ghat-road.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_60%]" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-navy-950/30" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(7_27_58/0.55),rgb(7_27_58/0.85))]"
        aria-hidden="true"
      />

      <motion.div className="mx-auto max-w-4xl px-4 text-center sm:px-6" style={{ y: textY }}>
        <p className="eyebrow flex items-center justify-center gap-3 text-gold" data-reveal>
          <span className="gold-rule rotate-180" aria-hidden="true" />
          On the open road
          <span className="gold-rule" aria-hidden="true" />
        </p>
        <h2
          id="story-title"
          data-reveal
          style={{ "--reveal-delay": 100 } as React.CSSProperties}
          className="text-display-xl mt-6 text-balance text-white"
        >
          The Best Memories Begin <em className="text-gold-light">on the Road.</em>
        </h2>
        <p
          data-reveal
          style={{ "--reveal-delay": 200 } as React.CSSProperties}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          The winding ghat roads, the roadside chai stops, the songs everyone knows the words to — some of the best
          parts of a trip happen between destinations. Travel together and enjoy every one of them.
        </p>
        <div data-reveal style={{ "--reveal-delay": 300 } as React.CSSProperties} className="mt-10">
          <a href="#enquiry" className="btn btn-gold">
            Start Planning
          </a>
        </div>
      </motion.div>
    </section>
  );
}
