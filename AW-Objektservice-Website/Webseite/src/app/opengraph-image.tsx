import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} – Objektservice in Aichach und Umgebung`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Automatisch erzeugtes Vorschaubild für Social Media (Open Graph). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #c6252e 0%, #a51e26 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: "#ffffff" }}>
          Aichach und Umgebung
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#ffffff", maxWidth: 900 }}>
            Gebäudebetreuung · Gartenpflege · Winterdienst · Kleinreparaturen
          </div>
        </div>
        <div style={{ display: "flex", width: 120, height: 8, borderRadius: 4, background: "#2e9a64" }} />
      </div>
    ),
    size,
  );
}
