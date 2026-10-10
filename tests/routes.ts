import { services } from "../src/data/services";

/** Todas las rutas públicas del sitio (se usan en varias suites). */
export const routes: readonly string[] = [
  "/",
  "/servicios",
  ...services.map((s) => `/servicios/${s.slug}`),
  "/experiencias",
  "/galeria",
  "/nosotros",
  "/contacto",
];

export const WIDTHS = [360, 390, 768, 1280, 1440] as const;

export const WHATSAPP_PREFIX = "https://wa.me/526690000000?text=";
