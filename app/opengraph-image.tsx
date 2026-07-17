import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt =
  "PhotonMatters: AI-native lending & collections platform for banks, NBFCs and telecom operators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social-share / AI-preview card. Rendered at build time by next/og,
 * so it ships as a static asset with zero external font or network dependency.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b0716 0%, #1a1426 55%, #2a1a4d 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient brand bloom */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(126,73,242,0.55), transparent 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #7e49f2, #e9a2f2)",
              display: "flex",
            }}
          />
          <div style={{ color: "#ffffff", fontSize: 40, fontWeight: 700 }}>
            {SITE.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 940,
              display: "flex",
            }}
          >
            AI-Powered Lending, reaching the last mile.
          </div>
          <div
            style={{
              color: "#c9b8f0",
              fontSize: 30,
              fontWeight: 500,
              maxWidth: 900,
              display: "flex",
            }}
          >
            {SITE.blurb}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ color: "#e9a2f2", fontSize: 26, fontWeight: 600 }}>
            {SITE.domain}
          </div>
          <div style={{ color: "#6b5a8f", fontSize: 26 }}>·</div>
          <div style={{ color: "#9d8bc4", fontSize: 26 }}>{SITE.regions}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
