import { expect, test, type Page } from "@playwright/test";

// Skip the once-per-session boot screen so tests interact with the page immediately.
async function open(page: Page, path: string) {
  await page.addInitScript(() => sessionStorage.setItem("booted", "1"));
  await page.goto(path);
}

test("redirects / to a supported locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(pt-BR|en)$/);
});

test("renders every section in both locales", async ({ page }) => {
  for (const [path, lang, heading] of [
    ["/en", "en", "Selected work"],
    ["/pt-BR", "pt-BR", "Projetos selecionados"],
  ] as const) {
    await open(page, path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: heading })).toBeAttached();
    for (const id of ["home", "work", "profile", "experience", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  }
});

test("switches language from the side nav", async ({ page }) => {
  await open(page, "/en");
  await page.getByRole("link", { name: "Switch to Português" }).click();
  await expect(page).toHaveURL(/\/pt-BR$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

test("has no horizontal overflow", async ({ page }) => {
  await open(page, "/en");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("contact form shows validation errors", async ({ page }) => {
  await open(page, "/en");
  const form = page.locator("#contact form");
  await form.getByLabel("name").fill("A");
  await form.getByLabel("email").fill("not-an-email");
  await form.getByLabel("message").fill("short");
  await form.getByRole("button", { name: /send_message/ }).click();
  await expect(form.getByText("Please enter a valid email.")).toBeVisible();
  await expect(form.getByLabel("email")).toHaveAttribute("aria-invalid", "true");
});

test("terminal opens with the backtick key and runs commands", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcut is desktop-only");
  await open(page, "/en");
  await page.keyboard.press("`");
  const input = page.getByLabel("Terminal command");
  await expect(input).toBeFocused();
  await input.fill("goto contact");
  await input.press("Enter");
  await input.fill("help");
  await input.press("Enter");
  await expect(page.getByRole("log")).toContainText("available commands");
});

test("serves SEO files", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/pt-BR");
  const og = await request.get("/en/opengraph-image");
  expect(og.headers()["content-type"]).toContain("image/png");
});
