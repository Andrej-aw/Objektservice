import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatAddress, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung des ${siteConfig.name}.`,
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  const { contact } = siteConfig;
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        {siteConfig.legalName}
        <br />
        {siteConfig.owner}
        <br />
        {formatAddress()}
        <br />
        Telefon: {contact.phone}
        <br />
        E-Mail: {contact.email}
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Beantwortung
        Ihrer Anfragen oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
      </p>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>[HOSTING-ANBIETER MIT ANSCHRIFT]</p>
      <p>
        Beim Aufruf der Website werden durch den Hosting-Anbieter technisch notwendige Daten (z. B. IP-Adresse,
        Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browsertyp) in Server-Logfiles verarbeitet.
        Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. [SPEICHERDAUER]
      </p>

      <h2>4. Kontaktformular und Kontakt per E-Mail/Telefon</h2>
      <p>
        Wenn Sie uns über das Anfrageformular, per E-Mail oder telefonisch kontaktieren, verarbeiten wir Ihre Angaben
        (z. B. Name, E-Mail-Adresse, Telefonnummer, Adresse/Ort, Angaben zur Immobilie und Ihre Nachricht) zur
        Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw.
        Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
      </p>
      <p>[ANGABEN ZUM DIENST, ÜBER DEN FORMULARANFRAGEN ZUGESTELLT WERDEN, SOWIE ZUR SPEICHERDAUER]</p>

      <h2>5. Schriftarten</h2>
      <p>
        Die auf dieser Website verwendete Schrift wird lokal von unserem Server ausgeliefert. Es findet keine
        Verbindung zu Servern Dritter (z. B. Google) statt.
      </p>

      <h2>6. Cookies und Analyse</h2>
      <p>
        Diese Website setzt derzeit keine Cookies zu Analyse- oder Marketingzwecken ein. [ANPASSEN, FALLS
        ANALYSE-TOOLS, KARTEN ODER ANDERE DIENSTE EINGEBUNDEN WERDEN]
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>Sie haben im Rahmen der gesetzlichen Bestimmungen das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO) und Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>

      <h2>8. Stand</h2>
      <p>[DATUM]</p>
    </LegalPage>
  );
}
