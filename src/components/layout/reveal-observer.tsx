"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Revela una sola vez los elementos con [data-reveal] al entrar en pantalla.
 * El estado oculto solo aplica si el script de <head> marcó <html data-motion>
 * (JS activo y sin prefers-reduced-motion), así el contenido nunca queda invisible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!("IntersectionObserver" in window)) {
      pending.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** Script inline para <head>: decide antes del primer pintado si hay animaciones. */
export const motionBootScript = `(function(){try{if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches&&'IntersectionObserver' in window){document.documentElement.setAttribute('data-motion','')}}catch(e){}})();`;
