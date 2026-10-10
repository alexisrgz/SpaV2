import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { serviceDetail, servicesPage } from "@/data/content";
import { categoryLabel, getRelatedServices, getService, services } from "@/data/services";
import { ui } from "@/data/ui";
import { formatMinutes } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { Accordion } from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Carousel } from "@/components/ui/carousel";
import { Emphasis } from "@/components/ui/emphasis";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { BookingPanel } from "@/components/sections/booking-panel";
import { ServiceCard, serviceDurations } from "@/components/sections/service-card";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: `${service.summary} ${serviceDurations(service)} en Savia Spa, Mazatlán. Reserva por WhatsApp.`,
    path: `/servicios/${service.slug}`,
  });
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 grid size-6 flex-none place-items-center rounded-full bg-soft text-inverse">
            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServiceDetailPage({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const crumbs = [
    { href: "/", label: ui.breadcrumbHome },
    { href: "/servicios", label: servicesPage.title },
    { href: `/servicios/${service.slug}`, label: service.name },
  ];
  const panelProps = {
    slug: service.slug,
    service: service.name,
    variants: service.variants,
    durationLabel: serviceDetail.durationLabel,
  };

  return (
    <>
      <JsonLd data={[serviceSchema(service), breadcrumbSchema(crumbs)]} />

      {/* Encabezado: foto en arco + nombre + selector de duración */}
      <section data-hide-booking-bar aria-labelledby="servicio-title" className="tone-canvas">
        <div className="container-site grid gap-8 pt-2 pb-14 md:grid-cols-12 md:items-center md:gap-10 lg:gap-14 lg:pt-6 lg:pb-24">
          <div className="md:col-span-12">
            <Breadcrumb items={crumbs} />
          </div>
          <Photo
            id={service.image}
            priority
            shape="arch"
            ratio="4/5"
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 40vw, 92vw"
            className="md:col-span-5"
            frameClassName="hero-arch shadow-lift"
          />
          <div className="flex flex-col gap-6 md:col-span-7 lg:max-w-[36rem]">
            <p className="label text-support-ink">
              {categoryLabel(service.category)} · <span className="tabular">{serviceDurations(service)}</span>
            </p>
            <h1 id="servicio-title" className="-mt-2 text-h1 hyphens-auto break-words">
              {service.name}
            </h1>
            <p className="text-lead text-muted">{service.description}</p>
            <BookingPanel {...panelProps} note={serviceDetail.bookingNote} className="mt-2 max-w-[28rem]" />
          </div>
        </div>
      </section>

      {/* Contenido + tarjeta sticky de reserva en desktop */}
      <div className="tone-surface section-y">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="grid gap-16 lg:col-span-7 lg:gap-20">
            <section aria-labelledby="incluye-title" data-reveal>
              <h2 id="incluye-title" className="text-h2">{serviceDetail.includesTitle}</h2>
              <div className="mt-8">
                <CheckList items={service.includes} />
              </div>
            </section>

            <div className="grid gap-12 md:grid-cols-2 md:gap-10" data-reveal>
              <section aria-labelledby="beneficios-title">
                <h2 id="beneficios-title" className="text-h3">{serviceDetail.benefitsTitle}</h2>
                <ul className="mt-5 grid gap-3 border-t border-rule pt-5">
                  {service.benefits.map((b) => (
                    <li key={b} className="text-muted">{b}</li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="ideal-title">
                <h2 id="ideal-title" className="text-h3">{serviceDetail.idealForTitle}</h2>
                <ul className="mt-5 flex flex-wrap gap-2 border-t border-rule pt-5">
                  {service.idealFor.map((item) => (
                    <li key={item} className="chip whitespace-normal">{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section aria-labelledby="sesion-title" data-reveal>
              <h2 id="sesion-title" className="text-h2">{serviceDetail.stepsTitle}</h2>
              <ol className="relative mt-10 grid gap-8 before:absolute before:top-2 before:bottom-2 before:left-[1.4375rem] before:w-px before:bg-(--tone-rule)">
                {service.steps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-5">
                    <span className="relative grid size-12 flex-none place-items-center rounded-full border border-rule bg-canvas font-display text-[1.25rem] tabular">
                      {i + 1}
                    </span>
                    <div className="pt-2.5">
                      <h3 className="font-sans text-[1.0625rem] font-bold">{step.title}</h3>
                      <p className="mt-1 text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <aside aria-labelledby="precauciones-title" className="flex gap-4 rounded-card bg-canvas p-6 shadow-soft lg:p-8" data-reveal>
              <ShieldCheck size={26} strokeWidth={1.6} aria-hidden="true" className="flex-none text-support-ink" />
              <div>
                <h2 id="precauciones-title" className="font-sans text-[1.0625rem] font-bold">{serviceDetail.precautionsTitle}</h2>
                <p className="mt-2 text-muted">{service.precautions}</p>
              </div>
            </aside>

            <section aria-labelledby="faq-servicio-title" data-reveal>
              <h2 id="faq-servicio-title" className="text-h2">{serviceDetail.faqTitle}</h2>
              <Accordion items={service.faqs} className="mt-8" />
            </section>
          </div>

          <aside aria-label={`${ui.book} ${service.name}`} className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-[calc(var(--header-h)+1.5rem)] rounded-card bg-canvas p-8 shadow-lift">
              <p className="font-display text-[1.75rem] leading-tight">{service.name}</p>
              <p className="mt-1 mb-6 text-small text-muted">
                {service.variants.map((v) => formatMinutes(v.minutes)).join(" o ")}
              </p>
              <BookingPanel {...panelProps} layout="compact" />
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados-title" className="tone-canvas section-y">
          <h2 id="relacionados-title" className="container-site text-h2">
            <Emphasis text={serviceDetail.relatedTitle} />
          </h2>
          <div className="mt-10">
            <Carousel
              label="Servicios relacionados"
              itemClassName="w-[78%] max-w-[21rem] sm:w-[44%] md:w-[36%] lg:w-auto lg:max-w-none"
              railClassName="gap-5 lg:mx-auto lg:grid lg:max-w-[calc(1200px+var(--gutter)*2)] lg:grid-cols-3 lg:gap-8 lg:overflow-visible"
              controlsClassName="lg:hidden"
            >
              {related.map((s) => (
                <ServiceCard
                  key={s.slug}
                  service={s}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 36vw, 78vw"
                />
              ))}
            </Carousel>
          </div>
        </section>
      )}
    </>
  );
}
