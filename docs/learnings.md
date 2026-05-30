# Learnings

Persistent rules learned from user corrections. Read this at the start of every task and follow every rule below.

When the user corrects a mistake:

1. Apply the correction.
2. Append a new rule here under the right section.
3. Show the user the new rule before continuing.

Each rule should be:

- A concrete *do* or *don't* (not a vague principle).
- One or two sentences, scannable at a glance.
- Tagged with the date it was added (`YYYY-MM-DD`) so stale rules can be pruned.

---

## Format

```
- (YYYY-MM-DD) Rule: <what to do or not do>.
  Why: <the incident or reason that prompted it>.
```

---

## Workflow

- (2026-05-30) Rule: When integrating a third-party library via CSS variable overrides, verify selectors fire by inspecting the library's actual source attributes, not by visual inspection alone. A broken selector with default values that happen to look reasonable is indistinguishable from a working selector — until you compare against design intent. Comment a rule, refresh, compare. Then decide.
  Why: SUB-6 shipped initial CSS using `[data-sonner-toaster][data-theme="dark"]` for Sonner overrides. Sonner actually uses `data-sonner-theme` (prefixed). The selectors never fired. Toast appeared to work because Sonner's defaults are tasteful — but the design parity with Dialog was absent. Discovered only when design review pushed deeper than visual comparison.

- (2026-05-30) Rule: When a third-party library has a "rich" or "fancy" mode flag, verify which behaviors are gated behind that flag before deciding to keep it off. A flag like richColors may turn out to gate the variant-surface coloring you actually wanted — leaving it off means your custom CSS variables are dead code.
  Why: SUB-6 originally set richColors=false thinking "we'll apply our own variant tokens." Sonner's variant-surface coloring is gated behind richColors. With it off, the CSS variable overrides for --success-bg etc. were never read. Variants visually identical except for the icon. Flipped to true.

- (2026-05-19) Rule: When wiring two libraries together (cmdk + Radix Dialog, future: Toast + form lib, etc.), explicitly trace control flow for every state transition — open, close, select, dismiss. Don't assume "the libraries handle it." Each library owns its own concerns; the wiring between them is the consumer's job.
  Why: SUB-4 caught a real bug pre-preview from architectural reasoning, not broken UI: cmdk's onSelect fires the action but doesn't close Radix Dialog. Uncontrolled mode meant consumer had no setter. Would have shipped as visible jank if not caught by tracing the close path.

- (2026-05-19) Rule: Before opening a PR, run visual review on screenshots in both light AND dark OS mode. Most theme bugs surface in only one mode. Tests can't catch this — visual review is the only check.
  Why: SUB-4 had a dark menu / light page mismatch invisible in light-mode dev but visible to recruiters on dark-OS machines. Caught by skill-augmented visual review before PR open.

- (2026-05-18) Rule: Read issue acceptance criteria critically. Specs get copy-pasted between issues and may carry assumptions that don't fit the new component. When something in the spec feels off, pause and ask whether it was deliberate or template noise.
  Why: SUB-3's spec had "transform-only press feedback" suggesting Kbd should be pressable. After comparing industry conventions (GitHub, Linear, Stripe, Apple HIG, Material), the right call was pure display + parent affordance. Was likely copy-paste from Button's acceptance criteria.

- (2026-05-18) Rule: Skill recommendations are starting points, not directives. When a skill suggests a change, evaluate whether the recommendation fits the actual usage context. Performance hints like `will-change-transform` are right for one-off elements (Button) but wrong for high-volume elements (Kbd in CommandMenu rows).
  Why: The interface-craft skill flagged that Kbd was missing `will-change-transform` compared to Button. Adding it would have allocated a GPU layer per keycap; with CommandMenu rendering 20+ Kbd at once, this is permanently expensive for an occasional 1px hover.

- (2026-05-17) Rule: When discovering an unrelated bug in a file you're touching, fix it in the same PR with explicit callout in the description under a "Bug fix bundled" or similar header. Spinning up a separate issue for a 2-character fix is process for process's sake. CLAUDE.md §5's "Surgical Changes" rule prevents opportunistic refactoring, not bundling related fixes.
  Why: SUB-9 fixed the cubic-bezier malformation in springs.ts while in the same file for motion gating. Bundling it kept the trail tight and the bug from lingering. The PR description documented the bundle so it wasn't slipped in silently.

- (2026-05-17) Rule: When a PR description omits acceptance criteria from the original issue, flag the gap explicitly before merging. Don't assume "not mentioned" means "done".
  Why: SUB-2 merged without verifying `prefers-reduced-motion`, `focus-visible`, or registry script wiring because the PR description didn't mention them. Three acceptance criteria gaps became carry-forward work (SUB-9) that should have been caught at PR review.

## Code

- (2026-05-30) Rule: When deciding whether to write a wrapper hook (useToast, useOptimisticToast, useFoo) over a library's existing imperative API, ask: "does the wrapper do anything more than re-export?" If the wrapper just returns the library function unchanged, it's indirection that adds nothing. Re-export directly.
  Why: SUB-6 considered exposing `useToast()` wrapping Sonner's `toast`. The hook would have returned `{ toast }` and nothing else. Replaced with direct re-export from index.ts. Consumers write `toast.success(...)` instead of `useToast().toast.success(...)`.

- (2026-05-30) Rule: When a confirm action is destructive (Delete, Remove, Discard), use a neutral-surface toast with an action button (Undo, Restore) — NOT a success-variant toast. Green reads as affirmative; destructive completion should feel matter-of-fact, with recovery offered. Linear/Vercel pattern.
  Why: SUB-6's Delete preview initially fired toast.success("Deleted"). Green felt wrong for a destructive completion — it celebrated the destruction. Switched to toast("Project deleted", { action: { label: "Undo" } }). The action button is the affirmative signal; the surface stays neutral.

- (2026-05-19) Rule: For compound components (CommandMenu.Input, CommandMenu.Item, etc.), use Object.assign on the root function for typed dot-access. Keeps all sub-components in a single file, avoids module augmentation or namespace declarations, exports trivially as a single import.
  Why: SUB-4 shipped 6 sub-components on CommandMenu via Object.assign — full TypeScript inference, single-file readability, one import statement for consumers.

- (2026-05-19) Rule: When a React context has a function default that consumers can safely call without a Provider, type it as the function and default to a no-op. Avoids null checks at every call site, makes the component robust if used outside its expected tree.
  Why: SUB-4's CommandMenuCloseContext defaults to () => {}. If <CommandMenu.Item> ever renders outside <CommandMenu>, the call to close() is a no-op instead of a crash.

- (2026-05-18) Rule: When a utility is consumed exclusively by client components in v0.1 ('use client'), SSR concerns can be documented and deferred rather than solved upfront. Build the simpler implementation, comment the limitation, fix when an actual SSR consumer appears.
  Why: format-shortcut.ts has a theoretical hydration mismatch on SSR. Solving it would have required useSyncExternalStore-style coordination in Kbd. Since all v0.1 consumers are client-side, the simpler implementation was correct and the limitation was documented for v0.2.

- (2026-05-18) Rule: Dark mode shadows should invert direction, not just intensify color. Light mode keycap depth = darker shadow on bottom edge. Dark mode keycap depth = lighter highlight on top edge (light source physics). Just darkening the existing shadow against an already-dark surface produces near-zero contrast.
  Why: SUB-3's first variant draft had dark:shadow-[inset_0_-1px_0_0_rgb(0_0_0/_0.3)] — the dark shadow was invisible against neutral-800 bg. Fixed by switching to inset_0_1px_0_0_rgb(255_255_255/_0.06) for dark mode.

- (2026-05-17) Rule: When a React 19 concurrent primitive (`useOptimistic`, `useTransition`) fails in jsdom tests, fix the test setup before abandoning the primitive. Migrate the affected test to Playwright if needed.
  Why: SUB-2's `useOptimisticAction` swapped `useOptimistic` for `useState` because jsdom `act()` couldn't handle concurrent semantics. UX is fine, but consumers lose React's automatic Server Action rollback. Test-setup limitations should not silently downgrade library architecture.

- (2026-05-17) Rule: Project conventions in CLAUDE.md §10 are non-violable defaults. Every component implementation must explicitly verify each applicable rule before the PR is opened — not after.
  Why: `prefers-reduced-motion` is listed in §10 with "push back if asked to violate" but wasn't checked during SUB-2. Button shipped without it.

## Testing

- *(no rules yet)*

## Git & Releases

- *(no rules yet)*