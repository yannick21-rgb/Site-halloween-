"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "lucide-react";

/** Révèle ses enfants au défilement. Désactivé si l'utilisateur limite les animations. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignment} mb-12`}>
      {kicker && (
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-ember">
          <Link size={12} aria-hidden="true" />
          {kicker}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-bone">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-bone/60 text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
