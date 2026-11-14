import { expect, test, type Page } from "@playwright/test";

const WHATSAPP = "https://wa.me/5527997171441";
const sections = ["inicio", "sobre", "estrutura", "modalidades", "planos", "galeria", "contato"];

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("título, descrição e prévia fora dos buscadores", async ({ page }) => {
  await expect(page).toHaveTitle(/Academia Suprema/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const response = await page.request.get("/");
  expect(response.headers()["x-robots-tag"]).toContain("noindex");
});

test("hero mostra o título da proposta e os dois botões", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Supere\s*seus limites\./i);
  await expect(page.getByRole("link", { name: "Conhecer a academia" })).toHaveAttribute("href", "#sobre");
  await expect(page.getByRole("link", { name: "Entrar em contato" })).toHaveAttribute("href", "#contato");
});

test("todas as seções do menu existem na página", async ({ page }) => {
  for (const id of sections) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
});

test("menu do desktop leva às seções", async ({ page }) => {
  test.skip(isMobile(page), "menu de desktop");
  const nav = page.getByRole("banner").getByRole("navigation", { name: "Seções" });
  await nav.getByRole("link", { name: "Planos" }).click();
  await expect(page).toHaveURL(/#planos$/);
  await expect(page.locator("#planos")).toBeInViewport();
  await expect(nav.getByRole("link", { name: "Planos" })).toHaveAttribute("aria-current", "location");
});

test("cabeçalho encolhe ao rolar", async ({ page }) => {
  const bar = page.getByRole("banner").locator("> div");
  const before = (await bar.boundingBox())!.height;
  await page.mouse.wheel(0, 900);
  await expect.poll(async () => (await bar.boundingBox())!.height).toBeLessThan(before);
});

test("menu do celular abre, navega e fecha", async ({ page }) => {
  test.skip(!isMobile(page), "menu do celular");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Galeria" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#galeria$/);

  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
});

test("links de WhatsApp usam o número do Instagram oficial", async ({ page }) => {
  const hrefs = await page.locator(`a[href^="https://wa.me/"]`).evaluateAll((links) => links.map((a) => a.getAttribute("href")));
  expect(hrefs.length).toBeGreaterThanOrEqual(5);
  for (const href of hrefs) expect(href).toContain(WHATSAPP);
  await expect(page.locator('a[href="https://www.instagram.com/suprema_academia/"]').first()).toBeAttached();
});

test("estrutura abre a foto ampliada e navega pelo teclado", async ({ page }) => {
  await page.locator("#estrutura").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Ampliar foto: Salão de treino" }).click();
  const dialog = page.getByRole("dialog", { name: "Fotos da estrutura" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("1 de 6");
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("2 de 6");
  await dialog.getByRole("button", { name: "Foto anterior" }).click();
  await expect(dialog).toContainText("1 de 6");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("galeria rola pelos botões e abre ampliada", async ({ page }) => {
  await page.locator("#galeria").scrollIntoViewIfNeeded();
  const track = page.getByRole("list", { name: "Fotos de treino" });
  if (!isMobile(page)) {
    const next = page.getByRole("button", { name: "Próximas fotos" });
    await next.click();
    await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  }
  await page.getByRole("button", { name: "Ampliar foto: Antes da puxada" }).click();
  const dialog = page.getByRole("dialog", { name: "Fotos de treino" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Fechar" }).click();
  await expect(dialog).toBeHidden();
});

test("planos não mostram preços inventados", async ({ page }) => {
  const plans = page.locator("#planos");
  await expect(plans).not.toContainText("R$");
  await expect(plans.getByText("Valores sob consulta").first()).toBeVisible();
});

test("contato: horários, endereço e mapa sob demanda", async ({ page }) => {
  const contact = page.locator("#contato");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByRole("table", { name: "Horário de funcionamento" })).toBeVisible();
  await expect(contact.locator('tr[aria-current="date"]')).toHaveCount(1);
  await expect(contact).toContainText("Av. Tupinambás, 230");
  await expect(contact.locator("iframe")).toHaveCount(0);
  await contact.getByRole("button", { name: "Carregar mapa" }).click();
  await expect(contact.locator("iframe")).toHaveAttribute("src", /maps\.google\.com/);
});

test("dados de diretório aparecem marcados como a confirmar", async ({ page }) => {
  await expect(page.getByText("a confirmar").first()).toBeVisible();
  await expect(page.locator("footer")).toContainText("Prévia conceitual desenvolvida pela KodexBase");
});

test("sem rolagem horizontal e todas as imagens com texto alternativo", async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  const missingAlt = await page.locator("img:not([alt]), img[alt='']").count();
  expect(missingAlt).toBe(0);
});

test("botão flutuante do WhatsApp aparece depois do hero", async ({ page }) => {
  const floating = page.getByRole("link", { name: "Falar com a Academia Suprema no WhatsApp" });
  await expect(floating).toHaveCount(0);
  await page.locator("#estrutura").scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
});
