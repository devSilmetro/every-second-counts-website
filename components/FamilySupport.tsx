"use client";

import { Reveal, Stagger, StaggerItem } from "./Motion";

const SERVICES = [
  {
    title: "Direct family relief",
    body: "Emergency funds for families in the immediate aftermath — without paperwork, without proving worthiness.",
  },
  {
    title: "Counseling referrals",
    body: "Connections to trauma-informed counselors and community mental-health partners, with long-term follow-up.",
  },
  {
    title: "Survivor community",
    body: "Spaces for families to be in conversation with one another — on their own terms, at their own pace.",
  },
  {
    title: "Anniversary care",
    body: "Long-term outreach in the months and years after, when the rest of the world has moved on.",
  },
];

export function FamilySupport() {
  return (
    <section className="section family" id="family">
      <div className="container">
        <div className="family-grid">
          <Reveal>
            <span className="eyebrow">Family Support</span>
            <p className="family-pullquote" style={{ marginTop: 24 }}>
              The work doesn&rsquo;t end when the headlines do. It begins there.
            </p>
            <p className="family-cite">
              — A founding board member, Every Second Count
            </p>

            <div
              className="imgslot has-image"
              style={{ marginTop: 36, aspectRatio: "5 / 3" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/candle.webp"
                alt="A single lit candle on a wooden table beside a folded cloth and a dried rose"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal>
            <h2>For the families who carry this with them every day.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Technology can only do so much. The families we work with have
              told us what they need most — and we built our family support
              programs around their answers.
            </p>
            <Stagger className="family-services">
              {SERVICES.map((s) => (
                <StaggerItem key={s.title} className="row">
                  <div className="glyph">+</div>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
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
