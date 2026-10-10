import { MapPin, Navigation } from "lucide-react";
import { site } from "@/config/site";
import type { home } from "@/data/content";
import { ui } from "@/data/ui";
import { formatRange } from "@/lib/hours";
import { getDirectionsHref } from "@/lib/maps";
import { BookingLink } from "@/components/ui/booking-link";
import { Emphasis } from "@/components/ui/emphasis";
import { OpenStatus } from "@/components/ui/open-status";

/** Cierre de página en bosque: CTA de reserva + ubicación y horario con "Abierto ahora". */
export function FinalCta({ copy }: { copy: typeof home.finalCta }) {
  return (
    <section aria-labelledby="cta-final-title" className="tone-inverse section-y relative isolate overflow-hidden">
      {/* Arcos concéntricos de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-56 -z-10 hidden md:block">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute right-0 bottom-0 rounded-t-full border border-rule"
            style={{ width: `${30 + i * 9}rem`, height: `${42 + i * 9}rem`, right: `${-i * 4.5}rem`, bottom: `${-i * 4.5}rem` }}
          />
        ))}
      </div>

      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
          <h2 id="cta-final-title" className="text-h1 max-w-[14ch]">
            <Emphasis text={copy.title} />
          </h2>
          <p className="text-lead text-muted">{copy.text}</p>
          <BookingLink className="mt-2">{copy.cta}</BookingLink>
        </div>

        <div data-reveal className="rounded-card border border-rule p-6 lg:col-span-5 lg:p-8">
          <OpenStatus />
          <a
            href={getDirectionsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex min-h-12 items-start gap-3 hover:underline"
          >
            <MapPin size={20} strokeWidth={1.75} aria-hidden="true" className="mt-1 flex-none" />
            <span>
              {site.address.street}, {site.address.area}, {site.address.city}
            </span>
            <span className="sr-only"> {ui.newTab}</span>
          </a>
          <dl className="mt-4 grid gap-2 border-t border-rule pt-4 text-small">
            {site.hours.map((h) => (
              <div key={h.label} className="flex justify-between gap-4">
                <dt className="text-muted">{h.label}</dt>
                <dd className="tabular">{formatRange(h)}</dd>
              </div>
            ))}
          </dl>
          <a
            href={getDirectionsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-6 w-full"
          >
            <Navigation size={18} strokeWidth={1.75} aria-hidden="true" />
            {ui.directions}
            <span className="sr-only"> {ui.newTab}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
