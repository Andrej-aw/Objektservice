import Link from "next/link";
import { heroTrustPoints } from "@/content/home";
import { heroImage } from "@/content/images";
import { services } from "@/content/services";
import { imageExists } from "@/lib/images";
import { Icon } from "./Icon";
import { PhoneLink } from "./PhoneLink";
import { SmartImage } from "./SmartImage";
import { ButtonLink, Container, buttonClasses, cn } from "./ui";

export function Hero() {
  const hasImage = imageExists(heroImage.src);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-primary-900 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_85%_-10%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(40rem_30rem_at_-10%_110%,rgba(120,14,20,0.35),transparent_60%)]"
      />
      <Container className="grid items-center gap-12 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-20 lg:pb-28">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white">
            <Icon name="mapPin" size={16} className="text-accent-300" />
            Aichach und Umgebung
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
          >
            Ihr zuverlässiger Objektservice in Aichach
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/90 sm:text-xl">
            Zuverlässige Betreuung, Pflege und Instandhaltung rund um Ihre Immobilie – für Privatkunden, Vermieter
            und Gewerbekunden.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href="/#anfrage" size="lg" icon="arrowRight" className="flex-row-reverse">
              Kostenloses Angebot anfragen
            </ButtonLink>
            <PhoneLink className={buttonClasses("black", "lg")}>
              <Icon name="phone" size={20} />
              Jetzt anrufen
            </PhoneLink>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {heroTrustPoints.map((point) => (
              <li key={point.label} className="flex items-center gap-2 text-sm font-medium text-white">
                <Icon name="check" size={18} strokeWidth={2.25} className="shrink-0 text-accent-300" />
                {point.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Ohne Foto wird die Leistungsübersicht auf kleinen Bildschirmen ausgeblendet (folgt direkt darunter). */}
        <div className={cn("relative animate-fade-up [animation-delay:120ms]", hasImage ? "mx-auto w-full max-w-sm lg:max-w-md" : "hidden md:block")}>
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-primary-800 ring-1 ring-white/10",
              hasImage && "aspect-[4/5]",
            )}
          >
            {hasImage ? (
              <SmartImage image={heroImage} sizes="(min-width: 1024px) 448px, 384px" priority className="object-top" />
            ) : (
              <HeroFallback />
            )}
          </div>
          {hasImage && (
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink shadow-xl sm:left-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                <Icon name="user" size={22} />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-semibold">Persönlicher Ansprechpartner</span>
                <span className="text-ink-muted">in Aichach und Umgebung</span>
              </span>
            </div>
          )}
        </div>
      </Container>
      {/* Weicher, geschwungener Übergang in den weißen Inhaltsbereich */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-10 w-full text-white sm:h-14 lg:h-20"
      >
        <path d="M0 80V48C240 16 480 0 720 0s480 16 720 48v32Z" fill="currentColor" />
      </svg>
    </section>
  );
}

/** Wird angezeigt, bis unter /public/images/hero/ ein echtes Foto liegt. */
function HeroFallback() {
  return (
    <div className="relative flex flex-col justify-between gap-8 p-6 sm:p-8 lg:min-h-[32rem]">
      <svg aria-hidden="true" className="absolute inset-0 size-full text-white opacity-[0.05]">
        <defs>
          <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      <div className="relative">
        <p className="text-sm font-semibold tracking-[0.14em] text-accent-300 uppercase">Unsere Leistungen</p>
        <p className="mt-2 text-2xl font-semibold text-white">Alles rund um Ihre Immobilie</p>
      </div>
      <ul className="relative grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 sm:gap-3 lg:grid-cols-1 lg:gap-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/leistungen/${service.slug}`}
              className="flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] lg:py-2.5"
            >
              <Icon name={service.icon} size={20} className="shrink-0 text-accent-300" />
              <span className="min-w-0 break-words">{service.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
