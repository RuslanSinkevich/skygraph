# T-Vue-Cleanup — Decisions

## D1. `customClass` removed in favour of Vue attribute fallthrough

**Context.** Six freshly added Vue SFCs (`InputPassword`, `SearchInput`,
`TagInput`, `PinInput`, `InlineEdit`, `InputGroup`) declared a `customClass:
string` prop and concatenated it into the `sg-*` class list of a chosen
element.

**Decision.** Remove the prop. Let Vue's automatic class fallthrough
apply user-provided classes to the rendered root.

**Rationale.**

- `customClass` is the React idiom; in Vue the same intent is expressed by
  passing `class="..."` onto the component, which Vue forwards to the root
  element.
- Removes one prop from the public API surface and simplifies the template.
- React's `className` lands on the same `<span>` that carries `sg-*`
  utility classes; in Vue the user `class` lands on whichever element is the
  template root. The set of `sg-*` classes is unchanged in either adapter,
  which is what `styling-contract.parity.test.ts` asserts. The placement of
  the *user* `class` differs in one component (`InputPassword`) where the
  React DOM has an outer `<div style>` wrapper and the `sg-input-password-
  wrapper` lives on an inner `<span>` — Vue's fallthrough hits the outer
  `<div>` instead. This is documented as an acceptable framework-idiom
  difference, not an API mismatch.

**Trade-offs.**

- Breaking change for any caller that passed `customClass="..."`. They must
  switch to `class="..."`.
- Multi-root templates (most of these six SFCs use `v-if/v-else` at the
  template root) still receive the fallthrough automatically because Vue
  treats `v-if/v-else` chains as a single root in any given render. No
  `inheritAttrs: false` plumbing was needed; the test suite confirms
  `wrapper.element` resolves to the correct rendered root for every case
  except `InlineEdit` (see D3).

## D2. `PinInput.cellRefs` switched from `ref([])` to a plain array

**Context.** The new `SgPinInput (default)` parity test triggered Vue's
*"Maximum recursive updates exceeded in component &lt;PinInput&gt;"* warning.
The cause was unrelated to the cleanup itself: `cellRefs` was declared as
`ref<(HTMLInputElement | null)[]>([])` and `bindRef` mutated the ref each
render via `cellRefs.value = next`. Because `:ref="(el) => bindRef(el, i)"`
creates a new callback every render, Vue invokes it on every patch, the ref
mutation invalidates dependents, and the cycle repeats.

**Decision.** Replace `ref([])` with a plain `const cellRefs: (HTMLInputElement
| null)[] = []`. The bag is only consumed imperatively by `focusAt(i)` to
call `.focus()`; nothing in the template, computeds, or watchers reads from
it. Reactivity is therefore inappropriate.

**Rationale.**

- Idiomatic Vue: imperative DOM refs don't need to be reactive.
- Removes the recursive-update warning, lets the parity tests run with no
  unhandled rejections.
- API and behaviour are unchanged.

**Scope justification.** The fix lives inside `PinInput.vue`, which is
explicitly in the T-Vue-Cleanup zone (`packages/vue/src/components/ui/
PinInput.vue`). Without it the new parity test could not be added without
breaking the test runner's exit code for the whole package.

## D3. `SgInlineEdit` parity assertions probe via query selector

**Context.** `InlineEdit.vue` uses a top-level `<template v-if="!editing">`
chained with `<span v-else-if="unstyled">` and `<span v-else>`. From
@vue/test-utils' point of view the SFC is multi-root (the inner `<template>`
yields a fragment with its own `v-if/v-else-if/v-else`), so
`wrapper.element` is a synthetic placeholder, not the rendered `<span>`.

**Decision.** For the two `SgInlineEdit (view, …)` parity tests, locate the
real root via `wrapper.find('.sg-inline-edit-view').element` and feed that
to the existing `prune(shape(...))` helpers. All other SFCs in the suite
have a single render-time root and `rootShape(wrapper)` continues to work.

**Rationale.** Re-architecting `InlineEdit` to a single-root template
(e.g. always render an outer `<span>` and switch inner content) was out of
scope and would have widened the diff considerably. Parity is asserted on
the same `sg-*` class set; only the lookup differs.
