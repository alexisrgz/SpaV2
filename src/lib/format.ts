import { site } from "@/config/site";

const priceFormatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

/** 1150 → "$1,150" */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

/** 90 → "90 min" */
export function formatMinutes(minutes: number): string {
  return `${minutes} min`;
}

/** Une clases condicionales sin dependencias externas. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** "Savia Spa" → "S" (para avatares de iniciales). */
export function initialOf(name: string): string {
  return name.trim().charAt(0).toLocaleUpperCase(site.locale);
}
