# sub100

A component library where perceived speed is the design system. Every interaction acknowledged in under 100ms, every state change legible without waiting.

## Packages

| Package | Description |
|---------|-------------|
| `@sub100/ui` | Core components — domain-agnostic, ships in v0.1 |
| `@sub100/ai` | AI primitives — opt-in, ships in v0.2 |
| `apps/www` | Docs site + component registry |

## Getting started

```bash
pnpm install
pnpm dev
```

## Stack

- **pnpm** workspaces + **Turborepo**
- **Next.js 16** App Router
- **Tailwind v4** CSS-first `@theme`
- **Biome** lint + format
- **Changesets** per-package versioning
