import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionCopy } from "@/data/content";
import { cn } from "@/lib/format";
import { Emphasis } from "./emphasis";

type SectionHeaderProps = {
  copy: SectionCopy;
  /** id del <h2>, para `aria-labelledby` de la sección. */
  id: string;
  className?: string;
  /** "split" compone título e intro en dos columnas en desktop (sin zonas muertas). */
  layout?: "split" | "stack";
};

export function SectionHeader({ copy, id, className, layout = "split" }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "grid gap-5",
        layout === "split" && "lg:grid-cols-12 lg:items-end lg:gap-10",
        className,
      )}
    >
      <h2 id={id} className={cn("text-h2", layout === "split" && "lg:col-span-7")}>
        <Emphasis text={copy.title} />
      </h2>
      {(copy.intro || copy.link) && (
        <div className={cn("flex flex-col gap-2", layout === "split" && "lg:col-span-5 lg:pb-1.5")}>
          {copy.intro && <p className="text-muted">{copy.intro}</p>}
          {copy.link && (
            <Link href={copy.link.href} className="link-arrow self-start">
              {copy.link.label}
              <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
