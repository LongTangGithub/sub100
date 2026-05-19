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

**SUB-4 — CommandMenu.** The headline composition for v0.1. Built on cmdk + Radix Dialog with sub100's motion, focus ring, and Kbd integration on top. Declarative JSX API (no kbar-style hooks in v0.1). This is the "wow" — recruiters will hit ⌘K and decide whether to keep scrolling.

Project plan: [v0.1 Soft Launch Plan](https://www.notion.so/36259290728581dd8b19f3e3eecbda50) · Linear: [SUB-4](https://linear.app/tang-workspace/issue/SUB-4/commandmenu)

---

## In Progress

Work currently underway. One entry per concrete unit of work (feature, file, migration, etc.). Only items actively being worked on belong here.

| Date Started | Item | Owner / Branch | Status Notes |
|--------------|------|----------------|--------------|
| 2026-05-19   | SUB-4 — CommandMenu | Long / `sub-4-commandmenu` | Decisions locked. Phase plan in Linear. |

---

## Completed

Most recent at the top. Trim aggressively — anything older than the current milestone can be archived to `progress-archive.md` or deleted.

### 2026-05-18

- **SUB-3** — Kbd + formatShortcut shipped via [PR #5](https://github.com/LongTangGithub/sub100/pull/5). Semantic `<kbd>`, parent affordance lift, platform-aware shortcut util. 15 new tests; 33 total in repo.

### 2026-05-17

- **SUB-9** — Polish on SUB-2 shipped via [PR #4](https://github.com/LongTangGithub/sub100/pull/4). `prefers-reduced-motion` via `useMotion` hook with `useSyncExternalStore`. Single `--color-ring` token across all 4 button variants. Bundled cubic-bezier bug fix in springs.ts.
- **SUB-2** — Button + usePress + useOptimisticAction shipped via [PR #2](https://github.com/LongTangGithub/sub100/pull/2). The load-bearing trio that every other component inherits. Three acceptance criteria gaps surfaced after merge → caught by new `learnings.md` rule, fixed in SUB-9.

### 2026-05-16

- **SUB-1** — Monorepo + tooling foundation shipped via [PR #1](https://github.com/LongTangGithub/sub100/pull/1). pnpm + Turborepo with `apps/www`, `packages/ui`, `packages/ai`. Biome, Tailwind v4, Changesets, stub registry endpoint, shared `tsconfig.base.json`.

---

## Backlog

Planned but not started. Group by area so it's easy to scan. Order within each group reflects priority.

### v0.1 — Soft Launch (Cycle 1, May 16–22)

- ~~**SUB-3**~~ — shipped.
- ~~**SUB-4**~~ — in progress (see above).

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

### 2026-05-18 — Declarative JSX children for CommandMenu, not kbar-style hooks

- **Context:** SUB-4 design considered three API shapes — declarative JSX children (cmdk-native), imperative `useRegisterActions` hook (kbar-style global store + automatic cleanup + dependency reactivity), and a hybrid.
- **Decision:** Declarative JSX children only for v0.1. `<CommandMenu><Group><Item /></Group></CommandMenu>` maps 1:1 with cmdk's native API. No global store, no context provider, no hook.
- **Alternatives considered:** kbar-style hybrid would let deeply nested components inject actions into a root-mounted CommandMenu with automatic cleanup. Real benefits for complex apps, but solves problems v0.1 demo doesn't have.
- **Consequences:** v0.1 ships fast and clean. If consumers later need cross-component action registration, we layer a `useRegisterActions` hook in v0.2 — easier to add later than to remove now.

### 2026-05-17 — `useSyncExternalStore` over `useState`/`useEffect` for browser-state hooks

- **Context:** SUB-9 needed a hook that reads `prefers-reduced-motion` and updates if the user toggles their OS preference. First implementation used `useState(false)` + `useEffect` to populate, which caused a hydration flash (first client render returned `false` regardless of preference).
- **Decision:** `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` — React-idiomatic for subscribing to browser state without tearing. Reads synchronously on first client render; SSR-safe via `getServerSnapshot`.
- **Alternatives considered:** Default-to-Mac during SSR (lazy); keep `useState` and accept the flash (worse for Dialog/Toast which animate on mount).
- **Consequences:** Pattern becomes the standard for any future browser-state subscription (theme, viewport size, online status, etc.). One-time learning cost; pays off across the library.

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

### 2026-05-16 — AI primitives ship as opt-in package, not in core

- **Context:** Initial thinking had AI-native components (StreamingText, ToolCallCard, etc.) headlining the library. Risked locking out non-AI consumers and bloating install surface.
- **Decision:** Core `packages/ui` stays domain-agnostic. AI components live in `packages/ai` (`@sub100/ai`), opt-in.
- **Alternatives considered:** (a) Ship AI primitives as headline in core. (b) Stay framework-agnostic, treat AI as just an example.
- **Consequences:** Registry endpoint must be namespaced (`/r/ui/[name]`, `/r/ai/[name]`). Two packages need independent versioning (Changesets becomes load-bearing). Marketing positions AI as the *proof point* for the sub-100 thesis, not the product itself.

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
