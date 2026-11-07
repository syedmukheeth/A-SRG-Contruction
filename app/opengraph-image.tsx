import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site, heroPortrait } from "@/lib/site";
import { markSvg } from "@/lib/brand/mark";

const photo = readFileSync(join(process.cwd(), "public", heroPortrait.src.slice(1))).toString("base64");
const mark = Buffer.from(markSvg({ fg: "#e07a52", size: 64, pad: 0.04 })).toString("base64");

export const alt = `${site.name} · building in ${site.location.city} since ${site.established}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#15161a", color: "#f2eee6", fontFamily: "sans-serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${photo}`}
          width={470}
          height={630}
          alt=""
          style={{ position: "absolute", right: 0, top: 0, objectFit: "cover", objectPosition: "50% 30%" }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 470,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, #15161a 0%, rgba(21,22,26,0) 45%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 64px", width: 820, height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/svg+xml;base64,${mark}`} width={64} height={64} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1 }}>ASRG</span>
              <span style={{ fontSize: 14, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(242,238,230,0.7)" }}>
                Construction
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
              fontSize: 100,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            <span>Built in</span>
            <span>{site.location.city},</span>
            <span style={{ color: "#e07a52" }}>since {site.established}.</span>
          </div>
          <span style={{ marginTop: 28, fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,238,230,0.65)" }}>
            {site.ownerShort} · {site.ownerTitle} · {site.yearsOfExperience} years
          </span>
        </div>
      </div>
    ),
    size,
  );
}
