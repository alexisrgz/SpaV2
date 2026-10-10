import { Plus } from "lucide-react";
import type { Faq } from "@/data/types";
import { cn } from "@/lib/format";

/**
 * Acordeón accesible con <details>/<summary> nativos: teclado, lector de pantalla
 * y búsqueda del navegador funcionan sin JavaScript.
 */
export function Accordion({ items, className }: { items: readonly Faq[]; className?: string }) {
  return (
    <div className={cn("accordion border-t border-rule", className)}>
      {items.map((item) => (
        <details key={item.question} className="group border-b border-rule">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-[1.25rem] leading-snug [font-variation-settings:'SOFT'_60] lg:text-[1.375rem]">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="grid size-10 flex-none place-items-center rounded-full border border-rule transition-[rotate,background-color] duration-300 ease-out-soft group-open:rotate-45 group-open:bg-soft"
            >
              <Plus size={18} strokeWidth={1.75} />
            </span>
          </summary>
          <div className="pr-14 pb-6 text-muted">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
