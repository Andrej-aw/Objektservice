"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Icon } from "./Icon";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "./ui";

export type GalleryItem = {
  src: string;
  alt: string;
  title?: string;
  category?: string;
  layout?: "normal" | "wide" | "tall";
};

type Props = {
  items: GalleryItem[];
  /** "mosaic" = Raster mit unterschiedlichen Bildgrößen, "uniform" = gleich große Kacheln, "carousel" = wischbare Reihe. */
  variant?: "mosaic" | "uniform" | "carousel";
  filterable?: boolean;
  /** Zeigt Platzhalterkacheln statt Bildern (nur Entwicklung, solange keine Fotos vorliegen). */
  placeholder?: boolean;
  label: string;
};

export function GalleryGrid({ items, variant = "mosaic", filterable = false, placeholder = false, label }: Props) {
  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category).filter((c): c is string => Boolean(c)))),
    [items],
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = activeCategory ? items.filter((item) => item.category === activeCategory) : items;
  const current = lightboxIndex !== null ? visible[lightboxIndex] : null;

  const triggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
    dialogRef.current?.showModal();
  };
  const closeLightbox = () => dialogRef.current?.close();
  const step = (delta: number) =>
    setLightboxIndex((index) => (index === null ? index : (index + delta + visible.length) % visible.length));

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeLightbox();
  };

  const gridClasses =
    variant === "mosaic"
      ? "grid grid-flow-dense grid-cols-2 auto-rows-[140px] gap-3 sm:auto-rows-[170px] md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[190px]"
      : variant === "carousel"
        ? "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-3 [scrollbar-width:thin] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
        : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      {filterable && categories.length > 1 && (
        <div role="group" aria-label={`${label}: nach Kategorie filtern`} className="mb-8 flex flex-wrap gap-2">
          {[null, ...categories].map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category ?? "alle"}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                  active
                    ? "border-primary-900 bg-primary-900 text-white"
                    : "border-line bg-white text-ink-muted hover:border-brand/30 hover:text-ink",
                )}
              >
                {category ?? "Alle"}
              </button>
            );
          })}
        </div>
      )}

      <ul className={gridClasses} aria-label={label} tabIndex={variant === "carousel" ? 0 : undefined}>
        {visible.map((item, index) => {
          const tileClasses = cn(
            "group relative block size-full overflow-hidden rounded-xl bg-slate-100",
            variant !== "mosaic" && "aspect-[4/3]",
          );
          return (
            <li
              key={`${item.src}-${index}`}
              className={cn(
                variant === "mosaic" && item.layout === "wide" && "col-span-2",
                variant === "mosaic" && item.layout === "tall" && "row-span-2",
                variant === "carousel" && "w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2rem)/3)]",
              )}
            >
              {placeholder ? (
                <div className={tileClasses}>
                  <ImagePlaceholder src={item.src} label={item.title ?? item.category} />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className={cn(tileClasses, "cursor-zoom-in text-left")}
                  aria-label={`${item.title ?? item.alt} – Bild vergrößern`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      variant !== "mosaic"
                        ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {item.title && (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pt-10 pb-3 text-sm font-semibold text-white">
                      {item.title}
                    </span>
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {!placeholder && (
        <dialog
          ref={dialogRef}
          aria-label={current?.title ?? current?.alt ?? label}
          onClose={() => {
            setLightboxIndex(null);
            triggerRef.current?.focus();
          }}
          onKeyDown={onDialogKeyDown}
          onClick={onDialogClick}
          className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-primary-950/90 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
        >
          {current && (
            <figure className="pointer-events-none flex w-full max-w-6xl flex-col items-center px-4 sm:px-16">
              <div className="pointer-events-auto relative h-[70dvh] w-full sm:h-[78dvh]">
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="pointer-events-auto mt-4 text-center text-sm text-white">
                {current.title && <span className="font-semibold text-white">{current.title}</span>}
                {visible.length > 1 && (
                  <span className="ml-2 text-white/80">
                    {lightboxIndex! + 1} / {visible.length}
                  </span>
                )}
              </figcaption>
            </figure>
          )}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Schließen"
          >
            <Icon name="close" size={24} />
          </button>
          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute bottom-6 left-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
                aria-label="Vorheriges Bild"
              >
                <Icon name="chevronLeft" size={26} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-4 bottom-6 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
                aria-label="Nächstes Bild"
              >
                <Icon name="chevronRight" size={26} />
              </button>
            </>
          )}
        </dialog>
      )}
    </div>
  );
}
