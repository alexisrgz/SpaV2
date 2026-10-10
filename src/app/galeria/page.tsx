import { galleryPage } from "@/data/content";
import { gallery, galleryCategories } from "@/data/gallery";
import { pageMetadata } from "@/lib/metadata";
import { resolvePhoto } from "@/lib/photos";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = pageMetadata({ ...galleryPage.meta, path: "/galeria" });

export default function GalleryPage() {
  const items = gallery.map((item) => ({
    photo: resolvePhoto(item.image),
    category: item.category,
    caption: item.caption,
  }));

  return (
    <>
      <PageHeader title={galleryPage.title} intro={galleryPage.intro} />
      <section aria-label={galleryPage.title} className="tone-canvas pb-18 lg:pb-30">
        <div className="container-site">
          <GalleryGrid items={items} categories={galleryCategories} copy={galleryPage} />
        </div>
      </section>
    </>
  );
}
