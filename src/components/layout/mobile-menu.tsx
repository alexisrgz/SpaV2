"use client";

import Link from "next/link";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { site } from "@/config/site";
import { ui } from "@/data/ui";
import { cn } from "@/lib/format";
import { hoursSummary } from "@/lib/hours";
import { getMapsSearchHref } from "@/lib/maps";
import { getWhatsAppContactHref } from "@/lib/whatsapp";
import { BookingLink } from "@/components/ui/booking-link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { OpenStatus } from "@/components/ui/open-status";
import { Wordmark } from "@/components/ui/wordmark";
import { isActivePath } from "./site-header";

/**
 * Menú móvil a pantalla completa con <dialog> modal nativo:
 * foco atrapado en el diálogo, Esc para cerrar, foco de vuelta al botón y
 * bloqueo de scroll (html:has(dialog[open]) en globals.css).
 */
export function MobileMenu({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Cierra al cambiar de ruta (y al ocultarse la ruta por <Activity>).
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => dialog?.close();
  }, [pathname]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="btn btn-outline btn-icon border-line lg:hidden"
        aria-label={ui.menuOpen}
        aria-haspopup="dialog"
      >
        <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={ui.mainNav}
        className="sheet tone-inverse lg:hidden"
      >
        <div className="relative flex min-h-full flex-col overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {/* Arco ornamental de fondo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 bottom-24 h-[26rem] w-[18rem] rounded-t-full border border-rule opacity-70"
          />

          <div className="container-site flex h-(--header-h) flex-none items-center justify-between">
            <Link href="/" onClick={close} className="inline-flex min-h-12 items-center" aria-label={`${site.name}, ir al inicio`}>
              <Wordmark />
            </Link>
            <button
              type="button"
              onClick={close}
              className="btn btn-outline btn-icon border-rule"
              aria-label={ui.menuClose}
              autoFocus
            >
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={ui.mainNav} className="container-site mt-6 flex-none">
            <ul className="flex flex-col">
              {site.nav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-16 items-center font-display text-[2.125rem] leading-none [font-variation-settings:'SOFT'_80]",
                        active && "italic text-accent-em",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="container-site mt-8 flex flex-none flex-col gap-6">
            <BookingLink className="w-full" />

            <div className="grid gap-1 text-small">
              <OpenStatus />
              <p className="text-muted">{hoursSummary()}</p>
            </div>

            <ul className="grid gap-1 text-[1rem]">
              <li>
                <a href={`tel:${site.contact.phoneE164}`} className="inline-flex min-h-12 items-center gap-3">
                  <Phone size={20} aria-hidden="true" strokeWidth={1.75} />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppContactHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3"
                >
                  <WhatsAppIcon size={20} />
                  {ui.whatsapp}
                  <span className="sr-only"> {ui.newTab}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3"
                >
                  <InstagramIcon size={20} />
                  {site.contact.instagram.handle}
                  <span className="sr-only"> {ui.newTab}</span>
                </a>
              </li>
              <li>
                <a
                  href={getMapsSearchHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3"
                >
                  <MapPin size={20} aria-hidden="true" strokeWidth={1.75} />
                  {site.address.street}, {site.address.city}
                  <span className="sr-only"> {ui.newTab}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
