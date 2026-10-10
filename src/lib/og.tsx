import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

const fontsDir = join(process.cwd(), "src", "assets", "fonts");

/** Imagen Open Graph de marca: bosque, título en Fraunces y una foto-hoja como firma. */
export async function renderOgImage({ title, kicker }: { title: string; kicker: string }) {
  const [regular, italic] = await Promise.all([
    readFile(join(fontsDir, "Fraunces-Regular.ttf")),
    readFile(join(fontsDir, "Fraunces-Italic.ttf")),
  ]);
  const parts = title.split(/\*(.+?)\*/g);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#1f3a2f",
          color: "#f6f1e8",
          fontFamily: "Fraunces",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, letterSpacing: 12 }}>{site.wordmark.toUpperCase()}</div>
            <div style={{ fontSize: 18, letterSpacing: 5, opacity: 0.75, marginTop: 6 }}>
              {site.tagline.toUpperCase()}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 68, lineHeight: 1.08 }}>
            {parts.map((part, i) =>
              part ? (
                <span
                  key={i}
                  style={{
                    fontStyle: i % 2 === 1 ? "italic" : "normal",
                    color: i % 2 === 1 ? "#dde5d8" : "#f6f1e8",
                    whiteSpace: "pre",
                  }}
                >
                  {part}
                </span>
              ) : null,
            )}
          </div>
          <div style={{ fontSize: 24, opacity: 0.8 }}>{kicker}</div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 70,
            width: 320,
            height: 490,
            borderRadius: "140px 24px 140px 24px",
            background: "linear-gradient(165deg, #8c9f86 0%, #4b6a55 60%, #2c4b3c 100%)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: regular, style: "normal", weight: 400 },
        { name: "Fraunces", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
