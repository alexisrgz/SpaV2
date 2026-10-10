import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";
import { Emphasis } from "@/components/ui/emphasis";

type PageHeaderProps = {
  title: string;
  intro?: string;
  breadcrumb?: readonly Crumb[];
  /** Contenido extra bajo el intro (chips, botones…). */
  children?: ReactNode;
  className?: string;
};

/**
 * Encabezado compacto de páginas internas. En desktop el título y el intro se
 * componen en dos columnas para no dejar media pantalla vacía.
 */
export function PageHeader({ title, intro, breadcrumb, children, className }: PageHeaderProps) {
  return (
    <header data-hide-booking-bar className={cn("tone-canvas", className)}>
      <div className="container-site relative pt-4 pb-12 lg:pt-8 lg:pb-20">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <div className={cn("grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10", breadcrumb ? "mt-4 lg:mt-8" : "mt-6 lg:mt-12")}>
          <h1 className="text-h1 lg:col-span-7">
            <Emphasis text={title} />
          </h1>
          {(intro || children) && (
            <div className="flex flex-col gap-6 lg:col-span-5 lg:pb-3">
              {intro && <p className="text-lead text-muted">{intro}</p>}
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
