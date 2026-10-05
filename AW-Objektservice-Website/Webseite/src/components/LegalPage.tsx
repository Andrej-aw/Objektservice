import type { ReactNode } from "react";
import { Container } from "./ui";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-12 sm:py-16">
          <h1 className="text-4xl font-bold tracking-tight text-ink">{title}</h1>
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <div className="prose-legal max-w-3xl">
          <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Hinweis: Dies ist eine Vorlage mit Platzhaltern in [eckigen Klammern]. Bitte vor Veröffentlichung
            vollständig ausfüllen und rechtlich prüfen lassen.
          </p>
          {children}
        </div>
      </Container>
    </>
  );
}
