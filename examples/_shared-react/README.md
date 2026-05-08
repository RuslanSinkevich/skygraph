# @skygraph-examples/shared-react

React layout shell shared by `examples/demo` and `examples/showcases`.
Re-usable components: `<AppShell>`, `<Header>`, `<Footer>`, `<Sidebar>`,
`<ThemeSwitcher>`, `<LanguageSwitcher>`.

The shell is intentionally minimal — it only provides the chrome (top
bar, sidebar gutter, footer) and lets each app fill `children`. Apps
own routing, page rendering and i18n.

Linear/Radix-style: tight typography, monospace logo, single-pixel
borders, `var(--sg-color-*)` tokens for every colour. Dark mode is
inherited from `data-sg-theme="dark"` on `<html>` (set by SkyGraph
`@skygraph/styles`).

Consumed via the `pnpm` workspace symlink — no build step.
