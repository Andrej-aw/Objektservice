import { services } from "@/content/services";
import { InlineCta } from "./InlineCta";
import { ServiceCard } from "./ServiceCard";
import { Section, SectionHeading } from "./ui";

export function Services() {
  return (
    <Section id="leistungen" labelledBy="leistungen-title">
      <SectionHeading
        id="leistungen-title"
        eyebrow="Leistungen"
        title="Alles rund um Ihre Immobilie – aus einer Hand"
        intro="Von der Gebäudebetreuung über Gartenpflege bis zum Winterdienst – das ganze Jahr in Aichach und Umgebung."
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.slug}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
      <InlineCta title="Welche Unterstützung benötigen Sie?" />
    </Section>
  );
}
