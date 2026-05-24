"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";

const LINKS = [
  { href: "#problem", label: "The Problem" },
  { href: "#mission", label: "Mission" },
  { href: "#build", label: "What We Build" },
  { href: "#family", label: "Family Support" },
  { href: "#transparency", label: "Transparency" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="container nav-inner">
          <a href="#" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">
              <span className="dot" />
            </span>
            <span>
              Every Second Count<small>everysecondcount.org</small>
            </span>
          </a>
          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-cta">
            <a href="#mission" className="btn btn-ghost btn-sm">
              Learn the Mission
            </a>
            <a
              href="mailto:info@everysecondcount.org?subject=Donation%20inquiry"
              className="btn btn-primary btn-sm"
            >
              Donate
            </a>
            <button
              type="button"
              className="nav-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="bars" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu open={open} links={LINKS} onClose={() => setOpen(false)} />
    </>
  );
}
