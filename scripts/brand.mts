// Rebuilds every raster brand asset from lib/brand/mark.ts. Run: npm run brand
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { markSvg } from "../lib/brand/mark.ts";

const root = process.cwd();
const NIGHT = "#15161a";
const PLASTER = "#f2eee6";
const EMBER = "#e07a52";

const png = (svg: string, size: number) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

async function out(rel: string, data: Buffer | string) {
  const file = join(root, rel);
  await mkdir(join(file, ".."), { recursive: true });
  await writeFile(file, data);
  console.log("wrote", rel);
}

/** PNG-in-ICO container; sharp cannot write .ico itself. */
function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

// Small sizes drop the plumb bob and get a tighter pad so the A reads at 16px.
const tiny = markSvg({ fg: PLASTER, bg: NIGHT, shape: "square", pad: 0.1, detail: false });
const app = markSvg({ fg: PLASTER, bg: NIGHT, shape: "square", pad: 0.2 });
const maskable = markSvg({ fg: PLASTER, bg: NIGHT, shape: "square", pad: 0.42 });
const logo = markSvg({ fg: EMBER, bg: NIGHT, shape: "square", pad: 0.24 });

await out("app/favicon.ico", ico([
  { size: 32, data: await png(tiny, 32) },
  { size: 48, data: await png(tiny, 48) },
]));
await out("app/icon.png", await png(tiny, 96));
await out("app/apple-icon.png", await png(app, 180));
await out("public/images/brand/asrg-icon-192.png", await png(app, 192));
await out("public/images/brand/asrg-icon-512.png", await png(app, 512));
await out("public/images/brand/asrg-icon-maskable-512.png", await png(maskable, 512));
await out("public/images/brand/asrg-logo-512.png", await png(logo, 512));
await out("public/images/brand/asrg-mark.svg", markSvg({ fg: NIGHT, size: 48, pad: 0.05 }));

// Static film grain tile for dark photo sections: mid-grey noise, alpha varies.
const G = 192;
const noise = Buffer.alloc(G * G * 4);
for (let i = 0; i < G * G; i++) {
  const v = Math.random() < 0.5 ? 0 : 255;
  noise[i * 4] = noise[i * 4 + 1] = noise[i * 4 + 2] = v;
  noise[i * 4 + 3] = Math.floor(Math.random() * 90);
}
await out(
  "public/images/texture/grain.png",
  await sharp(noise, { raw: { width: G, height: G, channels: 4 } }).png({ compressionLevel: 9 }).toBuffer(),
);
