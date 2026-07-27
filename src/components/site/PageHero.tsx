import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <section className="relative navy-gradient text-white pt-32 pb-20 overflow-hidden">
      {image && (
        <div className="absolute inset-0 opacity-25">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
        </div>
      )}
      <div className="container mx-auto px-4 relative">
        {eyebrow && (
          <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{eyebrow}</p>
        )}
        <h1 className={`max-w-5xl uppercase chrome-text leading-tight ${titleClassName ?? "text-5xl md:text-6xl"}`}>{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-chrome/80">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
