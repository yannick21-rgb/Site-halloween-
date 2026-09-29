"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";

export function NewsletterForm() {
  const { dict } = useSite();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p
        role="status"
        className="flex items-center gap-2 rounded-xl border border-bile/30 bg-bile/10 px-4 py-3 text-sm text-bile"
      >
        <Check size={16} aria-hidden="true" />
        {dict.home.newsletterSuccess}
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!email) return;
        setDone(true);
      }}
      className="flex flex-col gap-2"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {dict.checkout.email}
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={dict.home.newsletterPlaceholder}
          className="min-w-0 flex-1 rounded-full border border-bone/15 bg-ink/60 px-4 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none"
        />
        <button
          type="submit"
          aria-label={dict.home.newsletterCta}
          className="shrink-0 rounded-full bg-ember px-4 py-2.5 text-ink transition-colors hover:bg-ember-2"
        >
          <Send size={16} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
