"use client";

import { useEffect, useId, useLayoutEffect } from "react";
import type { ServiceVariant } from "@/data/types";
import { ui } from "@/data/ui";
import { getBookingHref } from "@/lib/booking";
import { setBookingSelection, useBookingSelection, type BookingSelection } from "@/lib/booking-selection";
import { cn, formatMinutes, formatPrice } from "@/lib/format";
import { BookingLink } from "@/components/ui/booking-link";

type BookingPanelProps = {
  slug: string;
  service: string;
  variants: readonly ServiceVariant[];
  durationLabel: string;
  note?: string;
  /** "full": panel principal; "compact": tarjeta sticky de desktop. */
  layout?: "full" | "compact";
  className?: string;
};

function toSelection(slug: string, service: string, variant: ServiceVariant): BookingSelection {
  const variantLabel = formatMinutes(variant.minutes);
  return {
    slug,
    service,
    variantId: variant.id,
    variantLabel,
    priceLabel: formatPrice(variant.price),
    href: getBookingHref({ service, variant: variantLabel }),
  };
}

/**
 * Selector de duración (control segmentado con radios nativos) + precio + Reservar.
 * La selección vive en un store compartido: este panel, la tarjeta sticky y la
 * barra inferior móvil siempre muestran la misma variante y el mismo mensaje.
 */
export function BookingPanel({
  slug,
  service,
  variants,
  durationLabel,
  note,
  layout = "full",
  className,
}: BookingPanelProps) {
  const name = useId();
  const stored = useBookingSelection();
  const current =
    (stored?.slug === slug && variants.find((v) => v.id === stored.variantId)) || variants[0];
  const selection = toSelection(slug, service, current);

  // Publica la variante por defecto para la barra inferior…
  useEffect(() => {
    setBookingSelection(toSelection(slug, service, variants[0]));
  }, [slug, service, variants]);
  // …y la retira al salir de la página (o al ocultarse por <Activity>).
  useLayoutEffect(() => () => setBookingSelection(null), []);

  const choose = (variant: ServiceVariant) => setBookingSelection(toSelection(slug, service, variant));
  const compact = layout === "compact";

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {variants.length > 1 ? (
        <fieldset>
          <legend className="label mb-3 text-muted">{durationLabel}</legend>
          <div
            className="grid gap-1 rounded-full bg-soft p-1"
            style={{ gridTemplateColumns: `repeat(${variants.length}, minmax(0, 1fr))` }}
          >
            {variants.map((variant) => {
              const id = `${name}-${variant.id}`;
              const checked = variant.id === current.id;
              return (
                <div key={variant.id} className="relative">
                  <input
                    type="radio"
                    id={id}
                    name={name}
                    value={variant.id}
                    checked={checked}
                    onChange={() => choose(variant)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={id}
                    className={cn(
                      "flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-full px-3 text-center leading-tight transition-[background-color,box-shadow,color] duration-300 ease-out-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--ring)",
                      checked ? "bg-canvas text-ink shadow-soft" : "text-ink-soft hover:text-ink",
                      !compact && "min-h-14",
                    )}
                  >
                    <span className="tabular font-bold">{formatMinutes(variant.minutes)}</span>
                    <span className="tabular text-[0.8125rem]">{formatPrice(variant.price)}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <p className="flex items-center gap-3">
          <span className="label text-muted">{durationLabel}</span>
          <span className="chip tabular">{selection.variantLabel}</span>
        </p>
      )}

      <p className="flex items-baseline gap-2" aria-live="polite">
        <span className={cn("font-display tabular leading-none", compact ? "text-[2rem]" : "text-[2.75rem]")}>
          {selection.priceLabel}
        </span>
        <span className="text-small text-muted">
          MXN · {selection.variantLabel}
        </span>
      </p>

      <BookingLink href={selection.href} className="w-full">
        <span className="tabular">
          {ui.book} · {selection.variantLabel} · {selection.priceLabel}
        </span>
      </BookingLink>

      {note && <p className="text-small text-muted">{note}</p>}
    </div>
  );
}
