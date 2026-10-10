import type { GalleryCategory, GalleryItem } from "./types";

export const galleryCategories: ReadonlyArray<{ id: GalleryCategory; label: string }> = [
  { id: "espacio", label: "Espacio" },
  { id: "tratamientos", label: "Tratamientos" },
  { id: "detalles", label: "Detalles" },
];

export const gallery: readonly GalleryItem[] = [
  { image: "space-1", category: "espacio", caption: "La recepción, con luz de la mañana" },
  { image: "gallery-01", category: "detalles", caption: "Sombras de monstera en el pasillo" },
  { image: "svc-masaje-relajante", category: "tratamientos", caption: "Masaje relajante con aceite tibio" },
  { image: "space-3", category: "espacio", caption: "Zona de descanso junto a la alberca" },
  { image: "gallery-02", category: "detalles", caption: "Sal de mar para el ritual corporal" },
  { image: "svc-facial-hidratante", category: "tratamientos", caption: "Mascarilla del facial hidratante" },
  { image: "space-2", category: "espacio", caption: "Sala de tratamiento preparada" },
  { image: "gallery-03", category: "tratamientos", caption: "Piedras calientes listas para la sesión" },
  { image: "gallery-05", category: "detalles", caption: "Eucalipto fresco en los vestidores" },
  { image: "svc-aromaterapia", category: "tratamientos", caption: "Las tres mezclas de aromaterapia" },
  { image: "gallery-04", category: "espacio", caption: "El pasillo hacia las cabinas" },
  { image: "space-4", category: "detalles", caption: "Velas y toallas de algodón" },
];

/** Franja horizontal de la página de inicio. */
export const galleryHighlights: readonly GalleryItem[] = gallery.slice(0, 7);
