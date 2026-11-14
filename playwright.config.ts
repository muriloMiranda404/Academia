import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3100);

/**
 * Testes de ponta a ponta contra o build de produção.
 * Rode `npm run build` antes de `npm run test:e2e`.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // a otimização de imagens (AVIF) é pesada na primeira visita; poucos workers evitam timeouts
  workers: 3,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "celular", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npx next start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
