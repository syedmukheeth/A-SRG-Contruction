import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: same mark as icon.tsx, scaled up with the ASRG wordmark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#090909",
          backgroundImage:
            "linear-gradient(rgba(199,133,62,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(199,133,62,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1,
            color: "#c7853e",
          }}
        >
          A
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
            width: 72,
            height: 6,
            background: "#c7853e",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 20,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#f8f8f8",
          }}
        >
          ASRG
        </div>
      </div>
    ),
    size,
  );
}
