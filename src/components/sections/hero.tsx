import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { CSSProperties } from "react";
import type { home } from "@/data/content";
import { BookingLink } from "@/components/ui/booking-link";
import { Emphasis } from "@/components/ui/emphasis";
import { Photo } from "@/components/ui/photo";
import { TodayChip } from "@/components/ui/today-chip";

type HeroProps = { copy: typeof home.hero };

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

function TrustChips({ chips, className }: { chips: readonly string[]; className?: string }) {
  return (
    <ul className={className}>
      {chips.map((chip) => (
        <li key={chip} className="chip">
          <Check size={15} strokeWidth={2.25} aria-hidden="true" />
          {chip}
        </li>
      ))}
    </ul>
  );
}

/**
 * Hero a 100svh. Móvil: foto en HOJA a todo el ancho útil (16:10, con tope de alto)
 * y el texto debajo. En pantallas bajas (≤ 640 px de alto) el CTA sube sobre el
 * subtítulo para verse siempre sin scroll (probado en 320×568, 360×600 y 390×664).
 * Desktop: composición asimétrica, texto 7/12 y foto vertical 5/12.
 */
export function Hero({ copy }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      data-hide-booking-bar
      className="relative isolate overflow-hidden"
    >
      <div className="container-site flex min-h-[calc(100svh-var(--header-h))] flex-col gap-7 pt-2 pb-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-6 lg:pb-16">
        {/* Visual */}
        <div className="relative lg:order-2 lg:col-span-5 lg:col-start-8">
          <Photo
            id="hero"
            priority
            shape="leaf"
            ratio="auto"
            sizes="(min-width: 1024px) 36vw, 92vw"
            className="hero-photo aspect-[16/10] max-h-[max(7rem,min(210px,calc(100svh-29rem)))] w-full shadow-lift md:aspect-[4/3] md:max-h-[44svh] lg:mx-auto lg:aspect-[4/5] lg:h-[min(78svh,44rem)] lg:max-h-none lg:w-auto lg:max-w-full"
          />
          <TodayChip
            labels={copy.today}
            className="absolute -bottom-5 left-4 lg:-bottom-6 lg:-left-8"
          />
        </div>

        {/* Texto */}
        <div className="hero-stagger flex flex-col items-start gap-5 lg:order-1 lg:col-span-7 lg:row-start-1 lg:gap-7">
          <h1 id="hero-title" className="text-h1 max-w-[13ch] lg:max-w-[12ch]" style={stagger(0)}>
            <Emphasis text={copy.title} />
          </h1>
          <p className="text-lead max-w-[46ch] text-muted short:order-2" style={stagger(1)}>
            {copy.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 short:order-1 sm:gap-x-6" style={stagger(2)}>
            <BookingLink>{copy.primaryCta}</BookingLink>
            <Link href={copy.secondaryCta.href} className="link-arrow">
              {copy.secondaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <TrustChips chips={copy.chips} className="flex flex-wrap gap-2 short:order-3" />
        </div>
      </div>
    </section>
  );
}
