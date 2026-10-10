import type { BreadcrumbList, DaySpa, Service as ServiceSchema, WithContext } from "schema-dts";
import { site } from "@/config/site";
import type { Service } from "@/data/types";
import { images } from "@/data/images";
import { formatMinutes } from "./format";

const DAY_SCHEMA = [
  "https://schema.org/Sunday",
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
  "https://schema.org/Saturday",
] as const;

const businessId = `${site.url}/#spa`;

export function absoluteUrl(path: string): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** DaySpa (LocalBusiness) para inicio y contacto. */
export function daySpaSchema(): WithContext<DaySpa> {
  return {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    "@id": businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneE164,
    image: absoluteUrl(`/images/${images.hero.file}`),
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    paymentAccepted: "Efectivo, tarjeta de débito, tarjeta de crédito, transferencia",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.latitude,
      longitude: site.address.geo.longitude,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => DAY_SCHEMA[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [site.contact.instagram.url],
  };
}

/** Service por página de detalle, con una oferta por duración. */
export function serviceSchema(service: Service): WithContext<ServiceSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: absoluteUrl(`/servicios/${service.slug}`),
    serviceType: service.name,
    areaServed: { "@type": "City", name: site.address.city },
    provider: { "@type": "DaySpa", "@id": businessId, name: site.name },
    offers: service.variants.map((v) => ({
      "@type": "Offer",
      name: `${service.name} · ${formatMinutes(v.minutes)}`,
      price: v.price,
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
    })),
  };
}

export function breadcrumbSchema(items: ReadonlyArray<{ href: string; label: string }>): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
