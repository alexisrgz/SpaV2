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

test.describe("chip de horario del hero (hora simulada, America/Mazatlan = UTC−7)", () => {
  const cases = [
    {
      name: "abierto",
      // Miércoles 14 oct 2026, 12:00 en Mazatlán
      time: "2026-10-14T19:00:00Z",
      chip: "Abierto ahora · hasta 19:00",
      card: /Abierto ahora/,
      open: "true",
    },
    {
      name: "cerrado antes de abrir",
      // Miércoles 14 oct 2026, 7:30 en Mazatlán
      time: "2026-10-14T14:30:00Z",
      chip: "Abre hoy a las 9:00",
      card: /Cerrado/,
      open: "false",
    },
    {
      name: "cerrado de noche",
      // Miércoles 14 oct 2026, 21:00 en Mazatlán
      time: "2026-10-15T04:00:00Z",
      chip: "Abre mañana a las 9:00",
      card: /Cerrado/,
      open: "false",
    },
  ] as const;

  for (const c of cases) {
    test(`${c.name}: chip y tarjeta del CTA final coinciden`, async ({ page }) => {
      await page.clock.setFixedTime(new Date(c.time));
      await page.goto("/");
      const chip = page.locator("[data-today-chip]");
      await expect(chip).toHaveText(c.chip);
      await expect(chip).toHaveAttribute("data-open", c.open);
      const card = page.locator('section[aria-labelledby="cta-final-title"]');
      await expect(card.getByText(c.card)).toBeVisible();
      if (c.open === "false") await expect(chip).not.toContainText("Abierto");
    });
  }
});

test.describe("horario", () => {
  test("muestra estado abierto/cerrado calculado en el cliente", async ({ page }) => {
    await page.goto("/contacto");
    const main = page.locator("main");
    await expect(main.getByText(/Abierto ahora|Cierra pronto|Cerrado/).first()).toBeVisible();
    await expect(main.getByText("Hoy", { exact: true })).toBeVisible();
  });
});
