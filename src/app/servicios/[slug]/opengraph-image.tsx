import { site } from "@/config/site";
import { getService, services } from "@/data/services";
import { formatPrice } from "@/lib/format";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `Servicio de ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  const minutes = service?.variants.map((v) => v.minutes).join(" / ");
  const price = service ? formatPrice(Math.min(...service.variants.map((v) => v.price))) : "";
  return renderOgImage({
    title: service ? `*${service.name}*` : site.name,
    kicker: service ? `${minutes} min · desde ${price} · ${site.address.city}` : site.address.city,
  });
}
