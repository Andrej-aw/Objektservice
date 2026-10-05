import { NextResponse } from "next/server";
import { parseInquiry, type Inquiry } from "@/lib/inquiry";

/**
 * Nimmt Anfragen aus dem Kontaktformular entgegen.
 *
 * Zustellung: Ist INQUIRY_WEBHOOK_URL gesetzt, wird die Anfrage als JSON dorthin
 * gesendet (z. B. Formular-Dienst, Make/Zapier oder eigener Mail-Service).
 * Ohne Konfiguration wird die Anfrage in der Entwicklung nur protokolliert;
 * im Live-Betrieb wird sie abgelehnt, damit keine Kundenanfrage unbemerkt verloren geht.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot-Feld: wird von Menschen nicht ausgefüllt.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = parseInquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const delivered = await deliverInquiry(data);
    if (!delivered) {
      return NextResponse.json(
        { ok: false, message: "Das Formular ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns telefonisch oder per E-Mail." },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Anfrage konnte nicht zugestellt werden:", error);
    return NextResponse.json(
      { ok: false, message: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function deliverInquiry(inquiry: Inquiry): Promise<boolean> {
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...inquiry, receivedAt: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Webhook antwortete mit Status ${response.status}`);
    return true;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[Entwicklung] Neue Anfrage (INQUIRY_WEBHOOK_URL nicht gesetzt):", inquiry);
    return true;
  }

  console.error("INQUIRY_WEBHOOK_URL ist nicht gesetzt – Anfrage wurde nicht zugestellt.");
  return false;
}
