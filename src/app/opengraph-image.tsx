import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 78% 22%, rgba(90,120,255,0.28), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#ffffff",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 7l7 2.6v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V9.6L16 7z"
                stroke="#0a0a0a"
                strokeWidth="1.8"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M12.4 15.8l2.6 2.6 4.6-5"
                stroke="#0a0a0a"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <span style={{ fontSize: 32, fontWeight: 600, color: "#ffffff" }}>
            WoGu
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontSize: 60,
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Workflow correctness for Temporal
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#a0a0a0",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Detect determinism violations and workflow anti-patterns before deployment.
        </div>
      </div>
    ),
    { ...size },
  );
}
