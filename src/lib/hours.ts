import { site, type OpeningHours, type Weekday } from "@/config/site";

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"] as const;
const WEEKDAY_INDEX: Record<string, Weekday> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const zonedFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timeZone,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export type OpenStatus = {
  isOpen: boolean;
  /** "Abierto ahora", "Cierra pronto" o "Cerrado". */
  label: string;
  /** Complemento: "Hasta las 19:00", "Abre mañana a las 9:00"… */
  detail: string;
  /** Día de la semana en la zona horaria del negocio. */
  today: Weekday;
};

/** Día y minuto del día en la zona horaria del negocio (no la del visitante). */
export function zonedNow(date: Date): { weekday: Weekday; minutes: number } {
  const parts = zonedFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekday: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function hoursFor(day: Weekday, hours: readonly OpeningHours[] = site.hours): OpeningHours | undefined {
  return hours.find((h) => h.days.includes(day));
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** "09:00" → "9:00" */
export function formatTime(time: string): string {
  return time.replace(/^0/, "");
}

export function formatRange(h: OpeningHours): string {
  return `${formatTime(h.opens)} – ${formatTime(h.closes)}`;
}

export function getOpenStatus(date: Date, hours: readonly OpeningHours[] = site.hours): OpenStatus {
  const { weekday, minutes } = zonedNow(date);
  const today = hoursFor(weekday, hours);

  if (today) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);
    if (minutes >= opens && minutes < closes) {
      return {
        isOpen: true,
        label: closes - minutes <= 60 ? "Cierra pronto" : "Abierto ahora",
        detail: `Hasta las ${formatTime(today.closes)}`,
        today: weekday,
      };
    }
    if (minutes < opens) {
      return { isOpen: false, label: "Cerrado", detail: `Abre hoy a las ${formatTime(today.opens)}`, today: weekday };
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = ((weekday + offset) % 7) as Weekday;
    const next = hoursFor(day, hours);
    if (next) {
      const when = offset === 1 ? "mañana" : `el ${DAY_NAMES[day]}`;
      return { isOpen: false, label: "Cerrado", detail: `Abre ${when} a las ${formatTime(next.opens)}`, today: weekday };
    }
  }

  return { isOpen: false, label: "Cerrado", detail: "Consulta disponibilidad por WhatsApp", today: weekday };
}

/** Texto compacto de horario para chips y meta: "Lun – Vie 9:00 – 19:00 · …". */
export function hoursSummary(hours: readonly OpeningHours[] = site.hours): string {
  return hours.map((h) => `${h.label} ${formatRange(h)}`).join(" · ");
}
