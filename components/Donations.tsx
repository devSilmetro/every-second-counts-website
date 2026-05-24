"use client";

import { Reveal, Stagger, StaggerItem, ArrowIcon } from "./Motion";

const CATEGORIES = [
  {
    ix: "01",
    title: "Technology development",
    body: "Engineering, accessibility audits, and security review for our evacuation guidance tools.",
  },
  {
    ix: "02",
    title: "Pilot deployments",
    body: "Putting safety technology into the hands of schools and places of worship at no cost to them.",
  },
  {
    ix: "03",
    title: "Emergency preparedness resources",
    body: "Training materials, drills, and printable guidance for staff and volunteers.",
  },
  {
    ix: "04",
    title: "Family relief support",
    body: "Direct assistance and long-term programs for families impacted by gun violence.",
  },
  {
    ix: "05",
    title: "Community outreach",
    body: "Listening sessions, partnerships, and on-the-ground program coordination.",
  },
];

function NotifyCard() {
  return (
    <div id="stay-informed" className="donate-card">
      <div className="prelaunch-pill">
        <span className="dot" />
        Pre-launch
      </div>
      <h3>Make a donation</h3>
      <p className="sub">
        Your contribution funds the five program areas listed here. To make a
        one-time or recurring gift, or to ask how your support would be
        directed, please contact us directly.
      </p>

      <div className="contact-block">
        <div className="contact-row">
          <span className="contact-lbl">Email</span>
          <a
            href="mailto:info@everysecondcount.org"
            className="contact-val"
          >
            info@everysecondcount.org
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-lbl">Inquiries</span>
          <span className="contact-val">
            Donations, partnerships, press &amp; general questions
          </span>
        </div>
      </div>

      <a
        href="mailto:info@everysecondcount.org?subject=Donation%20inquiry"
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
      >
        Donate to Save Lives <ArrowIcon />
      </a>
      <a
        href="mailto:info@everysecondcount.org"
        className="btn btn-ghost"
        style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
      >
        Ask a Question
      </a>
      <div className="fine">
        Tax-deductible to the extent allowed by law. A receipt will be provided
        for your records.
      </div>
    </div>
  );
}

export function Donations() {
  return (
    <section className="section donate-section" id="how-donations-help">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How Donations Help</span>
          <h2>Every dollar supports one of five program areas.</h2>
          <p className="lead">
            Donations to Every Second Count are directed across five focused
            programs. To make a contribution, or ask where your support would
            go, please reach out to us directly.
          </p>
        </Reveal>

        <div className="donate-split">
          <Reveal>
            <Stagger className="category-list">
              {CATEGORIES.map((c) => (
                <StaggerItem key={c.title} className="category">
                  <div className="pct">{c.ix}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
          <Reveal>
            <NotifyCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
