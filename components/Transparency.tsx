"use client";

import { Reveal, Stagger, StaggerItem } from "./Motion";

const COMMITMENTS = [
  {
    ix: "01",
    title: "Programs first.",
    body: "We hold ourselves to a 90%+ programs-to-overhead ratio. Operations and fundraising stay lean.",
  },
  {
    ix: "02",
    title: "Independent audit.",
    body: "Our financials are reviewed annually by an independent third-party auditor and published in full.",
  },
  {
    ix: "03",
    title: "Public 990 & annual report.",
    body: "We publish our Form 990 filings and a plain-language annual report so anyone can review where the dollars go.",
  },
  {
    ix: "04",
    title: "No surprise disclosures.",
    body: "You shouldn't have to ask. We proactively publish program outcomes, deployment locations, and what we learned.",
  },
];

const PRINCIPLES = [
  {
    ix: "i.",
    title: "Open by default.",
    body: "We publish what we build, how we test it, and who reviewed it. Our partner spaces always see our work first.",
  },
  {
    ix: "ii.",
    title: "No data we don’t need.",
    body: "We don’t collect personal information about the people our technology helps. Privacy is a safety feature.",
  },
  {
    ix: "iii.",
    title: "Community-governed.",
    body: "Our board includes educators, faith leaders, public-safety experts, and a survivor advisory council.",
  },
  {
    ix: "iv.",
    title: "Tell us when we're wrong.",
    body: "We invite partners and the public to challenge our work in the open, through a public feedback channel.",
  },
];

export function Transparency() {
  return (
    <section className="section transparency" id="transparency">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Transparency</span>
          <h2>Our commitments to you.</h2>
          <p className="lead">
            We hold ourselves to the standards we&rsquo;d want any nonprofit
            holding our money to follow &mdash; and we publish them here so you
            can hold us to them.
          </p>
        </Reveal>

        <div className="transparency-grid">
          <Reveal>
            <div className="allocation-chart commitments-card">
              <div className="head">
                <h4>Accountability commitments</h4>
                <span className="yr">Reviewed annually</span>
              </div>
              {COMMITMENTS.map((c) => (
                <div className="commit-row" key={c.ix}>
                  <div className="commit-ix">{c.ix}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.body}</p>
                  </div>
                </div>
              ))}
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: "1px solid var(--rule)",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div className="tag-row">
                  <span className="tag-chip">Form 990</span>
                  <span className="tag-chip">Audited financials</span>
                  <span className="tag-chip">Annual report</span>
                </div>
                <a
                  href="mailto:info@everysecondcount.org"
                  className="btn-link"
                >
                  Request disclosures
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <Stagger className="principles">
              {PRINCIPLES.map((p) => (
                <StaggerItem key={p.ix} className="principle">
                  <div className="ix">{p.ix}</div>
                  <div>
                    <h4>{p.title}</h4>
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
