import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ui } from "@/data/ui";

export type Crumb = { href: string; label: string };

/** El último elemento es la página actual (sin enlace). */
export function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label={ui.breadcrumbLabel}>
      <ol className="flex flex-wrap items-center gap-x-1 text-small text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="py-3 font-semibold text-ink">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="inline-flex min-h-12 items-center underline-offset-4 hover:underline">
                    {item.label}
                  </Link>
                  <ChevronRight size={16} aria-hidden="true" className="opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
