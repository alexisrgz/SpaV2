import { site } from "@/config/site";
import { home } from "@/data/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${site.name} · ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    title: home.hero.title,
    kicker: `${site.address.area}, ${site.address.city} · ${site.tagline}`,
  });
}
