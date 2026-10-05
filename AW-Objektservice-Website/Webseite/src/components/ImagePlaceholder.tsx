import { showPlaceholders } from "@/config/site";
import { Icon, type IconName } from "./Icon";
import { cn } from "./ui";

/**
 * Neutraler Bildersatz, solange noch kein Foto vorhanden ist.
 * In der Entwicklung wird zusätzlich der erwartete Dateipfad angezeigt.
 */
export function ImagePlaceholder({
  src,
  label,
  icon = "image",
  tone = "light",
  className,
}: {
  src?: string;
  label?: string;
  icon?: IconName;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      role="presentation"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center",
        dark ? "bg-primary-800 text-white/70" : "bg-gradient-to-br from-slate-100 to-slate-200 text-brand/60",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-[size:28px_28px] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]",
          dark ? "opacity-[0.06]" : "opacity-[0.12]",
        )}
      />
      <Icon name={icon} size={40} strokeWidth={1.25} className="relative" />
      {showPlaceholders && (
        <span className="relative max-w-[18rem] text-xs leading-snug">
          {label && <span className="block font-semibold">{label}</span>}
          {src && <code className="mt-1 block break-all opacity-80">public{src}</code>}
        </span>
      )}
    </div>
  );
}
