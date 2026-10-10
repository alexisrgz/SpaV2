import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { ReactNode } from "react";
import { BOOKING_MODE } from "@/config/site";
import { ui } from "@/data/ui";
import { bookingOpensNewTab, getBookingHref, type BookingTarget } from "@/lib/booking";
import { cn } from "@/lib/format";
import { WhatsAppIcon } from "./icons";

type BookingLinkProps = BookingTarget & {
  children?: ReactNode;
  className?: string;
  /** Oculta el ícono del canal (WhatsApp / calendario). */
  hideIcon?: boolean;
  /** Etiqueta accesible cuando el texto visible es ambiguo. */
  ariaLabel?: string;
  /** Href ya calculado (p. ej. desde el selector de variantes en cliente). */
  href?: string;
};

/**
 * ÚNICO botón de reserva del sitio. Siempre terracota (.btn-book) y siempre
 * resuelto por getBookingHref. Sin hooks: se puede usar en servidor y cliente.
 */
export function BookingLink({
  service,
  variant,
  children = ui.book,
  className,
  hideIcon = false,
  ariaLabel,
  href,
}: BookingLinkProps) {
  const target = href ?? getBookingHref({ service, variant });
  const icon = hideIcon ? null : BOOKING_MODE === "whatsapp" ? (
    <WhatsAppIcon size={20} />
  ) : (
    <CalendarDays size={20} aria-hidden="true" />
  );

  if (!bookingOpensNewTab) {
    return (
      <Link href={target} className={cn("btn btn-book", className)} aria-label={ariaLabel} data-booking>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <a
      href={target}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-book", className)}
      aria-label={ariaLabel ? `${ariaLabel} ${ui.newTab}` : undefined}
      data-booking
    >
      {icon}
      {children}
      {!ariaLabel && <span className="sr-only"> {ui.newTab}</span>}
    </a>
  );
}
