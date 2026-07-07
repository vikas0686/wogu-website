import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111",
        }}
      >
        <svg width="104" height="104" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 7l7 2.6v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V9.6L16 7z"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12.4 15.8l2.6 2.6 4.6-5"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
