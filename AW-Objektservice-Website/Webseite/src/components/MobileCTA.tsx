import Link from "next/link";
import { Icon } from "./Icon";
import { PhoneLink } from "./PhoneLink";
import { buttonClasses } from "./ui";

/** Fixierte Kontaktleiste am unteren Bildschirmrand – nur auf Mobilgeräten sichtbar. */
export function MobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgba(15,30,48,0.35)] backdrop-blur md:hidden"
      role="region"
      aria-label="Schnellkontakt"
    >
      <div className="grid grid-cols-2 gap-2">
        <PhoneLink className={buttonClasses("secondary", "md", "w-full")}>
          <Icon name="phone" size={20} />
          Jetzt anrufen
        </PhoneLink>
        <Link href="/#anfrage" className={buttonClasses("primary", "md", "w-full")}>
          <Icon name="mail" size={20} />
          Angebot anfragen
        </Link>
      </div>
    </div>
  );
}
