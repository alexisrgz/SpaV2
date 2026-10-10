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

/** Tarjeta de servicio: foto en arco, nombre, duración, "desde $X" y enlace al detalle. */
export function ServiceCard({ service, sizes, variant = "compact", headingLevel = "h3", className }: ServiceCardProps) {
  const Heading = headingLevel;
  const href = `/servicios/${service.slug}`;
  const multiple = service.variants.length > 1;

  return (
    <article className={cn("group relative flex w-full flex-col", className)}>
      <Photo
        id={service.image}
        shape="arch"
        sizes={sizes}
        frameClassName="shadow-soft"
        mediaClassName="zoom-media"
      />
      <div className="flex flex-1 flex-col pt-5">
        <p className="label text-support-ink">
          {categoryLabel(service.category)} · <span className="tabular">{serviceDurations(service)}</span>
        </p>
        <Heading className="mt-2 text-h3">
          {/* Enlace estirado: toda la tarjeta lleva al detalle */}
          <Link href={href} className="after:absolute after:inset-0 after:z-0 after:content-['']">
            {service.name}
          </Link>
        </Heading>
        <p className="mt-2 text-small text-muted">{service.summary}</p>
        <p className="mt-4 tabular">
          <span className="text-small text-muted">{multiple ? `${ui.from} ` : ""}</span>
          <span className="font-display text-[1.5rem] leading-none">{formatPrice(startingPrice(service))}</span>
        </p>

        {variant === "full" ? (
          <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <BookingLink service={service.name} variant={multiple ? undefined : `${service.variants[0].minutes} min`}>
              {ui.book}
            </BookingLink>
            <Link href={href} className="link-arrow" aria-label={`${ui.viewDetail}: ${service.name}`}>
              {ui.viewDetail}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <span aria-hidden="true" className="link-arrow mt-2 self-start text-small">
            {ui.viewDetail}
            <ArrowRight size={18} />
          </span>
        )}
      </div>
    </article>
  );
}
