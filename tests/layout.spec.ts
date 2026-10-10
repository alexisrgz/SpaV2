import { expect, test, type Page } from "@playwright/test";
import { WIDTHS, routes } from "./routes";

async function pageOverflow(page: Page): Promise<number> {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

/** Textos visibles con tamaño de fuente menor a 12 px. */
async function tinyText(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const out: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent?.trim();
      const el = node.parentElement;
      if (!text || !el) continue;
      if (el.closest("[aria-hidden='true'], script, style, .sr-only, dialog:not([open])")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (size < 12) out.push(`${size}px "${text.slice(0, 40)}"`);
    }
    return out;
  });
}

/** Elementos interactivos visibles con área táctil menor a 48 px de alto o ancho. */
async function smallTargets(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const out: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("a[href], button, summary, label[for]")) {
      if (el.closest("[inert], dialog:not([open]), .sr-only")) continue;
      if (el.matches("a[href='#contenido']")) continue; // skip link: fuera de pantalla hasta recibir foco
      // Enlace estirado: su ::after cubre toda la tarjeta, esa es el área táctil real.
      if (getComputedStyle(el, "::after").position === "absolute") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (getComputedStyle(el).visibility === "hidden") continue;
      if (r.height < 47.5 || r.width < 47.5) {
        out.push(`${el.tagName.toLowerCase()} ${Math.round(r.width)}×${Math.round(r.height)} "${(el.textContent ?? el.getAttribute("aria-label") ?? "").trim().slice(0, 30)}"`);
      }
    }
    return out;
  });
}

test.describe("layout responsivo", () => {
  test.skip(({ isMobile }) => isMobile, "se recorre una vez con todos los anchos");

  for (const route of routes) {
    test(`${route}: sin scroll horizontal, sin texto < 12px, áreas táctiles ≥ 48px`, async ({ page }) => {
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        expect(await pageOverflow(page), `overflow a ${width}px`).toBeLessThanOrEqual(0);
        expect(await tinyText(page), `texto pequeño a ${width}px`).toEqual([]);
        expect(await smallTargets(page), `áreas táctiles a ${width}px`).toEqual([]);
      }
    });
  }
});

test.describe("hero y barra inferior móvil", () => {
  for (const [width, height] of [
    [390, 664],
    [360, 640],
    [360, 600],
    [320, 568],
  ] as const) {
    test(`el CTA principal se ve completo sin scroll en ${width}×${height}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height });
      await page.goto("/");
      const cta = page.locator("#hero-title ~ div a[data-booking]").first();
      await expect(cta).toBeInViewport({ ratio: 1 });
      const box = await cta.boundingBox();
      expect(box && box.y + box.height).toBeLessThanOrEqual(height);
      // El chip de horario sigue sobre la imagen y no tapa el título.
      const chip = await page.locator("[data-today-chip]").boundingBox();
      const title = await page.locator("#hero-title").boundingBox();
      expect(chip && title && chip.y + chip.height).toBeLessThanOrEqual(title?.y ?? 0);
    });
  }

  test("la barra aparece tras el hero y se oculta en el footer", async ({ page, isMobile }) => {
    test.skip(!isMobile, "solo < 768px");
    await page.goto("/");
    const bar = page.locator("[data-booking-bar]");
    await expect(bar).not.toHaveAttribute("data-visible", "true");
    await page.mouse.wheel(0, 700);
    await expect(bar).toHaveAttribute("data-visible", "true");
    await expect(bar.getByRole("link", { name: /Reservar/ })).toBeVisible();
    await expect(bar.getByRole("link", { name: "Llamar a Savia Spa" })).toHaveAttribute("href", "tel:+526690000000");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 5000);
    await expect(bar).not.toHaveAttribute("data-visible", "true");
  });

  test("la barra no existe en desktop", async ({ page, isMobile }) => {
    test.skip(isMobile, "solo desktop");
    await page.goto("/");
    await page.mouse.wheel(0, 1500);
    await expect(page.locator("[data-booking-bar]")).toBeHidden();
  });
});
