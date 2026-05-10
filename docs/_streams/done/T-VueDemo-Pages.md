# T-VueDemo-Pages — DONE

> Task: port missing component pages from `examples/demo` (React) to
> `examples/demo-vue`. Only components that already ship in `@skygraph/vue`
> were ported. Showcases / Benchmarks were intentionally **excluded** per
> task brief.

## Summary

- Audited `examples/demo` React routes, `examples/demo-vue` existing routes,
  and `@skygraph/vue` exports. See list A / B / C below.
- Added **33 new Vue demo pages** in `examples/demo-vue/src/pages/`.
- Registered them in `src/router/index.ts` and grouped in `src/nav.ts` to
  mirror the React-demo `buildComponentsSidebar` order.
- `pnpm --filter demo-vue build` is green (`vue-tsc -b && vite build`,
  415 modules transformed, 2.57s).

## Verification

```
pnpm --filter demo-vue build
> demo-vue@0.0.0 build
> vue-tsc -b && vite build
✓ 415 modules transformed.
✓ built in 2.57s
```

(`demo-vue` package has no separate `typecheck` script — `vue-tsc -b` runs
as the first step of `build`, so the build itself acts as the type check.)

## File zone touched

- `examples/demo-vue/src/pages/*.vue` — 33 new files (see list A).
- `examples/demo-vue/src/router/index.ts` — appended imports + route records.
- `examples/demo-vue/src/nav.ts` — appended sidebar entries (additive only).

No files outside the declared zone were edited. `packages/**` and
`examples/{demo, showcases, _shared-react}` were not touched.

## List A — ported (component exists in Vue package, was missing from Vue demo)

| # | Sidebar key | New file | Section |
|---|---|---|---|
| 1 | `components/rate` | `RatePage.vue` | dataEntry |
| 2 | `components/autocomplete` | `AutoCompletePage.vue` | dataEntry |
| 3 | `components/breadcrumb` | `BreadcrumbPage.vue` | navigation |
| 4 | `components/dropdown` | `DropdownPage.vue` | navigation |
| 5 | `components/popconfirm` | `PopconfirmPage.vue` | feedback |
| 6 | `components/collapse` | `CollapsePage.vue` | dataDisplay |
| 7 | `components/empty` | `EmptyPage.vue` | feedback |
| 8 | `components/result` | `ResultPage.vue` | feedback |
| 9 | `components/segmented` | `SegmentedPage.vue` | navigation |
| 10 | `components/steps` | `StepsPage.vue` | navigation |
| 11 | `components/timeline` | `TimelinePage.vue` | dataDisplay |
| 12 | `components/carousel` | `CarouselPage.vue` | dataDisplay |
| 13 | `components/descriptions` | `DescriptionsPage.vue` | dataDisplay |
| 14 | `components/timepicker` | `TimePickerPage.vue` | dataEntry |
| 15 | `components/colorpicker` | `ColorPickerPage.vue` | dataEntry |
| 16 | `components/list` | `ListPage.vue` | dataDisplay |
| 17 | `components/tree` | `TreePage.vue` | dataDisplay |
| 18 | `components/treeselect` | `TreeSelectPage.vue` | dataEntry |
| 19 | `components/cascader` | `CascaderPage.vue` | dataEntry |
| 20 | `components/calendar` | `CalendarPage.vue` | dataEntry |
| 21 | `components/notification` | `NotificationPage.vue` | feedback |
| 22 | `components/transfer` | `TransferPage.vue` | dataEntry |
| 23 | `components/upload` | `UploadPage.vue` | dataEntry |
| 24 | `components/configprovider` | `ConfigProviderPage.vue` | general |
| 25 | `components/form` | `FormPage.vue` | dataEntry |
| 26 | `components/table` | `TablePage.vue` | dataDisplay |
| 27 | `components/charts` | `ChartsPage.vue` | dataDisplay |
| 28 | `components/diagram` | `DiagramPage.vue` | dataDisplay |
| 29 | `components/dashboard` | `DashboardPage.vue` | dataDisplay |
| 30 | `components/gantt` | `GanttPage.vue` | dataDisplay |
| 31 | `components/event-timeline` | `EventTimelinePage.vue` | dataDisplay |
| 32 | `components/resource-calendar` | `ResourceCalendarPage.vue` | dataDisplay |
| 33 | `components/schema-form-editor` | `SchemaFormEditorPage.vue` | dataEntry |

Each page follows the existing `demo-vue` page contract:
`<ComponentDoc>` shell with `crumbs`, `description`, `when-to-use`, several
`<DemoBox>` examples and a `<PropsTable>` in the `#api` slot. `useDemoStrings`
is used for inline en/ru locale (no global dict additions needed).

## List B — skipped (in React demo, not in `@skygraph/vue`)

After auditing `packages/vue/src/index.ts` against `examples/demo/src/App.tsx`
`componentPages` map, **no item from React's component-nav was missing in
`@skygraph/vue`**. Every key listed in React `buildComponentsSidebar` has a
matching component export in Vue.

Therefore there is nothing to record in list B for the component pages.

The React demo also exposes a `guidePages` map (Getting Started, Theming,
Core API, Design Tokens, Styling Showcase, ConfigProvider). These are
documentation pages, not components — they are out of scope for
`T-VueDemo-Pages` per the task brief ("Не трогаем гайд / роадмап / about").

## List C — already in both demos

Existing `demo-vue` pages that already mirrored React demo before this
task. Only `nav.ts` ordering and section assignment were touched (additive
re-grouping inside the same section); no rewrite of existing files.

`spin`, `button`, `input`, `inputnumber`, `textarea`, `select`, `checkbox`,
`radio`, `switch`, `slider`, `datepicker`, `modal`, `drawer`, `tooltip`,
`tabs`, `menu`, `pagination`, `badge`, `tag`, `avatar`, `progress`,
`skeleton`.

`textarea` is kept although the React-demo does not list it as a separate
nav item (textarea lives under Input in React) — it is a pre-existing
demo-vue page, removing it would break inbound links and was out of scope.

## Findings & decisions

See:

- `docs/_streams/findings/T-VueDemo-Pages.md` — locale gaps, prop oddities,
  per-component caveats observed while porting.
- `docs/_streams/decisions/T-VueDemo-Pages.md` — how the page contract was
  chosen, why we kept the existing inline `useDemoStrings` pattern instead
  of expanding the global `DemoDict`, etc.
