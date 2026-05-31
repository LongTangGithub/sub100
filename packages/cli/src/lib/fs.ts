import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

export type WriteResult = "written" | "skipped" | "overwritten";

async function promptYesNo(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(/^y(es)?$/i.test(answer.trim()));
    });
  });
}

export async function writeFileSafe(
  destPath: string,
  content: string,
  yes: boolean,
): Promise<WriteResult> {
  const abs = path.resolve(process.cwd(), destPath);
  await mkdir(path.dirname(abs), { recursive: true });

  const existed = existsSync(abs);

  if (existed && !yes) {
    const overwrite = await promptYesNo(
      `  ${destPath} exists. Overwrite? [y/N] `,
    );
    if (!overwrite) return "skipped";
    await writeFile(abs, content, "utf8");
    return "overwritten";
  }

  await writeFile(abs, content, "utf8");
  return existed ? "overwritten" : "written";
}
