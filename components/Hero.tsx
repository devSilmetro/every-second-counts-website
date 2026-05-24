"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowIcon } from "./Motion";

const EASE = [0.2, 0.7, 0.2, 1] as const;

function Words({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            initial={{ y: "120%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.85,
              ease: EASE,
              delay: delay + i * 0.06,
            }}
            style={{ display: "inline-block", paddingRight: "0.28em" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const META = [
  { strong: "Technology", body: "Real-time evacuation guidance" },
  {
    strong: "Community",
    body: "Schools, places of worship & gathering places",
  },
  { strong: "Families", body: "Long-term support after tragedy" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const stampY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <header className="hero" ref={ref}>
      <div className="container">
        <div className="hero-grid">
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Building safer schools, places of worship, and community spaces
            </motion.span>

            <h1 style={{ marginTop: 24 }}>
              <Words text="When violence strikes," delay={0.15} />
              <br />
              <Words
                text="every second"
                delay={0.55}
                className="accent"
              />{" "}
              <Words text="count." delay={0.95} />
            </h1>

            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
            >
              We build life-saving evacuation technology for schools, places of
              worship, and community spaces — and support families impacted by
              gun violence.
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 1.3 } },
              }}
            >
              <motion.a
                href="mailto:info@everysecondcount.org?subject=Donation%20inquiry"
                className="btn btn-primary"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                Donate to Save Lives <ArrowIcon />
              </motion.a>
              <motion.a
                href="#mission"
                className="btn btn-ghost"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                Learn the Mission
              </motion.a>
            </motion.div>

            <motion.div
              className="hero-meta"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } },
              }}
            >
              {META.map((m) => (
                <motion.div
                  key={m.strong}
                  className="hero-meta-item"
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <strong>{m.strong}</strong>
                  {m.body}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          >
            <div className="hero-art">
              <motion.div
                className="imgslot main has-image"
                style={{ y: imgY }}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-school-hallway.webp"
                  alt="Empty school hallway in soft morning light"
                />
              </motion.div>

              <motion.div
                className="imgslot sub has-image"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/family-hands.webp"
                  alt="Two adults gently cradling a child's hands across a worn wooden table in warm window light"
                />
              </motion.div>

              <motion.div
                className="stamp"
                style={{ y: stampY }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
              >
                <strong>Built with first responders.</strong>
                Designed alongside teachers, faith leaders, school safety
                officers, and families who have lived through the worst day of
                their lives.
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
