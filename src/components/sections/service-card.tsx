import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/types";
import { ui } from "@/data/ui";
import { categoryLabel, startingPrice } from "@/data/services";
import { cn, formatPrice } from "@/lib/format";
import { BookingLink } from "@/components/ui/booking-link";
import { Photo } from "@/components/ui/photo";

export function serviceDurations(service: Service): string {
  return `${service.variants.map((v) => v.minutes).join(" / ")} min`;
}

type ServiceCardProps = {
  service: Service;
  sizes: string;
  /** "compact" = carrusel de inicio; "full" = catálogo con botones Ver detalle y Reservar. */
  variant?: "compact" | "full";
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** Tarjeta de servicio: foto TARJETA 4:5 con duración y "desde $X" encima, nombre y enlace al detalle. */
export function ServiceCard({ service, sizes, variant = "compact", headingLevel = "h3", className }: ServiceCardProps) {
  const Heading = headingLevel;
  const href = `/servicios/${service.slug}`;
  const multiple = service.variants.length > 1;

  return (
    <article className={cn("group relative flex w-full flex-col", className)}>
      <div className="relative">
        <Photo id={service.image} shape="card" ratio="4/5" sizes={sizes} className="shadow-soft" mediaClassName="zoom-media" />
        <p className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="photo-chip tabular">{serviceDurations(service)}</span>
          <span className="photo-chip tabular">
            {multiple && <span className="font-medium text-ink-soft">{ui.from}</span>}
            {formatPrice(startingPrice(service))}
          </span>
        </p>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="label text-support-ink">{categoryLabel(service.category)}</p>
        <Heading className="mt-2 text-h3">
          {/* Enlace estirado: toda la tarjeta lleva al detalle */}
          <Link href={href} className="after:absolute after:inset-0 after:z-0 after:content-['']">
            {service.name}
          </Link>
        </Heading>
        <p className="mt-2 text-small text-muted">{service.summary}</p>

        {variant === "full" ? (
          <div className="relative z-10 mt-auto flex pt-5 flex-wrap items-center gap-x-4 gap-y-2">
            <BookingLink service={service.name} variant={multiple ? undefined : `${service.variants[0].minutes} min`}>
              {ui.book}
            </BookingLink>
            <Link href={href} className="link-arrow" aria-label={`${ui.viewDetail}: ${service.name}`}>
              {ui.viewDetail}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <span aria-hidden="true" className="link-arrow mt-auto self-start pt-2 text-small">
            {ui.viewDetail}
            <ArrowRight size={18} />
          </span>
        )}
      </div>
    </article>
  );
}
