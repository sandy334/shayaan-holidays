import Image from "next/image";

/** Emblem cropped from the supplied logo, paired with the typeset name. */
export function Brand({ tone = "light", size = 44 }: { tone?: "light" | "dark"; size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/brand/emblem.png"
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.3rem] font-bold tracking-wide ${tone === "light" ? "text-white" : "text-navy-900"}`}
        >
          Shayaan
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-bold tracking-[0.34em] ${tone === "light" ? "text-gold" : "text-gold-deep"}`}
        >
          HOLIDAYS
        </span>
      </span>
    </span>
  );
}
