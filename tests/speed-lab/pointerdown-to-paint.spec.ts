import { test, expect } from "@playwright/test";
import { computeMedian, updateResults } from "./helpers";

const RUNS = 20;
// React commit + MutationObserver + rAF wait = 2 paint frames
// Budget = 40ms (2 frames @ 60Hz + one frame headroom for CI jitter)
const BUDGET = 40;
const KEY = "pointerdownToPaint";

test("pointerdown → paint on sub100 Button", async ({ page }) => {
  await page.goto("/speed-lab");
  await page.waitForLoadState("networkidle");

  const button = page.locator('[data-speed-lab="sub100-button"]');
  await expect(button).toBeVisible();
  await expect(button).toContainText("Save");

  const measurements: number[] = [];

  for (let i = 0; i < RUNS; i++) {
    if (i > 0) {
      // wait for label to reset back to "Save" (~2.6s total: 0.8s async + 1.8s timer)
      await expect(button).toContainText("Save", { timeout: 5000 });
    }

    // Stamp start time in the page immediately before click
    const start = await page.evaluate(() => performance.now());

    // Native Playwright click — dispatches real pointerdown/pointerup/click
    await button.click();

    // Wait for label to flip (first paint with new content)
    await expect(button).toContainText("Saved", { timeout: 2000 });

    // Stamp end time after React has committed the update and browser painted
    const end = await page.evaluate(() => performance.now());

    measurements.push(end - start);
  }

  const median = computeMedian(measurements);
  console.log(
    `pointerdown→paint: median=${median.toFixed(2)}ms budget=${BUDGET}ms`,
    measurements.map((v) => v.toFixed(1)),
  );
  await updateResults(KEY, median, BUDGET);

  expect(median).toBeLessThan(BUDGET);
});
