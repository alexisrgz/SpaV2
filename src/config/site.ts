/**
 * Configuración de marca y negocio.
 * Para clonar la base para otro negocio, este es el primer archivo a editar
 * (después: tokens en `src/app/globals.css` y contenido en `src/data`).
 */

export type BookingMode = "whatsapp" | "internal";

/**
 * Fase 1: "whatsapp" — todo botón Reservar abre WhatsApp con mensaje prellenado.
 * Fase 2: "internal" — los mismos botones apuntan a `/reservar` (ruta aún no creada).
 */
export const BOOKING_MODE: BookingMode = "whatsapp";

/** 0 = domingo … 6 = sábado (igual que `Date.prototype.getDay`). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type OpeningHours = {
  days: readonly Weekday[];
  /** Etiqueta corta para listados, p. ej. "Lun – Vie". */
  label: string;
  opens: string;
  closes: string;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Savia Spa",
  wordmark: "Savia",
  tagline: "Wellness & Beauty",
  description:
    "Spa boutique en la Zona Costera de Mazatlán: masajes, faciales, rituales corporales y experiencias para regalar. Reserva tu cita por WhatsApp.",
  url: siteUrl.replace(/\/$/, ""),
  locale: "es-MX",
  language: "es-MX",
  currency: "MXN",
  timeZone: "America/Mazatlan",
  priceRange: "$$",

  contact: {
    phoneDisplay: "+52 669 000 0000",
    phoneE164: "+526690000000",
    /** Número de WhatsApp sin "+" ni espacios (formato wa.me). */
    whatsapp: "526690000000",
    instagram: {
      handle: "@saviaspa.mx",
      url: "https://www.instagram.com/saviaspa.mx/",
    },
  },

  address: {
    street: "Av. del Mar 120",
    area: "Zona Costera",
    city: "Mazatlán",
    region: "Sinaloa",
    regionCode: "Sin.",
    postalCode: "82110",
    country: "MX",
    geo: { latitude: 23.2266, longitude: -106.4251 },
    /** Texto que se usa para el mapa embebido y para "Cómo llegar". */
    mapsQuery: "Av. del Mar 120, Zona Costera, Mazatlán, Sinaloa",
  },

  hours: [
    { days: [1, 2, 3, 4, 5], label: "Lun – Vie", opens: "09:00", closes: "19:00" },
    { days: [6], label: "Sábado", opens: "09:00", closes: "18:00" },
    { days: [0], label: "Domingo", opens: "10:00", closes: "14:00" },
  ] satisfies readonly OpeningHours[],

  booking: {
    /** Mensaje cuando no hay servicio seleccionado. */
    generalMessage:
      "Hola, vi la página de Savia Spa y me gustaría reservar una cita. ¿Qué horarios tienen disponibles?",
    /** `{servicio}` y `{detalle}` se reemplazan en `src/lib/booking.ts`. */
    serviceMessage:
      "Hola, vi la página de Savia Spa y me gustaría reservar: {servicio}{detalle}. ¿Qué horarios tienen disponibles?",
    contactMessage: "Hola, tengo una pregunta sobre Savia Spa.",
    /** Ruta del módulo de reservas de Fase 2 (no existe en Fase 1). */
    internalPath: "/reservar",
  },

  nav: [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/experiencias", label: "Experiencias" },
    { href: "/galeria", label: "Galería" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ],

  demoNote: "Sitio de demostración; marca y datos ficticios.",
} as const;

export type SiteConfig = typeof site;
export type NavItem = SiteConfig["nav"][number];
