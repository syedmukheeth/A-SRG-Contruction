import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site, heroPhoto } from "@/lib/site";

const read = (p: string) => readFileSync(join(process.cwd(), "public", p)).toString("base64");
const logo = read("images/brand/logo-mark-og.png");
const photo = read(heroPhoto.src.slice(1));

export const alt = `${site.name} · building in ${site.location.city} since ${site.established}`;
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
          background: "#f2eee6",
          fontFamily: "sans-serif",
          color: "#1c1b19",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "52px 64px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#4a4741",
              borderBottom: "2px solid rgba(28,27,25,0.14)",
              paddingBottom: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${logo}`} width={48} height={48} alt="" />
              <span>{site.name}</span>
            </div>
            <span>
              {site.yearsOfExperience} years · {site.location.city}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
              fontSize: 104,
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            <span>Built in {site.location.city},</span>
            <span style={{ color: "#b4472a" }}>since {site.established}.</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${photo}`}
          width={1200}
          height={220}
          alt=""
          style={{ marginTop: "auto", objectFit: "cover", objectPosition: "50% 70%" }}
        />
      </div>
    ),
    size,
  );
}
