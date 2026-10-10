import { site } from "@/config/site";

/**
 * Único lugar que construye URLs de WhatsApp.
 * Los componentes nunca arman links de wa.me por su cuenta: usan
 * `getBookingHref` (reservas) o `getWhatsAppContactHref` (dudas generales).
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppContactHref(): string {
  return buildWhatsAppUrl(site.booking.contactMessage);
}
