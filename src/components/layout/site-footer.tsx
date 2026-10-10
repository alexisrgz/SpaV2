import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { ui } from "@/data/ui";
import { formatRange } from "@/lib/hours";
import { getMapsSearchHref } from "@/lib/maps";
import { getWhatsAppContactHref } from "@/lib/whatsapp";
import { BookingLink } from "@/components/ui/booking-link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Wordmark } from "@/components/ui/wordmark";

export function SiteFooter() {
  return (
    <footer className="tone-inverse-deep pad-bottom-bar relative overflow-hidden" data-hide-booking-bar="end">
      <div className="container-site grid gap-12 pt-16 pb-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12 lg:gap-10 lg:pt-24">
        <div className="flex flex-col items-start gap-6 md:col-span-2 lg:col-span-4">
          <Link href="/" className="inline-flex min-h-12 items-center" aria-label={`${site.name}, ir al inicio`}>
            <Wordmark size="lg" />
          </Link>
          <p className="max-w-[34ch] text-muted">{site.description}</p>
          <BookingLink />
        </div>

        <nav aria-label={ui.footerNav} className="lg:col-span-2 lg:col-start-6">
          <h2 className="label mb-4 font-sans text-muted">{ui.footerExplore}</h2>
          <ul className="grid grid-cols-2 gap-x-6 lg:grid-cols-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-12 min-w-12 items-center hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="label mb-4 font-sans text-muted">{ui.footerHours}</h2>
          <dl className="grid gap-3">
            {site.hours.map((h) => (
              <div key={h.label}>
                <dt className="text-muted text-small">{h.label}</dt>
                <dd className="tabular">{formatRange(h)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-3">
          <h2 className="label mb-4 font-sans text-muted">{ui.footerContact}</h2>
          <ul className="grid">
            <li>
              <a href={getMapsSearchHref()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-start gap-3 py-3 hover:underline">
                <MapPin size={20} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none" />
                <span>
                  {site.address.street}, {site.address.area}
                  <br />
                  {site.address.city}, {site.address.region}
                </span>
                <span className="sr-only"> {ui.newTab}</span>
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phoneE164}`} className="inline-flex min-h-12 items-center gap-3 hover:underline">
                <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={getWhatsAppContactHref()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 hover:underline">
                <WhatsAppIcon size={20} />
                {ui.whatsapp}
                <span className="sr-only"> {ui.newTab}</span>
              </a>
            </li>
            <li>
              <a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 hover:underline">
                <InstagramIcon size={20} />
                {site.contact.instagram.handle}
                <span className="sr-only"> {ui.newTab}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="hairline" />
        <div className="flex flex-col gap-2 py-6 text-small text-muted md:flex-row md:items-center md:justify-between">
          <p>© {site.name} · {site.address.city}, {site.address.region}</p>
          <p>{site.demoNote}</p>
        </div>
      </div>

      {/* Firma tipográfica gigante (pseudo-elemento: decorativa, fuera del árbol accesible) */}
      <div
        aria-hidden="true"
        data-word={site.wordmark}
        className="pointer-events-none -mb-[0.32em] text-center font-display text-[clamp(6rem,27vw,23rem)] leading-[0.8] tracking-[0.06em] text-[color-mix(in_oklab,var(--brand-marfil)_7%,var(--brand-bosque-deep))] uppercase select-none [font-variation-settings:'SOFT'_100] before:content-[attr(data-word)]"
      />
    </footer>
  );
}
