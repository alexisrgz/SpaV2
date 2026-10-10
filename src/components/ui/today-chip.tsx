"use client";

import { Clock } from "lucide-react";
import { formatRange, todayHours } from "@/lib/hours";
import { cn } from "@/lib/format";
import { useNowMinute } from "@/lib/use-now";

type TodayChipProps = {
  labels: { open: string; closed: string; pending: string };
  className?: string;
};

/**
 * Chip "Abierto hoy · 9:00 – 19:00" con el horario del día en America/Mazatlan.
 * Va posicionado en absoluto, así que el cambio de texto al hidratar no mueve el layout.
 */
export function TodayChip({ labels, className }: TodayChipProps) {
  const now = useNowMinute();
  const today = now ? todayHours(now) : undefined;
  const text = !now ? labels.pending : today ? `${labels.open} · ${formatRange(today)}` : labels.closed;

  return (
    <p
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full bg-canvas px-4 text-[0.875rem] font-semibold text-ink shadow-soft",
        className,
      )}
    >
      <Clock size={16} strokeWidth={2} aria-hidden="true" className="text-support-ink" />
      <span className="tabular">{text}</span>
    </p>
  );
}
