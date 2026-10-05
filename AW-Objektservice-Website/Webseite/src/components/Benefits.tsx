import { benefits } from "@/content/home";
import { InlineCta } from "./InlineCta";
import { IconBadge } from "./ui";

/** "Warum wir?" – wird im Über-uns-Bereich direkt unter dem Text angezeigt. */
export function Benefits() {
  return (
    <div id="warum-wir" className="mt-14 border-t border-line pt-12 lg:mt-16">
      <h2 id="warum-wir-title" className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl">
        Warum Objektservice Aichach?
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="reveal rounded-2xl border border-line bg-white p-6">
            <IconBadge name={benefit.icon} />
            <h3 className="mt-4 text-lg font-semibold text-ink">{benefit.title}</h3>
            <p className="mt-1.5 leading-relaxed text-ink-muted">{benefit.text}</p>
          </li>
        ))}
      </ul>
      <InlineCta title="Jetzt unverbindlich anfragen" />
    </div>
  );
}
