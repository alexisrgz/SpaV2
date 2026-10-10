import { expect, test } from "@playwright/test";
import { site } from "../src/config/site";
import { routes } from "./routes";

test.describe("rutas y SEO", () => {
  for (const route of routes) {
    test(`${route} responde y tiene SEO básico`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "es-MX");
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Savia Spa/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route === "/" ? "/?$" : route}$`));
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /opengraph-image/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{60,}/);
    });
  }

  test("la página inexistente devuelve 404", async ({ page }) => {
    const response = await page.goto("/no-existe");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("sitemap y robots", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const route of routes) expect(sitemap).toContain(`${route === "/" ? "" : route}</loc>`);
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap:");
  });

  test("JSON-LD de DaySpa en inicio y contacto, Service en detalle", async ({ page }) => {
    for (const [route, type] of [
      ["/", "DaySpa"],
      ["/contacto", "DaySpa"],
      ["/servicios/masaje-relajante", "Service"],
    ] as const) {
      await page.goto(route);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(blocks.join(" ")).toContain(`"@type":"${type}"`);
    }
  });
});

test.describe("navegación", () => {
  test("nav de escritorio navega e indica la página activa", async ({ page, isMobile }) => {
    test.skip(isMobile, "nav horizontal solo en desktop");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navegación principal" });
    for (const item of site.nav.slice(1)) {
      await nav.getByRole("link", { name: item.label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${item.href}$`));
      await expect(nav.getByRole("link", { name: item.label, exact: true })).toHaveAttribute("aria-current", "page");
    }
  });

  test("las tarjetas de servicio llevan al detalle", async ({ page }) => {
    await page.goto("/servicios");
    await page.getByRole("link", { name: "Ritual corporal", exact: true }).click();
    await expect(page).toHaveURL(/\/servicios\/ritual-corporal$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ritual corporal");
  });

  test("filtro de categorías en servicios", async ({ page }) => {
    await page.goto("/servicios");
    await page.getByRole("button", { name: "Faciales" }).click();
    await expect(page.getByRole("button", { name: "Faciales" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("main article")).toHaveCount(2);
    await page.getByRole("button", { name: "Todos" }).click();
    await expect(page.locator("main article")).toHaveCount(6);
  });
});
