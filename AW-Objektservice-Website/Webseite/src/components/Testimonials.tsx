import { showPlaceholders } from "@/config/site";
import { googleReviewsUrl, testimonials } from "@/content/trust";
import { Icon } from "./Icon";
import { Section, SectionHeading } from "./ui";

/**
 * Kundenstimmen. Echte Bewertungen in src/content/trust.ts eintragen.
 * Solange keine vorhanden sind, werden in der Entwicklung Platzhalter gezeigt
 * und im Live-Betrieb wird die Sektion ausgeblendet. Es werden bewusst keine
 * Sterne oder erfundenen Bewertungen angezeigt.
 */
export function Testimonials() {
  const hasTestimonials = testimonials.length > 0;
  if (!hasTestimonials && !showPlaceholders) return null;

  return (
    <Section id="bewertungen" tone="muted" labelledBy="bewertungen-title">
      <SectionHeading id="bewertungen-title" eyebrow="Kundenstimmen" title="Das sagen unsere Kunden" />

      {hasTestimonials ? (
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.quote} className="reveal">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 sm:p-7">
                <Icon name="quote" size={28} className="text-accent-600" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink">„{testimonial.quote}“</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="block font-semibold text-ink">{testimonial.author}</span>
                  {(testimonial.context || testimonial.source) && (
                    <span className="text-ink-muted">
                      {[testimonial.context, testimonial.source && `via ${testimonial.source}`].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-12 grid gap-5 md:grid-cols-3" aria-label="Platzhalter für Kundenbewertungen">
          {[1, 2, 3].map((n) => (
            <li
              key={n}
              className="flex min-h-48 flex-col justify-between rounded-2xl border-2 border-dashed border-brand/15 bg-white/60 p-6 text-ink-muted"
            >
              <Icon name="quote" size={28} className="text-ink/25" />
              <p className="mt-4 text-sm">
                [KUNDENBEWERTUNG {n}] – echte Bewertung in <code>src/content/trust.ts</code> eintragen.
              </p>
              <p className="mt-4 text-sm font-semibold">[NAME / KUNDENGRUPPE]</p>
            </li>
          ))}
        </ul>
      )}

      {googleReviewsUrl && (
        <p className="mt-8">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-accent-700 hover:underline"
          >
            Alle Bewertungen auf Google ansehen
            <Icon name="arrowRight" size={16} />
          </a>
        </p>
      )}
    </Section>
  );
}
