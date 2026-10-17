import type { SectionCopy } from "@/data/content";
import type { Service } from "@/data/types";
import { Carousel } from "@/components/ui/carousel";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceCard } from "./service-card";

/** Carrusel con swipe en móvil/tablet; grid de 4 en desktop. */
export function FeaturedServices({ copy, services }: { copy: SectionCopy; services: readonly Service[] }) {
  return (
    <section aria-labelledby="destacados-title" className="tone-canvas section-y">
      <SectionHeader copy={copy} id="destacados-title" className="container-site" />
      <div data-reveal suppressHydrationWarning className="mt-10 lg:mt-14">
        <Carousel
          label="Servicios destacados"
          itemClassName="w-[78%] max-w-[21rem] sm:w-[44%] md:w-[36%] lg:w-auto lg:max-w-none"
          railClassName="gap-5 lg:mx-auto lg:grid lg:max-w-[calc(1200px+var(--gutter)*2)] lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
          controlsClassName="lg:hidden"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              sizes="(min-width: 1024px) 280px, (min-width: 768px) 36vw, (min-width: 640px) 44vw, 78vw"
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
