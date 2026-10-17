import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionCopy } from "@/data/content";
import type { Package } from "@/data/types";
import { ui } from "@/data/ui";
import { cn, formatPrice } from "@/lib/format";
import { Photo } from "@/components/ui/photo";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * Teaser de experiencias sobre bosque. Desktop: composición editorial, una
 * experiencia protagonista a la izquierda y dos horizontales a la derecha.
 */
export function ExperiencesTeaser({ copy, packages }: { copy: SectionCopy; packages: readonly Package[] }) {
  const [lead, ...rest] = packages;

  return (
    <section aria-labelledby="experiencias-title" className="tone-inverse section-y">
      <div className="container-site">
        <SectionHeader copy={copy} id="experiencias-title" />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <PackageTeaser pkg={lead} size="lead" className="lg:col-span-6" />
          <div className="grid content-start gap-12 lg:col-span-6 lg:gap-10">
            {rest.map((pkg) => (
              <PackageTeaser key={pkg.slug} pkg={pkg} size="row" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PackageTeaser({ pkg, size, className }: { pkg: Package; size: "lead" | "row"; className?: string }) {
  const href = `/experiencias#${pkg.slug}`;
  const isRow = size === "row";

  return (
    <article
      data-reveal
      suppressHydrationWarning
      className={cn("group relative grid gap-5", isRow && "sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:items-center sm:gap-7", className)}
    >
      <Photo
        id={pkg.image}
        shape="card"
        ratio={isRow ? "4/3" : "auto"}
        sizes={isRow ? "(min-width: 1024px) 260px, (min-width: 640px) 42vw, 92vw" : "(min-width: 1024px) 560px, 92vw"}
        className={isRow ? undefined : "aspect-[4/3] lg:aspect-[6/5]"}
        mediaClassName="zoom-media"
      />
      <div className="flex flex-col items-start gap-2">
        <p className="label tabular text-muted">
          {pkg.duration} · {formatPrice(pkg.price)}
        </p>
        <h3 className="text-h3">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {pkg.name}
          </Link>
        </h3>
        <p className="text-small text-muted">{pkg.summary}</p>
        <span aria-hidden="true" className="link-arrow text-small">
          {ui.viewExperience}
          <ArrowRight size={18} />
        </span>
      </div>
    </article>
  );
}
