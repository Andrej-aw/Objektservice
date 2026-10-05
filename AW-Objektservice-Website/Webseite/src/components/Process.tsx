import { processSteps } from "@/content/home";
import { ButtonLink, Section, SectionHeading } from "./ui";

export function Process() {
  return (
    <Section id="ablauf" tone="muted" labelledBy="ablauf-title">
      <SectionHeading
        id="ablauf-title"
        eyebrow="Ablauf"
        title="In drei Schritten zu Ihrem Angebot"
        intro="Unkompliziert und transparent – so arbeiten wir zusammen."
        align="center"
      />
      <div className="relative mt-10">
      <div aria-hidden="true" className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-px bg-line md:block" />
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {processSteps.map((step, index) => (
          <li key={step.title} className="reveal relative text-center">
            <span className="relative mx-auto flex size-14 items-center justify-center rounded-full border-4 border-white bg-primary-900 text-lg font-bold text-white shadow-[0_0_0_1px_var(--color-line)]">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      </div>
      <div className="mt-10 text-center">
        <ButtonLink href="/#anfrage" size="lg" icon="send">
          Jetzt Anfrage senden
        </ButtonLink>
      </div>
    </Section>
  );
}
