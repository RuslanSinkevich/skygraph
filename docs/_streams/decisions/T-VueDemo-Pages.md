# T-VueDemo-Pages — decisions

> Decision Protocol per CHARTER §6 — taken without blocking the user.

## D1 — Page contract: keep existing `demo-vue` pattern, do not expand `DemoDict`

**Context.** Existing demo-vue pages (Button, Input, …) use a compact
`<ComponentDoc> + <DemoBox> + <PropsTable>` shell with locale strings
provided inline through `useDemoStrings({ en, ru })`. The React demo,
by contrast, uses a much heavier per-component module that imports
many `*.demo.tsx` files plus a large `dict-en/dict-ru` extension.

**Decision.** Keep the existing demo-vue compact pattern for every
new page. Do not extend the global `DemoDict` interface. Each new page
declares its own en/ru strings via `useDemoStrings(...)` immediately
above the template.

**Why.**
- Matches the established Vue-demo idiom (consistency with the 23
  pre-existing pages).
- Avoids cross-stream churn on `examples/demo-vue/src/i18n/{types,
  dict-en, dict-ru}.ts`. Other parallel tabs (`T-Docs-Locales`,
  `T-Vue-Misc`) may also touch those files.
- Any per-page string can move to the global dict later without
  breaking call sites — `useDemoStrings` is a thin wrapper.

## D2 — Same demo content, smaller scope per page

**Context.** Each React demo page renders 8–25 `*.demo.tsx` examples
(e.g. `FormDemo` aggregates 22 separate demo files). Reproducing the
exact list 1:1 in Vue would (a) duplicate ~250 small files for
`SchemaForm` family alone and (b) bloat the bundle.

**Decision.** Each new Vue demo page renders 4–7 representative
`<DemoBox>` examples (Basic, key variants, sizes, disabled, plus 1–2
component-specific cases — e.g. "with events" for Calendar, "picture
card" for Upload). All public props are still documented in
`<PropsTable>` for parity with the React API surface.

**Why.**
- The task brief says "ported pages should match React contract", not
  "copy every example file 1:1".
- Demo pages are a *live API showcase*, not a full handbook —
  the source of truth for every variant lives in
  `packages/vue/src/components/*` itself.
- Bundle stays under control (current build: 415 modules, 2.57s).

## D3 — Use `useGraph()` inline for the Diagram page

**Context.** `SgDiagram` requires `graph: GraphEngine` and a reactive
`state: GraphState`. The React demo wires this through a top-level
`DiagramDemo` component plus a custom `useDiagramSeed` hook.

**Decision.** Construct two graphs locally in `DiagramPage.vue` via
`useGraph()` from `@skygraph/vue`, populate them inside `onMounted`
using the public `graph.addNode / addEdge` API, and bind them straight
to `<SgDiagram>`.

**Why.**
- Keeps the demo page self-contained — no extra composable file.
- Mirrors the React idiom (also constructed inline via `useGraph()`).
- Makes the page a working integration smoke for `useGraph` ⇄ `SgDiagram`.

## D4 — `Notification` page mounts all four containers locally

**Context.** `notification.*` pushes into a global store; toasts only
appear if a matching `<SgNotificationContainer placement="…">` is
mounted somewhere in the tree. The Vue app shell currently mounts only
`topRight`.

**Decision.** Mount all four placement containers (`topRight`,
`topLeft`, `bottomRight`, `bottomLeft`) inside `NotificationPage.vue`
itself and render an explanatory note on the page.

**Why.**
- Page is self-sufficient (no need to touch `App.vue`).
- Visiting the page activates the placement demos; navigating away
  unmounts them — no leftover global UI surface area.
- Touching `App.vue` to add 3 more containers would step on the
  T-VueLayout zone unnecessarily.

## D5 — Keep `Textarea` page even though React-demo nav omits it

**Context.** The React demo bundles textarea behaviour into the Input
demo and has no `components/textarea` route. The Vue demo has had
`TextareaPage.vue` for a while.

**Decision.** Leave `components/textarea` in the Vue sidebar.

**Why.**
- It's a pre-existing route; removing it would break inbound links and
  is outside the additive scope of this task.
- Vue ships `SgTextarea` as a separate export, so an isolated demo is
  fair documentation.
- Re-grouping under React-aligned categories happens later if/when the
  React demo also gains a separate textarea route.

## D6 — `T-Vue-Charts` not blocking — port `ChartsPage` with current API

**Context.** `T-Vue-Charts` is in flight in another tab and may add
crosshair / brush / hover-toolbar examples. `ChartsPage.vue` could
either (a) wait for that work or (b) ship a baseline now and let the
charts stream extend it later.

**Decision.** Ship a baseline `ChartsPage` covering Line / Bar / Area /
Pie / Donut with `legend`, `categories`, `series`. Document the props
that are stable today.

**Why.**
- `T-VueDemo-Pages` is explicitly not blocked by `T-Vue-Charts`
  (CHARTER stream graph).
- The added crosshair / brush primitives are additive imports
  (`SgChartCrosshair`, `SgChartBrush`, `SgChartHoverToolbar`) — they
  can be appended to `ChartsPage.vue` later without touching the
  current `<DemoBox>` set.
