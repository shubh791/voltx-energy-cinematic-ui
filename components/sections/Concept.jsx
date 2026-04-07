"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PILLARS = [
  { title: "Precision Formula", desc: "Clinically aware ingredient design balanced for intensity and stability." },
  { title: "Performance Focus", desc: "Clean stimulation engineered for sessions that demand consistent output." },
  { title: "No Crash Profile", desc: "A smoother energy arc that avoids sharp peaks and hard drop-offs." },
];

export default function Concept() {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".concept-eyebrow", { y: 24, opacity: 0, duration: 0.6 })
      .from(".concept-title", { y: 30, opacity: 0, duration: 0.8 }, "-=.35")
      .from(".concept-copy", { y: 20, opacity: 0, duration: 0.7 }, "-=.45")
      .from(".concept-card", { y: 28, opacity: 0, duration: 0.55, stagger: 0.12 }, "-=.35")
      .from(".concept-glow", { scale: 0.65, opacity: 0, duration: 1 }, "-=1.1");

    gsap.to(".concept-card", {
      y: -8,
      duration: 2.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.18, from: "center" },
    });
  }, []);

  return (
    <section id="concept" ref={wrapRef} style={{ position: "relative", zIndex: 10, padding: "clamp(70px,9vw,130px) clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "clamp(28px,5vw,56px)", background: "linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01))", overflow: "hidden" }}>
        <div className="concept-glow" style={{ position: "absolute", width: "min(42vw,520px)", height: "min(42vw,520px)", right: "-12%", top: "-18%", borderRadius: "50%", filter: "blur(90px)", background: "radial-gradient(circle,rgba(220,38,38,.35),transparent 68%)", pointerEvents: "none" }} />
        <div className="concept-eyebrow" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, letterSpacing: 5, color: "rgba(255,255,255,.45)", textTransform: "uppercase", marginBottom: 16 }}>
          Brand Concept
        </div>
        <h2 className="concept-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(56px,8vw,120px)", letterSpacing: 2, lineHeight: 0.95, color: "#fff", margin: 0 }}>
          ENGINEERED FOR <span style={{ color: "#dc2626" }}>RELENTLESS</span> DAYS
        </h2>
        <p className="concept-copy" style={{ marginTop: 20, maxWidth: 760, fontFamily: "'Space Grotesk',sans-serif", color: "rgba(255,255,255,.45)", lineHeight: 1.85 }}>
          VOLTX is built as a modern performance beverage identity: aggressive visual language, cleaner formulation goals,
          and high-consistency experience across work, training, and competition routines.
        </p>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="concept-grid">
          {PILLARS.map((item) => (
            <div key={item.title} className="concept-card" style={{ border: "1px solid rgba(255,255,255,.14)", borderRadius: 14, padding: "20px 18px", background: "linear-gradient(130deg,rgba(255,255,255,.1),rgba(255,255,255,.02))", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg,transparent,#dc2626,transparent)", boxShadow: "0 0 24px rgba(220,38,38,.75)" }} />
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, letterSpacing: 1, color: "#fff" }}>{item.title}</div>
              <div style={{ marginTop: 6, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,.4)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .concept-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .concept-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
