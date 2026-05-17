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

- (2026-05-17) Rule: When a PR description omits acceptance criteria from the original issue, flag the gap explicitly before merging. Don't assume "not mentioned" means "done".
  Why: SUB-2 merged without verifying `prefers-reduced-motion`, `focus-visible`, or registry script wiring because the PR description didn't mention them. Three acceptance criteria gaps became carry-forward work (SUB-9) that should have been caught at PR review.

## Code

- (2026-05-17) Rule: When a React 19 concurrent primitive (`useOptimistic`, `useTransition`) fails in jsdom tests, fix the test setup before abandoning the primitive. Migrate the affected test to Playwright if needed.
  Why: SUB-2's `useOptimisticAction` swapped `useOptimistic` for `useState` because jsdom `act()` couldn't handle concurrent semantics. UX is fine, but consumers lose React's automatic Server Action rollback. Test-setup limitations should not silently downgrade library architecture.

- (2026-05-17) Rule: Project conventions in CLAUDE.md §10 are non-violable defaults. Every component implementation must explicitly verify each applicable rule before the PR is opened — not after.
  Why: `prefers-reduced-motion` is listed in §10 with "push back if asked to violate" but wasn't checked during SUB-2. Button shipped without it.

## Testing

- *(no rules yet)*

## Git & Releases

- *(no rules yet)*