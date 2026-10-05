import Link from "next/link";
import type { Service } from "@/content/services";
import { Icon } from "./Icon";
import { IconBadge } from "./ui";

export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="reveal group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-600/30 hover:shadow-[0_18px_40px_-24px_rgba(15,30,48,0.35)]">
      <IconBadge name={service.icon} className="transition-colors duration-300 group-hover:bg-accent-600 group-hover:text-white" />
      <Heading className="mt-5 text-lg font-semibold text-ink">
        <Link
          href={`/leistungen/${service.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-500 focus-visible:after:outline-solid"
        >
          {service.title}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700" aria-hidden="true">
        Mehr erfahren
        <Icon name="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
