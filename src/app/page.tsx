import { home } from "@/data/content";
import { faqs } from "@/data/faqs";
import { galleryHighlights } from "@/data/gallery";
import { packages } from "@/data/packages";
import { featuredServices, services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { daySpaSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { ExperiencesTeaser } from "@/components/sections/experiences-teaser";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedServices } from "@/components/sections/featured-services";
import { FinalCta } from "@/components/sections/final-cta";
import { GalleryStrip } from "@/components/sections/gallery-strip";
import { Hero } from "@/components/sections/hero";
import { ServiceMarquee } from "@/components/sections/service-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { WhySavia } from "@/components/sections/why-savia";

export const metadata = pageMetadata({ ...home.meta, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <JsonLd data={daySpaSchema()} />
      <Hero copy={home.hero} />
      <ServiceMarquee items={services.map((s) => s.name)} />
      <FeaturedServices copy={home.services} services={featuredServices} />
      <WhySavia copy={home.why} image="space-2" />
      <ExperiencesTeaser copy={home.experiences} packages={packages} />
      <GalleryStrip copy={home.gallery} items={galleryHighlights} />
      <Testimonials copy={home.testimonials} items={testimonials} />
      <FaqSection copy={home.faq} items={faqs.slice(0, 5)} />
      <FinalCta copy={home.finalCta} />
    </>
  );
}
