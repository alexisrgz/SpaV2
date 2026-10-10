import {
  Clock,
  Droplets,
  Hand,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sprout,
  Sun,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/data/types";

const ICONS: Record<IconName, LucideIcon> = {
  leaf: Leaf,
  hand: Hand,
  clock: Clock,
  droplets: Droplets,
  sprout: Sprout,
  heart: HeartHandshake,
  sun: Sun,
  shield: ShieldCheck,
};

/** Íconos de contenido referenciados por nombre desde `src/data`. */
export function ContentIcon({ name, ...props }: LucideProps & { name: IconName }) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" strokeWidth={1.6} {...props} />;
}
