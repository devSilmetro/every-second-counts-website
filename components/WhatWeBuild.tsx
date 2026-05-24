"use client";

import { Reveal, Stagger, StaggerItem } from "./Motion";

const CARDS = [
  {
    num: "01",
    title: "Real-time safety guidance",
    body: "Tools that turn the spaces people are already in — phones, posted screens, classroom devices — into clear, calm instructions when seconds matter.",
    feat: [
      "Works on existing devices",
      "Trained on building layouts",
      "Operates without internet",
    ],
  },
  {
    num: "02",
    title: "Safe evacuation pathways",
    body: "Pre-mapped routes and exit guidance reviewed by school safety officers, first responders, and the people who know each building best.",
    feat: [
      "Co-designed with staff",
      "Drilled and rehearsed",
      "Updated with the building",
    ],
  },
  {
    num: "03",
    title: "Community safety technology",
    body: "Practical, low-cost preparedness systems for houses of worship and community gathering spaces that have historically been left out.",
    feat: [
      "Free to participating spaces",
      "Open and audit-ready",
      "No personal data collected",
    ],
  },
];

export function WhatWeBuild() {
  return (
    <section className="section build" id="build">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What We Build</span>
          <h2>Quiet, dependable tools designed for the moments that matter most.</h2>
          <p className="lead">
            Our work focuses on three categories of life-saving technology —
            each developed with input from the communities that will use them,
            and reviewed by independent safety experts.
          </p>
        </Reveal>

        <Reveal>
          <Stagger className="build-grid">
            {CARDS.map((c) => (
              <StaggerItem key={c.num} className="build-card">
                <div className="num">— {c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="feat">
                  {c.feat.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
