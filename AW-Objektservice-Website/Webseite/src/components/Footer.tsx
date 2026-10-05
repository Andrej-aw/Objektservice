import Link from "next/link";
import { formatAddress, mailHref, phoneHref, siteConfig } from "@/config/site";
import { navigation } from "@/content/home";
import { services } from "@/content/services";
import { Logo } from "./Logo";
import { Container } from "./ui";

export function Footer() {
  const { phone, email, openingHours } = siteConfig.contact;
  const tel = phoneHref();
  const mail = mailHref();
  const linkClass = "text-white/90 transition-colors hover:text-white";

  return (
    <footer className="bg-primary-950 pb-24 text-sm text-white/90 md:pb-0">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
        <div>
          <Logo light className="h-20" />
          <p className="mt-5 max-w-xs leading-relaxed text-white/80">{siteConfig.shortDescription}</p>
        </div>

        <nav aria-labelledby="footer-leistungen">
          <h2 id="footer-leistungen" className="font-semibold text-white">
            Leistungen
          </h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/leistungen/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-navigation">
          <h2 id="footer-navigation" className="font-semibold text-white">
            Navigation
          </h2>
          <ul className="mt-4 space-y-2.5">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#anfrage" className={linkClass}>
                Angebot anfragen
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-semibold text-white">Kontakt</h2>
          <address className="mt-4 space-y-2.5 not-italic">
            <p>{tel ? <a href={tel} className={linkClass}>{phone}</a> : phone}</p>
            <p>{mail ? <a href={mail} className={linkClass}>{email}</a> : email}</p>
            <p>{formatAddress()}</p>
            <p>{openingHours}</p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/impressum" className={linkClass}>
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className={linkClass}>
                Datenschutz
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
