import { readFile, writeFile } from "fs/promises";
import { execSync } from "child_process";
import path from "path";

const RESULTS_PATH = path.resolve("apps/www/lib/speed-lab-results.json");

function getCommitSha(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

export function computeMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export async function updateResults(
  key: string,
  value: number,
  budget: number,
  unit = "ms",
) {
  let data: Record<string, unknown> = {};
  try {
    data = JSON.parse(await readFile(RESULTS_PATH, "utf-8"));
  } catch {}
  data.lastRun = new Date().toISOString();
  data.commitSha = getCommitSha();
  const results = (data.results as Record<string, unknown>) ?? {};
  results[key] = { value: Math.round(value * 100) / 100, budget, unit };
  data.results = results;
  await writeFile(RESULTS_PATH, JSON.stringify(data, null, 2) + "\n");
}
