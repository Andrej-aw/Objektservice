import Image from "next/image";
import type { SiteImage } from "@/content/images";
import { imageExists } from "@/lib/images";
import type { IconName } from "./Icon";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "./ui";

/**
 * Zeigt ein Bild aus der zentralen Datenstruktur an – oder einen Platzhalter,
 * falls die Datei noch nicht existiert. Der Elterncontainer bestimmt die Größe
 * (relative Positionierung + Seitenverhältnis/Höhe).
 */
export function SmartImage({
  image,
  sizes,
  priority = false,
  className,
  placeholderIcon,
  placeholderTone,
}: {
  image: SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  placeholderIcon?: IconName;
  placeholderTone?: "light" | "dark";
}) {
  if (!imageExists(image.src)) {
    return <ImagePlaceholder src={image.src} label={image.title} icon={placeholderIcon} tone={placeholderTone} />;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
