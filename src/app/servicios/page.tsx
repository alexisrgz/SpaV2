import { servicesPage } from "@/data/content";
import { serviceCategories, services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { FilterList } from "@/components/ui/filter-list";
import { PageHeader } from "@/components/sections/page-header";
import { ServiceCard } from "@/components/sections/service-card";

export const metadata = pageMetadata({ ...servicesPage.meta, path: "/servicios" });

export default function ServicesPage() {
  return (
    <>
      <PageHeader title={servicesPage.title} intro={servicesPage.intro} />
      <section aria-label={servicesPage.title} className="tone-canvas pb-18 lg:pb-30">
        <div className="container-site">
          <FilterList
            label={servicesPage.filterLabel}
            allLabel={servicesPage.allLabel}
            options={serviceCategories}
            emptyLabel={servicesPage.emptyLabel}
            countTemplate={servicesPage.countTemplate}
            listClassName="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
            itemClassName="flex"
            items={services.map((service) => ({
              id: service.slug,
              category: service.category,
              node: (
                <ServiceCard
                  service={service}
                  variant="full"
                  headingLevel="h2"
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"
                />
              ),
            }))}
          />
        </div>
      </section>
    </>
  );
}
