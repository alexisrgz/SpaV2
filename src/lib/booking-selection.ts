"use client";

import { useSyncExternalStore } from "react";

/**
 * Selección activa en /servicios/[slug] (servicio + variante), compartida entre
 * el selector de duración y la barra inferior móvil, que viven en árboles distintos.
 */
export type BookingSelection = {
  slug: string;
  variantId: string;
  service: string;
  variantLabel: string;
  priceLabel: string;
  href: string;
};

let current: BookingSelection | null = null;
const listeners = new Set<() => void>();

export function setBookingSelection(next: BookingSelection | null): void {
  current = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useBookingSelection(): BookingSelection | null {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
