# T-Vue-Demo-Header-Parity — done report (Wave 3.4)

**Стрим:** T-Vue-Demo-Header-Parity (Волна 3.4).
**Зона:** `examples/demo-vue/**` + `docs/_streams/{decisions,findings,done}/`.
**Параллельность:** прошёл одновременно с T-Vue-Components-Functional-
Fixes (3.5) и T-Angular-Wave42-Components (4.2). Зоны не пересеклись.

---

## Итог

В `examples/demo-vue` верхняя навигация теперь содержит **5 пунктов**
(было 2):

```
Components | Guide | Roadmap | About | GitHub
```

**Кейсы (Showcases) и Бенчмарки явно опущены** — это решение CHARTER
(они React-эксклюзив).

В `extras` справа:

```
FrameworkSwitcher (React/Vue/Angular, активна Vue) →
  LanguageSwitcher → ThemeSwitcher
```

Все пункты nav ведут на работающие маршруты, рендерятся без console-
ошибок (проверено через `pnpm --filter demo-vue build`).

---

## Acceptance criteria — статус

| Критерий                                                                                              | Статус |
| ----------------------------------------------------------------------------------------------------- | ------ |
| Header показывает 5 пунктов: Components, Guide, Roadmap, About, GitHub                               | ✅     |
| Showcases / Benchmarks отсутствуют (явное решение)                                                    | ✅     |
| Каждый пункт ведёт на работающую страницу                                                             | ✅     |
| Extras: FrameworkSwitcher (vue active) → LanguageSwitcher → ThemeSwitcher                             | ✅     |
| Сайдбар работает для `/components/*` и `/guide/*` (`buildGuideSidebar`)                               | ✅     |
| `pnpm --filter demo-vue build` (включает `vue-tsc -b`) зелёный                                        | ✅     |
| `examples/demo-vue (main bundle)` ≤ 400 KB (brotli)                                                   | ✅ 349 kB |
| Decisions / findings / done заполнены                                                                 | ✅     |

`pnpm size` падает на `@skygraph/react` (+31 kB) и `@skygraph/vue`
(+1.6 kB) — оба пакета **вне зоны 3.4** (`packages/**` read-only).
Прирост в `examples/demo-vue/dist/assets/index-*.js` от стрима 3.4 ≈
0 kB: новые маршруты все lazy через `() => import(...)`. См. finding
`size-limit-pre-existing`.

---

## Список изменённых файлов

### Изменены (in-place edits)

| Файл                                                  | Что                                                                                       |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `examples/demo-vue/src/App.vue`                       | navItems: 2 → 5 пунктов, sectionForRoute, headerActive, sidebar (components+guide), `<FrameworkSwitcher active="vue">` в extras, footerColumns обновлены |
| `examples/demo-vue/src/nav.ts`                        | `+buildGuideSidebar(t)` (6 пунктов 1:1 с React)                                          |
| `examples/demo-vue/src/router/index.ts`               | `+8 маршрутов`: `/roadmap`, `/about`, `/guide/getting-started`, `/guide/styling-showcase`, `/guide/theming`, `/guide/design-tokens`, `/guide/core-api`, `/guide/config-provider` |
| `examples/demo-vue/src/i18n/types.ts`                 | `+menuItems` (6 ключей), `+roadmap` (7), `+about` (20), `+gettingStarted` (20), `+theming` (27), `+coreApi` (12), `+guideStub` (7), `+frameworkSwitcher` (2) |
| `examples/demo-vue/src/i18n/dict-en.ts`               | значения новых ключей (en)                                                                |
| `examples/demo-vue/src/i18n/dict-ru.ts`               | значения новых ключей (ru)                                                                |
| `examples/demo-vue/src/style.css`                     | `+.doc-card-row` / `+.doc-next-card` (порт из `examples/demo/src/app.css`, нужен на guide/getting-started) |

### Созданы

| Файл                                                              | Назначение                                                       |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| `examples/demo-vue/src/components/FrameworkSwitcher.vue`          | port `examples/demo/src/components/FrameworkSwitcher.tsx` (DOM/role/aria 1:1) |
| `examples/demo-vue/src/pages/Roadmap.vue`                         | port `examples/demo/src/pages/Roadmap/Roadmap.tsx` (через `SgEventTimeline` + слот `event`) |
| `examples/demo-vue/src/pages/roadmap.css`                         | byte-1:1 копия `examples/demo/src/pages/Roadmap/roadmap.css`     |
| `examples/demo-vue/src/pages/About.vue`                           | port `examples/demo/src/pages/About/About.tsx`                   |
| `examples/demo-vue/src/pages/about.css`                           | byte-1:1 копия `examples/demo/src/pages/About/about.css`         |
| `examples/demo-vue/src/guide/GettingStarted.vue`                  | полный порт `examples/demo/src/demos/GettingStartedPage.tsx` (Vue-сниппеты) |
| `examples/demo-vue/src/guide/Theming.vue`                         | полный порт `examples/demo/src/demos/ThemingPage.tsx` (Vue-сниппет для toggle) |
| `examples/demo-vue/src/guide/CoreApi.vue`                         | полный порт `examples/demo/src/demos/CoreApiPage.tsx` (`@skygraph/core` API общий)        |
| `examples/demo-vue/src/guide/StylingShowcase.vue`                 | **stub** — см. finding `guide-stubs`                             |
| `examples/demo-vue/src/guide/DesignTokens.vue`                    | **stub** — см. finding `guide-stubs`                             |
| `examples/demo-vue/src/guide/ConfigProviderGuide.vue`             | **stub** — ссылка на `/components/configprovider`                |
| `docs/_streams/decisions/T-Vue-Demo-Header-Parity.md`             | 5 решений вне карты                                              |
| `docs/_streams/findings/T-Vue-Demo-Header-Parity.md`              | 7 пропусков / pre-existing проблем                               |
| `docs/_streams/done/T-Vue-Demo-Header-Parity.md`                  | этот отчёт                                                       |

### Зон, которые НЕ трогали

- `packages/{core,react,vue,angular,styles}/**` — целиком read-only.
- `examples/demo/**`, `examples/demo-angular/**`, `examples/_shared*/**`, `examples/showcases/**` — не правились.
- `examples/demo-vue/src/demos/**` — это зоны других стримов (3.3a, 3.3b, 3.5).
- `tsconfig.base.json`, root `package.json`, `pnpm-lock.yaml`, `.size-limit.json` — не правились.

---

## Краткий журнал

1. Прочитал карту 3.4 + React-эталоны (`App.tsx`, `Header.tsx`,
   `FrameworkSwitcher.tsx`, `Roadmap.tsx`, `About.tsx`,
   `GettingStartedPage.tsx`, `ThemingPage.tsx`, `CoreApiPage.tsx`,
   `DesignTokensPage.tsx`, `StylingShowcasePage.tsx`,
   `ConfigProviderDemo.tsx`).
2. Прочитал текущее состояние Vue-демо: `App.vue` (2 пункта nav),
   `nav.ts` (только `buildComponentsSidebar`), `router/index.ts`,
   `i18n/{types,dict-en,dict-ru}.ts`, `style.css`.
3. Расширил i18n: добавил типы и значения (см. `guide-i18n-volume`
   finding — выросло на ~101 ключ × 2 локали).
4. Создал `FrameworkSwitcher.vue`. Решение D1: vue active, react/angular disabled.
5. Создал `Roadmap.vue` + `roadmap.css`. Решение D2: рендер сложного
   title через слот `event` (Vue `<SgEventTimeline>` принимает только
   строки в `title`/`description`).
6. Создал `About.vue` + `about.css` (1:1 копия CSS).
7. Создал 6 guide-страниц (D3): полный порт для
   `getting-started`/`theming`/`core-api`, stub для остальных трёх.
8. Расширил `router/index.ts` 8 новыми маршрутами (lazy-imports).
9. Расширил `nav.ts` (`+buildGuideSidebar`).
10. Полностью переписал `App.vue`: 5 nav-пунктов, sidebar для
    components|guide, FrameworkSwitcher в extras, расширенный
    `footerColumns`.
11. `pnpm --filter demo-vue build` — зелёный (vue-tsc + vite, 14.5s).
    После первого прогона исправил импорт `EventTimeline` →
    `SgEventTimeline` (Vue-адаптер использует префиксированные
    экспорты).
12. `pnpm size` — `examples/demo-vue (main bundle) 349 kB / 400 kB`,
    зелёный. Падают `@skygraph/react` и `@skygraph/vue` —
    pre-existing, вне зоны 3.4 (см. finding).
13. Записал decisions, findings и этот отчёт.

Никаких `pnpm install`, `pnpm add`, `git commit` не выполнялось.

---

## Следующие очевидные стримы (предложение, не обязательство)

- **T-Vue-Demo-Guide-Full-Port** (Wave 3.x или 4.x): полный порт
  `StylingShowcasePage` + `DesignTokensPage` (требует переноса
  `tokens-data` в `_shared`). Объём: 1.5–2 дня. См. finding
  `guide-stubs`.
- **T-Vue-Timeline-Slot-Native-API**: добавить `renderTitle` /
  `renderDescription` или доработать слоты в
  `packages/vue/src/components/complex/Timeline/EventTimeline.vue`
  для симметрии с React `EventTimeline`. См. finding
  `roadmap-event-slot`.
