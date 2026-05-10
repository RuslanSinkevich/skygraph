# T-Vue-Cleanup — Findings (out of scope)

## F1. `vite-plugin-dts` TS2774 warnings on `slots.<name>` truthy checks

`pnpm --filter @skygraph/vue build` emits two pre-existing warnings during
the `vite-plugin-dts` declaration pass:

```
src/components/complex/List/List.vue:298:16 - error TS2774:
  This condition will always return true since this function is always defined.
  Did you mean to call it instead?

  <div v-if="slots.loadMore" class="sg-list-load-more">
                ~~~~~~~~~~~~~~

src/components/complex/Table/Table.vue:210:27 - error TS2774:
  This condition will always return true since this function is always defined.
  Did you mean to call it instead?

      v-if="searchable || slots.toolbar"
                          ~~~~~~~~~~~~~
```

These come from `vue-tsc`'s stricter inference about `useSlots()` return
shape: a slot accessor is `() => VNode[]` (always truthy as a function),
so `v-if="slots.foo"` is meaningless — the templates need either
`slots.foo?.()` (call & test the result) or check `slots.foo !== undefined`.

The build still produces `dist/index.{js,cjs,d.ts}` and `pnpm typecheck`
runs clean, so these are reported as warnings, not errors, and don't fail
the build.

Both files (`List.vue`, `Table.vue`) are explicitly out of T-Vue-Cleanup's
zone. Recording for whichever stream owns Lists/Tables.

## F2. PinInput stored DOM refs in a `ref([])` — recursive update warning

The `cellRefs` bag in `packages/vue/src/components/ui/PinInput.vue` was
declared as `ref<(HTMLInputElement | null)[]>([])` and mutated on every
render via `bindRef`. Vue then issued
`Maximum recursive updates exceeded in component <PinInput>`.

This file *is* in T-Vue-Cleanup's zone, so the fix was applied here. Logged
in `decisions/T-Vue-Cleanup.md` (D2). Listed here as well because it was a
latent bug, not part of the original cleanup checklist.
