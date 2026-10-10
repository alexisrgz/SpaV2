"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { galleryPage } from "@/data/content";
import type { GalleryCategory } from "@/data/types";
import { PhotoFrame, type PhotoData } from "@/components/ui/photo-frame";

export type GalleryEntry = { photo: PhotoData; category: GalleryCategory; caption: string };

type GalleryGridProps = {
  items: readonly GalleryEntry[];
  categories: ReadonlyArray<{ id: GalleryCategory; label: string }>;
  copy: typeof galleryPage;
};

function ratioValue(ratio: string): number {
  const [w, h] = ratio.split("/").map(Number);
  return w / h;
}

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Mosaico filtrable + lightbox accesible (swipe nativo, flechas, Esc, contador). */
export function GalleryGrid({ items, categories, copy }: GalleryGridProps) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);

  // Cierra el lightbox si la ruta se oculta (<Activity>) con el diálogo abierto.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => dialog?.close();
  }, []);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
    const track = trackRef.current;
    if (track) track.scrollTo({ left: i * track.clientWidth, behavior: "instant" });
  };

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(visible.length - 1, i));
    track.scrollTo({ left: next * track.clientWidth, behavior: reducedMotion() ? "instant" : "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  const chips = [{ id: "all" as const, label: copy.allLabel }, ...categories];

  return (
    <>
      <div role="group" aria-label={copy.filterLabel} className="rail -mx-(--gutter) gap-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="filter-chip"
            aria-pressed={filter === chip.id}
            onClick={() => setFilter(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {copy.countTemplate.replace("{n}", String(visible.length))}
      </p>

      <ul className="mt-10 columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4">
        {visible.map((item, i) => (
          <li key={item.photo.key} className="mb-3 break-inside-avoid sm:mb-5">
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full rounded-card text-left"
              aria-label={`${item.caption}. Ver foto ${i + 1} de ${visible.length}`}
              aria-haspopup="dialog"
            >
              <PhotoFrame
                photo={item.photo}
                shape="card"
                sizes="(min-width: 1024px) 290px, (min-width: 768px) 31vw, 46vw"
                mediaClassName="zoom-media"
                alt=""
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={copy.title}
        onKeyDown={onKeyDown}
        className="sheet tone-inverse-deep"
      >
        <div className="flex h-full flex-col">
          <div className="container-site flex h-(--header-h) flex-none items-center justify-between">
            <p className="label tabular text-muted" aria-live="polite">
              {index + 1} / {visible.length}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn btn-outline btn-icon border-rule"
              aria-label={copy.lightbox.close}
              autoFocus
            >
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
          >
            {visible.map((item, i) => (
              <figure
                key={item.photo.key}
                className="m-0 flex w-full flex-none snap-center flex-col items-center justify-center gap-4 px-5 pb-6"
                aria-hidden={i !== index}
              >
                <PhotoFrame
                  photo={item.photo}
                  shape="card"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="max-w-full"
                  style={{ width: `min(100%, calc(68dvh * ${ratioValue(item.photo.ratio)}))` }}
                />
                <figcaption className="max-w-[48ch] text-center text-muted">{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="container-site hidden flex-none justify-center gap-3 pb-8 md:flex">
            <button
              type="button"
              className="btn btn-outline btn-icon border-rule"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label={copy.lightbox.previous}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-outline btn-icon border-rule"
              onClick={() => go(index + 1)}
              disabled={index === visible.length - 1}
              aria-label={copy.lightbox.next}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
