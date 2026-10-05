/**
 * Vertrauenselemente, die später ergänzt werden können.
 * Nur echte, belegbare Inhalte eintragen. Leere Listen werden nicht angezeigt.
 */

export type Testimonial = {
  /** Echter Wortlaut der Bewertung (nur mit Einverständnis veröffentlichen). */
  quote: string;
  /** z. B. "Familie M." oder "Hausverwaltung aus Aichach" */
  author: string;
  context?: string;
  /** z. B. "Google" – nur angeben, wenn die Bewertung von dort stammt. */
  source?: string;
};

export type Credential = {
  /** z. B. "Gewerbeanmeldung", "Betriebshaftpflichtversicherung", Zertifikat */
  title: string;
  description?: string;
  /** Optionales Logo/Dokumentbild unter /public/images/unternehmen/ */
  image?: { src: string; alt: string };
};

export type ClientLogo = { name: string; src: string };

export const testimonials: Testimonial[] = [];

export const credentials: Credential[] = [];

export const clientLogos: ClientLogo[] = [];

/** Link zum Google-Unternehmensprofil (für "Bewertung auf Google ansehen"). */
export const googleReviewsUrl: string | null = null;
