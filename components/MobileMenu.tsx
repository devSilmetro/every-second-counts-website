"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type Link = { href: string; label: string };

export function MobileMenu({
  open,
  links,
  onClose,
}: {
  open: boolean;
  links: Link[];
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <motion.nav
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
            }}
          >
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={onClose}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            className="menu-ctas"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          >
            <a
              href="mailto:info@everysecondcount.org?subject=Donation%20inquiry"
              className="btn btn-primary"
              onClick={onClose}
            >
              Donate to Save Lives
            </a>
            <a href="/#mission" className="btn btn-ghost" onClick={onClose}>
              Learn the Mission
            </a>
          </motion.div>

          <motion.div
            className="menu-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            everysecondcount.org
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
