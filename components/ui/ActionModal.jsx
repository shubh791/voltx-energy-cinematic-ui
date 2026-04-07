"use client";
import { useEffect } from "react";

export default function ActionModal({ open, title = "Notice", onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        background: "rgba(0,0,0,.72)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px,96vw)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,.16)",
          background: "linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.03))",
          boxShadow: "0 30px 70px rgba(0,0,0,.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", width: 260, height: 260, right: -70, top: -70, borderRadius: "50%", filter: "blur(70px)", background: "radial-gradient(circle,rgba(220,38,38,.36),transparent 70%)" }} />
        <button
          onClick={() => onClose?.()}
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 4,
            width: 34,
            height: 34,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.2)",
            background: "rgba(0,0,0,.35)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ padding: "30px 24px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.58)", fontSize: 12 }}>
            VOLTX UI Demo
          </div>
          <h3 style={{ margin: "10px 0 8px", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1.5, color: "#fff", fontSize: "clamp(30px,5vw,48px)" }}>
            {title}
          </h3>
          <p style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>
            This interaction is currently for UI showcase only. Purchasing, checkout,
            and media playback are not integrated yet.
          </p>
        </div>
      </div>
    </div>
  );
}
