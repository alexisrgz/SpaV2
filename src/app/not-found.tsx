import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFoundPage } from "@/data/content";
import { Emphasis } from "@/components/ui/emphasis";

export default function NotFound() {
  return (
    <section data-hide-booking-bar className="tone-canvas">
      <div className="container-site flex min-h-[70svh] flex-col items-start justify-center gap-6 py-20">
        <h1 className="text-h1 max-w-[14ch]">
          <Emphasis text={notFoundPage.title} />
        </h1>
        <p className="text-lead text-muted">{notFoundPage.text}</p>
        <Link href={notFoundPage.cta.href} className="btn btn-solid">
          {notFoundPage.cta.label}
          <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
        </Link>
      </div>
    </section>
  );
}
