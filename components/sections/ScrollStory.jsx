"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const STEPS = [
  { k: "01", title: "Ignite", body: "Rapid onset stimulation to start strong and gain momentum early." },
  { k: "02", title: "Sustain", body: "Balanced focus curve that supports longer sessions with less fatigue." },
  { k: "03", title: "Finish", body: "Cleaner landing profile designed to keep you productive post-session." },
];

export default function ScrollStory() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".ss-eye", { opacity: 0, y: 20, duration: 0.55 })
      .from(".ss-title", { opacity: 0, y: 28, duration: 0.75 }, "-=.35")
      .from(".ss-item", { opacity: 0, y: 34, duration: 0.7, stagger: 0.16 }, "-=.35")
      .from(".ss-line", { scaleX: 0, transformOrigin: "left center", duration: 0.9 }, "-=.55");

    gsap.to(".ss-item", {
      y: -10,
      duration: 2.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.2, from: "start" },
    });
  }, []);

  return (
    <section id="scrollstory" ref={ref} style={{ position: "relative", zIndex: 10, padding: "clamp(60px,8vw,110px) clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1260, margin: "0 auto", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "clamp(24px,4vw,44px)", background: "linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01))" }}>
        <div className="ss-eye" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 12 }}>
          Scroll Story
        </div>
        <h3 className="ss-title" style={{ margin: 0, fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,7vw,104px)", lineHeight: 0.95, letterSpacing: 2, color: "#fff" }}>
          THE ENERGY ARC
        </h3>
        <div className="ss-line" style={{ marginTop: 12, width: "min(440px,72%)", height: 2, borderRadius: 2, background: "linear-gradient(90deg,#dc2626,rgba(220,38,38,.15),transparent)" }} />

        <div className="ss-grid" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {STEPS.map((step) => (
            <article key={step.k} className="ss-item" style={{ border: "1px solid rgba(255,255,255,.14)", borderRadius: 14, padding: "20px 18px", background: "linear-gradient(130deg,rgba(255,255,255,.08),rgba(255,255,255,.02))", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg,transparent,#dc2626,transparent)", boxShadow: "0 0 22px rgba(220,38,38,.72)" }} />
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 56, color: "rgba(255,255,255,.1)", lineHeight: 1 }}>{step.k}</div>
              <div style={{ marginTop: -6, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, color: "#fff" }}>{step.title}</div>
              <p style={{ marginTop: 8, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,.45)" }}>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .ss-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 680px) {
          .ss-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
