import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Ruta canónica, p. ej. "/servicios". */
  path: string;
  /** Usa el título tal cual, sin "· Savia Spa" (para el inicio). */
  absoluteTitle?: boolean;
};

/** Imagen OG por defecto (app/opengraph-image.tsx). Las rutas con su propia imagen la sobrescriben. */
const defaultOgImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} · ${site.tagline}` };

/** Metadata por página: título, descripción, canonical y Open Graph. */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultOgImage.url],
    },
  };
}
