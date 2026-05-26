"use client";

import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Motion";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type Incident = {
  title: string;
  category: string;
  location: string;
  date: string;          // display string
  iso: string;           // for <time datetime>
  killed: number;
  injured: number;
  body: string;
  lesson: string;
  image: string;         // path under /public — placeholder OK
  alt: string;
  source: string;        // URL to authoritative source
  sourceLabel: string;   // short label for the source link
  credit?: string;       // photo attribution line (Wikimedia Commons license requirement)
};

const INCIDENTS: Incident[] = [
  {
    title: "Islamic Center of San Diego",
    category: "Place of Worship",
    location: "San Diego, California",
    date: "May 18, 2026",
    iso: "2026-05-18",
    killed: 3,
    injured: 0,
    body:
      "Two teenage gunmen — radicalized online by Islamophobic content — opened fire outside the largest mosque in San Diego, killing a security guard and two long-time staff members before fleeing and dying by suicide nearby. Authorities are investigating it as a hate crime.",
    lesson:
      "Mosques face a growing threat from online-radicalized attackers. Perimeter awareness and rehearsed response now matter as much as locked doors.",
    image: "/images/incidents/san-diego.jpg",
    alt: "Islamic Center of San Diego",
    source: "https://en.wikipedia.org/wiki/2026_Islamic_Center_of_San_Diego_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Leonard LMT · CC BY 4.0 via Wikimedia Commons",
  },
  {
    title: "Grand Blanc Township LDS Chapel",
    category: "Place of Worship",
    location: "Grand Blanc Township, Michigan",
    date: "September 28, 2025",
    iso: "2025-09-28",
    killed: 4,
    injured: 8,
    body:
      "A gunman rammed his truck into the front wall of a Latter-day Saints chapel during Sunday service, opened fire on the congregation with a rifle, and set the building ablaze. The FBI later confirmed the attack was motivated by hatred of the Mormon faith.",
    lesson:
      "Worship spaces face an evolving threat — vehicular ramming combined with firearms and fire. Preparedness now means more than one drill.",
    image: "/images/incidents/grand-blanc.jpg",
    alt: "Grand Blanc Township LDS chapel after the September 2025 attack",
    source: "https://en.wikipedia.org/wiki/2025_Grand_Blanc_Township_church_attack",
    sourceLabel: "Wikipedia",
    credit: "Photo: video still via YouTube — license review pending",
  },
  {
    title: "Annunciation Catholic Church & School",
    category: "School + Place of Worship",
    location: "Minneapolis, Minnesota",
    date: "August 27, 2025",
    iso: "2025-08-27",
    killed: 2,
    injured: 17,
    body:
      "A gunman opened fire through the stained-glass windows of Annunciation Catholic Church during a school-wide Mass, killing two children — eight-year-old Fletcher Merkel and ten-year-old Harper Moyski — and injuring seventeen others. Federal authorities investigated the attack as anti-Catholic domestic terrorism.",
    lesson:
      "Schools and houses of worship are not separate problems. The buildings that hold both — and the people who fill them — need preparedness for both.",
    image: "/images/incidents/annunciation.jpg",
    alt: "Annunciation Catholic Church in Minneapolis",
    source: "https://en.wikipedia.org/wiki/Annunciation_Catholic_Church_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Chad Davis · CC BY 4.0 via Wikimedia Commons",
  },
  {
    title: "Florida State University",
    category: "University",
    location: "Tallahassee, Florida",
    date: "April 17, 2025",
    iso: "2025-04-17",
    killed: 2,
    injured: 6,
    body:
      "A 20-year-old FSU student opened fire near and inside the Student Union just before noon, killing two university employees — campus dining director Robert Morales and Aramark vice president Tiru Chabba — and wounding six others. The attack lasted about three minutes.",
    lesson:
      "Universities are open campuses with thousands of students, staff, and visitors. Preparedness has to scale to that openness, not pretend it away.",
    image: "/images/incidents/fsu.jpg",
    alt: "Florida State University Student Union building in Tallahassee",
    source: "https://en.wikipedia.org/wiki/2025_Florida_State_University_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: CC0 via Wikimedia Commons",
  },
  {
    title: "Apalachee High School",
    category: "High School",
    location: "Winder, Georgia",
    date: "September 4, 2024",
    iso: "2024-09-04",
    killed: 4,
    injured: 9,
    body:
      "A 14-year-old student opened fire in a classroom on the second day of the school year. Two students and two teachers were killed. FBI agents had visited the suspect's home over school-shooting threats more than a year earlier.",
    lesson:
      "The pattern continues. Every year that passes without a national preparedness floor is a year more communities join this list.",
    image: "/images/incidents/apalachee.jpg",
    alt: "Apalachee High School in Winder, Georgia",
    source: "https://en.wikipedia.org/wiki/2024_Apalachee_High_School_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: MallardTV · CC0 via Wikimedia Commons",
  },
  {
    title: "Lewiston Bowling Alley & Bar",
    category: "Community Space",
    location: "Lewiston, Maine",
    date: "October 25, 2023",
    iso: "2023-10-25",
    killed: 18,
    injured: 13,
    body:
      "A gunman attacked a bowling alley during a youth league night, then drove to a nearby restaurant and opened fire on another crowd. The deadliest mass shooting in Maine history.",
    lesson:
      "Community gathering places — bowling alleys, restaurants, libraries — are public infrastructure too, and they're rarely included in safety planning.",
    image: "/images/incidents/lewiston.jpg",
    alt: "Scenes from the Lewiston, Maine mass shooting",
    source: "https://en.wikipedia.org/wiki/Lewiston,_Maine_shootings",
    sourceLabel: "Wikipedia",
    credit: "Photo: Public domain via Wikimedia Commons",
  },
  {
    title: "The Covenant School",
    category: "Elementary School",
    location: "Nashville, Tennessee",
    date: "March 27, 2023",
    iso: "2023-03-27",
    killed: 6,
    injured: 0,
    body:
      "Three nine-year-old students and three staff members were killed at a private Christian elementary school. Officers reached and stopped the shooter in 14 minutes.",
    lesson:
      "Fast response saves lives — but pre-attack preparation saves the lives between the first shot and the first officer.",
    image: "/images/incidents/covenant.jpg",
    alt: "Covenant Presbyterian Church and the Covenant School in Nashville",
    source: "https://en.wikipedia.org/wiki/Covenant_School_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Dclemens1971 · CC BY-SA 4.0 via Wikimedia Commons",
  },
  {
    title: "Robb Elementary",
    category: "Elementary School",
    location: "Uvalde, Texas",
    date: "May 24, 2022",
    iso: "2022-05-24",
    killed: 21,
    injured: 17,
    body:
      "Nineteen children and two teachers were killed in a fourth-grade classroom. Law enforcement waited 77 minutes in the hallway before entering the room.",
    lesson:
      "When professional response is delayed, what people inside the building already know — or don't — decides who lives.",
    image: "/images/incidents/uvalde.jpg",
    alt: "Memorial outside Robb Elementary School in Uvalde, Texas",
    source: "https://en.wikipedia.org/wiki/Robb_Elementary_School_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Voice of America · Public domain",
  },
  {
    title: "Oxford High School",
    category: "High School",
    location: "Oxford, Michigan",
    date: "November 30, 2021",
    iso: "2021-11-30",
    killed: 4,
    injured: 7,
    body:
      "A 15-year-old student opened fire in a school hallway between classes. Drills practiced earlier that year are credited with reducing the casualty count.",
    lesson:
      "Rehearsed evacuation works. Drilled buildings save students even when warning systems fail.",
    image: "/images/incidents/oxford.jpg",
    alt: "Oxford High School building in Michigan",
    source: "https://en.wikipedia.org/wiki/Oxford_High_School_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Adrienne of Oxford · CC BY-SA 4.0 via Wikimedia Commons",
  },
  {
    title: "Tree of Life Synagogue",
    category: "Place of Worship",
    location: "Pittsburgh, Pennsylvania",
    date: "October 27, 2018",
    iso: "2018-10-27",
    killed: 11,
    injured: 7,
    body:
      "Three congregations were holding Shabbat services in shared space when a gunman entered and opened fire. The deadliest antisemitic attack in U.S. history.",
    lesson:
      "Faith communities sharing a building need shared, rehearsed evacuation routes — not three separate plans.",
    image: "/images/incidents/tree-of-life.jpg",
    alt: "Tree of Life synagogue facade in Pittsburgh",
    source: "https://en.wikipedia.org/wiki/Pittsburgh_synagogue_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: daveynin · CC BY 2.0 via Wikimedia Commons",
  },
  {
    title: "Marjory Stoneman Douglas High",
    category: "High School",
    location: "Parkland, Florida",
    date: "February 14, 2018",
    iso: "2018-02-14",
    killed: 17,
    injured: 17,
    body:
      "A former student pulled a fire alarm to flush classmates into the hallways, then opened fire across three floors of the freshman building.",
    lesson:
      "A fire alarm cannot be the universal signal to evacuate when the threat is inside the building.",
    image: "/images/incidents/parkland.jpg",
    alt: "Parkland, Florida shooting scene",
    source: "https://en.wikipedia.org/wiki/Stoneman_Douglas_High_School_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Public domain via Wikimedia Commons",
  },
  {
    title: "First Baptist Church",
    category: "Place of Worship",
    location: "Sutherland Springs, Texas",
    date: "November 5, 2017",
    iso: "2017-11-05",
    killed: 26,
    injured: 22,
    body:
      "A gunman in tactical gear walked into Sunday service and opened fire on a rural congregation of roughly fifty people. The deadliest church shooting in modern U.S. history.",
    lesson:
      "Small congregations rarely have a safety officer or an evacuation plan. They need both.",
    image: "/images/incidents/sutherland-springs.svg",
    alt: "Aerial view of the First Baptist Church grounds in Sutherland Springs, Texas",
    source: "https://en.wikipedia.org/wiki/Sutherland_Springs_church_shooting",
    sourceLabel: "Wikipedia",
  },
  {
    title: "Emanuel AME Church",
    category: "Place of Worship",
    location: "Charleston, South Carolina",
    date: "June 17, 2015",
    iso: "2015-06-17",
    killed: 9,
    injured: 1,
    body:
      "A gunman sat through a Bible study at the historic AME church for nearly an hour before opening fire on the congregants who had welcomed him.",
    lesson:
      "Houses of worship are designed to welcome strangers. Safety planning has to respect that purpose.",
    image: "/images/incidents/emanuel-ame.jpg",
    alt: "Mourners gathered outside Mother Emanuel AME Church in Charleston",
    source: "https://en.wikipedia.org/wiki/Charleston_church_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Voice of America · Public domain",
  },
  {
    title: "Sandy Hook Elementary",
    category: "Elementary School",
    location: "Newtown, Connecticut",
    date: "December 14, 2012",
    iso: "2012-12-14",
    killed: 26,
    injured: 2,
    body:
      "Twenty first-graders and six educators were killed in classrooms within minutes of the gunman entering the building. The attack ended before tactical units could engage.",
    lesson:
      "Locked classroom doors saved lives. Seconds — not minutes — determined who survived.",
    image: "/images/incidents/sandy-hook.jpg",
    alt: "Police at Sandy Hook Elementary School in Newtown, Connecticut",
    source: "https://en.wikipedia.org/wiki/Sandy_Hook_Elementary_School_shooting",
    sourceLabel: "Wikipedia",
    credit: "Photo: Voice of America · Public domain",
  },
];

const VISIBLE_BY_DEFAULT = 5;

// National-scale statistics, sourced from authoritative third parties.
// Each number is a verified figure from the cited organization — not a sum of
// the registry above. If a number ever feels wrong, follow the source link
// and update both the number and the label here.
type Stat = {
  n: number;
  suffix?: string;
  label: string;
  source: string;
  sourceUrl: string;
};
const NATIONAL_STATS: Stat[] = [
  {
    n: 502,
    label: "Mass shootings in the U.S. in 2024",
    source: "Gun Violence Archive",
    sourceUrl: "https://www.gunviolencearchive.org/past-tolls",
  },
  {
    n: 330,
    label: "Shootings on K-12 school property in the U.S. in 2024",
    source: "K-12 School Shooting Database",
    sourceUrl: "https://k12ssdb.org/all-shootings",
  },
  {
    n: 4400,
    suffix: "+",
    label: "U.S. children and teens shot and killed each year (2020–2024 average)",
    source: "Everytown for Gun Safety",
    sourceUrl: "https://everytownresearch.org/",
  },
];

function Counter({ to, durationMs = 1800 }: { to: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: durationMs / 1000,
      ease: [0.2, 0.7, 0.2, 1],
    });
    return controls.stop;
  }, [inView, mv, to, durationMs]);

  useEffect(() => rounded.on("change", (v) => {
    if (ref.current) ref.current.textContent = v;
  }), [rounded]);

  return <span ref={ref}>0</span>;
}

function IncidentCard({ inc, index }: { inc: Incident; index: number }) {
  return (
    <motion.article
      className="incident"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div className="incident-media">
        <motion.div
          className="incident-img"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={inc.image} alt={inc.alt} loading="lazy" />
        </motion.div>
        <motion.div
          className="incident-banner"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <span className="incident-banner-title">{inc.title}</span>
          <span className="incident-banner-date">{inc.date}</span>
        </motion.div>
        <span className="incident-index">— {String(index + 1).padStart(2, "0")}</span>

        {inc.credit && (
          <span className="incident-credit" aria-hidden>{inc.credit}</span>
        )}
      </div>

      <div className="incident-body">
        <div className="incident-meta">
          <div>
            <span className="incident-meta-lbl">Location</span>
            <span className="incident-meta-val">{inc.location}</span>
          </div>
          <div>
            <span className="incident-meta-lbl">Type</span>
            <span className="incident-meta-val">{inc.category}</span>
          </div>
          <div>
            <span className="incident-meta-lbl">Lives lost</span>
            <span className="incident-meta-val incident-killed">{inc.killed}</span>
          </div>
          {inc.injured > 0 && (
            <div>
              <span className="incident-meta-lbl">Wounded</span>
              <span className="incident-meta-val">{inc.injured}</span>
            </div>
          )}
        </div>

        <p className="incident-prose">{inc.body}</p>

        <div className="incident-lesson">
          <span className="incident-lesson-lbl">What this tells us</span>
          <p>{inc.lesson}</p>
        </div>

        <a
          href={inc.source}
          target="_blank"
          rel="noopener noreferrer"
          className="incident-source"
        >
          <span className="incident-source-lbl">Source</span>
          <span className="incident-source-link">{inc.sourceLabel} ↗</span>
        </a>
      </div>
    </motion.article>
  );
}

export function Pattern() {
  return (
    <section className="section pattern" id="pattern">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">A Pattern, Not Isolated Events</span>
          <h2>
            We have been here before. Again. And again. And again.
          </h2>
          <p className="lead">
            These are not freak occurrences. They are a recurring pattern at the
            places communities trust to be safe — schools, places of worship,
            and the gathering spaces of public life. Every Second Count exists
            because we refuse to keep treating each one as a surprise.
          </p>
        </Reveal>

        <motion.div
          className="pattern-stats"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {NATIONAL_STATS.map((s) => (
            <div className="pattern-stat" key={s.label}>
              <div className="pattern-stat-n">
                <Counter to={s.n} durationMs={2200} />
                {s.suffix && <span className="pattern-stat-suffix">{s.suffix}</span>}
              </div>
              <div className="pattern-stat-l">{s.label}</div>
              <a
                href={s.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pattern-stat-source"
              >
                Source: {s.source} ↗
              </a>
            </div>
          ))}
        </motion.div>

        <IncidentList />

        <motion.div
          className="pattern-source"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8 }}
        >
          National statistics sourced from the Gun Violence Archive, the
          K-12 School Shooting Database, and Everytown for Gun Safety. Each
          incident below is verified against Wikipedia, CNN, and contemporaneous
          news reporting. This timeline is a partial record — not a complete
          one. The full list is longer. That is the point.
        </motion.div>
      </div>
    </section>
  );
}

function IncidentList() {
  const [expanded, setExpanded] = useState(false);
  const visible = INCIDENTS.slice(0, VISIBLE_BY_DEFAULT);
  const rest = INCIDENTS.slice(VISIBLE_BY_DEFAULT);
  const hiddenCount = rest.length;

  return (
    <>
      <div className="incidents">
        {visible.map((inc, i) => (
          <IncidentCard key={inc.iso + inc.title} inc={inc} index={i} />
        ))}

        <AnimatePresence initial={false}>
          {expanded &&
            rest.map((inc, i) => (
              <motion.div
                key={inc.iso + inc.title}
                initial={{ opacity: 0, y: 28 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  transition: { duration: 0.3, ease: EASE },
                }}
              >
                <IncidentCard inc={inc} index={visible.length + i} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {hiddenCount > 0 && (
        <div className="pattern-reveal">
          <button
            type="button"
            className="pattern-reveal-btn"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (
              <>
                <span className="pattern-reveal-glyph" aria-hidden>—</span>
                Show fewer incidents
              </>
            ) : (
              <>
                <span className="pattern-reveal-glyph" aria-hidden>+</span>
                Show {hiddenCount} more incidents from 2012–2023
              </>
            )}
          </button>
          <div className="pattern-reveal-meta">
            {expanded
              ? `Showing all ${INCIDENTS.length} incidents`
              : `Showing ${visible.length} most recent of ${INCIDENTS.length}`}
          </div>
        </div>
      )}
    </>
  );
}
