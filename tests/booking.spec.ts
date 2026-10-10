import { expect, test, type Page } from "@playwright/test";
import { getBookingHref, getBookingMessage } from "../src/lib/booking";
import { WHATSAPP_PREFIX, routes } from "./routes";

async function bookingLinks(page: Page) {
  return page.locator("a[data-booking]").evaluateAll((links) =>
    links.map((a) => ({
      href: a.getAttribute("href") ?? "",
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel") ?? "",
    })),
  );
}

test.describe("getBookingHref (unidad)", () => {
  test("mensaje general sin servicio", () => {
    expect(getBookingMessage()).toBe(
      "Hola, vi la página de Savia Spa y me gustaría reservar una cita. ¿Qué horarios tienen disponibles?",
    );
  });

  test("mensaje con servicio y duración", () => {
    expect(getBookingMessage({ service: "Masaje relajante", variant: "90 min" })).toBe(
      "Hola, vi la página de Savia Spa y me gustaría reservar: Masaje relajante (90 min). ¿Qué horarios tienen disponibles?",
    );
    const href = getBookingHref({ service: "Masaje relajante", variant: "90 min" });
    expect(href.startsWith(WHATSAPP_PREFIX)).toBe(true);
    expect(decodeURIComponent(href.slice(WHATSAPP_PREFIX.length))).toContain("Masaje relajante (90 min)");
  });
});

test.describe("botones Reservar", () => {
  for (const route of routes) {
    test(`${route}: todo Reservar abre WhatsApp en pestaña nueva`, async ({ page }) => {
      await page.goto(route);
      const links = await bookingLinks(page);
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.href.startsWith(WHATSAPP_PREFIX)).toBe(true);
        expect(decodeURIComponent(link.href.slice(WHATSAPP_PREFIX.length))).toMatch(/^Hola, vi la página de Savia Spa/);
        expect(link.target).toBe("_blank");
        expect(link.rel).toContain("noopener");
      }
    });
  }

  test("ningún enlace de WhatsApp se arma fuera de las funciones de la librería", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      const hrefs = await page.locator('a[href*="wa.me"]').evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
      for (const href of hrefs) expect(href.startsWith(WHATSAPP_PREFIX)).toBe(true);
    }
  });

  test("experiencias reservan con nombre y duración del paquete", async ({ page }) => {
    await page.goto("/experiencias");
    const hrefs = (await bookingLinks(page)).map((l) => decodeURIComponent(l.href));
    expect(hrefs.some((h) => h.includes("Experiencia Día de spa (4 h)"))).toBe(true);
    expect(hrefs.some((h) => h.includes("Experiencia Para dos (90 min c/u)"))).toBe(true);
    expect(hrefs.some((h) => h.includes("Experiencia Ritual de novia"))).toBe(true);
  });
});

test.describe("selector de duración", () => {
  test("actualiza precio, mensaje y barra inferior", async ({ page, isMobile }) => {
    await page.goto("/servicios/masaje-relajante");
    const main = page.locator("main section").first();
    const cta = main.locator("a[data-booking]");

    await expect(cta).toContainText("60 min · $850");
    expect(decodeURIComponent((await cta.getAttribute("href")) ?? "")).toContain("Masaje relajante (60 min)");

    await main.getByText("90 min", { exact: true }).click();
    await expect(cta).toContainText("90 min · $1,150");
    expect(decodeURIComponent((await cta.getAttribute("href")) ?? "")).toContain("Masaje relajante (90 min)");
    await expect(main.locator('input[type="radio"][value="90"]')).toBeChecked();

    if (isMobile) {
      await page.mouse.wheel(0, 1600);
      const bar = page.locator("[data-booking-bar]");
      await expect(bar).toHaveAttribute("data-visible", "true");
      await expect(bar).toContainText("Masaje relajante");
      await expect(bar).toContainText("90 min · $1,150");
      expect(decodeURIComponent((await bar.locator("a[data-booking]").getAttribute("href")) ?? "")).toContain(
        "Masaje relajante (90 min)",
      );
    } else {
      const sticky = page.getByRole("complementary", { name: "Reservar Masaje relajante" });
      await expect(sticky.locator("a[data-booking]")).toContainText("90 min · $1,150");
      await expect(sticky.locator('input[type="radio"][value="90"]')).toBeChecked();
    }
  });

  test("servicio de una sola duración muestra la duración fija", async ({ page }) => {
    await page.goto("/servicios/facial-luminosidad");
    const cta = page.locator("main section").first().locator("a[data-booking]");
    await expect(cta).toContainText("75 min · $1,250");
    expect(decodeURIComponent((await cta.getAttribute("href")) ?? "")).toContain("Facial luminosidad (75 min)");
  });
});
