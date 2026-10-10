import { SaviaMark } from "@/components/ui/icons";

/**
 * Cinta lenta con los nombres de servicios. Es decorativa (aria-hidden): los
 * mismos servicios están enlazados en la sección siguiente. Se pausa con hover
 * y se detiene con prefers-reduced-motion.
 */
export function ServiceMarquee({ items }: { items: readonly string[] }) {
  const sequence = (
    <ul className="flex flex-none items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-[1.75rem] italic [font-variation-settings:'SOFT'_100] lg:px-9 lg:text-[2.5rem]">
            {item}
          </span>
          <SaviaMark size={22} className="opacity-50" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className="marquee tone-inverse overflow-hidden py-5 lg:py-7">
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: `${items.length * 9}s` }}>
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
