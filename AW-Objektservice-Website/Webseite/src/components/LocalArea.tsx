import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { Icon } from "./Icon";
import { Section } from "./ui";

export function LocalArea() {
  const { mainCity, additionalPlaces } = siteConfig.serviceArea;
  const linkClass = "font-medium text-ink underline decoration-accent-500/40 underline-offset-4 hover:decoration-accent-600";
  const serviceLink = (slug: string, label: string) => (
    <Link href={`/leistungen/${slug}`} className={linkClass}>
      {label}
    </Link>
  );

  return (
    <Section id="region" labelledBy="region-title">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Regional für Sie da</p>
          <h2 id="region-title" className="mt-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
            Objektservice in Aichach und Umgebung
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              Wir unterstützen Privatkunden, Vermieter, Hausverwaltungen und Gewerbekunden in {mainCity} und der
              näheren Umgebung bei der zuverlässigen Betreuung ihrer Immobilien.
            </p>
            <p>
              Als Objektservice in {mainCity} übernehmen wir die laufende {serviceLink("objektkontrolle", "Objektbetreuung")},{" "}
              {serviceLink("gartenpflege", "Gartenpflege")} im Sommer und den {serviceLink("winterdienst", "Winterdienst")} in
              der kalten Jahreszeit – dazu {serviceLink("kleinreparaturen", "Kleinreparaturen")} und alles, was im
              Alltag rund um Haus und Grundstück anfällt.
            </p>
            <p>
              Kurze Wege bedeuten für Sie: Wir sind schnell vor Ort und kennen die Gegebenheiten in der Region.
            </p>
          </div>
        </div>

        <aside aria-label="Servicegebiet" className="self-start rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-900 text-white">
              <Icon name="mapPin" size={22} />
            </span>
            <p className="text-lg font-semibold text-ink">Unser Servicegebiet</p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {[mainCity, ...additionalPlaces].map((place) => (
              <li key={place} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink">
                {place}
              </li>
            ))}
            <li className="rounded-full border border-dashed border-brand/20 px-3 py-1.5 text-sm text-ink-muted">
              und Umgebung
            </li>
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            Ihr Objekt liegt etwas außerhalb? Fragen Sie gern an – wir sagen Ihnen ehrlich, ob wir Sie betreuen können.
          </p>
          <p className="mt-6 text-sm font-semibold text-ink">Häufig angefragt:</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {services.slice(0, 4).map((service) => (
              <li key={service.slug}>
                <Link href={`/leistungen/${service.slug}`} className="inline-flex items-center gap-1.5 text-accent-700 hover:underline">
                  <Icon name="chevronRight" size={16} />
                  {service.title} in {mainCity}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
