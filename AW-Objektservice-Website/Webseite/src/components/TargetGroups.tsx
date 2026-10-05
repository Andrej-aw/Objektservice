import { targetGroups } from "@/content/home";
import { IconBadge, Section, SectionHeading } from "./ui";

export function TargetGroups() {
  return (
    <Section id="fuer-wen" labelledBy="fuer-wen-title">
      <SectionHeading
        id="fuer-wen-title"
        eyebrow="Für wen"
        title="Für wen wir da sind"
        intro="Ob einzelnes Wohnhaus oder mehrere Objekte: Wir stimmen unsere Leistungen auf Ihre Immobilie und Ihren Bedarf ab."
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {targetGroups.map((group) => (
          <li key={group.title} className="reveal flex gap-5 rounded-2xl border border-line bg-white p-6 sm:p-7">
            <IconBadge name={group.icon} />
            <div>
              <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-muted">{group.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
