import { showPlaceholders } from "@/config/site";
import { fleetImages } from "@/content/images";
import { onlyExisting } from "@/lib/images";
import { GalleryGrid } from "./GalleryGrid";
import { Section, SectionHeading } from "./ui";

/**
 * "Unser Fuhrpark" – wird automatisch aus `fleetImages` (src/content/images.ts) erzeugt.
 * Im Live-Betrieb nur sichtbar, sobald mindestens ein Foto vorhanden ist.
 */
export function Fleet() {
  const available = onlyExisting(fleetImages);
  const usePlaceholders = available.length === 0;
  if (usePlaceholders && !showPlaceholders) return null;

  return (
    <Section id="fuhrpark" labelledBy="fuhrpark-title">
      <SectionHeading
        id="fuhrpark-title"
        eyebrow="Ausstattung"
        title="Unser Fuhrpark"
        intro="Mit unserem Fuhrpark und professioneller Ausrüstung sind wir flexibel für unterschiedliche Aufgaben rund um Ihre Immobilie ausgestattet."
      />
      <div className="mt-10">
        <GalleryGrid
          items={usePlaceholders ? fleetImages : available}
          variant="carousel"
          placeholder={usePlaceholders}
          label="Bilder unseres Fuhrparks"
        />
      </div>
    </Section>
  );
}
