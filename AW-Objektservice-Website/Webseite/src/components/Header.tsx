"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/content/home";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { ButtonLink, Container, cn } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-shadow duration-300",
        scrolled || open ? "border-line shadow-[0_4px_20px_-12px_rgba(15,30,48,0.25)]" : "border-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo onClick={close} className="h-16 py-0.5" />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/#anfrage" className="hidden sm:inline-flex" onClick={close}>
            Angebot anfragen
          </ButtonLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-ink hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={26} />
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <Container className="py-4">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex min-h-12 items-center justify-between rounded-md px-2 text-lg font-medium text-ink hover:bg-surface"
                  >
                    {item.label}
                    <Icon name="chevronRight" size={20} className="text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href="/#anfrage" onClick={close} size="lg" className="mt-4 w-full sm:hidden">
            Kostenloses Angebot anfragen
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
