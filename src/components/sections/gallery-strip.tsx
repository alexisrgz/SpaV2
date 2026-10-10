import type { SectionCopy } from "@/data/content";
import type { GalleryItem } from "@/data/types";
import { Carousel } from "@/components/ui/carousel";
import { Photo } from "@/components/ui/photo";
import { SectionHeader } from "@/components/ui/section-header";

/** Franja horizontal de fotos con alturas iguales y anchos según su proporción. */
export function GalleryStrip({ copy, items }: { copy: SectionCopy; items: readonly GalleryItem[] }) {
  return (
    <section aria-labelledby="galeria-title" className="tone-canvas section-y">
      <SectionHeader copy={copy} id="galeria-title" className="container-site" />
      <div data-reveal className="mt-10 lg:mt-14">
        <Carousel
          label="Fotos de Savia Spa"
          arrows
          railClassName="gap-4 lg:gap-5"
          itemClassName="max-w-[86vw]"
        >
          {items.map((item) => (
            <figure key={item.image} className="m-0 w-min">
              <Photo
                id={item.image}
                shape="card"
                sizes="(min-width: 1024px) 420px, 70vw"
                className="h-72 max-w-[86vw] sm:h-80 lg:h-[26rem]"
                mediaClassName="zoom-media"
              />
              <figcaption className="mt-3 text-small text-muted">{item.caption}</figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
