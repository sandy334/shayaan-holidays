interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, intro, id, tone = "dark", align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} data-reveal>
      <p
        className={`eyebrow flex items-center gap-3 ${centered ? "justify-center" : ""} ${tone === "dark" ? "text-gold-deep" : "text-gold"}`}
      >
        <span className="gold-rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`text-display-lg mt-4 text-balance ${tone === "dark" ? "text-navy-950" : "text-white"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-ink/80" : "text-white/75"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
