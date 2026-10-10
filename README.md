# Savia Spa · sitio informativo (Fase 1)

Sitio multipágina de **Savia Spa**, un spa boutique ficticio en Mazatlán, Sinaloa. Es una muestra
comercial: el diseño, el código y el contenido están pensados para venderse como producto de agencia
y para reutilizarse como base de otras landings (white-label).

- **Stack:** Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript estricto ·
  Tailwind CSS v4 · next/font (Fraunces + Manrope) · next/image · lucide-react.
- **Pruebas:** Playwright + @axe-core/playwright.
- **Todo es estático:** las 12 páginas (incluidos los 6 detalles de servicio) se prerenderizan en el build.
- **Reservas:** Fase 1 abre WhatsApp con un mensaje prellenado. Fase 2 (módulo interno) se activa con una constante.

> Sitio de demostración: marca, personas, dirección, teléfono, reseñas y certificaciones son ficticios.

---

## Cómo correrlo

Requisitos: Node.js ≥ 20.9 y npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm start` | Build de producción y servidor |
| `npm run typecheck` | Genera tipos de rutas y corre `tsc --noEmit` |
| `npm run lint` | ESLint sin warnings permitidos |
| `npm run check` | typecheck + lint + build (lo que se corre al cerrar cada fase) |
| `npm run test:e2e` | Playwright: rutas, SEO, reservas, a11y (axe), layout, menú, galería |
| `npm run test:screens` | Capturas de todas las páginas en 360/390/768/1280/1440 → `screenshots/` |

Las pruebas corren contra el build de producción: ejecuta `npm run build` antes. Playwright levanta
`next start` en el puerto 3100 (o reutiliza uno abierto). Para probar un deploy: `BASE_URL=https://… npm run test:e2e`.

Primera vez con Playwright: `npx playwright install chromium`.

### Deploy en Vercel

Importa el repo en Vercel sin configuración extra. Define `NEXT_PUBLIC_SITE_URL` con el dominio final
(p. ej. `https://saviaspa.mx`) para que canonical, sitemap, Open Graph y JSON-LD usen URLs absolutas correctas.
Si no la defines, se usa `VERCEL_PROJECT_PRODUCTION_URL` automáticamente.

---

## Dónde vive cada cosa

```
src/
  app/                     rutas, layout, metadata, sitemap, robots, imágenes OG, 404
  components/
    layout/                header, menú móvil, footer, barra inferior móvil, reveal
    sections/              secciones de página (reciben datos por props)
    ui/                    piezas reutilizables (Photo, BookingLink, Carousel, Accordion…)
  config/site.ts           marca, contacto, dirección, horarios, mensajes, BOOKING_MODE
  data/                    contenido: servicios, experiencias, testimonios, equipo, FAQs,
                           galería, mapa de imágenes, textos de página (content.ts) y de UI (ui.ts)
  lib/                     booking, whatsapp, horarios, formato, mapas, metadata, schema, fotos
  assets/fonts/            Fraunces estática solo para las imágenes Open Graph
public/images/             fotografías (ver PHOTOS.md)
tests/                     Playwright
```

Regla de oro: **ningún componente lleva textos, precios ni datos de marca**. Todo llega desde
`src/config`, `src/data` o los tokens CSS.

---

## Cambiar marca, contenido y fotos

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, tagline, teléfono, WhatsApp, Instagram, dirección, horarios, menú | `src/config/site.ts` |
| Mensajes prellenados de WhatsApp | `site.booking` en `src/config/site.ts` |
| Servicios, precios, duraciones, qué incluye, FAQs por servicio | `src/data/services.ts` |
| Experiencias / paquetes | `src/data/packages.ts` |
| Testimonios, equipo, FAQs generales, galería | `src/data/testimonials.ts`, `team.ts`, `faqs.ts`, `gallery.ts` |
| Títulos, intros y textos de cada página | `src/data/content.ts` |
| Etiquetas de interfaz (botones, aria-labels) | `src/data/ui.ts` |
| Colores, tipografía, radios, sombras, movimiento | `src/app/globals.css` (paleta en `:root`, roles en `@theme`) |
| Fuentes | `src/app/layout.tsx` |

Los títulos aceptan `*asteriscos*` para la palabra en cursiva: `"Regálate un momento para *volver a ti*"`.

### Fotos

Copia los `.jpg` con los nombres de `PHOTOS.md` en `public/images/` y vuelve a compilar. `<Photo>`
comprueba en build si el archivo existe: si existe lo sirve con `next/image` (AVIF/WebP, `sizes` reales,
`priority` en el hero y en el detalle de servicio); si no, dibuja un placeholder de marca con la misma
proporción (degradado + rama botánica generada por código). En `npm run dev` el placeholder muestra el
nombre de archivo y la proporción esperada. El alt de cada foto está en `src/data/images.ts`.

---

## Clonar la base para otro negocio (white-label)

1. **Config:** edita `src/config/site.ts` (nombre, contacto, horarios, nav, mensajes).
2. **Paleta:** cambia solo los valores `--brand-*` en `:root` de `globals.css`. Los componentes usan
   roles semánticos (`canvas`, `surface`, `inverse`, `support`, `soft`, `ink`, `book`…), no colores de Savia.
   Verifica el contraste de los pares de la tabla de abajo.
3. **Tipografía:** sustituye `Fraunces`/`Manrope` en `layout.tsx`; las variables `--font-display` y
   `--font-sans` ya están conectadas.
4. **Contenido:** reemplaza `src/data/*`. Si un consultorio no tiene "experiencias", quita la ruta y su
   entrada en `site.nav`; las secciones son independientes.
5. **Imágenes:** ajusta claves, proporciones y alts en `src/data/images.ts` y genera un `PHOTOS.md` nuevo.
6. **Schema:** en `src/lib/schema.ts` cambia `DaySpa` por el tipo adecuado (p. ej. `MedicalClinic`).
7. Corre `npm run check && npm run test:e2e`.

---

## Activar la Fase 2 (reservas internas)

Toda acción de reserva del sitio pasa por **una sola función**:

```ts
// src/lib/booking.ts
getBookingHref({ service?: string, variant?: string }): string
```

controlada por `BOOKING_MODE` en `src/config/site.ts`.

1. Crea la ruta `src/app/reservar/page.tsx`. Recibe `?servicio=…&variante=…`
   (p. ej. `?servicio=Masaje+relajante&variante=90+min`).
2. Cambia `BOOKING_MODE` a `"internal"`.

Con eso, todos los botones Reservar (header, hero, tarjetas, selector de duración, barra inferior,
experiencias, contacto) apuntan a `/reservar` con navegación interna, sin `target="_blank"` y con
ícono de calendario en vez de WhatsApp. Ningún componente arma links de WhatsApp por su cuenta
(los de "Escríbenos" usan `getWhatsAppContactHref` en `src/lib/whatsapp.ts`), y hay una prueba que lo verifica.

---

## Decisiones de diseño

**Concepto: refugio botánico cálido.** Las fotos usan un sistema de dos formas (ver abajo) que
dialoga con las píldoras y los radios de 20–24 px del resto de la UI. En el hero la foto se asienta
con una escala suave al cargar y el texto entra escalonado.

### Sistema de formas de imagen

Dos formas y una regla. Ningún componente escribe `border-radius` de fotos: todo pasa por
la prop `shape` de `<Photo>` / `<PhotoFrame>` y las clases de `globals.css`.

| Forma | `shape` | Clase | Radios |
|---|---|---|---|
| **HOJA** | `"leaf"` | `.shape-leaf` | superior izquierda e inferior derecha = `--radius-leaf-lg`; las otras dos = `--radius-card` |
| **HOJA espejo** | `"leafFlip"` | `.shape-leaf-flip` | superior derecha e inferior izquierda grandes (para alternar en zigzag) |
| **TARJETA** | `"card"` (por defecto) | `.shape-card` | `--radius-card` en las cuatro esquinas |

Tokens (en `@theme` / `:root`):

- `--radius-leaf-lg: clamp(72px, 13vw, 160px)` para imágenes grandes.
- `--radius-leaf-md: clamp(48px, 8vw, 96px)` para medianas (`leafSize="md"` → `.shape-leaf-md`).
- `--radius-card: 20px` en móvil y `24px` desde 768 px.

**Regla de uso:** la HOJA va solo en imágenes grandes (≥ 45% del ancho del contenedor) y como
máximo una visible por pantalla. Todo lo que se repite (tarjetas, carruseles, galería, lightbox,
equipo, paquetes del inicio, mapa) usa TARJETA.

| Dónde | Forma |
|---|---|
| Hero del inicio | HOJA (+ chip "Abierto hoy · horario" sobre el borde inferior izquierdo) |
| "Por qué Savia" | HOJA espejo (con el único parallax del sitio) |
| Detalle de servicio (foto principal 4:5) | HOJA |
| Experiencias (`/experiencias`) | HOJA y HOJA espejo alternadas por fila |
| Nosotros (historia) | HOJA |
| Tarjetas de servicio, "Te puede interesar", teaser de experiencias, galería, lightbox, equipo, espacio | TARJETA |

Las clases de forma aplican `overflow: hidden`, `isolation: isolate` y `transform: translateZ(0)`,
así el zoom en hover (`.zoom-media`, escala 1.05) no se sale de las esquinas en Chrome ni en Safari.
El placeholder sin foto usa la misma forma y proporción. Los ornamentos de línea (menú móvil y
CTA final) y los íconos de valores usan la misma geometría de hoja (`.shape-leaf`, `.shape-icon`).

En `/experiencias` las filas en zigzag van separadas 160 px en desktop, pero al pasar de una fila
a otra pueden asomar brevemente las orillas de dos hojas.

El monograma del logo y el favicon conservan su dibujo (arco con hoja): son marca, no fotografía.

**Terracota = reservar.** `.btn-book` (arcilla) es la única clase que usa el acento y solo la usa
`BookingLink`. Los placeholders de foto usan tonos salvia, bosque, crema y arena, nunca terracota.

**Ritmo de secciones:** marfil → bosque (marquee) → marfil → crema → bosque → marfil → crema → marfil → bosque → footer bosque profundo.

**Decisiones tomadas sin preguntar (lo ambiguo del brief):**

- **Chips del hero:** el brief dice "lun–sáb", pero el horario incluye domingo 10–14 h. El chip dice
  "Abierto los 7 días" para no contradecir los datos.
- **Etiquetas en mayúsculas:** el estilo "eyebrow" (12.5 px, tracking 0.14em) se usa para metadatos
  (categoría · duración, columnas del footer, "Incluye"), no como kicker encima de cada título; los
  títulos se sostienen solos.
- **Padding de la barra inferior:** va en el footer (`.pad-bottom-bar`) y no en `<body>`, para no
  dejar una franja marfil bajo el footer verde. La barra se oculta al acercarse al footer, así que nunca tapa contenido.
- **Barra inferior:** aparece cuando el hero (o el encabezado de página) sube del 35% superior de la
  pantalla, no hasta que desaparece del todo; se siente más natural al hacer scroll.
- **Fraunces:** la normal usa los ejes `opsz` y `SOFT`. La cursiva (solo palabras de énfasis) usa
  `opsz` sin `SOFT` y sin precarga: con `SOFT` el archivo pasa de 82 KB a 149 KB y retrasaba el LCP.
  Para el OG se usan instancias estáticas en `src/assets/fonts`.
- **"Masaje con aromaterapia":** el slug sigue siendo `aromaterapia`, pero el nombre visible explica qué es.
- **Experiencias:** el mensaje de WhatsApp dice "Experiencia Día de spa (4 h)" para distinguirlas de servicios sueltos.
- **Parallax:** solo en la foto de "Por qué Savia" (inicio), con CSS scroll-driven animations
  (`animation-timeline: view()`), solo en desktop y sin `prefers-reduced-motion`. Sin soporte, la foto queda fija.
- **Galería:** el lightbox es un `<dialog>` modal nativo con carril de scroll-snap: el swipe es el
  del navegador, las flechas y el teclado mueven el mismo carril.
- **Menú móvil y lightbox:** `<dialog>` + `showModal()` dan foco atrapado, Esc, retorno de foco e
  `inert` del fondo sin librerías; el scroll se bloquea con `html:has(dialog[open])`.
- **"Abierto ahora":** se calcula en el cliente con `Intl.DateTimeFormat` en `America/Mazatlan` y
  se actualiza cada minuto; en el HTML estático aparece "Consultando horario…" para no congelar la hora del build.
- **Cache Components (Next 16):** las rutas visitadas quedan ocultas con `<Activity>` en vez de
  desmontarse. El menú, el lightbox y la selección de variante se reinician al ocultarse la ruta.

### Tokens y contraste (WCAG AA)

| Texto / fondo | Ratio | Uso |
|---|---|---|
| tinta / marfil | 13.64 | texto base |
| tinta / crema | 12.18 | texto en secciones crema |
| tinta-suave / marfil · crema · musgo | 7.66 · 6.84 · 6.68 | texto secundario |
| salvia-ink / marfil · crema | 5.48 · 4.89 | cursivas de títulos, etiquetas |
| marfil / arcilla | 4.78 | texto del botón Reservar |
| marfil / arcilla-hover | 6.20 | botón Reservar en hover |
| marfil / bosque | 10.95 | texto en secciones verdes |
| musgo / bosque | 9.55 | cursivas en secciones verdes |
| marfil / bosque-deep | 13.14 | footer |

**Ajustes por contraste:** la salvia pura (#7E9279) da 2.97:1 sobre marfil, así que **no se usa para
texto**; para eso existe `salvia-ink` (#56664F). Sobre bosque, el texto secundario es marfil al 80%
(~7.5:1), no salvia (3.68:1). La arcilla queda solo como fondo del botón (texto marfil 4.78:1); como
texto sobre crema daría 4.27:1, así que no se usa como color de texto.

---

## Calidad y QA (estado de esta entrega)

- `npm run check`: typecheck, lint (0 warnings) y build limpios.
- `npm run test:e2e`: **120 pruebas pasan** en móvil (390×844 táctil) y desktop (1440×900):
  - las 12 rutas responden con un solo h1, canonical, descripción y og:image; 404, sitemap, robots y JSON-LD.
  - todo botón Reservar abre `wa.me/526690000000` en pestaña nueva con el mensaje correcto; las
    experiencias incluyen nombre y duración.
  - el selector de duración actualiza precio, CTA, tarjeta sticky (desktop), barra inferior (móvil) y mensaje.
  - **axe sin violaciones serias ni críticas** (WCAG 2.2 AA + best practices) en todas las páginas.
  - sin scroll horizontal, sin texto < 12 px y áreas táctiles ≥ 48 px en 360/390/768/1280/1440.
  - CTA del hero visible sin scroll en 360×640; barra inferior aparece tras el hero, se oculta en el footer y no existe en desktop.
  - menú móvil: diálogo, foco atrapado, Esc, retorno de foco, bloqueo de scroll y cierre al navegar.
  - galería: filtros, lightbox con flechas, contador y Esc.
- **Lighthouse móvil** (4G simulado, sin fotos, servidor local):

  | Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
  |---|---|---|---|---|
  | Inicio | 89–91 | 100 | 100 | 100 |
  | Servicios | 94 | 100 | 100 | 100 |
  | Detalle de servicio | 91 | 100 | 100 | 100 |
  | Experiencias | 91 | 100 | 100 | 100 |
  | Galería | 94 | 100 | 100 | 100 |
  | Nosotros | 91 | 100 | 100 | 100 |
  | Contacto | 92 | 100 | 100 | 100 |

  CLS ≈ 0 y TBT < 100 ms en todas. **Pendiente:** el LCP simulado queda en 3.0–3.6 s, por encima
  del objetivo de 2.5 s (el LCP real en local es ~0.4 s). El simulador cuenta todos los bytes pedidos
  antes del LCP: las fuentes (~220 KB) y el JS de Next/React. La palanca más grande que queda es quitar
  el eje `SOFT` de la Fraunces normal (121 KB → 67 KB). No se aplicó porque el brief lo pide
  explícitamente; es una decisión de marca. Con fotos reales, el LCP del hero pasará a ser la imagen
  (precargada con `priority`, AVIF): vuelve a medir después de agregarlas.
- Capturas de QA: `npm run test:screens` (carpeta `screenshots/`, ignorada por git).
