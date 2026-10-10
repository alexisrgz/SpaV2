import { BOOKING_MODE, site } from "@/config/site";
import { buildWhatsAppUrl } from "./whatsapp";

export type BookingTarget = {
  /** Nombre legible del servicio o experiencia, p. ej. "Masaje relajante". */
  service?: string;
  /** Duración o variante legible, p. ej. "90 min". */
  variant?: string;
};

/** Mensaje prellenado de reserva. Exportado para pruebas y para Fase 2. */
export function getBookingMessage({ service, variant }: BookingTarget = {}): string {
  if (!service) return site.booking.generalMessage;
  return site.booking.serviceMessage
    .replace("{servicio}", service)
    .replace("{detalle}", variant ? ` (${variant})` : "");
}

/**
 * Destino de TODA acción de reserva del sitio.
 * Fase 1 → WhatsApp con mensaje prellenado. Fase 2 → `/reservar?servicio=…&variante=…`.
 */
export function getBookingHref(target: BookingTarget = {}): string {
  if (BOOKING_MODE === "internal") {
    const params = new URLSearchParams();
    if (target.service) params.set("servicio", target.service);
    if (target.variant) params.set("variante", target.variant);
    const query = params.toString();
    return query ? `${site.booking.internalPath}?${query}` : site.booking.internalPath;
  }
  return buildWhatsAppUrl(getBookingMessage(target));
}

/** Los destinos externos abren en pestaña nueva; el flujo interno de Fase 2, no. */
export const bookingOpensNewTab = BOOKING_MODE === "whatsapp";
