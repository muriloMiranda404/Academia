/**
 * Captura screenshots do site nas resoluções de referência.
 *
 * Uso (com o site rodando):
 *   node scripts/screenshots.mjs [url] [pasta-de-saida] [larguras] [modo]
 *   node scripts/screenshots.mjs http://localhost:3100 screenshots 375,1440 secoes
 *
 * modo "pagina" (padrão) gera uma imagem da página inteira por largura;
 * modo "secoes" gera uma imagem por seção.
 */
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:3100";
const outDir = process.argv[3] ?? "screenshots";
const widths = (process.argv[4] ?? "320,375,430,768,1024,1440,1920").split(",").map(Number);
const mode = process.argv[5] ?? "pagina";

const sections = ["inicio", "sobre", "estrutura", "modalidades", "planos", "galeria", "contato"];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 820 : 900 } });
  await page.goto(url, { waitUntil: "networkidle" });

  // percorre a página para disparar as animações de entrada e o carregamento preguiçoso
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2600);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${width}px: altura ${height}px, rolagem horizontal ${overflow > 0 ? `${overflow}px (ERRO)` : "nenhuma"}`);

  if (mode === "secoes") {
    // cabeçalho fixo e botão flutuante escondidos para não cobrir o topo de cada seção
    const style = "body > header, body a[aria-label^='Falar com'] { visibility: hidden !important; }";
    for (const id of sections) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await section.screenshot({ path: join(outDir, `${width}-${id}.png`), style: id === "inicio" ? undefined : style });
    }
    await page.locator("body > footer").screenshot({ path: join(outDir, `${width}-rodape.png`), style });
  } else {
    await page.screenshot({ path: join(outDir, `${width}.png`), fullPage: true });
  }
  await page.close();
}

await browser.close();
