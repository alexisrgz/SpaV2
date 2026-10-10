import { site } from "@/config/site";

const query = encodeURIComponent(site.address.mapsQuery);

/** Abre Google Maps con la ruta hasta el negocio (app nativa en móvil). */
export function getDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

/** Busca el negocio en Google Maps. */
export function getMapsSearchHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Mapa embebible sin API key. */
export function getMapEmbedSrc(): string {
  return `https://www.google.com/maps?q=${query}&z=16&output=embed`;
}
