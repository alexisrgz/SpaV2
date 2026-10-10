import { test } from "@playwright/test";
import { WIDTHS, routes } from "./routes";

/**
 * Capturas de QA de todas las páginas en 360/390/768/1280/1440 → /screenshots.
 * Corre con `npm run test:screens` (solo en el proyecto desktop para no duplicar).
 */
test.describe("@screens capturas", () => {
  test.skip(({ isMobile }) => isMobile, "una sola pasada");
  test.use({ reducedMotion: "reduce" });

  for (const route of routes) {
    test(`@screens ${route}`, async ({ page }) => {
      test.setTimeout(120_000);
      const name = route === "/" ? "inicio" : route.slice(1).replace(/\//g, "_");
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
        await page.goto(route, { waitUntil: "networkidle" });
        await page.screenshot({ path: `screenshots/${name}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `screenshots/${name}-${width}-viewport.png` });
      }
    });
  }
});
