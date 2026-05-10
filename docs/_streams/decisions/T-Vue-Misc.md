# T-Vue-Misc — Decisions

## D1. `SgDiagram` `defineExpose` reduced to React parity (`print` only)

**Context.** The Vue `Diagram` SFC was exposing three imperative methods:

```ts
defineExpose({
  print: (opts: { fileName?: string } = {}) => { ... },
  getSelectedIds: () => Array.from(selectedSet.value),
  setSelectedIds: (ids: NodeId[]) => { ... },
})
```

React's `Diagram` (via `forwardRef` + `useImperativeHandle`) exposes only:

```ts
export interface DiagramRef {
  print: (opts?: PrintOptions) => void
}
```

**Decision.**

1. Drop `getSelectedIds` and `setSelectedIds` from `defineExpose`. Selection
   management is performed through the existing `selectedNodeIds` prop and
   `selection-change` emit, which together cover the same use-cases without
   adding a Vue-only ref API.
2. Widen `print`'s parameter type from `{ fileName?: string }` to the full
   `PrintOptions` (imported from `../../../utils/print`). Vue now forwards
   every option on to `printElement` exactly like the React adapter, with
   the same `fileName` fallback (`opts.fileName ?? props.fileName ??
   'diagram'`).
3. Update `DiagramExpose` in `types.ts` to match the new shape and document
   the reduction.

**Rationale.**

- Charter §9 mandates publish-API parity. Extra Vue-only ref methods break
  parity at the consumer level (porting code from React would call
  `ref.current.setSelectedIds` and find it missing — same gap the other
  way around).
- T-Vue-Misc card: *"Не делать больше одного `defineExpose` чем в React."*
- Behaviour is recoverable: a consumer that previously called
  `ref.value.setSelectedIds(['a'])` can switch to `:selectedNodeIds="['a']"`
  with `@selection-change` to listen.

**Trade-offs.**

- Breaking change for any caller using the legacy methods. The adjacent
  `diagram.test.ts` test was updated to assert the methods are gone (the
  test lived in T-Vue-Misc's tests folder and was the only known caller).
- `PrintOptions` carries six extra fields; previously these were silently
  dropped on Vue. Aligning the contract is strictly additive for callers.

## D2. `HistoryPanel` keeps React's hard-coded English strings

**Context.** The T-Vue-Misc card asks `HistoryPanel.vue` to read locale
strings from `useConfig().locale.devtools.historyPanel.*`, with the
fallback "if the key is missing — log it in `findings/T-Vue-Misc.md`,
**don't** add the key (T-Docs-Locales scope)".

**Decision.** Hard-code the strings (`Time-Travel`, `Undo`, `Redo`,
`Clear`, `No history yet`, `write/writes`) in `HistoryPanel.vue` —
identical to React's `HistoryPanel.tsx`, which doesn't read from
`useConfig` either. Don't import `useConfig` for an empty-namespace
lookup.

**Rationale.**

- React's parity source itself is not localised (`HistoryPanel.tsx` lines
  99 / 106 / 113 / 116 / 122 / 142). Wiring `useConfig` on the Vue side
  would diverge from parity for no benefit.
- `SgLocale` does not declare `devtools.historyPanel`. Adding the namespace
  is explicitly out of scope for T-Vue-Misc and belongs to T-Docs-Locales.
- The devtool panel is intended for engineering surfaces; product-facing
  localisation is a non-goal.

Logged additionally in `findings/T-Vue-Misc.md` F1.

## D3. `zodAdapter` exports four functions matching the React surface

`zodRule`, `zodRules`, `zodDefaults`, and `zodToJsonSchema` are the four
exported entry points in `packages/react/src/adapters/zodAdapter.ts`. Vue
mirrors all four with identical signatures (no Vue-specific reactivity —
these are pure helpers used by `useForm` rules and by `SchemaForm`'s
JSON-Schema bridge). Types `ZodLikeSchema`, `ZodObjectLikeSchema`,
`ZodAdapterOptions` are also re-exported by name, so consumers porting
imports between adapters touch only the package specifier.
