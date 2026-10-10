import { Star } from "lucide-react";
import type { SectionCopy } from "@/data/content";
import type { Testimonial } from "@/data/types";
import { ui } from "@/data/ui";
import { initialOf } from "@/lib/format";
import { Carousel } from "@/components/ui/carousel";
import { Emphasis } from "@/components/ui/emphasis";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex gap-0.5 text-support-ink" aria-label={ui.rating(rating)} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          strokeWidth={1.5}
          aria-hidden="true"
          className={i < rating ? "fill-current" : "opacity-30"}
        />
      ))}
    </p>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="m-0 flex w-full flex-col rounded-card bg-canvas p-7 shadow-soft lg:p-9">
      <Stars rating={t.rating} />
      <blockquote className="mt-5 flex-1">
        <p className="font-display text-[1.1875rem] leading-[1.5] [font-variation-settings:'SOFT'_80] lg:text-[1.3125rem]">
          “{t.quote}”
        </p>
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="grid size-12 flex-none place-items-center rounded-full bg-soft font-display text-[1.375rem] text-inverse italic"
        >
          {initialOf(t.name)}
        </span>
        <span className="flex flex-col">
          <span className="font-bold">{t.name}</span>
          <span className="text-small text-muted">{t.service}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Testimonios: título fijo a la izquierda en desktop y carrusel a la derecha. */
export function Testimonials({ copy, items }: { copy: SectionCopy; items: readonly Testimonial[] }) {
  return (
    <section aria-labelledby="testimonios-title" className="tone-surface section-y overflow-hidden">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-4 lg:pt-4">
          <h2 id="testimonios-title" className="text-h2">
            <Emphasis text={copy.title} />
          </h2>
          {copy.intro && <p className="mt-5 text-muted">{copy.intro}</p>}
        </div>
        <div data-reveal className="-mx-(--gutter) min-w-0 lg:col-span-8 lg:mx-0">
          <Carousel
            label="Testimonios"
            arrows
            itemClassName="w-[86%] max-w-[26rem] md:w-[52%] lg:w-[48%] lg:max-w-none"
            railClassName="gap-5 lg:scroll-px-0 lg:px-0"
            controlsClassName="lg:px-0"
          >
            {items.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
