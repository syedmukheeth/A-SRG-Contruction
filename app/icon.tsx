import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab mark: bold copper "A" on ink, with a foundation baseline. */
export default function Icon() {
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
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
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
            marginTop: 3,
            width: 16,
            height: 2,
            background: "#c7853e",
          }}
        />
      </div>
    ),
    size,
  );
}
