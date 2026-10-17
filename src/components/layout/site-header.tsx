"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { site } from "@/config/site";
import { ui } from "@/data/ui";
import { cn } from "@/lib/format";
import { BookingLink } from "@/components/ui/booking-link";
import { Wordmark } from "@/components/ui/wordmark";
import { MobileMenu } from "./mobile-menu";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Header sticky: transparente sobre el inicio de la página y sólido al hacer scroll. */
export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "sticky top-0 z-40 text-ink transition-[background-color,box-shadow] duration-300 ease-out-soft",
        scrolled ? "bg-canvas shadow-[0_1px_0_var(--color-line),0_10px_30px_-18px_rgb(58_42_24/0.35)]" : "bg-transparent",
      )}
    >
      <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
        <Link href="/" className="-ml-1 inline-flex min-h-12 items-center rounded-lg px-1" aria-label={`${site.name}, ir al inicio`}>
          <Wordmark />
        </Link>

        <nav aria-label={ui.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-12 items-center rounded-full px-3.5 text-[0.95rem] font-semibold transition-colors duration-200",
                      active ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-support-ink transition-[opacity,scale] duration-300 ease-out-soft",
                        active ? "opacity-100" : "scale-50 opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Social links */}
          <div className="hidden items-center gap-1 md:flex">
            <a
              href="https://www.instagram.com/tuspa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-line hover:text-ink"
            >
              {/* Instagram icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/tuspa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Facebook"
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-line hover:text-ink"
            >
              {/* Facebook icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
          <BookingLink className="hidden md:inline-flex" />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
