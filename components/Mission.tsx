"use client";

import { Reveal, Stagger, StaggerItem } from "./Motion";

const PILLARS = [
  {
    n: "i.",
    title: "Build technology that gets people out safely.",
    body: "Open, accessible, audited tools that deliver real-time evacuation guidance to anyone inside a building during an emergency.",
  },
  {
    n: "ii.",
    title: "Stand with families for the long term.",
    body: "Direct relief, counseling support, and community programs for the people whose lives are reshaped by gun violence.",
  },
  {
    n: "iii.",
    title: "Strengthen the spaces that hold communities together.",
    body: "Practical preparedness for schools, places of worship, and gathering places — at no cost to the communities that need it most.",
  },
];

export function Mission() {
  return (
    <section className="section mission" id="mission">
      <div className="container">
        <div className="mission-grid">
          <Reveal>
            <span className="eyebrow">Our Mission</span>
            <h2 style={{ marginTop: 18 }}>
              A serious response to a problem we refuse to accept as normal.
            </h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Every Second Count exists to put life-saving tools and human
              support where they are needed most — in the everyday places where
              Americans live, learn, and worship.
            </p>
          </Reveal>

          <Reveal>
            <Stagger className="mission-pillars">
              {PILLARS.map((p) => (
                <StaggerItem key={p.n} className="pillar">
                  <div className="pillar-num">{p.n}</div>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
