# Progress

Single source of truth for what's built, what's in flight, and what's next. Read this at the start of every task before touching code, and update it as you work — not in a batch at the end.

This file complements [`learnings.md`](./learnings.md) (rules from past mistakes) and the visible task list (§7 in `CLAUDE.md`). Think of it as the long-lived map; the task list is the short-lived "where am I right now."

---

## How to use this file

When starting a task:

1. Read the **Current Focus** and **In Progress** sections to recover context.
2. Check **Blocked / Open Questions** for anything that might affect what you're about to do.
3. Verify the most recent **Completed** entries match reality — if they don't, fix the file before continuing.

When working:

- Move items between sections as status changes. Don't leave stale entries.
- Every entry gets a date (`YYYY-MM-DD`) and a one-line summary. Link to PRs, issues, or files where useful.
- If you discover work mid-task, add it to **Backlog** or **In Progress** — don't silently expand scope.

When finishing:

- Move the item to **Completed** with the date and a short note on what was verified (tests passed, build green, deployed, etc.).
- If the work surfaced a lesson, append it to `learnings.md` and reference it here.

---

## Current Focus

**SUB-3 — Kbd component.** Tiny, identity-defining.

Project plan: [v0.1 Soft Launch Plan](https://www.notion.so/36259290728581dd8b19f3e3eecbda50) · Linear: [SUB-3](https://linear.app/tang-workspace/issue/SUB-3)

---

## In Progress

Work currently underway. One entry per concrete unit of work (feature, file, migration, etc.). Only items actively being worked on belong here.

| Date Started | Item | Owner / Branch | Status Notes |
|--------------|------|----------------|--------------|
| 2026-05-16   | SUB-3 — Kbd component | Long / `sub-3-kbd` | Not started. |

---

## Completed

Most recent at the top. Trim aggressively — anything older than the current milestone can be archived to `progress-archive.md` or deleted.

### 2026-05-17

- **SUB-9 — prefers-reduced-motion + focus-visible polish** — complete. `useMotion` rewritten with `useSyncExternalStore` (no hydration flash). Focus ring consolidated to single `--color-ring` token. `springs.ts` cubic-bezier bug fixed. 19 tests green (4 new for `useMotion`, 1 new focus-visible class check). Preview updated with Focus ring + Reduced motion sections. Typecheck + build green.

### 2026-05-16

- **SUB-2 — Button + useOptimisticAction + usePress** — complete. `usePress` (pointerdown, cancel, leave, keyboard), `useOptimisticAction` (optimistic state, error callback), `Button` (4 variants, 3 sizes, disabled, press scale, springs wired). 14 tests green. Preview at `/preview/button`.
- **SUB-1 — Monorepo + tooling setup** — complete. pnpm workspaces, Turborepo, Biome, Changesets, Next.js 16 + Tailwind v4, `packages/ui` + `packages/ai` stubs, registry route + build script stub. Typecheck green.

---

## Backlog

Planned but not started. Group by area so it's easy to scan. Order within each group reflects priority.

### v0.1 — Soft Launch (Cycle 1, May 16–22)

- **SUB-3** — Kbd component. Tiny, identity-defining.
- **SUB-4** — CommandMenu. The headline composition; protect this work.

### v0.1 — Soft Launch (Cycle 2, May 23–29)

- **SUB-5** — Dialog + ConfirmDialog composition.
- **SUB-6** — Toast + ToastQueue (wires to optimistic action failures).
- **SUB-7** — Docs site shell + MDX pages + CLI install flow.
- **SUB-8** — Speed-lab demo page + Playwright timing budgets. The artifact people will share.

### v0.2 (post-launch)

- DataTable
- Tooltip / Popover / Dropdown
- Form primitives (Input, Select, Checkbox)
- Dark mode toggle
- Theme customization story
- First AI primitive: `<StreamingText>` in `@sub100/ai`
- Blog / changelog page on docs site

---

## Blocked / Open Questions

Anything waiting on a decision, an external dependency, or clarification. Each entry should name what's blocking it and who/what unblocks it.

| Date | Item | Blocked By | Notes |
|------|------|------------|-------|
| *(empty)* |  |  |  |

---

## Decisions Log

Significant technical or product decisions made during the project. Append-only — don't rewrite history, add a new entry if a decision is reversed.

### 2026-05-16 — AI primitives ship as opt-in package, not in core

- **Context:** Initial thinking had AI-native components (StreamingText, ToolCallCard, etc.) headlining the library. Risked locking out non-AI consumers and bloating install surface.
- **Decision:** Core `packages/ui` stays domain-agnostic. AI components live in `packages/ai` (`@sub100/ai`), opt-in.
- **Alternatives considered:** (a) Ship AI primitives as headline in core. (b) Stay framework-agnostic, treat AI as just an example.
- **Consequences:** Registry endpoint must be namespaced (`/r/ui/[name]`, `/r/ai/[name]`). Two packages need independent versioning (Changesets becomes load-bearing). Marketing positions AI as the *proof point* for the sub-100 thesis, not the product itself.

### 2026-05-17 — useSyncExternalStore for useMotion over useState/useEffect

- **Context:** Original `useMotion` used `useState(false)` + `useEffect` to read `matchMedia`. Causes hydration mismatch — server renders with `false`, client may immediately correct if user has reduced motion enabled.
- **Decision:** Rewrite with `useSyncExternalStore`. `getServerSnapshot` returns `false`; `getSnapshot` reads live `matchMedia`. No flash, no mismatch.
- **Alternatives considered:** `useState` + `useEffect` (original, ships a flash). `useLayoutEffect` (suppresses SSR warning but doesn't fix the mismatch).
- **Consequences:** Requires React 18+. Eliminates hydration warning in Next.js. Pattern reusable for any `matchMedia`-based hook.

### 2026-05-17 — Single focus ring token over per-variant colors

- **Context:** SUB-2 button variants each had their own focus ring color. Inconsistent across variants, harder to theme.
- **Decision:** Single `--color-ring` token (`oklch` blue-500) applied via `focus-visible:ring-ring` in button base class. All variants share one canonical ring.
- **Alternatives considered:** Per-variant rings (more control, more drift risk). No ring (accessibility regression).
- **Consequences:** One token to override for theming. Consistent keyboard navigation UX across all button variants.

### 2026-05-16 — React 19 primitives only for state inside the library

- **Context:** Needed to decide on state management for component-internal concerns (optimistic press, dialog open/closed, toast queue).
- **Decision:** `useOptimistic`, `useTransition`, `useState`, `useReducer`, Context (sparingly). No Zustand, no Jotai.
- **Alternatives considered:** Zustand (~1KB global store), Jotai (atomic state, ~3KB).
- **Consequences:** RSC-friendly by default. Library stays store-agnostic at the boundary — consumers can use any state library in their app without conflict. `useOptimistic` is exactly the API the sub-100 thesis needs.

### 2026-05-16 — v0.1 ships core only, no `@sub100/ai`

- **Context:** 2-week timeline for soft launch. Needed to decide scope.
- **Decision:** Ship `packages/ui` + speed-lab only. `@sub100/ai` is scaffolded (empty placeholder package) but no components ship in v0.1.
- **Alternatives considered:** (a) Ship one AI primitive in v0.1 as proof. (b) Ship both packages.
- **Consequences:** v0.1 proves the *thesis* (sub-100 interactions) without distracting on AI surface. AI primitives become the v0.2 headline once the core is credible.

---

## Milestones

High-level checkpoints. Update when a milestone ships.

- [ ] **v0.1 — Soft Launch** — target: 2026-05-30. 5 components in `packages/ui`, speed-lab live, docs site + CLI working, Playwright timing budgets enforced in CI.
- [ ] **v0.2 — AI primitives + breadth** — target: TBD. First `@sub100/ai` components ship (StreamingText, ToolCallCard, MessageThread). Core gains DataTable + form primitives.
- [ ] **v1.0 — Public launch** — target: TBD. Announced. Stable API. Versioning commitments.