"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/format";

export type FilterOption = { id: string; label: string };
export type FilterItem = { id: string; category: string; node: ReactNode };

type FilterListProps = {
  /** Etiqueta accesible del grupo de filtros. */
  label: string;
  allLabel: string;
  options: readonly FilterOption[];
  items: readonly FilterItem[];
  emptyLabel?: string;
  listClassName?: string;
  itemClassName?: string;
  /** Contador para lectores de pantalla; "{n}" se reemplaza por el número de resultados. */
  countTemplate: string;
};

/**
 * Chips de filtro (botones con aria-pressed) + lista. Los ítems llegan ya
 * renderizados desde el servidor; aquí solo se decide cuáles mostrar.
 */
export function FilterList({
  label,
  allLabel,
  options,
  items,
  emptyLabel,
  listClassName,
  itemClassName,
  countTemplate,
}: FilterListProps) {
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? items : items.filter((item) => item.category === active);
  const chips: FilterOption[] = [{ id: "all", label: allLabel }, ...options];

  return (
    <div>
      <div role="group" aria-label={label} className="rail -mx-(--gutter) gap-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="filter-chip"
            aria-pressed={active === chip.id}
            onClick={() => setActive(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {countTemplate.replace("{n}", String(visible.length))}
      </p>

      {visible.length > 0 ? (
        <ul className={cn("mt-10", listClassName)}>
          {visible.map((item) => (
            <li key={item.id} className={itemClassName}>
              {item.node}
            </li>
          ))}
        </ul>
      ) : (
        emptyLabel && <p className="mt-10 text-muted">{emptyLabel}</p>
      )}
    </div>
  );
}
