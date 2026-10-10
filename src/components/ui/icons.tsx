/** Íconos de marca dibujados a mano (lucide ya no incluye logotipos). */

type BrandIconProps = { className?: string; size?: number };

/** Glifo de WhatsApp dibujado con el mismo trazo que lucide. */
export function WhatsAppIcon({ className, size = 20 }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.75a9.25 9.25 0 0 0-8 13.9L2.75 21.25l4.75-1.2A9.25 9.25 0 1 0 12 2.75Z" />
      <path d="M8.9 8.1c.2-.45.42-.47.66-.48h.56c.17 0 .43.06.62.5.22.5.72 1.73.78 1.86.06.12.1.27.02.43-.08.17-.12.27-.24.41l-.37.43c-.12.13-.25.27-.1.53.14.25.64 1.06 1.38 1.71.95.84 1.74 1.1 1.99 1.23.25.12.39.1.53-.06.15-.17.62-.72.79-.97.16-.25.33-.2.55-.12.23.08 1.43.68 1.67.8.25.12.41.18.47.29.06.1.06.6-.14 1.18-.21.58-1.2 1.14-1.66 1.18-.43.05-.97.07-1.56-.1a14.3 14.3 0 0 1-1.42-.52c-2.5-1.08-4.13-3.6-4.25-3.77-.12-.17-1.01-1.35-1.01-2.57 0-1.22.64-1.82.86-2.07Z" />
    </svg>
  );
}

export function InstagramIcon({ className, size = 20 }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Monograma de Savia: un arco con una hoja dentro (también es el favicon). */
export function SaviaMark({ className, size = 28 }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 29V14.5a10 10 0 0 1 20 0V29" />
      <path d="M16 27V15" />
      <path d="M16 20.5c-3.6-.2-5.6-2.3-5.8-5.9 3.6.2 5.6 2.3 5.8 5.9Z" />
      <path d="M16 17.5c3.2-.2 5-2 5.2-5.2-3.2.2-5 2-5.2 5.2Z" />
    </svg>
  );
}
