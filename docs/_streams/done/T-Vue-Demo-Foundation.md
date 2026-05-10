# T-Vue-Demo-Foundation — отчёт

> Wave 3.1, фундамент. Закрывает архитектуру `demos/` для Vue, генератор,
> эталонную миграцию Button, обновлённый Landing.

## Статус
**Закрыт.** Все green checks: `vue-tsc -b -p tsconfig.app.json --noEmit` (exit 0),
`pnpm --filter demo-vue build` (exit 0), `pnpm size` (exit 0, demo-vue
main bundle **144.32 KB / 160 KB**, запас ~16 KB).

## Acceptance criteria

| # | Требование | Статус |
|---|---|---|
| 1 | `docs/_streams/audit/T-Vue-Demo-Parity.md` существует, содержит полную таблицу по всем React-компонентам. | ✓ создан, 53 строки + 3 Vue-only |
| 2 | `docs/_streams/audit/vue-broken-styles.md` существует, не пустой. | ✓ создан, finding `audit-styles-no-playwright` + ручные находки по Landing/ButtonPage |
| 3 | `examples/demo-vue/src/demos/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable,SourceCode}.vue` + `index.ts`. | ✓ 5 SFC + 1 index, typecheck зелёный |
| 4 | `examples/demo-vue/src/demos/ButtonDemo.vue` + `button/*.demo.vue` (≥5) + `button-doc/{en,ru,useStrings}.ts`. | ✓ 7 примеров (Types/Sizes/Loading/Disabled/WithIcon/ComponentTokens/ScopedBrand), Unstyled пропущен (finding) |
| 5 | `examples/demo-vue/src/router/index.ts` — `/components/button` → `demos/ButtonDemo.vue`. | ✓ заменён `ButtonPage` → `ButtonDemo` lazy-импорт |
| 6 | `examples/demo-vue/src/pages/ButtonPage.vue` — удалён. | ✓ удалён |
| 7 | `Landing.vue` — Hero / StatsRow / FeatureGrid / QuickInstall. | ✓ + 4-cell stats (Components/Composables/Engines/Tests), без WhatsNew/ShowcasesPreview (умышленно — `wave-3/CHARTER.md` §2) |
| 8 | `scripts/gen-vue-demo.mjs` + 5 `.tmpl` — созданы. | ✓ + append в `scripts/README.md` |
| 9 | `pnpm --filter demo-vue typecheck && build && pnpm size` — зелёные. | ✓ build OK, size 144.32/160 KB |
| 10 | Скриншот Playwright `button-after.png` + проверка ≥ 5 `sg-button*`. | ✗ — finding `audit-styles-no-playwright`. Карта явно разрешает таб E делать аудит сам в начале своей работы. |

## Файлы

### Создано

```
docs/_streams/audit/T-Vue-Demo-Parity.md
docs/_streams/audit/vue-broken-styles.md
docs/_streams/decisions/T-Vue-Demo-Foundation.md
docs/_streams/findings/T-Vue-Demo-Foundation.md
docs/_streams/done/T-Vue-Demo-Foundation.md   ← этот файл

examples/demo-vue/src/vite-env.d.ts
examples/demo-vue/src/demos/components/SourceCode.vue
examples/demo-vue/src/demos/components/DemoBox.vue
examples/demo-vue/src/demos/components/ComponentDoc.vue
examples/demo-vue/src/demos/components/PropsTable.vue
examples/demo-vue/src/demos/components/CssVarsTable.vue
examples/demo-vue/src/demos/components/index.ts

examples/demo-vue/src/demos/button/Types.demo.vue
examples/demo-vue/src/demos/button/Sizes.demo.vue
examples/demo-vue/src/demos/button/Loading.demo.vue
examples/demo-vue/src/demos/button/Disabled.demo.vue
examples/demo-vue/src/demos/button/WithIcon.demo.vue
examples/demo-vue/src/demos/button/ComponentTokens.demo.vue
examples/demo-vue/src/demos/button/ScopedBrand.demo.vue
examples/demo-vue/src/demos/button-doc/en.ts
examples/demo-vue/src/demos/button-doc/ru.ts
examples/demo-vue/src/demos/button-doc/useStrings.ts
examples/demo-vue/src/demos/ButtonDemo.vue

examples/demo-vue/src/pages/landing.css

scripts/gen-vue-demo.mjs
scripts/templates/vue-demo-aggregator.vue.tmpl
scripts/templates/vue-demo-example.vue.tmpl
scripts/templates/vue-demo-doc-en.ts.tmpl
scripts/templates/vue-demo-doc-ru.ts.tmpl
scripts/templates/vue-demo-doc-strings.ts.tmpl
```

### Изменено

```
examples/demo-vue/src/i18n/types.ts            — +cssVarsTable, +landing.statEngines, +landing.quickInstall*
examples/demo-vue/src/i18n/dict-en.ts          — те же добавления
examples/demo-vue/src/i18n/dict-ru.ts          — те же добавления
examples/demo-vue/src/router/index.ts          — Button → ButtonDemo
examples/demo-vue/src/pages/Landing.vue        — полный rewrite (Hero / StatsRow / FeatureGrid / QuickInstall)
scripts/README.md                              — append секция "gen-vue-demo.mjs"
```

### Удалено

```
examples/demo-vue/src/pages/ButtonPage.vue     — после миграции на demos/ButtonDemo.vue
```

## Миграция Button — что и как перенесено

| React (`examples/demo/src/demos/button/*.demo.tsx`) | Vue (`examples/demo-vue/src/demos/button/*.demo.vue`) | Заметки |
|---|---|---|
| `Types.demo.tsx` | `Types.demo.vue` | 1:1 (5 кнопок: default/primary/dashed/text/link) |
| `Sizes.demo.tsx` | `Sizes.demo.vue` | 1:1 (6 кнопок: small/middle/large × default/primary) |
| `Loading.demo.tsx` | `Loading.demo.vue` | `useState` → `ref`, остальное 1:1 |
| `Disabled.demo.tsx` | `Disabled.demo.vue` | 1:1 |
| `WithIcon.demo.tsx` | `WithIcon.demo.vue` | 1:1 — иконка просто в default-слоте |
| `ComponentTokens.demo.tsx` | `ComponentTokens.demo.vue` | `CSSProperties` → `as CSSProperties` через `vue` import |
| `ScopedBrand.demo.tsx` | `ScopedBrand.demo.vue` | 1:1 |
| `Unstyled.demo.tsx` | — | **skip** (нет prop `unstyled` в `SgButton`); см. `findings/` |

`button-doc/en.ts` — те же ключи `pageTitle`/`pageBadge`/`crumb*`/`pageLead`/
`pageWhen1-2`/`demo*Title`/`demo*Desc`/`tableButtonApi`/`tableCssVars`/
`prop*`/`cssHint`/`cssSg*`. Vue-специфичные пропы добавлены: `propDanger`,
`propBlock`, `emitClick`. Нет: `propClassName`, `propStyle`, `propOnClick`,
`propChildren`, `propUnstyled`.

`buttonCssVars` — 24 переменные, идентичные React-набору.

## Изменения в i18n (минимум, чтобы CssVarsTable.vue + новый Landing
скомпилировались)

`DemoDict` (тип):

```
+ cssVarsTable: { title; colVariable; colDefault; colDescription }
+ landing.statEngines: string
+ landing.quickInstallTitle / quickInstallDesc / quickInstallCopy / quickInstallCopied
```

`dict-en.ts` / `dict-ru.ts` дополнены теми же ключами.

## Архитектурные решения (см. `decisions/T-Vue-Demo-Foundation.md`)

1. `demos/components/` — путь из task-карты, образец взят из реального
   `examples/demo/src/components/` (а не `demos/components/` — последнего
   нет).
2. `useDemoStrings` — для **локальных** словарей `*.demo.vue`.
   `use<Comp>DocStrings()` — для **большого** словаря через `useI18n` +
   `computed`. Это паритет с React.
3. `?raw` — без правок `vite.config.ts`. Декларация типов через новый
   `src/vite-env.d.ts` с `/// <reference types="vite/client" />`.
4. PropsTable Button показывает только реальные пропы `SgButton`
   (`type/size/htmlType/danger/block/disabled/loading + @click`),
   а не React-API.
5. `CssVarsTable` Button — все 24 React-переменные дословно (контракт
   `sg-*` общий).
6. Landing без WhatsNew / ShowcasesPreview / FrameworkSwitcher (вне
   scope Волны 3 по `wave-3/CHARTER.md` §2).
7. Стили Landing — новый `pages/landing.css`, импортируется из
   `Landing.vue`. Старые `.dv-landing-*` в `style.css` остаются как
   backstop (3-cell stat layout перекрыт 4-cell).
8. `gen-vue-demo.mjs` — отдельный скрипт от `gen-demo-page.mjs`. Без
   `--dry-run` / `--force` в первой версии.
9. Playwright-аудит — finding по §6.3 (нет окружения для двух dev-серверов
   + Chromium из неинтерактивного стрима). Таб E делает скриншоты сам.

## Findings (см. `findings/T-Vue-Demo-Foundation.md`)

| ID | Что найдено |
|---|---|
| `button-unstyled-skipped` | `SgButton` без prop `unstyled` — пропущен `Unstyled.demo.vue`. |
| `audit-styles-no-playwright` | Скриншот-аудит делает таб E на старте 3.2. |
| `react-textarea-no-demo` | В React нет `TextareaDemo.tsx`, у Vue `TextareaPage.vue` есть. Vue остаётся, портируется в `demos/textarea/` без шаблона. |
| `form-components-page-no-vue` | `FormComponentsDemo.tsx` — meta-демо, в Vue не зарождать. |
| `getting-started-page-no-vue` | `GettingStartedPage.tsx` — гайд, не компонент. Не делать. |
| `charts-no-css-vars-react` | В React нет `<CssVarsTable>` для Charts; Vue в 3.2 повторяет, либо decision на стороне таба D. |
| `composables-count-hardcode` | Нет константы `COMPOSABLE_COUNT` в `_shared`; Landing.vue использует литерал `14`. |

## Команды (для проверки локально)

```bash
node node_modules/.pnpm/vue-tsc@2.2.12_typescript@5.9.3/node_modules/vue-tsc/bin/vue-tsc.js \
     -p examples/demo-vue/tsconfig.app.json --noEmit         # exit 0
pnpm --filter demo-vue build                                  # exit 0
pnpm size                                                     # 144.32 / 160 KB
```

## Что осталось для Волны 3.2

- **Таб A** (`T-Vue-Demo-Forms`): 18 компонентов через
  `node scripts/gen-vue-demo.mjs <name> --with-css-vars`.
- **Таб B** (`T-Vue-Demo-Display`): 13.
- **Таб C** (`T-Vue-Demo-NavFeedback`): 12.
- **Таб D** (`T-Vue-Demo-Complex`): 12 (включая Charts/Form/Table/Tree).
- **Таб E** (`T-Vue-Demo-StyleFixes`): сначала собрать скриншот-аудит,
  потом фиксить `examples/_shared-vue/src/layout/styles.css` /
  `examples/demo-vue/src/style.css`.

`demos/components/*` — заморозка. Любой стрим, кому нужен новый общий
компонент: finding и пропуск конкретного примера до отдельной карты.
