# T-VueLayout — Done

## Сводка

Создан пакет `examples/_shared-vue/layout` (Vue-зеркало `_shared-react/layout`) и `examples/demo-vue` переведён на общий AppShell. DOM-структура шапки/сайдбара/футера byte-identical с React-демо (общий файл `xshell-*` стилей). Showcases / Benchmarks не переносились (CHARTER §2 не-цели).

## Файлы

### Создано

- `examples/_shared-vue/package.json`
- `examples/_shared-vue/tsconfig.json`
- `examples/_shared-vue/README.md`
- `examples/_shared-vue/src/index.ts`
- `examples/_shared-vue/src/layout/index.ts`
- `examples/_shared-vue/src/layout/useAppShell.ts`
- `examples/_shared-vue/src/layout/AppShell.vue`
- `examples/_shared-vue/src/layout/Header.vue`
- `examples/_shared-vue/src/layout/Sidebar.vue`
- `examples/_shared-vue/src/layout/Footer.vue`
- `examples/_shared-vue/src/layout/ThemeSwitcher.vue`
- `examples/_shared-vue/src/layout/LanguageSwitcher.vue`
- `examples/_shared-vue/src/layout/styles.css` (точная копия `_shared-react/layout/styles.css`)

### Изменено

- `examples/demo-vue/package.json` — добавлены workspace-зависимости `@skygraph-examples/shared` и `@skygraph-examples/shared-vue`.
- `examples/demo-vue/vite.config.ts` — добавлены alias-маппинги для `@skygraph-examples/shared` и `@skygraph-examples/shared-vue` (+ subpath `/layout`, `/layout/styles.css`).
- `examples/demo-vue/tsconfig.app.json` — добавлены `paths` для shared-пакетов и для `vue` (см. decisions D1), а также `include` для `../_shared-vue/src/**`.
- `examples/demo-vue/src/main.ts` — импорт `@skygraph-examples/shared-vue/layout/styles.css`.
- `examples/demo-vue/src/App.vue` — переписан на `<AppShell>` + `<Header>` + `<Sidebar>` + `<Footer>` + `<LanguageSwitcher>` + `<ThemeSwitcher>` из `_shared-vue/layout`.
- `examples/demo-vue/src/nav.ts` — `buildComponentsSidebar` теперь возвращает `SidebarSection[]` из `_shared-vue/layout` (поле `key` мирорит React-роуты, без `to`-полей). Добавлены утилиты `keyToRoute` / `routeToKey`.
- `examples/demo-vue/src/i18n/types.ts` — `DemoDict` расширен ключами `menuSections.{general,guide}`, `header.{navGuide,navRoadmap,navAbout,navGithub,burgerAria}`, новый блок `footer.*`, новый блок `language.*`.
- `examples/demo-vue/src/i18n/dict-en.ts` и `dict-ru.ts` — добавлены значения для новых ключей.
- `examples/demo-vue/src/style.css` — удалены классы `.dv-app/.dv-header*/.dv-shell*/.dv-sidebar*/.dv-footer/.dv-theme-toggle/.dv-lang*` (заменены `xshell-*`). Сохранён documentation-page chrome (`.dv-doc-*/.dv-demo-*/.dv-props-*/.dv-landing-*`).

### Удалено

- `examples/demo-vue/src/components/Header.vue`
- `examples/demo-vue/src/components/Sidebar.vue`
- `examples/demo-vue/src/components/ThemeToggle.vue`
- `examples/demo-vue/src/components/LanguageToggle.vue`

## Acceptance criteria

| # | Критерий | Статус |
|---|---|---|
| 1 | Пакет `_shared-vue/layout` существует, экспортирует AppShell + 5 связанных компонентов (Header, Sidebar, Footer, ThemeSwitcher, LanguageSwitcher) | ✅ |
| 2 | `examples/demo-vue` использует `AppShell` из `_shared-vue` | ✅ |
| 3 | DOM-структура хедера/сайдбара совпадает с React-демо по `sg-*`/`xshell-*` классам | ✅ (одинаковый styles.css, одинаковые классы — см. сравнение DOM ниже) |
| 4 | `pnpm --filter demo-vue build` зелёный | ✅ (см. лог под отчётом) |
| 5 | Theme toggle и language toggle работают | ✅ (`ThemeSwitcher` ставит `data-sg-theme`, `LanguageSwitcher` эмитит `change`, App.vue вызывает `setLocale`) |
| 6 | В навигации Vue-демо нет пунктов «Showcases» и «Benchmarks» | ✅ |

## Сравнение DOM-структуры (Vue ↔ React)

Все компоненты используют одинаковые тэги и одинаковые `xshell-*` классы. Разницы нет, кроме идиоматики (Vue слоты вместо React `ReactNode` props):

| Компонент | React | Vue |
|---|---|---|
| AppShell | `header: ReactNode` props | `<template #header>` slot |
| AppShell | `sidebar: ReactNode` (null = скрыть) | `<template v-if=... #sidebar>` (отсутствие slot = скрыть) |
| AppShell | `footer: ReactNode` | `<template #footer>` slot |
| AppShell | `children: ReactNode` | default slot (`<RouterView />`) |
| Header | `extras: ReactNode` prop | `<template #extras>` slot |
| Header | `onSelect: (key) => void` | `@select="key"` event |
| Header | `onSearchChange: (v) => void` | `@update:search-value="v"` event (`v-model:search-value` совместимо) |
| Sidebar | `onSelect: (key) => void` | `@select="key"` event |
| Sidebar | `children: ReactNode` (custom widget) | default slot |
| Footer | `onSelect: (href) => void` | `@select="href"` event |
| Footer | `extras: ReactNode` | `<template #extras>` slot |
| LanguageSwitcher | `onChange: (code) => void` | `@change="code"` event |
| ThemeSwitcher | self-contained | self-contained (то же поведение) |

Класс-prefix `xshell-*` идентичный, breakpoints (`@media ≤1024`/`≤600`) идентичные, theme-storage-key (`skygraph-demo-theme`) идентичный — light/dark переключение шарится между React-демо и Vue-демо в одном браузере.

## Verification log

```text
> demo-vue@0.0.0 build D:\Users\Admin\Desktop\Skycode\skygraph\examples\demo-vue
> vue-tsc -b && vite build

vite v5.4.21 building for production...
✓ 337 modules transformed.
dist/index.html                                                               0.41 kB │ gzip:  0.29 kB
dist/assets/index-BLpnQlzA.css                                              201.30 kB │ gzip: 26.61 kB
…
✓ built in 3.40s
```

`typecheck` (отдельный script) в `demo-vue/package.json` не объявлен, поэтому верификация выполнена через `build`, у которого первый шаг — `vue-tsc -b` (full typecheck по `tsconfig.app.json`).

## Decisions

См. `docs/_streams/decisions/T-VueLayout.md` — четыре зафиксированных решения (path-alias `vue`, минимальный набор navItems, минимальный footer, удаление local components + dv-* layout CSS, brand без суффикса).

## Findings

Нет (всё, что нужно было — было в зоне).

## Blocked

Нет.

## Что осталось для T-VueDemo-Pages

- `nav.ts#buildComponentsSidebar` сейчас содержит только существующие 22 страницы. T-VueDemo-Pages append-ит новые items по мере добавления Page.vue.
- `App.vue#navItems` и `footerColumns` могут быть расширены под Roadmap/About/Guide, когда T-VueDemo-Pages создаст соответствующие страницы (App.vue в зоне T-VueLayout, но T-VueDemo-Pages всё равно может править `App.vue` через нас, если потребуется).
