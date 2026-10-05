import { About } from "@/components/About";
import { ContactSection } from "@/components/ContactSection";
import { Fleet } from "@/components/Fleet";
import { Hero } from "@/components/Hero";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { LocalArea } from "@/components/LocalArea";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { TargetGroups } from "@/components/TargetGroups";
import { Testimonials } from "@/components/Testimonials";
import { WorkGallery } from "@/components/WorkGallery";

/*
 * Reihenfolge: Vertrauen → Leistungen → Über uns & Vorteile → Zielgruppen → Ablauf
 * → Bilder → Region → Bewertungen → Kontakt. Weiße und hellgraue Sektionen wechseln
 * sich ab und laufen weich ineinander über.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <Services />
      <About />
      <TargetGroups />
      <Process />
      <Fleet />
      <WorkGallery />
      <LocalArea />
      <Testimonials />
      <ContactSection />
    </>
  );
}
