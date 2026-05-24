"use client";

import { Reveal, Stagger, StaggerItem } from "./Motion";

const GROUPS = [
  {
    tag: "K–12 & Higher Ed",
    title: "Schools",
    body: "Public, private, and after-school programs serving children and educators — especially under-resourced districts.",
    image: "/images/schools.webp",
    alt: "Three students with backpacks walking up the steps of a school entrance",
  },
  {
    tag: "Faith Communities",
    title: "Places of Worship",
    body: "Congregations of every tradition — churches, synagogues, mosques, temples, and gurdwaras — spaces that deserve to remain safe places of refuge.",
    image: "/images/worship.webp",
    alt: "Sunlit sanctuary with wooden pews and tall arched windows",
  },
  {
    tag: "Community Spaces",
    title: "Libraries, Centers & Gathering Places",
    body: "Libraries, community centers, food pantries, and small venues — the everyday infrastructure of public life.",
    image: "/images/library.webp",
    alt: "Quiet public library reading room with wooden tables and a lone reader",
  },
];

export function WhoWeHelp() {
  return (
    <section className="section help" id="who">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Who We Help</span>
          <h2>The places that hold us together.</h2>
          <p className="lead">
            We prioritize the communities most often overlooked by commercial
            safety products — and we never charge them for the work we do.
          </p>
        </Reveal>

        <Stagger className="help-grid">
          {GROUPS.map((g) => (
            <StaggerItem key={g.title} className="help-card">
              <div className="imgslot has-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image} alt={g.alt} loading="lazy" />
              </div>
              <div className="help-card-body">
                <div className="tag">{g.tag}</div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
