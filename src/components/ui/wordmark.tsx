import { site } from "@/config/site";
import { cn } from "@/lib/format";
import { SaviaMark } from "./icons";

/** Logotipo tipográfico: monograma en arco + SAVIA + tagline. */
export function Wordmark({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SaviaMark size={size === "lg" ? 38 : 30} className="flex-none" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display uppercase [font-variation-settings:'SOFT'_100,'opsz'_36]",
            size === "lg" ? "text-[1.9rem] tracking-[0.3em]" : "text-[1.45rem] tracking-[0.28em]",
          )}
        >
          {site.wordmark}
        </span>
        <span className="mt-1 text-[0.75rem] font-semibold tracking-[0.16em] uppercase opacity-80">
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
