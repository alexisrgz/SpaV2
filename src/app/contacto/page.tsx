import { MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { contactPage } from "@/data/content";
import { ui } from "@/data/ui";
import { getDirectionsHref, getMapEmbedSrc } from "@/lib/maps";
import { pageMetadata } from "@/lib/metadata";
import { daySpaSchema } from "@/lib/schema";
import { getWhatsAppContactHref } from "@/lib/whatsapp";
import { BookingLink } from "@/components/ui/booking-link";
import { Emphasis } from "@/components/ui/emphasis";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { HoursList, OpenStatus } from "@/components/ui/open-status";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = pageMetadata({ ...contactPage.meta, path: "/contacto" });

function Channel({ href, icon, label, value, external = false }: { href: string; icon: ReactNode; label: string; value: string; external?: boolean }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex min-h-16 items-center gap-4 border-b border-rule py-3"
      >
        <span className="grid size-12 flex-none place-items-center rounded-full bg-soft text-inverse transition-colors duration-300 group-hover:bg-inverse group-hover:text-canvas">
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-small text-muted">{label}</span>
          <span className="font-semibold group-hover:underline">{value}</span>
        </span>
        {external && <span className="sr-only"> {ui.newTab}</span>}
      </a>
    </li>
  );
}

export default function ContactPage() {
  const copy = contactPage;

  return (
    <>
      <JsonLd data={daySpaSchema()} />
      <PageHeader title={copy.title} intro={copy.intro}>
        <OpenStatus />
      </PageHeader>

      <section aria-label={copy.meta.title} className="tone-canvas pb-18 lg:pb-30">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-14">
          {/* Datos */}
          <div className="grid content-start gap-12 lg:col-span-5">
            <div>
              <h2 className="text-h3">{copy.hoursTitle}</h2>
              <HoursList className="mt-4" />
            </div>

            <div>
              <h2 className="text-h3">{copy.addressTitle}</h2>
              <address className="mt-4 not-italic">
                <a
                  href={getDirectionsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-start gap-3 hover:underline"
                >
                  <MapPin size={20} strokeWidth={1.75} aria-hidden="true" className="mt-1 flex-none" />
                  <span>
                    {site.address.street}, {site.address.area}
                    <br />
                    {site.address.city}, {site.address.region}, C.P. {site.address.postalCode}
                  </span>
                  <span className="sr-only"> {ui.newTab}</span>
                </a>
              </address>
              <p className="mt-2 text-small text-muted">{copy.parking}</p>
            </div>

            <div>
              <h2 className="text-h3">{copy.channelsTitle}</h2>
              <ul className="mt-2">
                <Channel
                  href={`tel:${site.contact.phoneE164}`}
                  icon={<Phone size={20} strokeWidth={1.75} aria-hidden="true" />}
                  label={ui.call}
                  value={site.contact.phoneDisplay}
                />
                <Channel
                  href={getWhatsAppContactHref()}
                  icon={<WhatsAppIcon size={20} />}
                  label={ui.whatsapp}
                  value={site.contact.phoneDisplay}
                  external
                />
                <Channel
                  href={site.contact.instagram.url}
                  icon={<InstagramIcon size={20} />}
                  label={ui.instagram}
                  value={site.contact.instagram.handle}
                  external
                />
              </ul>
            </div>
          </div>

          {/* Mapa */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            <div className="shape-card relative aspect-square bg-surface shadow-soft sm:aspect-[4/3] lg:aspect-auto lg:min-h-[34rem] lg:flex-1">
              <iframe
                src={getMapEmbedSrc()}
                title={copy.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 [filter:saturate(0.75)_sepia(0.12)]"
                allowFullScreen
              />
            </div>
            <a href={getDirectionsHref()} target="_blank" rel="noopener noreferrer" className="btn btn-solid self-start">
              <Navigation size={18} strokeWidth={1.75} aria-hidden="true" />
              {copy.directionsCta}
              <span className="sr-only"> {ui.newTab}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Política + reserva */}
      <section aria-labelledby="politica-title" className="tone-inverse section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h2 id="politica-title" className="text-h3">{copy.policyTitle}</h2>
            <ul className="mt-6 grid gap-4">
              {copy.policy.map((rule) => (
                <li key={rule} className="border-t border-rule pt-4 text-muted">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-8">
            <h2 className="text-h2">
              <Emphasis text={copy.bookingTitle} />
            </h2>
            <p className="text-muted">{copy.bookingText}</p>
            <BookingLink className="min-h-[60px] w-full px-8 text-[1.0625rem] sm:w-auto" />
          </div>
        </div>
      </section>
    </>
  );
}
