"use client";

import { Reveal } from "./Motion";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Reveal>
          <div className="footer-grid">
            <div>
              <a href="#" className="brand">
                <span className="brand-mark">
                  <span className="dot" />
                </span>
                <span>
                  Every Second Count
                  <small>everysecondcount.org</small>
                </span>
              </a>
              <p className="footer-mission">
                Building life-saving evacuation technology — and standing with
                the families who need it most.
              </p>
              <a
                href="mailto:info@everysecondcount.org?subject=Donation%20inquiry"
                className="btn btn-ink btn-sm"
              >
                Donate
              </a>
            </div>
            <div className="footer-col">
              <h5>Mission</h5>
              <ul>
                <li>
                  <a href="#mission">Our mission</a>
                </li>
                <li>
                  <a href="#build">What we build</a>
                </li>
                <li>
                  <a href="#who">Who we help</a>
                </li>
                <li>
                  <a href="#family">Family support</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Accountability</h5>
              <ul>
                <li>
                  <a href="#transparency">Transparency</a>
                </li>
                <li>
                  <a href="#">Annual report</a>
                </li>
                <li>
                  <a href="#">Form 990</a>
                </li>
                <li>
                  <a href="#">Board of directors</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Contact</h5>
              <ul>
                <li>
                  <a href="mailto:info@everysecondcount.org">
                    info@everysecondcount.org
                  </a>
                </li>
                <li>
                  <a href="#">Press inquiries</a>
                </li>
                <li>
                  <a href="#">Partner with us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="legal">
              &copy; Every Second Count. A U.S. nonprofit organization.
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
