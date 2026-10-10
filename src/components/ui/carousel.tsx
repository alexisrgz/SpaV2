"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { ui } from "@/data/ui";
import { cn } from "@/lib/format";

type CarouselProps = {
  /** Nombre accesible del carrusel. */
  label: string;
  children: ReactNode;
  /** Ancho de cada tarjeta en el carril (clases Tailwind). */
  itemClassName?: string;
  /** Clases extra del carril. Úsalas para convertirlo en grid en desktop. */
  railClassName?: string;
  /** Clases del pie (dots/flechas). P. ej. "lg:hidden" cuando el carril se vuelve grid. */
  controlsClassName?: string;
  arrows?: boolean;
  className?: string;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Carrusel con swipe nativo (scroll-snap), dots y flechas opcionales.
 * Sin librerías: el navegador hace el gesto; aquí solo seguimos la tarjeta activa.
 */
export function Carousel({
  label,
  children,
  itemClassName,
  railClassName,
  controlsClassName,
  arrows = false,
  className,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const items = Array.from(rail.children) as HTMLElement[];
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target, entry.intersectionRatio);
        let best = 0;
        let bestRatio = -1;
        items.forEach((item, i) => {
          const ratio = ratios.get(item) ?? 0;
          if (ratio > bestRatio + 0.05) {
            best = i;
            bestRatio = ratio;
          }
        });
        setActive(best);
      },
      { root: rail, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [slides.length]);

  const goTo = (index: number) => {
    const rail = railRef.current;
    const target = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !target) return;
    const padding = parseFloat(getComputedStyle(rail).scrollPaddingInlineStart) || 0;
    rail.scrollTo({
      left: target.offsetLeft - padding,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div className={className} role="region" aria-roledescription="carrusel" aria-label={label}>
      <ul ref={railRef} className={cn("rail relative pb-2", railClassName)} tabIndex={0} aria-label={label}>
        {slides.map((slide, i) => (
          <li
            key={i}
            className={cn("flex", itemClassName)}
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${slides.length}`}
          >
            {slide}
          </li>
        ))}
      </ul>

      {slides.length > 1 && (
        <div className={cn("container-site mt-4 flex items-center justify-between gap-4", controlsClassName)}>
          <div className="-ml-4 flex items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${ui.goToSlide} ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className="group/dot grid size-12 place-items-center"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300 ease-out-soft",
                    i === active ? "w-6 bg-current" : "w-2 bg-current opacity-30 group-hover/dot:opacity-60",
                  )}
                />
              </button>
            ))}
          </div>
          {arrows && (
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                className="btn btn-outline btn-icon"
                onClick={() => goTo(Math.max(0, active - 1))}
                disabled={active === 0}
                aria-label={ui.carouselPrev}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn-outline btn-icon"
                onClick={() => goTo(Math.min(slides.length - 1, active + 1))}
                disabled={active === slides.length - 1}
                aria-label={ui.carouselNext}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
