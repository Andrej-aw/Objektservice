import fs from "node:fs";
import path from "node:path";

/**
 * Prüft (nur serverseitig, zur Build-/Renderzeit), ob eine Bilddatei in /public existiert.
 * So können Bilder in den Datenstrukturen vorbereitet werden, bevor die Fotos vorliegen.
 */
export function imageExists(src: string): boolean {
  if (/^https?:\/\//.test(src)) return true;
  const filePath = path.join(process.cwd(), "public", decodeURIComponent(src));
  return fs.existsSync(filePath);
}

export function onlyExisting<T extends { src: string }>(images: T[]): T[] {
  return images.filter((image) => imageExists(image.src));
}
