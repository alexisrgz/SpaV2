"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { ui } from "@/data/ui";
import { useBookingSelection } from "@/lib/booking-selection";
import { cn } from "@/lib/format";
import { BookingLink } from "@/components/ui/booking-link";

/** Elementos que ocultan la barra mientras están en pantalla (hero, encabezado de página, footer). */
const HIDE_SELECTOR = "[data-hide-booking-bar]";

/**
 * Barra fija inferior (solo < 768 px): Reservar + Llamar.
 * Aparece al pasar el hero y se oculta cerca del footer. En el detalle de un
 * servicio muestra el servicio, la duración y el precio seleccionados.
 */
export function MobileBookingBar() {
  const pathname = usePathname();
  const selection = useBookingSelection();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(HIDE_SELECTOR));
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setVisible(onScreen.size === 0);
      },
      // El footer cuenta un poco antes de entrar: la barra se va antes de taparlo.
      { rootMargin: "0px 0px 64px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/97 shadow-[0_-12px_32px_-20px_rgb(58_42_24/0.45)] transition-[translate,opacity] duration-350 ease-out-soft md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      inert={!visible}
      data-booking-bar
      data-visible={visible || undefined}
    >
      <div className="container-site flex items-center gap-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {selection ? (
          <BookingLink href={selection.href} className="min-h-[56px] flex-1 px-4" hideIcon>
            <span className="flex flex-col items-center leading-tight">
              <span className="text-[0.8125rem] font-medium opacity-90">{selection.service}</span>
              <span className="tabular">
                {ui.book} · {selection.variantLabel} · {selection.priceLabel}
              </span>
            </span>
          </BookingLink>
        ) : (
          <BookingLink className="flex-1" />
        )}
        <a
          href={`tel:${site.contact.phoneE164}`}
          className="btn btn-outline btn-icon h-[52px] border-ink/30"
          aria-label={ui.callAria}
        >
          <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
