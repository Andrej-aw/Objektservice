import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Fehler 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Diese Seite gibt es leider nicht.</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-muted">
        Vielleicht hilft Ihnen ein Blick auf unsere Leistungen – oder Sie kontaktieren uns direkt.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Zur Startseite</ButtonLink>
        <ButtonLink href="/#kontakt" variant="outline">
          Kontakt aufnehmen
        </ButtonLink>
      </div>
    </Container>
  );
}
