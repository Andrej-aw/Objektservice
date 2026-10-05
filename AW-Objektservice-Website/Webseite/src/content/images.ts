/**
 * Zentrale Bildverwaltung.
 *
 * Neue Bilder hinzufügen:
 *   1. Datei in den passenden Ordner unter /public/images/ legen
 *      (hero, fuhrpark, leistungen, team, referenzen, unternehmen).
 *   2. Hier einen Eintrag ergänzen bzw. den Pfad anpassen.
 *
 * Bilder, deren Datei (noch) nicht existiert, werden automatisch übersprungen
 * bzw. durch einen Platzhalter ersetzt. Die Website funktioniert also auch mit
 * wenigen oder ganz ohne Bilder. Next.js erzeugt automatisch optimierte
 * AVIF/WebP-Versionen in passenden Größen – Originalfotos können einfach
 * als JPG abgelegt werden (empfohlen: max. ca. 2500 px Kantenlänge).
 */

export type SiteImage = {
  src: string;
  alt: string;
  title?: string;
};

export type GalleryCategory =
  | "Fuhrpark"
  | "Gartenpflege"
  | "Winterdienst"
  | "Gebäudeservice"
  | "Maschinen & Ausstattung"
  | "Team"
  | "Referenzen";

export type GalleryImage = SiteImage & {
  category: GalleryCategory;
  /** Darstellung im Raster (Desktop): "wide" = doppelt breit, "tall" = doppelt hoch. */
  layout?: "normal" | "wide" | "tall";
};

export type BeforeAfterPair = {
  title: string;
  before: SiteImage;
  after: SiteImage;
};

/* ---------- Logo ---------- */
export const logo = {
  /** Rote Version für helle Hintergründe (Header) */
  src: "/images/unternehmen/logo.png",
  /** Weiße Version für dunkle Hintergründe (Footer) */
  srcLight: "/images/unternehmen/logo-weiss.png",
  alt: "AW Objektservice – Andrej Woloschin",
  width: 457,
  height: 309,
};

/* ---------- Hero ---------- */
export const heroImage: SiteImage = {
  src: "/images/hero/objektservice.png",
  alt: "Mitarbeiter des Objektservice mit Klemmbrett bei der Objektkontrolle",
};

/* ---------- Über uns ---------- */
export const aboutImage: SiteImage = {
  src: "/images/team/inhaber.jpg",
  alt: "Inhaber des Objektservice Aichach",
};

/* ---------- Fuhrpark ---------- */
export const fleetImages: SiteImage[] = [
  {
    src: "/images/fuhrpark/fahrzeug-1.jpg",
    alt: "Fuhrpark des Objektservice Aichach",
    title: "Unser Fuhrpark",
  },
  {
    src: "/images/fuhrpark/fahrzeug-2.jpg",
    alt: "Fahrzeug des Objektservice Aichach",
    title: "Flexibel im Einsatz",
  },
  {
    src: "/images/fuhrpark/anhaenger.jpg",
    alt: "Anhänger für den Transport von Material und Geräten",
    title: "Anhänger",
  },
  {
    src: "/images/fuhrpark/aufsitzmaeher.jpg",
    alt: "Aufsitzmäher für die Pflege größerer Grünflächen",
    title: "Aufsitzmäher",
  },
  {
    src: "/images/fuhrpark/rasenmaeher.jpg",
    alt: "Rasenmäher für die Gartenpflege",
    title: "Rasenmäher",
  },
  {
    src: "/images/fuhrpark/winterdienst-fahrzeug.jpg",
    alt: "Fahrzeug für den Winterdienst",
    title: "Winterdienst",
  },
];

/* ---------- "Einblicke in unsere Arbeit" ---------- */
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/unternehmen/gartenpflege-1.jpg",
    alt: "Rasenpflege an einer Wohnanlage",
    title: "Rasenpflege",
    category: "Gartenpflege",
    layout: "wide",
  },
  {
    src: "/images/unternehmen/winterdienst-1.jpg",
    alt: "Schneeräumung eines Gehwegs",
    title: "Schneeräumung",
    category: "Winterdienst",
    layout: "tall",
  },
  {
    src: "/images/unternehmen/gebaeudeservice-1.jpg",
    alt: "Betreutes Mehrfamilienhaus",
    title: "Gebäudebetreuung",
    category: "Gebäudeservice",
  },
  {
    src: "/images/fuhrpark/fahrzeug-1.jpg",
    alt: "Fahrzeug des Objektservice Aichach",
    title: "Unterwegs in Aichach",
    category: "Fuhrpark",
  },
  {
    src: "/images/unternehmen/maschinen-1.jpg",
    alt: "Werkzeuge und Maschinen für den Einsatz",
    title: "Ausstattung",
    category: "Maschinen & Ausstattung",
  },
  {
    src: "/images/team/team-1.jpg",
    alt: "Team des Objektservice Aichach",
    title: "Unser Team",
    category: "Team",
  },
];

/* ---------- Vorher/Nachher (erscheint erst, wenn beide Bilder vorhanden sind) ---------- */
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    title: "Heckenschnitt",
    before: { src: "/images/referenzen/hecke-vorher.jpg", alt: "Hecke vor dem Rückschnitt" },
    after: { src: "/images/referenzen/hecke-nachher.jpg", alt: "Hecke nach dem Rückschnitt" },
  },
];
