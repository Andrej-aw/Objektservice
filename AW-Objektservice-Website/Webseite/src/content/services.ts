import type { IconName } from "@/components/Icon";

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  /** Kurzbeschreibung für die Leistungs-Cards. */
  summary: string;
  /** Einleitung auf der Detailseite /leistungen/[slug]. */
  intro: string;
  /** Typische Aufgaben – bei Bedarf an das tatsächliche Angebot anpassen. */
  tasks: string[];
  /** Optionales Bild unter /public/images/leistungen/. Fehlt die Datei, wird ein Platzhalter gezeigt. */
  image: { src: string; alt: string };
  seo: { title: string; description: string };
};

/**
 * Zentrale Leistungsliste. Neue Leistung = neuer Eintrag.
 * Karten, Detailseiten, Formular-Auswahl, Footer und Sitemap werden daraus erzeugt.
 */
export const services: Service[] = [
  {
    slug: "gebaeudebetreuung",
    title: "Gebäudebetreuung",
    icon: "building",
    summary: "Regelmäßige Kontrolle und Betreuung Ihrer Immobilie.",
    intro:
      "Wir kümmern uns um die laufende Betreuung Ihres Gebäudes, damit kleine Mängel früh erkannt werden und alles in Ordnung bleibt – ob Mehrfamilienhaus, Wohnanlage oder Gewerbeobjekt.",
    tasks: [
      "Regelmäßige Begehungen nach Absprache",
      "Sichtkontrolle von Gemeinschaftsflächen und Außenanlagen",
      "Meldung von Schäden und Auffälligkeiten",
      "Koordination kleinerer Arbeiten",
      "Fester Ansprechpartner für Eigentümer und Verwaltung",
    ],
    image: {
      src: "/images/leistungen/gebaeudebetreuung.jpg",
      alt: "Mitarbeiter bei der Kontrolle eines Mehrfamilienhauses in Aichach",
    },
    seo: {
      title: "Gebäudebetreuung & Objektbetreuung in Aichach",
      description:
        "Gebäudebetreuung in Aichach und Umgebung: regelmäßige Kontrollen, Pflege und ein fester Ansprechpartner für Ihre Immobilie. Jetzt unverbindlich anfragen.",
    },
  },
  {
    slug: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    icon: "sparkles",
    summary: "Saubere und gepflegte Gemeinschaftsflächen.",
    intro:
      "Ein gepflegtes Treppenhaus ist die Visitenkarte jeder Immobilie. Wir reinigen Treppenhäuser und Gemeinschaftsflächen im vereinbarten Rhythmus.",
    tasks: [
      "Kehren und Wischen von Treppen und Podesten",
      "Reinigung von Handläufen, Geländern und Türen",
      "Pflege von Eingangsbereichen",
      "Reinigung von Kellergängen und Gemeinschaftsräumen",
      "Individuelle Reinigungsintervalle",
    ],
    image: {
      src: "/images/leistungen/treppenhausreinigung.jpg",
      alt: "Gereinigtes Treppenhaus in einem Mehrfamilienhaus",
    },
    seo: {
      title: "Treppenhausreinigung in Aichach",
      description:
        "Treppenhausreinigung in Aichach und Umgebung für Mehrfamilienhäuser, Wohnanlagen und Gewerbeobjekte. Regelmäßig und zuverlässig. Jetzt Angebot anfragen.",
    },
  },
  {
    slug: "gartenpflege",
    title: "Gartenpflege",
    icon: "leaf",
    summary: "Rasenpflege, Hecken schneiden, Laub entfernen und allgemeine Grundstückspflege.",
    intro:
      "Von der regelmäßigen Rasenpflege bis zum Heckenschnitt: Wir halten Außenanlagen und Grünflächen über das ganze Jahr in einem gepflegten Zustand.",
    tasks: [
      "Rasen mähen und pflegen",
      "Hecken und Sträucher schneiden",
      "Laub entfernen",
      "Unkraut entfernen und Beete pflegen",
      "Allgemeine Grundstückspflege",
    ],
    image: {
      src: "/images/leistungen/gartenpflege.jpg",
      alt: "Gepflegte Grünfläche an einer Wohnanlage",
    },
    seo: {
      title: "Gartenpflege in Aichach",
      description:
        "Gartenpflege in Aichach und Umgebung: Rasenpflege, Heckenschnitt, Laubentfernung und Grundstückspflege für Privat- und Gewerbekunden. Jetzt anfragen.",
    },
  },
  {
    slug: "winterdienst",
    title: "Winterdienst",
    icon: "snowflake",
    summary: "Schnee- und Eisbeseitigung sowie Sicherstellung begehbarer Flächen.",
    intro:
      "Im Winter sorgen wir dafür, dass Wege, Zufahrten und Eingänge begehbar bleiben. Umfang und Zeiten stimmen wir vorab mit Ihnen ab.",
    tasks: [
      "Schneeräumung von Gehwegen, Zugängen und Zufahrten",
      "Streuen bei Glätte",
      "Freihalten von Eingangsbereichen",
      "Abstimmung des Einsatzumfangs vor Saisonbeginn",
    ],
    image: {
      src: "/images/leistungen/winterdienst.jpg",
      alt: "Geräumter Gehweg vor einem Wohnhaus im Winter",
    },
    seo: {
      title: "Winterdienst in Aichach",
      description:
        "Winterdienst in Aichach und Umgebung: Schneeräumung und Streudienst für Wohnanlagen, Privat- und Gewerbeobjekte. Jetzt für die Saison anfragen.",
    },
  },
  {
    slug: "kleinreparaturen",
    title: "Kleinreparaturen",
    icon: "wrench",
    summary: "Kleinere Reparaturen und Instandhaltungsarbeiten rund um Gebäude und Grundstück.",
    intro:
      "Viele kleine Mängel lassen sich schnell beheben, bevor größere Schäden entstehen. Wir übernehmen kleinere Reparatur- und Instandhaltungsarbeiten.",
    tasks: [
      "Austausch von Leuchtmitteln",
      "Kleinere Arbeiten an Türen, Schlössern und Beschlägen",
      "Montage- und Ausbesserungsarbeiten",
      "Instandhaltung von Außenanlagen",
    ],
    image: {
      src: "/images/leistungen/kleinreparaturen.jpg",
      alt: "Mitarbeiter bei einer Kleinreparatur mit Werkzeug",
    },
    seo: {
      title: "Kleinreparaturen & Instandhaltung in Aichach",
      description:
        "Kleinreparaturen und Instandhaltung in Aichach und Umgebung – rund um Gebäude und Grundstück. Schnell abgestimmt, sauber erledigt. Jetzt anfragen.",
    },
  },
  {
    slug: "objektkontrolle",
    title: "Objektkontrolle",
    icon: "clipboard",
    summary: "Regelmäßige Kontrollen von Gebäuden, Außenanlagen und technischen Bereichen.",
    intro:
      "Mit festen Kontrollgängen behalten Sie den Zustand Ihrer Immobilie im Blick – auch wenn Sie selbst nicht vor Ort sind.",
    tasks: [
      "Kontrollgänge nach vereinbartem Plan",
      "Sichtprüfung von Außenanlagen und technischen Räumen",
      "Dokumentation und Rückmeldung an Eigentümer oder Verwaltung",
      "Kontrolle leerstehender Objekte",
    ],
    image: {
      src: "/images/leistungen/objektkontrolle.jpg",
      alt: "Kontrollgang an einem Gebäude",
    },
    seo: {
      title: "Objektkontrolle in Aichach",
      description:
        "Objektkontrolle in Aichach und Umgebung: regelmäßige Kontrollgänge an Gebäuden, Außenanlagen und technischen Bereichen mit Rückmeldung. Jetzt anfragen.",
    },
  },
  {
    slug: "entruempelung",
    title: "Entrümpelung",
    icon: "box",
    summary: "Unterstützung bei der Räumung von Kellern, Garagen, Wohnungen und sonstigen Flächen.",
    intro:
      "Ob Keller, Dachboden, Garage oder Wohnung: Wir unterstützen Sie bei der Räumung und schaffen wieder Platz.",
    tasks: [
      "Räumung von Kellern und Dachböden",
      "Räumung von Garagen und Lagerflächen",
      "Unterstützung bei Wohnungsräumungen",
      "Abtransport nach Absprache",
    ],
    image: {
      src: "/images/leistungen/entruempelung.jpg",
      alt: "Geräumter Kellerraum",
    },
    seo: {
      title: "Entrümpelung in Aichach",
      description:
        "Entrümpelung in Aichach und Umgebung: Keller, Garagen, Dachböden und Wohnungen. Unkompliziert abgestimmt. Jetzt kostenloses Angebot anfragen.",
    },
  },
  {
    slug: "muelltonnenservice",
    title: "Mülltonnenservice",
    icon: "trash",
    summary: "Bereitstellung und Rückstellung von Mülltonnen.",
    intro:
      "Wir stellen Ihre Mülltonnen zu den Abholterminen bereit und räumen sie anschließend wieder zurück – zuverlässig nach Abfuhrkalender.",
    tasks: [
      "Bereitstellung der Tonnen zum Abholtermin",
      "Rückstellung nach der Leerung",
      "Sauberhalten der Stellplätze",
      "Orientierung am Abfuhrkalender",
    ],
    image: {
      src: "/images/leistungen/muelltonnenservice.jpg",
      alt: "Ordentlich bereitgestellte Mülltonnen vor einem Wohnhaus",
    },
    seo: {
      title: "Mülltonnenservice in Aichach",
      description:
        "Mülltonnenservice in Aichach und Umgebung: Bereitstellung und Rückstellung Ihrer Mülltonnen nach Abfuhrkalender. Jetzt unverbindlich anfragen.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
