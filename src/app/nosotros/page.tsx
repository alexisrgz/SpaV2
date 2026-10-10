import type { CSSProperties } from "react";
import { aboutPage, home } from "@/data/content";
import { team } from "@/data/team";
import { pageMetadata } from "@/lib/metadata";
import { plainText } from "@/lib/format";
import { ContentIcon } from "@/components/ui/content-icon";
import { Emphasis } from "@/components/ui/emphasis";
import { Photo } from "@/components/ui/photo";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = pageMetadata({ ...aboutPage.meta, path: "/nosotros" });

export default function AboutPage() {
  const copy = aboutPage;

  return (
    <>
      <PageHeader title={copy.title} intro={copy.intro} />

      {/* Historia */}
      <section aria-label={plainText(copy.title)} className="tone-canvas pb-18 lg:pb-30">
        <div className="container-site grid gap-10 md:grid-cols-12 md:items-center lg:gap-16">
          <Photo
            id="about"
            shape="leaf"
            ratio="4/5"
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 48vw, 92vw"
            className="shadow-lift md:col-span-6"
          />
          <div className="grid gap-6 text-lead md:col-span-6 lg:col-span-5 lg:col-start-8" data-reveal>
            {copy.story.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "font-display text-[1.5rem] leading-[1.4] lg:text-[1.875rem]" : "text-muted"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section aria-labelledby="valores-title" className="tone-surface section-y">
        <div className="container-site">
          <h2 id="valores-title" className="text-h2">
            <Emphasis text={copy.valuesTitle} />
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {copy.values.map((value, i) => (
              <li key={value.title} className="border-t border-rule pt-6" data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <span className="shape-icon grid size-14 place-items-center bg-soft text-inverse">
                  <ContentIcon name={value.icon} size={24} />
                </span>
                <h3 className="mt-6 text-h3">{value.title}</h3>
                <p className="mt-3 text-muted">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipo */}
      <section aria-labelledby="equipo-title" className="tone-canvas section-y">
        <div className="container-site">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <h2 id="equipo-title" className="text-h2 lg:col-span-7">
              <Emphasis text={copy.teamTitle} />
            </h2>
            <p className="text-muted lg:col-span-5">{copy.teamIntro}</p>
          </div>
          <ul className="mt-12 grid gap-14 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:mt-16 lg:gap-8">
            {team.map((member, i) => (
              <li key={member.name} data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <Photo
                  id={member.image}
                  shape="card"
                  ratio="4/5"
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 31vw, (min-width: 640px) 46vw, 92vw"
                  className="shadow-soft"
                />
                <h3 className="mt-6 text-h3">{member.name}</h3>
                <p className="label mt-2 text-support-ink">{member.role}</p>
                <p className="mt-3 text-small font-semibold">{member.certification}</p>
                <p className="mt-2 text-small text-muted">{member.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Espacio */}
      <section aria-labelledby="espacio-title" className="tone-surface section-y">
        <div className="container-site">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <h2 id="espacio-title" className="text-h2 lg:col-span-7">
              <Emphasis text={copy.spaceTitle} />
            </h2>
            <p className="text-muted lg:col-span-5">{copy.spaceIntro}</p>
          </div>
          {/* Columnas proporcionales a cada foto (0.8 : 1.5 : 1.5) = misma altura en desktop */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-[8fr_15fr_15fr] lg:mt-16" data-reveal>
            <Photo
              id="space-1"
              shape="card"
              ratio="auto"
              sizes="(min-width: 1024px) 260px, 46vw"
              className="row-span-2 h-full md:row-span-1 md:aspect-[4/5] md:h-auto"
            />
            <Photo id="space-2" shape="card" sizes="(min-width: 1024px) 470px, 46vw" />
            <Photo id="space-3" shape="card" sizes="(min-width: 1024px) 470px, 46vw" />
          </div>
        </div>
      </section>

      <FinalCta copy={home.finalCta} />
    </>
  );
}
