# @skygraph-examples/shared-vue

Vue 3 mirror of `@skygraph-examples/shared-react` — layout shell shared by
`examples/demo-vue` (and any future Vue-based showcase).

Re-usable components: `<AppShell>`, `<Header>`, `<Footer>`, `<Sidebar>`,
`<ThemeSwitcher>`, `<LanguageSwitcher>`.

The shell is intentionally minimal — it only provides the chrome (top
bar, sidebar gutter, footer) and lets each app fill `default` slot. Apps
own routing, page rendering and i18n.

DOM structure and `xshell-*` class names are byte-identical with the
React version, so `layout/styles.css` is the same file. Theme is
inherited from `data-sg-theme="dark"` on `<html>` (set by SkyGraph
`@skygraph/styles`).

Consumed via the `pnpm` workspace alias — no build step.
