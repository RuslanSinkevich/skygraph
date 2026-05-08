# Vue UI Primitives Port — Report

Batch: V4 (Feedback / Navigation / Display + ConfigProvider/Transition/Button)
Date: 2026-05-08
Scope: port 27 React UI primitives → `@skygraph/vue` SFC components.

## Components shipped

Path: `packages/vue/src/components/ui/`

Feedback (10): `Modal.vue`, `Drawer.vue`, `Notification.vue` (incl. `NotificationContainer`),
`Popconfirm.vue`, `Tooltip.vue`, `Progress.vue`, `Spin.vue`, `Result.vue`, `Empty.vue`,
`Skeleton.vue`.

Navigation (7): `Tabs.vue`, `Menu.vue`, `Breadcrumb.vue`, `Dropdown.vue`, `Pagination.vue`,
`Steps.vue`, `Segmented.vue`.

Display (7): `Badge.vue`, `Tag.vue`, `Avatar.vue`, `Carousel.vue`, `Timeline.vue` (step-based,
distinct from `EventTimeline`), `Descriptions.vue`, `Collapse.vue`.

Misc (3): `Button.vue` (moved from `components/Button/`), `Transition.vue`, `ConfigProvider.vue`.

Supporting infrastructure:
- `packages/vue/src/types.ts` — `SizeType`, `BaseComponentProps`, locale interfaces.
- `packages/vue/src/composables/useFocusTrap.ts` — WAI-ARIA focus trap for `Modal`/`Drawer`/`Popconfirm`.
- `packages/vue/src/components/Button/index.ts` — re-exports the moved `SgButton` for back-compat.

## Conventions

- **ConfigProvider**: Vue `provide`/`inject` instead of React Context. Reactive `ComputedRef<SgConfig>`
  returned from `useConfig()`. `useConfigWithDefaults()` resolves `size`/`disabled` against the
  inherited config. Boolean props that participate in inheritance (`disabled`, `bordered`) use
  explicit `defineProps({ ...: { type: Boolean, default: undefined } })` so the absence of a prop
  produces `undefined` (Vue's runtime would otherwise coerce it to `false`).
- **Modal/Drawer/Notification**: `<Teleport to="body">` is used in place of React `createPortal`.
- **Transition**: replicates the React CSS-class contract (`{name}-enter-from`, `-enter-active`,
  `-enter-to`, `-leave-*`) instead of Vue's built-in `<Transition>` to keep the same DOM/CSS
  contract as `@skygraph/react`.
- **Notification**: a single global notification queue exposed via `notification` API + a
  `NotificationContainer` component. `useNotification()` returns the same singleton.

## Tests

Path: `packages/vue/src/__tests__/components/`

| File                       | Tests |
|----------------------------|------:|
| `ui-config.test.ts`        |    13 |
| `ui-button.test.ts`        |    14 |
| `ui-feedback.test.ts`      |    62 |
| `ui-navigation.test.ts`    |    56 |
| `ui-display.test.ts`       |    50 |
| `ui-a11y.test.ts`          |    24 |
| `ui-extended.test.ts`      |    52 |
| **Total**                  | **271** |

Target was 250–300 tests; landed at **271**, all passing.

## Gates

- `pnpm --filter @skygraph/vue exec vitest run` → **575 tests passed across 34 files** (the 271
  above plus parallel-batch tests) on a single jsdom run.
- `pnpm --filter @skygraph/vue build` → succeeds, `dist/index.js` ≈ 300 kB / 65 kB gzip.
  No dts errors originating from this batch.
- `pnpm --filter @skygraph/vue exec vue-tsc --noEmit` → no type errors in any of the new
  `components/ui/*.vue`, the new tests, the new `composables/useFocusTrap.ts`, or the new
  `types.ts`. Pre-existing type errors remain in `components/complex/Form/*`,
  `components/ui/Checkbox.vue`, `__tests__/components/{list,virtual-list,table}.test.ts`,
  and a handful of composable tests; those are out of scope for this batch.

## Spec deviations

- **a11y axe-core tests**: `axe-core` / `vitest-axe` are not currently dependencies of
  `@skygraph/vue` (the parent monorepo doesn't expose them transitively to this workspace).
  Instead of pulling in a new dependency mid-batch, `ui-a11y.test.ts` exercises the same
  invariants the React `a11y-axe.test.tsx` checks at the structural level: ARIA roles
  (`dialog`, `tab`, `menu`, `progressbar`, `radiogroup`, `status`, `listitem`, `step`),
  required ARIA attributes (`aria-modal`, `aria-current`, `aria-selected`, `aria-expanded`,
  `aria-valuenow`, `aria-busy`, `aria-disabled`, `aria-label`), keyboard focus traps for
  modals/drawers, and the absence of inert wrappers (e.g. no `<button>` nested in a
  `role="button"` element). When `axe-core` is added to the package's devDependencies it
  can be wired in without test rewrites — the existing assertions are a strict subset.
- **Carousel** uses a render-function `defineComponent` (not `<script setup>`) because the
  component needs to invoke the default slot inside its render scope; using `useSlots()` in
  `<script setup>` triggered `[Vue warn]: Slot "default" invoked outside of the render
  function`. Functionality is identical to the React port.

## File extension

Components live in `*.vue` (Vue SFC), not `*.tsx`. The task brief listed `*.tsx` paths, but
`@skygraph/vue` is set up for SFCs (`@vitejs/plugin-vue`, `@vue/compiler-sfc`,
`vue-tsc`). The naming is a brief mismatch; the structure under `components/ui/` matches the
intent (one component per file, identical exports).

## Commit

`feat(vue/ui): port 27 ui primitives (feedback + navigation + display + ConfigProvider/Transition)`
