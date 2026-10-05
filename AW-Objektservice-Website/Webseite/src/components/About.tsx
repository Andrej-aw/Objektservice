import { siteConfig } from "@/config/site";
import { aboutPoints } from "@/content/home";
import { aboutImage } from "@/content/images";
import { credentials } from "@/content/trust";
import { Icon } from "./Icon";
import { SmartImage } from "./SmartImage";
import { Benefits } from "./Benefits";
import { Section } from "./ui";

export function About() {
  return (
    <Section id="ueber-uns" tone="muted" labelledBy="ueber-uns-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Mobile: Foto zuerst, ab Desktop rechts neben dem Text */}
        <div className="reveal relative isolate lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[5/4]">
            <SmartImage image={aboutImage} sizes="(min-width: 1024px) 40vw, 100vw" placeholderIcon="user" />
          </div>
          <div
            aria-hidden="true"
            className="absolute -right-3 -bottom-3 -z-10 hidden size-40 rounded-2xl bg-accent-50 sm:block"
          />
        </div>

        <div className="lg:order-1">
          <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Über uns</p>
          <h2 id="ueber-uns-title" className="mt-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
            Persönlich. Zuverlässig. Vor Ort.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Bei uns haben Sie keinen anonymen Dienstleister, sondern einen festen Ansprechpartner, der Ihre Immobilie
            kennt.
          </p>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Wir sind in {siteConfig.serviceArea.mainCity} und Umgebung unterwegs und kümmern uns darum, dass Haus,
            Grundstück und Gemeinschaftsflächen in gutem Zustand bleiben – so, wie wir es mit Ihnen vereinbart haben.
          </p>
          <ul className="mt-7 space-y-3">
            {aboutPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 font-medium text-ink">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                  <Icon name="check" size={15} strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          {credentials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Nachweise">
              {credentials.map((credential) => (
                <li
                  key={credential.title}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink"
                  title={credential.description}
                >
                  <Icon name="shieldCheck" size={18} className="text-accent-700" />
                  {credential.title}
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
      <Benefits />
    </Section>
  );
}
