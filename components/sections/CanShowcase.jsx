"use client";
import Image from "next/image";
import { useMemo } from "react";

const CANS = ["/images/can.png", "/images/can2.png", "/images/can3.png"];

export default function CanShowcase() {
  const cards = useMemo(
    () => [
      { title: "Original", sub: "Red Blast", color: "#dc2626" },
      { title: "Venom", sub: "Toxic Green", color: "#16a34a" },
      { title: "Vortex", sub: "Purple Storm", color: "#7c3aed" },
    ],
    []
  );

  return (
    <section id="canshowcase" style={{ position: "relative", zIndex: 10, padding: "clamp(60px,8vw,110px) clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", border: "1px solid rgba(255,255,255,.08)", borderRadius: 22, padding: "clamp(24px,4vw,42px)", background: "linear-gradient(140deg,rgba(255,255,255,.04),rgba(255,255,255,.01))", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "min(40vw,460px)", height: "min(40vw,460px)", top: "-20%", right: "-10%", borderRadius: "50%", filter: "blur(90px)", background: "radial-gradient(circle,rgba(220,38,38,.28),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 14 }}>
          Can Showcase
        </div>
        <h3 style={{ margin: 0, fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,7vw,108px)", letterSpacing: 2, lineHeight: 0.95, color: "#fff" }}>
          CHOOSE YOUR <span style={{ color: "#dc2626" }}>ADVANTAGE</span>
        </h3>

        <div className="can-grid" style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {cards.map((item, idx) => (
            <article key={item.title} className="show-card" style={{ border: `1px solid ${item.color}6e`, borderRadius: 16, background: "linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.01))", padding: "20px 16px", minHeight: 390, position: "relative", overflow: "hidden", boxShadow: `0 14px 36px rgba(0,0,0,.35), 0 0 24px ${item.color}22 inset`, transition: "transform .35s, box-shadow .35s" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,transparent,${item.color},transparent)`, boxShadow: `0 0 22px ${item.color}` }} />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 65% 35%,${item.color}55 0%,transparent 62%)` }} />
              <div style={{ position: "absolute", left: "-35%", top: "-120%", width: "62%", height: "290%", transform: "rotate(20deg)", background: `linear-gradient(180deg,transparent,${item.color}28,transparent)`, animation: "showSweep 3.8s ease-in-out infinite" }} />
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                <div>
                  <Image src={CANS[idx] || "/images/can.png"} alt={item.title} width={210} height={380} loading="lazy" sizes="(max-width: 980px) 150px, 190px" style={{ width: "clamp(128px,14vw,190px)", height: "auto", filter: `drop-shadow(0 0 52px ${item.color}aa)` }} />
                </div>
                <div>
                  <div style={{ marginTop: 10, fontFamily: "'Bebas Neue',sans-serif", fontSize: 38, color: "#fff", letterSpacing: 1.8, lineHeight: .95 }}>{item.title}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, letterSpacing: 2.6, textTransform: "uppercase", color: "rgba(255,255,255,.58)" }}>{item.sub}</div>
                  <div style={{ marginTop: 12, display: "inline-block", padding: "7px 12px", borderRadius: 999, border: `1px solid ${item.color}77`, color: "#fff", fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", background: `${item.color}2b` }}>500ml · Sugar Free</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes showSweep {
          0%,100% { left:-40%; opacity:.28; }
          50% { left:120%; opacity:.85; }
        }
        .show-card:hover {
          transform: translateY(-7px) scale(1.015);
          box-shadow: 0 24px 44px rgba(0,0,0,.46);
        }
        @media (max-width: 980px) {
          .can-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 680px) {
          .can-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
