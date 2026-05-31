import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RegistryType = "registry:ui" | "registry:hook" | "registry:lib";

type RegistrySource = { src: string; dest: string; type: RegistryType };

type RegistryEntry = {
  type: RegistryType;
  files: RegistrySource[];
  dependencies: string[];
  registryDependencies: string[];
};

const REGISTRY: Record<string, RegistryEntry> = {
  // ── Primitives (leaves) ──────────────────────────────────────────────
  "use-press": {
    type: "registry:hook",
    files: [
      {
        src: "packages/ui/src/hooks/use-press.ts",
        dest: "hooks/use-press.ts",
        type: "registry:hook",
      },
    ],
    dependencies: [],
    registryDependencies: [],
  },
  "use-motion": {
    type: "registry:hook",
    files: [
      {
        src: "packages/ui/src/hooks/use-motion.ts",
        dest: "hooks/use-motion.ts",
        type: "registry:hook",
      },
    ],
    dependencies: [],
    registryDependencies: [],
  },
  springs: {
    type: "registry:lib",
    files: [
      {
        src: "packages/ui/src/lib/springs.ts",
        dest: "lib/springs.ts",
        type: "registry:lib",
      },
    ],
    dependencies: [],
    registryDependencies: [],
  },
  "format-shortcut": {
    type: "registry:lib",
    files: [
      {
        src: "packages/ui/src/lib/format-shortcut.ts",
        dest: "lib/format-shortcut.ts",
        type: "registry:lib",
      },
    ],
    dependencies: [],
    registryDependencies: [],
  },

  // ── Components ───────────────────────────────────────────────────────
  button: {
    type: "registry:ui",
    files: [
      {
        src: "packages/ui/src/components/button.tsx",
        dest: "components/button.tsx",
        type: "registry:ui",
      },
      {
        src: "packages/ui/src/components/button.variants.ts",
        dest: "components/button.variants.ts",
        type: "registry:ui",
      },
    ],
    dependencies: ["tailwind-variants"],
    registryDependencies: ["use-press", "use-motion", "springs"],
  },
  kbd: {
    type: "registry:ui",
    files: [
      {
        src: "packages/ui/src/components/kbd.tsx",
        dest: "components/kbd.tsx",
        type: "registry:ui",
      },
      {
        src: "packages/ui/src/components/kbd.variants.ts",
        dest: "components/kbd.variants.ts",
        type: "registry:ui",
      },
    ],
    dependencies: ["tailwind-variants"],
    registryDependencies: ["use-motion", "springs"],
  },
  "command-menu": {
    type: "registry:ui",
    files: [
      {
        src: "packages/ui/src/components/command-menu.tsx",
        dest: "components/command-menu.tsx",
        type: "registry:ui",
      },
      {
        src: "packages/ui/src/components/command-menu.variants.ts",
        dest: "components/command-menu.variants.ts",
        type: "registry:ui",
      },
    ],
    dependencies: ["cmdk", "@radix-ui/react-dialog", "tailwind-variants"],
    registryDependencies: ["use-motion", "springs", "format-shortcut", "kbd"],
  },
  dialog: {
    type: "registry:ui",
    files: [
      {
        src: "packages/ui/src/components/dialog.tsx",
        dest: "components/dialog.tsx",
        type: "registry:ui",
      },
      {
        src: "packages/ui/src/components/dialog.variants.ts",
        dest: "components/dialog.variants.ts",
        type: "registry:ui",
      },
    ],
    dependencies: ["@radix-ui/react-dialog", "tailwind-variants"],
    registryDependencies: ["use-motion", "springs"],
  },
  "confirm-dialog": {
    type: "registry:ui",
    files: [
      {
        src: "packages/ui/src/components/confirm-dialog.tsx",
        dest: "components/confirm-dialog.tsx",
        type: "registry:ui",
      },
    ],
    dependencies: [],
    registryDependencies: ["dialog", "button"],
  },
  toast: {
    type: "registry:ui",
    files: [
      {
        src: "packages/ui/src/components/toaster.tsx",
        dest: "components/toaster.tsx",
        type: "registry:ui",
      },
      {
        src: "packages/ui/src/styles/toast-overrides.css",
        dest: "styles/toast-overrides.css",
        type: "registry:ui",
      },
    ],
    dependencies: ["sonner"],
    registryDependencies: [],
  },
};

// process.cwd() in `next dev` / `next start` is the app directory (apps/www).
// Walk up two levels to reach the monorepo root where packages/ui lives.
const MONOREPO_ROOT = path.resolve(process.cwd(), "..", "..");

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const entry = REGISTRY[name];
  if (!entry) {
    return NextResponse.json(
      { error: `Unknown component "${name}"` },
      { status: 404 },
    );
  }

  const files = await Promise.all(
    entry.files.map(async ({ src, dest, type }) => ({
      path: dest,
      content: await readFile(path.join(MONOREPO_ROOT, src), "utf8"),
      type,
    })),
  );

  return NextResponse.json(
    {
      name,
      type: entry.type,
      dependencies: entry.dependencies,
      registryDependencies: entry.registryDependencies,
      files,
    },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
