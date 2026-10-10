import type { ImageKey } from "./images";

export type Faq = {
  question: string;
  answer: string;
};

export type ServiceCategory = "masajes" | "faciales" | "corporales" | "bienestar";

export type ServiceVariant = {
  /** Identificador estable (se usa en el selector y en Fase 2). */
  id: string;
  minutes: number;
  price: number;
};

export type SessionStep = {
  title: string;
  text: string;
};

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  image: ImageKey;
  /** Una línea para tarjetas y metadata. */
  summary: string;
  /** Párrafo introductorio del detalle. */
  description: string;
  variants: readonly ServiceVariant[];
  includes: readonly string[];
  benefits: readonly string[];
  idealFor: readonly string[];
  steps: readonly SessionStep[];
  precautions: string;
  faqs: readonly Faq[];
  related: readonly string[];
  featured?: boolean;
};

export type Package = {
  slug: string;
  name: string;
  image: ImageKey;
  /** Etiqueta de duración legible, p. ej. "4 h". También va en el mensaje de reserva. */
  duration: string;
  price: number;
  summary: string;
  description: string;
  includes: readonly string[];
  idealFor: string;
};

export type Testimonial = {
  name: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
};

export type TeamMember = {
  name: string;
  role: string;
  certification: string;
  bio: string;
  image: ImageKey;
};

export type GalleryCategory = "espacio" | "tratamientos" | "detalles";

export type GalleryItem = {
  image: ImageKey;
  category: GalleryCategory;
  caption: string;
};

/** Ítem de lista con ícono (los íconos se resuelven en `components/ui/icon.tsx`). */
export type IconPoint = {
  icon: IconName;
  title: string;
  text: string;
};

export type IconName =
  | "leaf"
  | "hand"
  | "clock"
  | "droplets"
  | "sprout"
  | "heart"
  | "sun"
  | "shield";
