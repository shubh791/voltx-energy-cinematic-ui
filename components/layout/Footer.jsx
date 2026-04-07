"use client";
import { useMemo } from "react";

export default function Footer({ accentColor = "#dc2626" }) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px) 110px",
        borderTop: "1px solid rgba(255,255,255,.08)",
        background: "linear-gradient(180deg,rgba(255,255,255,.01),rgba(0,0,0,.35))",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          display: "grid",
          gap: 26,
          gridTemplateColumns: "1.3fr 1fr 1fr",
          alignItems: "start",
        }}
      >
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, letterSpacing: 3, color: "#fff" }}>
            VOLT<span style={{ color: accentColor }}>X</span>
          </div>
          <p style={{ marginTop: 12, maxWidth: 360, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,.46)" }}>
            Premium energy built for focus, power, and endurance.
            Zero sugar, high performance, no compromise.
          </p>
        </div>

        <div>
          <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, color: "#fff", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>
            Explore
          </h4>
          {[
            { label: "Concept", href: "#concept" },
            { label: "Flavors", href: "#flavors" },
            { label: "Showcase", href: "#canshowcase" },
            { label: "Story", href: "#scrollstory" },
            { label: "Science", href: "#science" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{ display: "block", marginBottom: 10, textDecoration: "none", color: "rgba(255,255,255,.56)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13 }}>
              {item.label}
            </a>
          ))}
        </div>

        <div>
          <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, color: "#fff", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>
            Contact
          </h4>
          <a href="mailto:hello@voltxenergy.com" style={{ display: "block", marginBottom: 10, textDecoration: "none", color: "rgba(255,255,255,.56)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13 }}>
            hello@voltxenergy.com
          </a>
          <a href="tel:+910000000000" style={{ display: "block", textDecoration: "none", color: "rgba(255,255,255,.56)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13 }}>
            +91 00000 00000
          </a>
          <div style={{ marginTop: 16, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#fff", letterSpacing: 3, textTransform: "uppercase" }}>
            Founder
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "center" }}>
            <a href="https://www.linkedin.com/in/shubham-panghal/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${accentColor}77`, background: "rgba(255,255,255,.04)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V24h-4V8zm7 0h3.82v2.2h.06c.53-1 1.84-2.2 3.78-2.2 4.04 0 4.79 2.66 4.79 6.12V24h-4v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.96V24h-4V8z" />
              </svg>
            </a>
            <a href="https://github.com/shubh791" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${accentColor}77`, background: "rgba(255,255,255,.04)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56 0-.28-.01-1.03-.02-2.02-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.69 1.26 3.35.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.2-3.09-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.2 11.2 0 0 1 5.83 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.6.23 2.76.12 3.05.75.8 1.2 1.83 1.2 3.09 0 4.44-2.68 5.42-5.24 5.7.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.2 0 .31.2.67.8.56A11.54 11.54 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1360, margin: "32px auto 0", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)" }}>
          © {year} VOLTX ENERGY
        </span>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, color: "rgba(255,255,255,.32)" }}>
          Built for relentless performance
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
