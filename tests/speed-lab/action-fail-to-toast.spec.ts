import { test, expect } from "@playwright/test";
import { computeMedian, updateResults } from "./helpers";

const RUNS = 20;
// 200ms server delay excluded; measuring toast render after error throws
// budget = toast sliding in within one rAF of the error
const BUDGET = 100;
const KEY = "actionFailToToast";

test("action fail → toast visible on sub100 ConfirmDialog", async ({
  page,
}) => {
  await page.goto("/speed-lab");
  await page.waitForLoadState("networkidle");

  const trigger = page.locator('[data-speed-lab="sub100-toast-trigger"]');
  await expect(trigger).toBeVisible();

  const measurements: number[] = [];

  for (let i = 0; i < RUNS; i++) {
    // Dismiss any existing toast from prior run
    const existingToast = page.locator("[data-sonner-toast]").first();
    if (await existingToast.isVisible()) {
      await existingToast.click();
      await page.waitForTimeout(300);
    }

    // Open the dialog
    await trigger.click();
    await page.waitForTimeout(150); // wait for dialog to mount

    // Find confirm button by text inside the dialog
    const confirmBtn = page.locator('[role="dialog"] button', {
      hasText: "Delete",
    });
    await expect(confirmBtn).toBeVisible();

    const startTime = await page.evaluate(() => performance.now());

    // Click confirm
    await confirmBtn.click();

    // Wait for toast to appear
    await page.waitForSelector("[data-sonner-toast]", { timeout: 5000 });

    const elapsed = await page.evaluate(
      (start) => performance.now() - start,
      startTime,
    );

    measurements.push(elapsed);

    // Dismiss toast + wait for reset
    await page.waitForTimeout(500);
  }

  const median = computeMedian(measurements);
  console.log(`action-fail→toast: median=${median.toFixed(2)}ms budget=${BUDGET}ms`, measurements.map(v => v.toFixed(1)));
  await updateResults(KEY, median, BUDGET);
  expect(median).toBeLessThan(BUDGET);
});
