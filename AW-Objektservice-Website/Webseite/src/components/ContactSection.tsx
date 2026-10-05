import type { ReactNode } from "react";
import { formatAddress, mailHref, phoneHref, siteConfig } from "@/config/site";
import { propertyTypes } from "@/content/home";
import { services } from "@/content/services";
import { ContactForm } from "./ContactForm";
import { Icon, type IconName } from "./Icon";
import { PhoneLink } from "./PhoneLink";
import { Section, SectionHeading, buttonClasses } from "./ui";

export function ContactSection({
  defaultService,
  title = "Lassen Sie uns über Ihre Immobilie sprechen",
  intro = "Schildern Sie kurz Ihr Anliegen – wir melden uns schnellstmöglich mit einem kostenlosen, unverbindlichen Angebot.",
}: {
  defaultService?: string;
  title?: string;
  intro?: string;
}) {
  const { phone, email, openingHours } = siteConfig.contact;
  const tel = phoneHref();
  const mail = mailHref();

  return (
    <Section id="kontakt" tone="muted" labelledBy="kontakt-title">
      <SectionHeading id="kontakt-title" eyebrow="Kontakt" title={title} intro={intro} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-8">
        <aside aria-label="Kontaktdaten" className="flex flex-col self-start rounded-2xl bg-primary-900 p-6 text-white sm:p-8 lg:sticky lg:top-24">
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-white/90">Ihr persönlicher Ansprechpartner in Aichach und Umgebung</p>

          <address className="mt-8 space-y-5 not-italic">
            <ContactRow icon="phone" label="Telefon">
              {tel ? (
                <a href={tel} className="font-semibold text-white hover:text-accent-300">
                  {phone}
                </a>
              ) : (
                phone
              )}
            </ContactRow>
            <ContactRow icon="mail" label="E-Mail">
              {mail ? (
                <a href={mail} className="font-semibold break-all text-white hover:text-accent-300">
                  {email}
                </a>
              ) : (
                email
              )}
            </ContactRow>
            <ContactRow icon="mapPin" label="Adresse">
              {formatAddress()}
            </ContactRow>
            <ContactRow icon="clock" label="Öffnungszeiten">
              {openingHours}
            </ContactRow>
          </address>

          <div className="pt-8">
            <PhoneLink className={buttonClasses("ghostLight", "lg", "w-full")}>
              <Icon name="phone" size={20} />
              Jetzt Kontakt aufnehmen
            </PhoneLink>
          </div>
        </aside>

        <div id="anfrage" className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-ink">Anfrage senden</h3>
          <p className="mt-1 mb-6 text-ink-muted">Kostenlos und unverbindlich.</p>
          <ContactForm
            serviceOptions={services.map((service) => service.title)}
            propertyTypes={propertyTypes}
            defaultService={defaultService}
          />
        </div>
      </div>
    </Section>
  );
}

function ContactRow({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-300">
        <Icon name={icon} size={20} />
      </span>
      <div>
        <p className="text-xs font-medium tracking-wide text-white/80 uppercase">{label}</p>
        <p className="mt-0.5 text-white">{children}</p>
      </div>
    </div>
  );
}
