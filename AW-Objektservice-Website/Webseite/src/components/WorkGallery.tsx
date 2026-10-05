import { showPlaceholders } from "@/config/site";
import { beforeAfterPairs, galleryImages } from "@/content/images";
import { imageExists, onlyExisting } from "@/lib/images";
import { GalleryGrid } from "./GalleryGrid";
import { SmartImage } from "./SmartImage";
import { Section, SectionHeading } from "./ui";

/**
 * "Einblicke in unsere Arbeit" – Galerie mit Kategorien und Lightbox.
 * Daten: `galleryImages` und `beforeAfterPairs` in src/content/images.ts.
 */
export function WorkGallery() {
  const available = onlyExisting(galleryImages);
  const usePlaceholders = available.length === 0;
  const pairs = beforeAfterPairs.filter((pair) => imageExists(pair.before.src) && imageExists(pair.after.src));

  if (usePlaceholders && !showPlaceholders && pairs.length === 0) return null;

  return (
    <Section id="einblicke" tone="muted" labelledBy="einblicke-title">
      <SectionHeading
        id="einblicke-title"
        eyebrow="Galerie"
        title="Einblicke in unsere Arbeit"
        intro="Ein Blick auf unseren Arbeitsalltag – von der Gartenpflege über den Winterdienst bis zur Gebäudebetreuung."
      />

      {(!usePlaceholders || showPlaceholders) && (
        <div className="mt-8">
          <GalleryGrid
            items={usePlaceholders ? galleryImages : available}
            filterable={!usePlaceholders}
            placeholder={usePlaceholders}
            label="Einblicke in unsere Arbeit"
          />
        </div>
      )}

      {pairs.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-ink">Vorher / Nachher</h3>
          <ul className="mt-6 grid gap-6 lg:grid-cols-2">
            {pairs.map((pair) => (
              <li key={pair.title} className="rounded-2xl border border-line bg-white p-4">
                <p className="mb-3 font-semibold text-ink">{pair.title}</p>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["Vorher", pair.before],
                      ["Nachher", pair.after],
                    ] as const
                  ).map(([label, image]) => (
                    <figure key={label}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <SmartImage image={image} sizes="(min-width: 1024px) 25vw, 50vw" />
                      </div>
                      <figcaption className="mt-2 text-sm font-medium text-ink-muted">{label}</figcaption>
                    </figure>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
