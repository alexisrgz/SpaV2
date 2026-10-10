import type { home } from "@/data/content";
import { ContentIcon } from "@/components/ui/content-icon";
import { Emphasis } from "@/components/ui/emphasis";
import { Photo } from "@/components/ui/photo";
import type { ImageKey } from "@/data/images";
import type { CSSProperties } from "react";

type WhySaviaProps = { copy: typeof home.why; image: ImageKey };

/** "Por qué Savia": una foto con parallax sutil + cuatro razones concretas. */
export function WhySavia({ copy, image }: WhySaviaProps) {
  return (
    <section aria-labelledby="por-que-title" className="tone-surface section-y overflow-hidden">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <h2 id="por-que-title" className="text-h2">
            <Emphasis text={copy.title} />
          </h2>
          <p className="mt-5 text-lead text-muted">{copy.intro}</p>

          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:mt-12">
            {copy.points.map((point, i) => (
              <li
                key={point.title}
                data-reveal
                style={{ "--reveal-i": i } as CSSProperties}
                className="flex gap-4 border-t border-rule py-6"
              >
                <span className="grid size-12 flex-none place-items-center rounded-full bg-soft text-inverse">
                  <ContentIcon name={point.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-sans text-[1.0625rem] leading-snug font-bold lg:text-[1.125rem]">{point.title}</h3>
                  <p className="mt-1.5 text-small text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <Photo
            id={image}
            shape="arch"
            ratio="auto"
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="aspect-square sm:aspect-[5/4] lg:aspect-[4/5]"
            frameClassName="shadow-lift"
            mediaClassName="parallax-media"
          />
        </div>
      </div>
    </section>
  );
}
