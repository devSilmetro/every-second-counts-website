import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Board & Leadership — Every Second Count",
  description:
    "The board and leadership of Every Second Count — a U.S. nonprofit building life-saving evacuation technology and supporting families impacted by gun violence.",
};

type Member = {
  name: string;
  role: string;
  short: string;        // one-liner under the name
  bio: string[];        // paragraphs
  initials: string;
};

const MEMBERS: Member[] = [
  {
    name: "Sumit Dhoopar",
    role: "Founder & Board Chair",
    short: "Electrical engineer, cybersecurity practitioner, and two-time founder.",
    bio: [
      "Sumit founded Every Second Count after more than two decades building safety, security, and infrastructure technology. As an electrical engineer and cybersecurity practitioner, he has spent his career on the operational side of how facilities actually respond when something goes wrong.",
      "He is a two-time founder with more than $12M in revenue across prior ventures, and serves as CEO of SiliconMetro — the for-profit technology company whose evacuation-routing research underpins the systems Every Second Count deploys at no cost to schools, places of worship, and community spaces.",
    ],
    initials: "SD",
  },
  {
    name: "Russell Marne",
    role: "Board Member & General Counsel",
    short: "Founding partner, Newsom, Griffin & Marne Law Group. Ten years with The Getty Trust.",
    bio: [
      "Russell is a founding partner of the Newsom, Griffin & Marne Law Group in San Rafael, California, where his practice covers nonprofit governance, charitable giving, and the regulatory work that keeps mission-driven organizations on solid ground.",
      "Before private practice he spent ten years at The Getty Trust, one of the largest cultural institutions in the United States, where he handled the day-to-day legal questions that come with stewarding public-interest assets at scale. He guides the board on compliance, donor obligations, and the structural questions every young nonprofit has to get right the first time.",
    ],
    initials: "RM",
  },
];

function MemberCard({ m, index }: { m: Member; index: number }) {
  return (
    <StaggerItem className="member">
      <div className="member-portrait" aria-hidden>
        <span className="member-initials">{m.initials}</span>
        <span className="member-idx">— {String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="member-body">
        <div className="member-role">{m.role}</div>
        <h2 className="member-name">{m.name}</h2>
        <p className="member-short">{m.short}</p>
        <div className="member-bio">
          {m.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </StaggerItem>
  );
}

export default function BoardPage() {
  return (
    <>
      <ScrollProgress />
      <Nav />

      <main>
        {/* Page header */}
        <header className="section board-head">
          <div className="container">
            <Reveal>
              <span className="eyebrow">Board &amp; Leadership</span>
              <h1 className="board-title">
                The people accountable for this work.
              </h1>
              <p className="lead board-lead">
                Every Second Count is governed by a small board of practitioners
                and counsel — people whose day jobs are building safety
                technology, advising nonprofits, and serving institutions that
                steward public trust. Our board is small by design, and
                growing.
              </p>
            </Reveal>
          </div>
        </header>

        {/* Members */}
        <section className="section board-members" id="members">
          <div className="container">
            <Stagger className="member-list">
              {MEMBERS.map((m, i) => (
                <MemberCard key={m.name} m={m} index={i} />
              ))}
            </Stagger>

            <Reveal>
              <p className="board-note">
                Additional board members and an advisory council — including
                educators, faith leaders, public-safety experts, and a survivor
                advisory panel — are being seated in our first year. Inquiries:{" "}
                <a href="mailto:info@everysecondcount.org">
                  info@everysecondcount.org
                </a>.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Legal & Compliance Contact */}
        <section className="section board-legal" id="legal">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">Legal &amp; Compliance Contact</span>
              <h2>For donor questions, governance, and counsel.</h2>
              <p className="lead">
                Russell Marne serves as General Counsel for Every Second Count.
                For donor-advised gift questions, planned giving, governance
                inquiries, or other legal matters, you can reach Russell
                directly at the Marne Law Group.
              </p>
            </Reveal>

            <Reveal>
              <div className="legal-card">
                <div className="legal-card-grid">
                  <div>
                    <span className="legal-lbl">Counsel</span>
                    <span className="legal-val">Russell Marne</span>
                    <span className="legal-firm">
                      Newsom, Griffin &amp; Marne Law Group
                    </span>
                  </div>
                  <div>
                    <span className="legal-lbl">Office</span>
                    <span className="legal-val">
                      30 N. San Pedro Rd., Ste 195
                      <br />
                      San Rafael, CA 94903
                    </span>
                  </div>
                  <div>
                    <span className="legal-lbl">Phone</span>
                    <a
                      href="tel:+14154998100"
                      className="legal-val legal-link"
                    >
                      415.499.8100
                    </a>
                  </div>
                  <div>
                    <span className="legal-lbl">Email</span>
                    <a
                      href="mailto:Russell@MarneLaw.com"
                      className="legal-val legal-link"
                    >
                      Russell@MarneLaw.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
