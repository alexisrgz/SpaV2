import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { CSSProperties } from "react";
import type { home } from "@/data/content";
import { BookingLink } from "@/components/ui/booking-link";
import { Emphasis } from "@/components/ui/emphasis";
import { Photo } from "@/components/ui/photo";

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
 * Hero a 100svh. Móvil: arco arriba (se adapta a la altura disponible) con los
 * chips en el hueco lateral, y el texto + CTA abajo, siempre visibles en 360×640.
 * Desktop: composición asimétrica, texto 7/12 y arco grande 5/12.
 */
export function Hero({ copy }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      data-hide-booking-bar
      className="relative isolate overflow-hidden"
    >
      <div className="container-site flex min-h-[calc(100svh-var(--header-h))] flex-col gap-6 pt-2 pb-7 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-6 lg:pb-16">
        {/* Visual: en móvil el arco toma toda la altura libre (alto × 4/5) */}
        <div className="relative min-h-36 flex-1 lg:order-2 lg:col-span-5 lg:col-start-8 lg:h-[min(78svh,44rem)] lg:flex-none">
          <div className="absolute inset-y-0 right-1 aspect-[4/5] max-sm:max-w-[calc(100%-0.75rem)] lg:inset-y-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2">
            {/* Eco del arco: un trazo desplazado que da profundidad */}
            <div
              aria-hidden="true"
              className="arch-frame absolute inset-0 translate-x-2.5 -translate-y-2.5 lg:translate-x-6 lg:-translate-y-6"
            >
              <div className="arch absolute inset-0 border border-support/70" />
            </div>
            <Photo
              id="hero"
              priority
              shape="arch"
              ratio="auto"
              sizes="(min-width: 1024px) 34vw, 80vw"
              className="absolute inset-0"
              frameClassName="hero-arch shadow-lift"
            />
            <Photo
              id="space-4"
              shape="circle"
              ratio="1/1"
              sizes="(min-width: 1024px) 180px, 120px"
              className="absolute -bottom-3 -left-5 w-[36%] rounded-full ring-6 ring-canvas lg:-bottom-6 lg:-left-16 lg:w-[38%] lg:ring-8"
              frameClassName="hero-stagger"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="hero-stagger flex flex-col items-start gap-5 lg:order-1 lg:col-span-7 lg:row-start-1 lg:gap-7">
          <h1 id="hero-title" className="text-h1 max-w-[13ch] lg:max-w-[12ch]" style={stagger(0)}>
            <Emphasis text={copy.title} />
          </h1>
          <p className="text-lead max-w-[46ch] text-muted" style={stagger(1)}>
            {copy.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3" style={stagger(2)}>
            <BookingLink>{copy.primaryCta}</BookingLink>
            <Link href={copy.secondaryCta.href} className="link-arrow">
              {copy.secondaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <TrustChips chips={copy.chips} className="flex flex-wrap gap-2" />
        </div>
      </div>
    </section>
  );
}
