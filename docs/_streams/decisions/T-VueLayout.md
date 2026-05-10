# T-VueLayout — Decisions

## D1. Path-alias resolution для `vue` в `_shared-vue`

**Контекст.** `examples/_shared-vue` — workspace-пакет, но `pnpm install` запрещён CHARTER §5. Поэтому `examples/_shared-vue/node_modules/vue` не существует, и при `vue-tsc -b` из demo-vue компилируются `_shared-vue/src/layout/*.vue`, которые не могут разрешить `import { ... } from 'vue'`.

**Решение.** В `examples/demo-vue/tsconfig.app.json` добавлен `paths`-маппинг `"vue": ["./node_modules/vue"]` плюс `_shared-vue/src/**/*.{ts,vue}` явно включены в `include`. Это позволяет TS резолвить vue из demo-vue node_modules, где он реально уже symlinked. На runtime Vite алиасы `@skygraph-examples/shared-vue` → `../_shared-vue/src/index.ts` справляются без install.

**Альтернативы (отвергнуты):**
1. Запустить `pnpm install` — запрещено CHARTER §5.
2. Положить копию vue в `_shared-vue/node_modules/` — порча сторонних артефактов.
3. Сделать `_shared-vue` пакетом с собственным build-step и dist/ — выходит за scope «shell без build step» (см. README React-аналога).

Минимально инвазивно: один лишний path в tsconfig.app.json + два лишних include-glob.

## D2. NavItems в Header — только `Components` + `GitHub`

**Контекст.** CHARTER велит «отзеркалить от `examples/demo/src/App.tsx`, минус showcases/benchmarks». В React-демо это `components / guide / showcases / benchmarks / roadmap / about / github`. У Vue-демо нет страниц `guide / roadmap / about` — клик увёл бы пользователя через router-fallback на `/`, что хуже, чем отсутствующий пункт.

**Решение.** В Header сейчас только два пункта:
- `components` → `#/components/button` (живой раздел).
- `github` (external) → `GITHUB_URL`.

Когда T-VueDemo-Pages создаст `Roadmap.vue` / `About.vue` / `Guide*.vue`, оно само append-ит соответствующие `NavItem`-ы в `App.vue#navItems`. Это допустимо в его зоне (`App.vue` — наша зона; T-VueDemo-Pages в зоне «append маршрутов в `nav.ts`/`main.ts`», `App.vue` для него запрещён). Поэтому, если потребуются новые nav-пункты, их добавим тут же при необходимости в рамках T-VueLayout finalize — но пока что страниц нет, пунктов тоже нет.

## D3. Footer columns — урезанный набор (без guide/showcases/about/roadmap-ссылок)

**Контекст.** Те же отсутствующие страницы — нельзя отдавать ссылку, ведущую в фоллбэк.

**Решение.** Footer-колонки оставлены, но ссылки только на:
- `Components` (intra-app, работает).
- Все external-ссылки (Changelog, Architecture, Contributing, GitHub, Issues, License) — они ведут в репозиторий.
- Колонки `Documentation / Resources / Community / Project` сохранены (DOM-паритет с React).

Когда страницы появятся в T-VueDemo-Pages, добавление intra-ссылок в `App.vue#footerColumns` тоже append-only.

## D4. Удалены локальные Header/Sidebar/ThemeToggle/LanguageToggle, dv-* layout CSS

**Контекст.** Зона T-VueLayout прямо разрешает их «удалить или перенести». Их функционал полностью покрыт shared-версиями.

**Решение.** Файлы удалены:
- `examples/demo-vue/src/components/Header.vue`
- `examples/demo-vue/src/components/Sidebar.vue`
- `examples/demo-vue/src/components/ThemeToggle.vue`
- `examples/demo-vue/src/components/LanguageToggle.vue`

Из `examples/demo-vue/src/style.css` удалены классы `.dv-app / .dv-header* / .dv-shell* / .dv-sidebar-* / .dv-footer / .dv-theme-toggle / .dv-lang*` (теперь даёт `xshell-*` из `_shared-vue/layout/styles.css`). Сохранены `.dv-doc-* / .dv-demo-* / .dv-props-* / .dv-landing-*` — их используют `ComponentDoc.vue / DemoBox.vue / PropsTable.vue / Landing.vue`.

## D5. Брэнд показывается без суффикса «Vue»

**Контекст.** В старом `Header.vue` было `SkyGraph <span>Vue</span>`. React-аналог — просто `SkyGraph`. Контракт `<Header brand: string>` — простая строка.

**Решение.** Передаём `brand="SkyGraph"`. Подписать «Vue» можно отдельным extras-слотом если потребуется — пока в шапке справа FrameworkSwitcher отсутствует (его нет в Vue-демо как компонента).
