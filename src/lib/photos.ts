import fs from "node:fs";
import path from "node:path";
import { images, type ImageKey } from "@/data/images";
import type { PhotoData } from "@/components/ui/photo-frame";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const existsCache = new Map<string, boolean>();

function fileExists(file: string): boolean {
  const cached = existsCache.get(file);
  if (cached !== undefined) return cached;
  const exists = fs.existsSync(path.join(IMAGES_DIR, file));
  existsCache.set(file, exists);
  return exists;
}

/**
 * Solo servidor: resuelve una clave del mapa de imágenes. Si el archivo existe en
 * public/images devuelve su ruta; si no, `src: null` y <PhotoFrame> pinta un placeholder.
 * Se evalúa en build (páginas estáticas): al agregar fotos, vuelve a compilar.
 */
export function resolvePhoto(key: ImageKey): PhotoData {
  const spec = images[key];
  return { ...spec, key, src: fileExists(spec.file) ? `/images/${spec.file}` : null };
}
