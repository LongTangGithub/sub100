import { test, expect } from "@playwright/test";
import { computeMedian, updateResults } from "./helpers";

const RUNS = 20;
// synchronous filter + one rAF; real ~10ms; 50ms is generous headroom
const BUDGET = 50;
const KEY = "keypressToFilter";

test("keypress → filter on sub100 command menu", async ({ page }) => {
  await page.goto("/speed-lab");
  await page.waitForLoadState("networkidle");

  const input = page.locator('[data-speed-lab="sub100-command-menu"]');
  await expect(input).toBeVisible();

  const measurements: number[] = [];

  for (let i = 0; i < RUNS; i++) {
    // Clear input before each run
    await page.evaluate(() => {
      const el = document.querySelector(
        '[data-speed-lab="sub100-command-menu"]',
      ) as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )!.set!;
      setter.call(el, "");
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await page.waitForTimeout(50);

    const elapsed = await page.evaluate(async () => {
      return new Promise<number>((resolve, reject) => {
        const el = document.querySelector(
          '[data-speed-lab="sub100-command-menu"]',
        ) as HTMLInputElement;
        if (!el) { reject(new Error("input not found")); return; }

        // find the list — it's the <ul> sibling inside the same wrapper
        const list = el.closest("div")?.parentElement?.querySelector("ul");
        if (!list) { reject(new Error("list not found")); return; }

        const startMark = `keypress-${Date.now()}`;
        const paintMark = `filter-paint-${Date.now()}`;

        const observer = new MutationObserver(() => {
          requestAnimationFrame(() => {
            performance.mark(paintMark);
            const measure = performance.measure(
              "keypress-to-filter",
              startMark,
              paintMark,
            );
            observer.disconnect();
            resolve(measure.duration);
          });
        });

        observer.observe(list, { childList: true });

        performance.mark(startMark);
        const setter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value",
        )!.set!;
        setter.call(el, "cal");
        el.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });

    measurements.push(elapsed);
  }

  const median = computeMedian(measurements);
  console.log(`keypress→filter: median=${median.toFixed(2)}ms budget=${BUDGET}ms`, measurements.map(v => v.toFixed(1)));
  await updateResults(KEY, median, BUDGET);
  expect(median).toBeLessThan(BUDGET);
});
