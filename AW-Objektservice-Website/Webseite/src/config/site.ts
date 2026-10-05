/**
 * Zentrale Unternehmensdaten.
 *
 * Alle Werte in [ECKIGEN KLAMMERN] sind Platzhalter und müssen vor der
 * Veröffentlichung durch echte Angaben ersetzt werden. Sie werden automatisch
 * in Header, Kontaktbereich, Footer, Impressum und strukturierten Daten verwendet.
 */
export const siteConfig = {
  /** Name, unter dem der Betrieb auf der Website auftritt. */
  name: "Objektservice Aichach",
  /** Rechtlich korrekter Firmenname (Impressum). */
  legalName: "[FIRMENNAME]",
  owner: "[INHABER]",
  shortDescription:
    "Zuverlässige Betreuung, Pflege und Instandhaltung rund um Ihre Immobilie in Aichach und Umgebung.",
  seoDescription:
    "Zuverlässiger Objektservice in Aichach und Umgebung. Gebäudebetreuung, Gartenpflege, Winterdienst, Kleinreparaturen und mehr. Jetzt Anfrage senden.",

  /** Wird über NEXT_PUBLIC_SITE_URL gesetzt (siehe .env.example). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ihre-domain.de").replace(/\/$/, ""),

  contact: {
    phone: "[TELEFONNUMMER]",
    email: "[E-MAIL]",
    address: {
      street: "[STRASSE UND HAUSNUMMER]",
      postalCode: "[PLZ]",
      city: "[ORT]",
      region: "Bayern",
      country: "DE",
    },
    openingHours: "[ÖFFNUNGSZEITEN]",
  },

  /**
   * Servicegebiet. Nur Orte eintragen, die tatsächlich bedient werden –
   * sie erscheinen im Text "Objektservice in Aichach und Umgebung"
   * und in den strukturierten Daten (areaServed).
   */
  serviceArea: {
    mainCity: "Aichach",
    additionalPlaces: [] as string[],
  },

  legal: {
    vatId: "[UST-IDNR]",
    responsibleForContent: "[INHABER]",
  },

  locale: "de_DE",
} as const;

/** true, wenn ein Wert noch ein [PLATZHALTER] ist. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /\[[^\]]+\]/.test(value);
}

/** tel:-Link oder null, solange die Telefonnummer ein Platzhalter ist. */
export function phoneHref(phone: string = siteConfig.contact.phone): string | null {
  if (isPlaceholder(phone)) return null;
  const normalized = phone.replace(/[^\d+]/g, "").replace(/^00/, "+");
  return normalized ? `tel:${normalized}` : null;
}

/** mailto:-Link oder null, solange die E-Mail ein Platzhalter ist. */
export function mailHref(email: string = siteConfig.contact.email): string | null {
  return isPlaceholder(email) ? null : `mailto:${email}`;
}

export function formatAddress(): string {
  const { street, postalCode, city } = siteConfig.contact.address;
  if ([street, postalCode, city].every(isPlaceholder)) return "[ADRESSE]";
  return `${street}, ${postalCode} ${city}`;
}

/**
 * Platzhalter-Hinweise (leere Bildrahmen mit Dateipfad, Beispiel-Bewertungen)
 * werden nur in der Entwicklung angezeigt. Im Live-Betrieb werden leere
 * Galerien und Bewertungen ausgeblendet.
 */
export const showPlaceholders = process.env.NODE_ENV !== "production";
