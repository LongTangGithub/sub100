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

- (2026-05-18) Rule: Read issue acceptance criteria critically. Specs get copy-pasted between issues and may carry assumptions that don't fit the new component. When something in the spec feels off, pause and ask whether it was deliberate or template noise.
  Why: SUB-3's spec had "transform-only press feedback" suggesting Kbd should be pressable. After comparing industry conventions (GitHub, Linear, Stripe, Apple HIG, Material), the right call was pure display + parent affordance. Was likely copy-paste from Button's acceptance criteria.

- (2026-05-18) Rule: Skill recommendations are starting points, not directives. When a skill suggests a change, evaluate whether the recommendation fits the actual usage context. Performance hints like `will-change-transform` are right for one-off elements (Button) but wrong for high-volume elements (Kbd in CommandMenu rows).
  Why: The interface-craft skill flagged that Kbd was missing `will-change-transform` compared to Button. Adding it would have allocated a GPU layer per keycap; with CommandMenu rendering 20+ Kbd at once, this is permanently expensive for an occasional 1px hover.

- (2026-05-17) Rule: When discovering an unrelated bug in a file you're touching, fix it in the same PR with explicit callout in the description under a "Bug fix bundled" or similar header. Spinning up a separate issue for a 2-character fix is process for process's sake. CLAUDE.md §5's "Surgical Changes" rule prevents opportunistic refactoring, not bundling related fixes.
  Why: SUB-9 fixed the cubic-bezier malformation in springs.ts while in the same file for motion gating. Bundling it kept the trail tight and the bug from lingering. The PR description documented the bundle so it wasn't slipped in silently.

- (2026-05-17) Rule: When a PR description omits acceptance criteria from the original issue, flag the gap explicitly before merging. Don't assume "not mentioned" means "done".
  Why: SUB-2 merged without verifying `prefers-reduced-motion`, `focus-visible`, or registry script wiring because the PR description didn't mention them. Three acceptance criteria gaps became carry-forward work (SUB-9) that should have been caught at PR review.

## Code

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