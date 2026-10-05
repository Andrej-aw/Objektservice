import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatAddress, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum des ${siteConfig.name}.`,
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  const { contact, legal } = siteConfig;
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {siteConfig.legalName}
        <br />
        Inhaber: {siteConfig.owner}
        <br />
        {formatAddress()}
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {contact.phone}
        <br />
        E-Mail: {contact.email}
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: {legal.vatId}</p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {legal.responsibleForContent}
        <br />
        {formatAddress()}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>[HINWEIS ZUR TEILNAHME AN STREITBEILEGUNGSVERFAHREN – z. B. ob Sie bereit oder verpflichtet sind, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.]</p>

      <h2>Weitere Angaben</h2>
      <p>[GGF. WEITERE PFLICHTANGABEN, z. B. Registereintrag, zuständige Kammer, Berufshaftpflichtversicherung]</p>
    </LegalPage>
  );
}
