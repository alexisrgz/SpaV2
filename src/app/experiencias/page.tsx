import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { experiencesPage, home } from "@/data/content";
import { packages } from "@/data/packages";
import { cn, formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { BookingLink } from "@/components/ui/booking-link";
import { Emphasis } from "@/components/ui/emphasis";
import { Photo } from "@/components/ui/photo";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = pageMetadata({ ...experiencesPage.meta, path: "/experiencias" });

export default function ExperiencesPage() {
  const copy = experiencesPage;

  return (
    <>
      <PageHeader title={copy.title} intro={copy.intro} />

      {/* Servicio individual vs. experiencia */}
      <section aria-labelledby="diferencia-title" className="tone-canvas pb-18 lg:pb-24">
        <div className="container-site">
          <div className="grid gap-8 rounded-card bg-surface p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
            <h2 id="diferencia-title" className="text-h2 lg:col-span-4">
              <Emphasis text={copy.difference.title} />
            </h2>
            <dl className="grid gap-8 md:grid-cols-2 lg:col-span-8 lg:gap-10">
              {copy.difference.items.map((item) => (
                <div key={item.label} className="border-t border-rule pt-5">
                  <dt className="font-sans text-[1.0625rem] font-bold">{item.label}</dt>
                  <dd className="mt-2 text-muted">
                    <p>{item.text}</p>
                    {"link" in item && item.link && (
                      <Link href={item.link.href} className="link-arrow mt-1 text-ink">
                        {item.link.label}
                        <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Paquetes alternados */}
      <div className="tone-canvas pb-18 lg:pb-30">
        <div className="container-site grid gap-20 lg:gap-28">
          {packages.map((pkg, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={pkg.slug}
                id={pkg.slug}
                aria-labelledby={`${pkg.slug}-title`}
                className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:items-center lg:gap-14"
                data-reveal
              >
                <Photo
                  id={pkg.image}
                  shape="arch"
                  ratio="auto"
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className={cn("aspect-[4/3] lg:col-span-6 lg:aspect-[4/5]", reversed && "lg:order-2 lg:col-start-7")}
                  frameClassName="shadow-lift"
                  mediaClassName="zoom-media"
                />
                <div className={cn("flex flex-col items-start gap-6 lg:col-span-6", reversed && "lg:order-1")}>
                  <dl className="flex flex-wrap gap-2">
                    <div className="chip">
                      <dt className="sr-only">{copy.durationLabel}</dt>
                      <dd className="tabular">{pkg.duration}</dd>
                    </div>
                    <div className="chip">
                      <dt className="sr-only">{copy.priceLabel}</dt>
                      <dd className="tabular">{formatPrice(pkg.price)} MXN</dd>
                    </div>
                  </dl>
                  <h2 id={`${pkg.slug}-title`} className="text-h2">{pkg.name}</h2>
                  <p className="text-lead text-muted">{pkg.description}</p>

                  <div className="w-full border-t border-rule pt-6">
                    <h3 className="label text-muted">{copy.includesLabel}</h3>
                    <ul className="mt-4 grid gap-3">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1 grid size-6 flex-none place-items-center rounded-full bg-soft text-inverse">
                            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-small text-muted">
                    <span className="font-semibold text-ink">{copy.idealForLabel}:</span> {pkg.idealFor}
                  </p>

                  <BookingLink service={`${copy.bookingPrefix} ${pkg.name}`} variant={pkg.duration}>
                    {copy.bookLabel} {pkg.name}
                  </BookingLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <FinalCta copy={home.finalCta} />
    </>
  );
}
