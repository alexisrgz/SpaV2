"use client";

import { Clock } from "lucide-react";
import { getOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/format";
import { useNowMinute } from "@/lib/use-now";

type TodayChipProps = {
  labels: { open: string; pending: string };
  className?: string;
};

/**
 * Chip de horario del hero. Usa el mismo `getOpenStatus` (America/Mazatlan) que el
 * badge "Abierto ahora / Cerrado", así nunca se contradicen:
 * abierto → "Abierto ahora · hasta 19:00"; cerrado → "Abre mañana a las 9:00".
 * Va en absoluto: el cambio de texto al hidratar no mueve el layout.
 */
export function TodayChip({ labels, className }: TodayChipProps) {
  const now = useNowMinute();
  const status = now ? getOpenStatus(now) : null;
  const text = !status
    ? labels.pending
    : status.isOpen && status.closesAt
      ? labels.open.replace("{hora}", status.closesAt)
      : status.detail;

  return (
    <p
      data-today-chip
      data-open={status ? String(status.isOpen) : undefined}
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
