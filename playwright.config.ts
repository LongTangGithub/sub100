import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/speed-lab",
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm --filter www start",
    url: "http://localhost:3000/speed-lab",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
