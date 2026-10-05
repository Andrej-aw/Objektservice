import { isPlaceholder, siteConfig } from "@/config/site";
import { services } from "@/content/services";

/** Gibt strukturierte Daten (Schema.org) als JSON-LD aus. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD muss als Rohtext eingebettet werden; "<" wird maskiert.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * LocalBusiness-Daten. Die Platzhalter aus src/config/site.ts werden übernommen
 * und müssen vor dem Livegang durch echte Angaben ersetzt werden.
 * Validierung: https://search.google.com/test/rich-results
 */
export function localBusinessSchema() {
  const { contact, serviceArea, url, name, seoDescription } = siteConfig;
  const places = [serviceArea.mainCity, ...serviceArea.additionalPlaces];

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${url}/#business`,
    name,
    description: seoDescription,
    url,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    openingHours: contact.openingHours,
    areaServed: places.map((place) => ({ "@type": "City", name: place })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, url: `${url}/leistungen/${service.slug}` },
      })),
    },
    ...(isPlaceholder(siteConfig.legalName) ? {} : { legalName: siteConfig.legalName }),
  };
}
