"use client";

import { Reveal, Stagger, StaggerItem } from "./Motion";

const CARDS = [
  {
    ix: "01",
    title: "Seconds, not minutes.",
    body: "Emergency outcomes in public spaces are often decided in the first ninety seconds — before professional responders can arrive on scene.",
  },
  {
    ix: "02",
    title: "Plans on paper, not in practice.",
    body: "Many schools and houses of worship have written emergency policies but have never rehearsed an evacuation for anything other than fire.",
  },
  {
    ix: "03",
    title: "Community spaces, left out.",
    body: "Most U.S. houses of worship, community centers, and gathering places lack the dedicated emergency guidance systems available to larger institutions.",
  },
  {
    ix: "04",
    title: "Families, after the headlines.",
    body: "Survivors and family members carry the long-term costs of public tragedy — and the support available to them often ends when the news cycle does.",
  },
];

export function Problem() {
  return (
    <section className="section problem" id="problem">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">The Problem</span>
          <h2>
            Most communities have a plan on paper. Few have one for the next
            ninety seconds.
          </h2>
        </Reveal>

        <div className="problem-grid">
          <Reveal className="problem-prose">
            <p>
              In an emergency, the difference between safety and tragedy is
              measured in seconds — not minutes.{" "}
              <em>
                Most people don&rsquo;t know where to go, which exit is safest,
                or who to listen to.
              </em>
            </p>
            <p>
              Schools and houses of worship were not designed for what they now
              have to prepare for. Families left behind carry the cost long
              after the news cycle moves on.
            </p>
          </Reveal>

          <Reveal>
            <Stagger className="qual-grid">
              {CARDS.map((c) => (
                <StaggerItem key={c.ix} className="qual-card">
                  <div className="qual-ix">— {c.ix}</div>
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="qual-note">
              We will publish sourced figures from independent research and
              government data here as our research partnerships come online.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
