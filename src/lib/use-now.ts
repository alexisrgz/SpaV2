"use client";

import { useSyncExternalStore } from "react";

const MINUTE = 60_000;

function subscribe(onChange: () => void): () => void {
  const id = window.setInterval(onChange, MINUTE / 2);
  return () => window.clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / MINUTE);
const getServerSnapshot = () => null;

/**
 * Minuto actual (se actualiza solo). En el HTML estático vale `null`, así el
 * estado "Abierto ahora" nunca queda congelado con la hora del build.
 */
export function useNowMinute(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === null ? null : new Date(minute * MINUTE);
}
