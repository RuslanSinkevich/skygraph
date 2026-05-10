# T-Vue-Misc — Findings (out of scope)

## F1. `SgLocale` does not expose a `devtools.historyPanel` namespace

`packages/vue/src/types.ts` declares the `SgLocale` interface with these
sub-namespaces only: `modal`, `popconfirm`, `empty`, `pagination`,
`inputPassword`, `searchInput`, `tagInput`, `pinInput`, `inlineEdit`. There
is no `devtools` slot.

The T-Vue-Misc card calls out:

> Локализация через `useConfig().locale.devtools.historyPanel.*` (если
> ключи отсутствуют — записать в `findings/T-Vue-Misc.md`, **не
> добавлять** ключи в локали — это зона T-Docs-Locales).

Recording per the protocol. The Vue `HistoryPanel.vue` keeps React's
hard-coded English strings 1:1 (see `decisions/T-Vue-Misc.md` D2).
T-Docs-Locales can introduce the namespace and route the strings through
`useConfig` later without touching the panel's structure.

## F2. `vue-tsc` warnings on `slots.<name>` truthy checks (re-confirmed)

`pnpm --filter @skygraph/vue build` continues to surface the two
pre-existing TS2774 warnings reported in `findings/T-Vue-Cleanup.md` F1
(`List.vue:298`, `Table.vue:210`). T-Vue-Misc didn't touch either file
and the warnings are unchanged. Re-confirmed; not actioned.

## F3. `examples/_shared/src/index.ts` re-exports `useHistory` from
`@skygraph/react` only

While reading the React `useHistory` source for parity, noticed that the
shared `examples/_shared` barrel exposes the React composable but no
Vue analogue, even though `@skygraph/vue` exports `useHistory` from
`./composables/useHistory`. This does not block T-Vue-Misc — the panel
imports directly from the package — but `examples/_shared-vue` (created
by T-VueLayout) might want a parallel `useHistory` re-export when the
`demo-vue` history-panel page lands. Out of scope here.
