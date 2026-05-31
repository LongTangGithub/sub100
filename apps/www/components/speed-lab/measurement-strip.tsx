import results from "@/lib/speed-lab-results.json";

const METRICS = [
  { key: "pointerdownToPaint", label: "pointerdown → paint" },
  { key: "keypressToFilter", label: "keypress → filter" },
  { key: "actionFailToToast", label: "action fail → toast" },
] as const;

type MetricKey = (typeof METRICS)[number]["key"];

function formatValue(value: number): string {
  return value < 100 ? `${value.toFixed(1)}ms` : `${Math.round(value)}ms`;
}

function formatLastRun(iso: string | null): string {
  if (!iso) return "Not yet measured.";
  return (
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso)) + "."
  );
}

export function MeasurementStrip() {
  const data = results.results as Record<
    string,
    { value: number; budget: number; unit: string } | undefined
  >;

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
        {METRICS.map(({ key, label }) => {
          const entry = data[key as MetricKey];
          const passing =
            entry !== undefined &&
            entry.value > 0 &&
            entry.value < entry.budget;
          const failing =
            entry !== undefined && entry.value >= entry.budget;
          const missing = entry === undefined;

          return (
            <div
              key={key}
              className="px-6 py-5 bg-neutral-50 dark:bg-neutral-900"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
                {label}
              </p>

              {passing && (
                <p className="text-xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
                  {formatValue(entry.value)}
                  <span className="text-sm font-normal text-neutral-400 dark:text-neutral-500 ml-2">
                    / {entry.budget}ms budget
                  </span>
                </p>
              )}

              {failing && (
                <p className="text-xl font-semibold tabular-nums text-red-600 dark:text-red-400">
                  {formatValue(entry.value)}
                  <span className="text-sm font-normal text-red-500 ml-2">
                    / {entry.budget}ms over budget
                  </span>
                </p>
              )}

              {missing && (
                <>
                  <p className="text-xl font-semibold tabular-nums text-neutral-400 dark:text-neutral-500">
                    —
                  </p>
                  <p className="text-xs italic text-neutral-400 dark:text-neutral-500 mt-0.5">
                    not measured
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Last measured {formatLastRun(results.lastRun as string | null)}
        {"commitSha" in results && results.commitSha ? (
          <> Commit{" "}
            <code className="font-mono">{results.commitSha as string}</code>.{" "}
          </>
        ) : " "}
        Updated on each CI run via Playwright. Failed budgets fail the build.
      </p>
    </div>
  );
}
