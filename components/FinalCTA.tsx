"use client";

import { useState, type FormEvent } from "react";
import { Reveal, ArrowIcon } from "./Motion";
import { motion, AnimatePresence } from "framer-motion";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email.");
      return;
    }
    setStatus("Thank you — we’ll be in touch with our next update.");
    setEmail("");
  }

  return (
    <section className="section final-cta" id="donate">
      <div className="container">
        <div className="final-cta-grid">
          <Reveal>
            <span className="eyebrow">Take Action</span>
            <h2 style={{ marginTop: 18 }}>
              Help us put life-saving tools into the places that hold us
              together.
            </h2>
            <p className="lead" style={{ marginTop: 22 }}>
              Every contribution, of any size, funds the work above &mdash; and
              lets us reach one more school, one more sanctuary, one more
              family. Thank you for standing with us.
            </p>
            <div className="final-actions">
              <a
                href="mailto:info@everysecondcount.org?subject=Donation%20inquiry"
                className="btn btn-ink"
              >
                Donate to Save Lives <ArrowIcon />
              </a>
              <a
                href="mailto:info@everysecondcount.org"
                className="btn btn-ghost"
              >
                Partner with us
              </a>
            </div>
          </Reveal>

          <Reveal>
            <form className="signup" onSubmit={submit}>
              <h4>
                Are you in a school, place of worship, or community space?
              </h4>
              <p>
                If you&rsquo;d like to be considered for one of our first
                pilots, tell us where to reach you. We&rsquo;re starting
                partnership conversations now.
              </p>
              <div className="signup-row">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("");
                  }}
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Subscribe
                </button>
              </div>
              <AnimatePresence mode="wait">
                {status && (
                  <motion.div
                    key={status}
                    className="signup-status"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
