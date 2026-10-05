import { Icon } from "./Icon";
import { PhoneLink } from "./PhoneLink";
import { ButtonLink, cn } from "./ui";

/**
 * Schlanker Handlungsaufruf am Ende einer Sektion – statt eines eigenen,
 * großen Farbblocks. Hält die Seite kompakt und den Lesefluss ruhig.
 */
export function InlineCta({
  title,
  buttonLabel = "Kostenloses Angebot anfragen",
  className,
}: {
  title: string;
  buttonLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-lg font-semibold text-ink">{title}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
        <ButtonLink href="/#anfrage" icon="arrowRight" className="flex-row-reverse">
          {buttonLabel}
        </ButtonLink>
        <PhoneLink className="inline-flex items-center justify-center gap-2 py-2 text-sm font-semibold text-ink hover:underline">
          <Icon name="phone" size={18} />
          oder anrufen
        </PhoneLink>
      </div>
    </div>
  );
}
