# Objektservice Aichach – Website

Next.js (App Router) · TypeScript · Tailwind CSS. Keine weiteren Laufzeit-Abhängigkeiten.

## Starten

```bash
npm install
npm run dev        # Entwicklung: http://localhost:3000
npm run build      # Produktions-Build
npm start          # Produktions-Server
npm run typecheck  # TypeScript prüfen
```

## Vor dem Livegang ausfüllen

| Was | Wo |
| --- | --- |
| Telefon, E-Mail, Adresse, Öffnungszeiten, Firmenname, Inhaber, USt-IdNr. | `src/config/site.ts` |
| Weitere Orte im Servicegebiet (nur tatsächlich bediente!) | `src/config/site.ts` → `serviceArea.additionalPlaces` |
| Domain für Canonical/Sitemap/Schema.org | `.env.local` → `NEXT_PUBLIC_SITE_URL` (siehe `.env.example`) |
| Zustellung der Formularanfragen | `.env.local` → `INQUIRY_WEBHOOK_URL` |
| Impressum & Datenschutz (rechtlich prüfen lassen) | `src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx` |

Alle Platzhalter stehen in `[ECKIGEN KLAMMERN]` – eine Suche nach `[` findet sie.
Sobald die Telefonnummer eingetragen ist, werden alle „Jetzt anrufen“-Buttons automatisch zu `tel:`-Links.

### Kontaktformular

Das Formular sendet an `/api/anfrage`. Die Route prüft die Eingaben und leitet die Anfrage als JSON an
`INQUIRY_WEBHOOK_URL` weiter (z. B. Formular-Dienst, Make/Zapier-Webhook, eigener Mail-Service).
In der Entwicklung wird die Anfrage ohne Webhook nur in der Konsole ausgegeben. **Im Live-Betrieb
ohne Webhook lehnt das Formular Anfragen mit einem Hinweis ab**, damit keine Anfrage unbemerkt verloren geht.

## Inhalte pflegen

| Inhalt | Datei |
| --- | --- |
| Leistungen (Cards, Detailseiten, Formular-Auswahl, Footer, Sitemap) | `src/content/services.ts` |
| Vorteile, Zielgruppen, Ablauf, Trust-Elemente, Navigation | `src/content/home.ts` |
| Alle Bilder (Hero, Über uns, Fuhrpark, Galerie, Vorher/Nachher) | `src/content/images.ts` |
| Kundenbewertungen, Nachweise/Zertifikate, Kundenlogos, Google-Link | `src/content/trust.ts` |

## Bilder

```
public/images/
  hero/         Hero-Bild (objektservice.png)
  fuhrpark/     Fahrzeuge, Anhänger, Maschinen
  leistungen/   ein Bild pro Leistung (<slug>.jpg)
  team/         Inhaber, Team
  referenzen/   betreute Objekte, Vorher/Nachher
  unternehmen/  Arbeitsfotos für „Einblicke in unsere Arbeit“
```

Neues Bild: Datei in den Ordner legen und den Eintrag in `src/content/images.ts` ergänzen (bzw. den
vorbereiteten Dateinamen verwenden). Fertig.

- Fehlt eine Datei, zeigt die Seite automatisch einen neutralen Platzhalter bzw. blendet leere Galerien aus.
- In der Entwicklung (`npm run dev`) zeigen Platzhalter den erwarteten Dateipfad an; leere Galerien und
  Bewertungs-Platzhalter sind nur dort sichtbar.
- Bilder werden von Next.js automatisch als AVIF/WebP in passenden Größen ausgeliefert und lazy geladen.
  Originale als JPG mit ca. 2000–2500 px Kantenlänge ablegen.
- Galerie-Layout: `layout: "wide"` (doppelt breit) oder `"tall"` (doppelt hoch) je Bild.
