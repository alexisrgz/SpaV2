import { expect, test } from "@playwright/test";

test.describe("menú móvil", () => {
  test.skip(({ isMobile }) => !isMobile, "solo móvil");

  test("abre como diálogo, atrapa el foco, Esc cierra y devuelve el foco", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Abrir menú" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Navegación principal" });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeFocused();

    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => Boolean(document.activeElement?.closest("dialog[open]")));
      // El foco puede salir a la UI del navegador, pero nunca a la página de fondo.
      const onBody = await page.evaluate(() => document.activeElement === document.body);
      expect(inside || onBody).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("bloquea el scroll y cierra al navegar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú" }).click();
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");
    await page.getByRole("dialog").getByRole("link", { name: "Servicios", exact: true }).click();
    await expect(page).toHaveURL(/\/servicios$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

test.describe("galería", () => {
  test("filtros y lightbox con teclado", async ({ page }) => {
    await page.goto("/galeria");
    const thumbs = page.locator("main ul button");
    await expect(thumbs).toHaveCount(12);

    await page.getByRole("button", { name: "Espacio", exact: true }).click();
    await expect(thumbs).toHaveCount(4);
    await page.getByRole("button", { name: "Todo", exact: true }).click();

    await thumbs.first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("1 / 12")).toBeVisible();
    await expect(page.getByRole("button", { name: "Cerrar galería" })).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("2 / 12")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(dialog.getByText("1 / 12")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(thumbs.first()).toBeFocused();
  });
});

test.describe("acordeón y carrusel", () => {
  test("FAQ abre y cierra con teclado", async ({ page }) => {
    await page.goto("/");
    const summary = page.locator("details summary").first();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
  });

  test("dots del carrusel mueven a la tarjeta", async ({ page, isMobile }) => {
    test.skip(!isMobile, "en desktop los destacados son grid");
    await page.goto("/");
    const carousel = page.getByRole("region", { name: "Servicios destacados" });
    await carousel.getByRole("button", { name: "Ir a la tarjeta 3" }).click();
    await expect(carousel.getByRole("button", { name: "Ir a la tarjeta 3" })).toHaveAttribute("aria-current", "true");
  });
});

test.describe("horario", () => {
  test("muestra estado abierto/cerrado calculado en el cliente", async ({ page }) => {
    await page.goto("/contacto");
    const main = page.locator("main");
    await expect(main.getByText(/Abierto ahora|Cierra pronto|Cerrado/).first()).toBeVisible();
    await expect(main.getByText("Hoy", { exact: true })).toBeVisible();
  });
});
