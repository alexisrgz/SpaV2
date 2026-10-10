import type { Thing, WithContext } from "schema-dts";

/** Inserta datos estructurados escapando "<" (recomendación de Next.js). */
export function JsonLd({ data }: { data: WithContext<Thing> | ReadonlyArray<WithContext<Thing>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
