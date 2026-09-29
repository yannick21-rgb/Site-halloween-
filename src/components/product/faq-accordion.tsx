"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-bone/10 border-y border-bone/10">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : index)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-bone transition-colors hover:text-ember"
              >
                <span className="text-base font-medium">{item.q}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-ember transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            {expanded && (
              <p className="pb-5 pr-8 text-sm leading-relaxed text-bone/60">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
