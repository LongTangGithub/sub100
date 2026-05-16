import { readdirSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UI_SRC = join(__dirname, "../packages/ui/src");
const OUT_DIR = join(__dirname, "../registry");

mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(UI_SRC).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

const registry = files.map((file) => ({
    namespace: "ui",
    name: file.replace(/\.(ts|tsx)$/, ""),
    files: [file],
    dependencies: [],
}));

writeFileSync(join(OUT_DIR, "registry.json"), JSON.stringify(registry, null, 2));

console.log(`Built registry: ${registry.length} component(s)`);
