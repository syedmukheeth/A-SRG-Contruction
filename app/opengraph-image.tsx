import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/lib/site";

const logoBase64 = readFileSync(
  join(process.cwd(), "public/images/brand/logo-mark-og.png"),
).toString("base64");

export const alt = `${site.name} · 46 Years of Construction Experience`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#090909",
          backgroundImage:
            "linear-gradient(rgba(199,133,62,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(199,133,62,0.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#a0a0a0",
            fontSize: 22,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/png;base64,${logoBase64}`}
              width={64}
              height={64}
              alt=""
            />
            <span>{site.name}</span>
          </div>
          <span>{site.location.city}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 800,
              lineHeight: 0.9,
              color: "#f8f8f8",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
            }}
          >
            46 Years
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              lineHeight: 0.9,
              color: "#c7853e",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
            }}
          >
            Of Construction Experience
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            color: "#a0a0a0",
            fontSize: 24,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>Civil Contractors</span>
          <span style={{ color: "#c7853e" }}>·</span>
          <span>Residential</span>
          <span style={{ color: "#c7853e" }}>·</span>
          <span>Commercial</span>
          <span style={{ color: "#c7853e" }}>·</span>
          <span>Renovation</span>
        </div>
      </div>
    ),
    size,
  );
}
