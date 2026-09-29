"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/site-provider";

function nextHalloween(): Date {
  const now = new Date();
  let target = new Date(now.getFullYear(), 9, 31, 23, 59, 59);
  if (now.getTime() > target.getTime()) {
    target = new Date(now.getFullYear() + 1, 9, 31, 23, 59, 59);
  }
  return target;
}

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const { dict, locale } = useSite();
  const [remaining, setRemaining] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setRemaining(diff(nextHalloween()));
    const timer = window.setInterval(
      () => setRemaining(diff(nextHalloween())),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const units =
    locale === "fr"
      ? [
          { value: "days", label: "jours" },
          { value: "hours", label: "heures" },
          { value: "minutes", label: "min" },
          { value: "seconds", label: "sec" },
        ]
      : [
          { value: "days", label: "days" },
          { value: "hours", label: "hours" },
          { value: "minutes", label: "min" },
          { value: "seconds", label: "sec" },
        ];

  return (
    <section className="relative overflow-hidden border-y border-bone/10 bg-web/40 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs uppercase tracking-[0.28em] text-ember">
            {dict.home.countdownTitle}
          </span>
          <h2 className="text-2xl text-bone/85 sm:text-3xl">
            {dict.home.countdown}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {units.map((unit) => (
            <div
              key={unit.value}
              className="card-spooky flex flex-col items-center gap-1 rounded-2xl px-3 py-5"
            >
              <span className="font-display text-4xl tabular-nums text-bone sm:text-5xl">
                {remaining
                  ? String(
                      remaining[unit.value as keyof typeof remaining],
                    ).padStart(2, "0")
                  : "--"}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-bone/45">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
