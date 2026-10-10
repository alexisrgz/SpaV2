"use client";

import { site } from "@/config/site";
import { formatRange, getOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/format";
import { useNowMinute } from "@/lib/use-now";

/** Badge "Abierto ahora / Cerrado" calculado en la zona horaria de Mazatlán. */
export function OpenStatus({ className }: { className?: string }) {
  const now = useNowMinute();
  const status = now ? getOpenStatus(now) : null;

  return (
    <p
      className={cn("inline-flex min-h-9 items-center gap-2.5 text-small font-semibold", className)}
      aria-live="polite"
    >
      <span className="relative flex size-2.5" aria-hidden="true">
        {status?.isOpen && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#6fbf8a] opacity-60 motion-reduce:hidden" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2.5 rounded-full",
            status ? (status.isOpen ? "bg-[#4fa56c]" : "bg-current opacity-50") : "bg-current opacity-30",
          )}
        />
      </span>
      {status ? (
        <span>
          {status.label}
          <span className="font-normal text-muted"> · {status.detail}</span>
        </span>
      ) : (
        <span className="text-muted">Consultando horario…</span>
      )}
    </p>
  );
}

/** Tabla de horarios con el día de hoy resaltado. */
export function HoursList({ className }: { className?: string }) {
  const now = useNowMinute();
  const today = now ? getOpenStatus(now).today : null;

  return (
    <dl className={cn("grid gap-0", className)}>
      {site.hours.map((h) => {
        const isToday = today !== null && (h.days as readonly number[]).includes(today);
        return (
          <div
            key={h.label}
            className={cn(
              "flex items-baseline justify-between gap-6 border-b border-rule py-3 last:border-b-0",
              isToday && "font-semibold",
            )}
          >
            <dt>
              {h.label}
              {isToday && <span className="label ml-2 align-middle text-accent-em">Hoy</span>}
            </dt>
            <dd className="tabular">{formatRange(h)}</dd>
          </div>
        );
      })}
    </dl>
  );
}
