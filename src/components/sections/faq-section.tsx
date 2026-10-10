import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionCopy } from "@/data/content";
import type { Faq } from "@/data/types";
import { ui } from "@/data/ui";
import { getWhatsAppContactHref } from "@/lib/whatsapp";
import { Accordion } from "@/components/ui/accordion";
import { Emphasis } from "@/components/ui/emphasis";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/format";

type FaqSectionProps = {
  copy: SectionCopy;
  items: readonly Faq[];
  id?: string;
  tone?: "tone-canvas" | "tone-surface";
};

/** Preguntas frecuentes: título fijo a la izquierda en desktop, acordeón a la derecha. */
export function FaqSection({ copy, items, id = "faq-title", tone = "tone-canvas" }: FaqSectionProps) {
  return (
    <section aria-labelledby={id} className={cn(tone, "section-y")}>
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-5 lg:self-start">
          <h2 id={id} className="text-h2">
            <Emphasis text={copy.title} />
          </h2>
          {copy.intro && <p className="mt-5 text-muted">{copy.intro}</p>}
          <div className="mt-4 flex flex-wrap gap-x-6">
            <a href={getWhatsAppContactHref()} target="_blank" rel="noopener noreferrer" className="link-arrow">
              <WhatsAppIcon size={18} />
              {ui.writeUs}
              <span className="sr-only"> {ui.newTab}</span>
            </a>
            {copy.link && (
              <Link href={copy.link.href} className="link-arrow">
                {copy.link.label}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
        <Accordion items={items} className="lg:col-span-7" />
      </div>
    </section>
  );
}
