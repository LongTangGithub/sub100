import kleur from "kleur";
import { writeFileSafe } from "../lib/fs.js";
import { log } from "../lib/log.js";
import { resolveTree } from "../lib/registry.js";

export type AddOptions = { registry: string; yes: boolean };

export async function addCommand(
  name: string,
  opts: AddOptions,
): Promise<void> {
  log.step(`Resolving ${name}...`);

  const { files, npmDeps } = await resolveTree(name, opts.registry);
  const uniqueNpmDeps = Array.from(new Set(npmDeps));

  log.step(`${files.length} file${files.length === 1 ? "" : "s"} to write`);

  let written = 0;
  let overwritten = 0;
  let skipped = 0;

  for (const file of files) {
    const result = await writeFileSafe(file.path, file.content, opts.yes);
    if (result === "written") {
      written++;
      log.added(file.path);
    } else if (result === "overwritten") {
      overwritten++;
      log.overwritten(file.path);
    } else {
      skipped++;
      log.skipped(file.path);
    }
  }

  log.blank();
  log.bold(`Installed ${name}`);
  log.plain(
    `  ${kleur.green(written)} written, ${kleur.yellow(overwritten)} overwritten, ${kleur.gray(skipped)} skipped`,
  );

  if (uniqueNpmDeps.length > 0) {
    log.blank();
    log.bold("npm install:");
    log.plain(`  ${uniqueNpmDeps.join(" ")}`);
  }
}
