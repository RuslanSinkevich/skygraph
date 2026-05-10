# T-VueDemo-Pages — findings

> Notes accumulated while porting React demo component pages to Vue.
> Nothing here is a blocker; items are recorded so subsequent streams
> (`T-Docs-Locales`, `T-Vue-Misc`, `T-Codegen`, `T-Quality`) can pick
> them up.

## F1 — `SgSpace` not exported from `@skygraph/vue`

**Where.** Trying to wire `ConfigProviderPage.vue` initially used
`SgSpace` to lay out controls horizontally with consistent gap.

**Observation.** `packages/vue/src/index.ts` exports a long list of
UI primitives but **no `SgSpace`**. The React package likely has it
(used in many React demos). For now I fell back to a plain
`<div style="display: flex; gap: 8px; align-items: center;">`.

**Suggested follow-up (not for this task).** Add `SgSpace` to
`packages/vue/src/components/ui/Space.vue` to close the parity gap.
Out of scope here — `packages/**` is a forbidden zone.

## F2 — `notification` typing nuance: `notification.open(...)` vs shorthand

**Where.** `NotificationPage.vue`.

**Observation.** Shorthand methods (`notification.success(message,
description?)`) take only `(message, description?)`; advanced options
(`placement`, `duration`, `key`, `onClose`) require
`notification.open({...})` with `type` set explicitly. The React
contract is identical, so this is documentation, not a defect.

## F3 — `SgSwitch` / `SgCheckbox` use `update:modelValue`, not
`update:checked`

**Where.** `FormPage.vue` initially wired `:checked` + `@update:checked`
mirroring React's `checked` prop. `vue-tsc` rejected this — both
components emit `update:modelValue`.

**Action taken.** Switched to `:model-value` + `@update:modelValue`.
The `checked` and `defaultChecked` props *do exist* as compat aliases on
both components, but the only emit is `update:modelValue`. Page builds
green now.

**Suggested follow-up (out of scope).** Either also emit
`update:checked` for parity with React's prop name, or remove the
`checked` compat alias to avoid the mismatch entirely. Decision belongs
to the package maintainers.

## F4 — `Table` row id is typed as `string`, but `RowId` from core
includes both `string | number`

**Where.** `TablePage.vue`.

**Observation.** `TableProps.data` is typed as
`Array<{ id: RowId; data: Record<string, unknown> }>`. `RowId` from
`@skygraph/core` is `string | number`, but `vue-tsc` insisted on
`id: string` here (likely because the imported `RowId` resolves to
`string` for that re-export path).

**Action taken.** Generated rows with `id: String(i + 1)` to satisfy
the inferred shape. Acceptance criteria — pages must build clean —
is met.

**Suggested follow-up (out of scope).** Audit the `RowId` re-export
path so `string | number` survives end-to-end.

## F5 — `Diagram.outline` requires `{ kind: 'rect', w, h }` per node

**Where.** `DiagramPage.vue`.

**Observation.** Without `outline` the node wrappers default to a
0×0 box and edges anchor at `(0,0)`. The unit tests in
`packages/vue/src/__tests__/components/diagram.test.ts` pass `outline:
{ kind: 'rect', w: 80, h: 40 }` on every node. The demo page does the
same and renders correctly.

This is intended API; just noting that "minimum viable Diagram setup"
needs three pieces: `useGraph()`, `addNode({...with outline...})`,
`addEdge(...)`.

## F6 — `EditorField.type` enum is the JSON-Schema-style name set,
not "ui-name" set

**Where.** `SchemaFormEditorPage.vue`.

**Observation.** First attempt used `type: 'text'` and
`type: 'checkbox'` for the seed schema. `vue-tsc` rejected both.
The `FieldType` union from `SchemaForm/AutoField.vue` is:
`'string' | 'number' | 'boolean' | 'email' | 'url' | 'date' | 'time'
| 'textarea' | 'select' | 'multiselect' | 'password' | 'color' |
'slider' | 'rate' | 'file' | 'switch' | 'radio'`.

**Action taken.** Used `'string'` (instead of `'text'`) and `'switch'`
(instead of `'checkbox'`) in the seed schema. Page builds green.

**Suggested follow-up (out of scope).** Consider adding
`'text' | 'checkbox'` aliases to `FieldType` for parity with HTML input
type names — would reduce surprise for users coming from the React
demo where similar aliases exist. Belongs to the core package owners.

## F7 — `SgGantt` `range` is autoderived from tasks if omitted

**Where.** `GanttPage.vue`.

**Observation.** Provided no `range` in the basic demo; component
correctly inferred a range covering all tasks. This matches the React
behaviour. Documented in the page's `<PropsTable>`.

## F8 — `ResourceCalendar` has no `editable` flag separate from
`draggable + resizable`

**Where.** `ResourceCalendarPage.vue`.

**Observation.** React demo has `editable` shorthand; Vue version
exposes only `draggable` and `resizable` directly. Page combines them
in the "Interactive" demo (`<SgResourceCalendar draggable resizable
.../>`).

**Suggested follow-up (out of scope).** Either add `editable` shortcut
or document the explicit two-prop pattern more visibly. Belongs to
package owners.

## F9 — Inline `useDemoStrings` keys not added to `SgLocale`

Per task brief: "Если в `SgLocale` уже есть ключ — окей. Если нет — НЕ
добавляем, фиксируем в `findings`".

All ported pages use page-local `useDemoStrings({ en, ru })` for
section titles and copy. Some recurring micro-strings (`'Disabled'`,
`'Sizes'`, `'Basic'`) are repeated across multiple pages and could in
principle move to a shared dict slice — recorded here as a future
DX clean-up for the docs/locale stream, not addressed in this task.

## F10 — Build size shape

End state of `pnpm --filter demo-vue build`:

```
✓ 415 modules transformed.
dist/assets/index-*.css           201.65 kB │ gzip:  26.69 kB
dist/assets/index-*.js            102.66 kB │ gzip:  39.05 kB
dist/assets/SchemaFormEditorPage   33.93 kB │ gzip:  10.15 kB
dist/assets/TreePage               26.53 kB │ gzip:   8.50 kB
dist/assets/TablePage              20.78 kB │ gzip:   7.57 kB
dist/assets/DiagramPage            17.56 kB │ gzip:   7.06 kB
dist/assets/Field.vue chunk        14.50 kB │ gzip:   5.09 kB
dist/assets/PieChart chunk         14.01 kB │ gzip:   4.35 kB
…
✓ built in 2.57s
```

The largest pages (SchemaFormEditor, Tree, Table, Diagram) chunk-split
naturally because routes are dynamic-imported in `router/index.ts` —
there is no eager-import cliff.
