import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PhoneLink } from "@/components/PhoneLink";
import { ServiceCard } from "@/components/ServiceCard";
import { SmartImage } from "@/components/SmartImage";
import { ButtonLink, Container, IconBadge, Section, buttonClasses } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getService, services } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/leistungen/${service.slug}`;
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${service.seo.title} | ${siteConfig.name}`,
      description: service.seo.description,
      url: path,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 4);
  const url = `${siteConfig.url}/leistungen/${service.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: service.title,
              description: service.seo.description,
              url,
              serviceType: service.title,
              provider: { "@id": `${siteConfig.url}/#business` },
              areaServed: { "@type": "City", name: siteConfig.serviceArea.mainCity },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Startseite", item: siteConfig.url },
                { "@type": "ListItem", position: 2, name: "Leistungen", item: `${siteConfig.url}/#leistungen` },
                { "@type": "ListItem", position: 3, name: service.title, item: url },
              ],
            },
          ],
        }}
      />

      <section aria-labelledby="service-title" className="bg-primary-900 text-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <nav aria-label="Brotkrümelnavigation" className="text-sm text-white/80">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Startseite
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#leistungen" className="hover:text-white">
                  Leistungen
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {service.title}
              </li>
            </ol>
          </nav>
          <div className="mt-8 flex items-start gap-5">
            <IconBadge name={service.icon} dark className="hidden size-14 sm:inline-flex" />
            <div>
              <h1 id="service-title" className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                {service.title} in {siteConfig.serviceArea.mainCity}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{service.summary}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#anfrage" size="lg">
              Kostenloses Angebot anfragen
            </ButtonLink>
            <PhoneLink className={buttonClasses("outlineLight", "lg")}>
              <Icon name="phone" size={20} />
              Jetzt anrufen
            </PhoneLink>
          </div>
        </Container>
      </section>

      <Section labelledBy="leistungsumfang-title">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="leistungsumfang-title" className="text-3xl font-bold tracking-tight text-ink">
              Das übernehmen wir für Sie
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{service.intro}</p>
            <ul className="mt-8 space-y-3">
              {service.tasks.map((task) => (
                <li key={task} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                    <Icon name="check" size={15} strokeWidth={2.5} />
                  </span>
                  {task}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-ink-muted">
              Umfang und Intervalle stimmen wir individuell mit Ihnen ab. Sie erhalten ein transparentes Angebot, das
              zu Ihrer Immobilie passt.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <SmartImage image={service.image} sizes="(min-width: 1024px) 45vw, 100vw" placeholderIcon={service.icon} />
          </div>
        </div>
      </Section>

      <ContactSection
        defaultService={service.title}
        title={`${service.title} anfragen`}
        intro="Beschreiben Sie kurz Ihr Objekt – wir melden uns schnellstmöglich mit einem unverbindlichen Angebot."
      />

      <Section labelledBy="weitere-title">
        <h2 id="weitere-title" className="text-2xl font-bold tracking-tight text-ink">
          Weitere Leistungen
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <li key={item.slug}>
              <ServiceCard service={item} />
            </li>
          ))}
        </ul>
        <Link href="/#leistungen" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-accent-700 hover:underline">
          Alle Leistungen ansehen
          <Icon name="arrowRight" size={16} />
        </Link>
      </Section>
    </>
  );
}
