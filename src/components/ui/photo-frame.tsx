import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageKey, ImageSpec, ImageTone } from "@/data/images";
import { cn } from "@/lib/format";
import { Sprig, type SprigMotif } from "./sprig";

/** Datos serializables de una foto (se resuelven en el servidor con `resolvePhoto`). */
export type PhotoData = ImageSpec & {
  key: ImageKey;
  /** `null` cuando el archivo aún no existe en public/images. */
  src: string | null;
};

export type PhotoShape = "arch" | "rounded" | "circle" | "none";

export type PhotoFrameProps = {
  photo: PhotoData;
  /** Atributo `sizes` real según el layout donde vive la foto. */
  sizes: string;
  priority?: boolean;
  shape?: PhotoShape;
  /** Proporción del marco. Por defecto, la de la foto. "auto" = el tamaño lo da `className`. */
  ratio?: string;
  className?: string;
  /** Clases del recorte interior (sombra, animación de apertura…). */
  frameClassName?: string;
  /** Clases de la imagen/placeholder (zoom, parallax…). */
  mediaClassName?: string;
  /** Texto alternativo distinto al del mapa de imágenes (p. ej. decorativa = ""). */
  alt?: string;
  /** Estilos extra del marco exterior (p. ej. ancho calculado). */
  style?: CSSProperties;
};

const SHAPES: Record<PhotoShape, string> = {
  arch: "arch",
  rounded: "rounded-card",
  circle: "rounded-full",
  none: "",
};

/**
 * Marco de foto: reserva la proporción (CLS ≈ 0) y muestra la imagen optimizada
 * o, si no existe todavía, un placeholder de marca. Sin hooks: sirve en servidor y cliente.
 */
export function PhotoFrame({
  photo,
  sizes,
  priority = false,
  shape = "rounded",
  ratio,
  className,
  frameClassName,
  mediaClassName,
  alt,
  style,
}: PhotoFrameProps) {
  const aspect = ratio === "auto" ? undefined : (ratio ?? photo.ratio);
  const altText = alt ?? photo.alt;
  // El marco necesita posicionamiento; respeta absolute/fixed/sticky si vienen en className.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "");

  return (
    <div className={cn("arch-frame", !positioned && "relative", className)} style={{ ...(aspect ? { aspectRatio: aspect } : null), ...style }}>
      <div className={cn("absolute inset-0 isolate overflow-hidden", SHAPES[shape], frameClassName)}>
        {photo.src ? (
          <Image
            src={photo.src}
            alt={altText}
            fill
            sizes={sizes}
            priority={priority}
            quality={priority ? 85 : 75}
            className={cn("hero-media object-cover", mediaClassName)}
          />
        ) : (
          <PhotoPlaceholder photo={photo} alt={altText} className={cn("hero-media", mediaClassName)} />
        )}
      </div>
    </div>
  );
}

type ToneStyle = { base: string; glow: string; ink: string; faint: string };

const TONES: Record<ImageTone, ToneStyle> = {
  salvia: {
    base: "linear-gradient(158deg, #b6c3ae 0%, #8c9f86 46%, #657a60 100%)",
    glow: "rgb(255 243 220 / 0.55)",
    ink: "rgb(246 241 232 / 0.62)",
    faint: "rgb(246 241 232 / 0.22)",
  },
  bosque: {
    base: "linear-gradient(165deg, #4b6a55 0%, #2c4b3c 46%, #1f3a2f 100%)",
    glow: "rgb(236 204 160 / 0.38)",
    ink: "rgb(221 229 216 / 0.5)",
    faint: "rgb(221 229 216 / 0.16)",
  },
  crema: {
    base: "linear-gradient(160deg, #f5eee2 0%, #eadfcb 52%, #dccab0 100%)",
    glow: "rgb(255 255 255 / 0.75)",
    ink: "rgb(86 102 79 / 0.5)",
    faint: "rgb(86 102 79 / 0.16)",
  },
  arena: {
    base: "linear-gradient(160deg, #ecdec8 0%, #dcc5a4 52%, #c7ab85 100%)",
    glow: "rgb(255 248 234 / 0.65)",
    ink: "rgb(92 72 46 / 0.42)",
    faint: "rgb(92 72 46 / 0.14)",
  },
};

const MOTIFS: SprigMotif[] = ["eucalipto", "helecho", "olivo"];

function hash(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

/** Placeholder elegante: degradado de marca, luz cálida y una rama botánica. */
function PhotoPlaceholder({ photo, alt, className }: { photo: PhotoData; alt: string; className?: string }) {
  const tone = TONES[photo.tone];
  const h = hash(photo.key);
  const motif = MOTIFS[h % MOTIFS.length];
  const second = MOTIFS[(h + 1) % MOTIFS.length];
  const flip = h % 2 === 0;
  const tilt = (h % 24) - 12;
  const glowX = flip ? 78 : 22;

  const style: CSSProperties = {
    backgroundImage: `radial-gradient(130% 85% at ${glowX}% 4%, ${tone.glow} 0%, transparent 58%), ${tone.base}`,
  };

  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn("absolute inset-0", className)}
      style={style}
      data-placeholder={photo.file}
    >
      {/* Rama principal: entra por un costado y se corta con el marco. */}
      <Sprig
        motif={motif}
        strokeWidth={1.25}
        className="absolute h-[118%] w-auto max-w-none"
        style={{
          color: tone.ink,
          bottom: "-14%",
          [flip ? "right" : "left"]: "-6%",
          rotate: `${tilt + (flip ? -8 : 8)}deg`,
          scale: flip ? "-1 1" : undefined,
        }}
      />
      <Sprig
        motif={second}
        strokeWidth={1}
        className="absolute h-[64%] w-auto max-w-none"
        style={{
          color: tone.faint,
          top: "-8%",
          [flip ? "left" : "right"]: "4%",
          rotate: `${180 + tilt}deg`,
        }}
      />
      {process.env.NODE_ENV === "development" && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 font-sans text-[12px] font-semibold tracking-wide text-white">
          {photo.file} · {photo.ratio.replace("/", ":")}
        </span>
      )}
    </div>
  );
}
