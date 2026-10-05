import type { ComponentProps } from "react";
import Link from "next/link";
import { phoneHref } from "@/config/site";

/**
 * "Jetzt anrufen"-Link. Solange die Telefonnummer ein Platzhalter ist,
 * führt der Link zum Kontaktbereich statt zu einem ungültigen tel:-Link.
 */
export function PhoneLink(props: Omit<ComponentProps<"a">, "href">) {
  const href = phoneHref();
  if (href) return <a href={href} {...props} />;
  return <Link href="/#kontakt" {...props} />;
}
