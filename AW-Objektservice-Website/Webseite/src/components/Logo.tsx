import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { logo } from "@/content/images";
import { cn } from "./ui";

/**
 * Firmenlogo. Dateien: /public/images/unternehmen/logo.png (rot, für helle Flächen)
 * und logo-weiss.png (für dunkle Flächen wie den Footer). Pfade in src/content/images.ts.
 */
export function Logo({
  light = false,
  onClick,
  className,
}: {
  light?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center rounded-md", className)}
      aria-label={`${siteConfig.name} – zur Startseite`}
    >
      <Image
        src={light ? logo.srcLight : logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={!light}
        className="h-full w-auto"
      />
    </Link>
  );
}
