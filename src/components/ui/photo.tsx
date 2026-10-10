import type { ImageKey } from "@/data/images";
import { resolvePhoto } from "@/lib/photos";
import { PhotoFrame, type PhotoFrameProps } from "./photo-frame";

/** Componente de servidor: <Photo id="hero" sizes="…" />. */
export function Photo({ id, ...props }: Omit<PhotoFrameProps, "photo"> & { id: ImageKey }) {
  return <PhotoFrame photo={resolvePhoto(id)} {...props} />;
}
