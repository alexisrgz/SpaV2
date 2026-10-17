import React, { type CSSProperties } from "react";
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
          <div className="grid gap-6 text-lead md:col-span-6 lg:col-span-5 lg:col-start-8" data-reveal suppressHydrationWarning>
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
              <li key={value.title} className="border-t border-rule pt-6" data-reveal suppressHydrationWarning style={{ "--reveal-i": i } as CSSProperties}>
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
              <li key={member.name} data-reveal suppressHydrationWarning style={{ "--reveal-i": i } as CSSProperties}>
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
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-[8fr_15fr_15fr] lg:mt-16" data-reveal suppressHydrationWarning>
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

      {/* Reclutamiento */}
      <section aria-labelledby="unete-title" className="tone-canvas section-y">
        <div className="container-site">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Texto */}
            <div data-reveal suppressHydrationWarning>
              <span className="label text-support-ink">Trabaja con nosotros</span>
              <h2 id="unete-title" className="text-h2 mt-4">
                ¿Quieres formar parte de{" "}
                <em className="font-display not-italic text-support-ink">Savia Spa?</em>
              </h2>
              <p className="mt-5 text-muted">
                Buscamos personas apasionadas por el bienestar, el cuidado y la
                atención genuina. Si compartes nuestra filosofía y quieres crecer en
                un ambiente cálido y profesional, nos encantaría conocerte.
              </p>
              <ul className="mt-8 grid gap-3">
                {[
                  "Ambiente de trabajo armonioso y colaborativo",
                  "Capacitación continua en técnicas de wellness",
                  "Horarios flexibles y prestaciones competitivas",
                  "Equipo pequeño, trato cercano y humano",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-small text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 rounded-full bg-soft text-inverse grid place-items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/526690000000?text=${encodeURIComponent(
                  "Hola, me interesa formar parte del equipo de Savia Spa. ¿Me podrían dar más información?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-10 inline-flex items-center gap-2"
              >
                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escríbenos por WhatsApp
              </a>
            </div>

            {/* Tarjeta decorativa */}
            <div
              data-reveal
              suppressHydrationWarning
              className="rounded-3xl bg-soft p-8 text-inverse lg:p-10"
              style={{ "--reveal-i": 1 } as React.CSSProperties}
            >
              <p className="font-display text-[1.6rem] leading-snug lg:text-[2rem]">
                "Creemos que un equipo feliz crea experiencias inolvidables."
              </p>
              <p className="mt-6 text-small font-semibold opacity-70">— Equipo Savia Spa</p>
              <div className="mt-10 border-t border-white/20 pt-8">
                <p className="text-small font-semibold uppercase tracking-widest opacity-60">
                  Áreas de interés
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Masajes & Terapias", "Faciales & Skincare", "Recepción", "Administración"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/25 px-3 py-1 text-small font-semibold"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCta copy={home.finalCta} />
    </>
  );
}
