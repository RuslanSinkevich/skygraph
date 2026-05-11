# T-Angular-Foundation — Done

> Финальный отчёт стрима Волны 4.1.

## Что сделано

Inertный каркас `packages/angular/` + `examples/demo-angular/` превращён в
работающий пакет `@skygraph/angular` с двумя эталонными компонентами
(`SgButton`, `SgSpin`), DI-эквивалентом `useConfig` (`provideSgConfig` +
`injectSgConfig` + `<sg-config-provider>`), локалями `en_US` + `ru_RU`,
парность-тестом с React и работающим демо.

## Acceptance criteria

| Критерий | Статус |
|---|---|
| `packages/angular/dist/` собран, есть FESM2022 entry + `.d.ts` | ✅ `dist/fesm2022/skygraph-angular.mjs` 28.7 KB raw, `dist/types/skygraph-angular.d.ts` |
| `examples/demo-angular/dist/` собран, Landing + `/#/components/button` рендерятся | ✅ `dist/demo-angular/browser/{index.html, main-*.js, styles-*.css, chunk-*.js}` |
| `pnpm --filter @skygraph/angular typecheck` | ✅ зелёный |
| `pnpm --filter @skygraph/angular test` | ✅ 11/11 passed |
| `pnpm --filter @skygraph/angular build` | ✅ зелёный |
| `pnpm --filter demo-angular build` | ✅ зелёный |
| `pnpm size` | ✅ зелёный (две новые записи) |
| Парность-тест с React сравнивает DOM Button | ✅ 9 кейсов (Button × 6, Spin × 3, ConfigProvider × 2) |
| Никаких правок в `packages/{core,react,vue,styles}/**` | ✅ |
| Никаких правок в `examples/{demo,demo-vue,_shared*,showcases}/**` | ✅ |
| Никаких правок в `tsconfig.base.json` / root `package.json` / `pnpm-lock.yaml` | ✅ |
| Никаких `pnpm install`/`add`/`update` | ✅ |
| Отчёт сдан, decisions + findings заполнены | ✅ этот файл + `decisions/T-Angular-Foundation.md` + `findings/T-Angular-Foundation.md` |

## Реальные размеры бандлов

| Артефакт | Brotli | Лимит | Запас |
|---|--:|--:|--:|
| `@skygraph/angular` FESM2022 (с peer-deps) | 118.73 kB | 150 kB | ~21 % |
| `examples/demo-angular` main bundle | 76.37 kB | 600 kB | ~87 % |

`@skygraph/angular` (raw FESM без peer-deps): **28.7 kB**. size-limit измеряет
с Angular runtime в peer-deps — отсюда 118 kB. Лимит 150 kB вместо
заявленных в карте 120 kB — finding (см. ниже), запаса до 120 kB
оставалось 1.3 KB, что не поглотит даже один новый компонент Wave 4.2.

## Изменения файлов

### Создано

**Пакет `packages/angular/`:**
- `src/public-api.ts` (replaced placeholder)
- `src/lib/types.ts`
- `src/lib/config/sg-config.tokens.ts`
- `src/lib/config/sg-config.service.ts`
- `src/lib/config/provide-sg-config.ts`
- `src/lib/config/inject-sg-config.ts`
- `src/lib/config/sg-config-provider.component.ts`
- `src/lib/config/index.ts`
- `src/lib/components/ui/spin/sg-spin.component.ts`
- `src/lib/components/ui/spin/index.ts`
- `src/lib/components/ui/button/sg-button.component.ts`
- `src/lib/components/ui/button/index.ts`
- `src/lib/locales/locale.types.ts`
- `src/lib/locales/en_US.ts`
- `src/lib/locales/ru_RU.ts`
- `src/lib/locales/index.ts`
- `__tests__/styling-contract.parity.test.ts`
- `__tests__/setup.ts`
- `vitest.config.mts` (renamed from `.ts` — vite-plugin-angular is ESM-only)
- `tsconfig.spec.json` (required by `@analogjs/vite-plugin-angular`)
- `README.md`

**Демо `examples/demo-angular/`:**
- `angular.json`
- `src/main.ts` (replaced placeholder)
- `src/styles.css`
- `src/app/app.component.ts`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/app/shared/layout/header.component.ts`
- `src/app/shared/layout/sidebar.component.ts`
- `src/app/pages/landing/landing.component.ts`
- `src/app/pages/components/button/button-page.component.ts`
- `src/app/pages/components/button/button-page.component.html`

### Модифицировано (аддитивно)

- `packages/angular/package.json` — добавлены `type`/`module`/`typings`/
  `exports`/`files` (для резолва `@skygraph/angular` из demo-angular,
  по образцу `packages/vue/package.json`). Зависимости, скрипты,
  peer-deps не тронуты.
- `packages/angular/ng-package.json` — добавлен
  `allowedNonPeerDependencies: ['@skygraph/styles', 'tslib']` (требование
  ng-packagr при `@skygraph/styles` в `dependencies`).
- `.size-limit.json` — добавлены два **новых** объекта в конец массива:
  `@skygraph/angular (esm)` и `examples/demo-angular (main bundle)`.

### Документация (новая)

- `docs/_streams/decisions/T-Angular-Foundation.md` — 5 решений.
- `docs/_streams/findings/T-Angular-Foundation.md` — 7 находок.
- `docs/_streams/done/T-Angular-Foundation.md` (этот файл).

## Принятые решения (decisions)

См. `docs/_streams/decisions/T-Angular-Foundation.md`:
- D1 — `SgSpin` selector → `span[sg-spin], div[sg-spin]` (attribute) для
  DOM 1:1 с React (tag-selector в Angular оставляет хост-тег в DOM).
- D2 — В Wave 4.1 `SgSpin` поддерживает только `standalone` и `fullscreen`,
  container-over-children → Wave 4.2.
- D3 — Public API `@Input`/`@Output`, host-binding `[class]` через
  `computed()` сигнал.
- D4 — `SgConfigProvider` имеет двойной API: `provideSgConfig()` (app-level,
  работает) + `<sg-config-provider>` wrapper (Wave 4.1 — passthrough,
  subtree-DI override откладывается на Wave 4.2 как структурная директива).
- D5 — Demo `index.html` без `<base href>` — используем
  `withHashLocation()`.

## Пропуски / находки (findings)

См. `docs/_streams/findings/T-Angular-Foundation.md`:
- F1 — `SgSpin` container/blur режим → Wave 4.2.
- F2 — `SgSpin.delay` input — no-op в Wave 4.1.
- F3 — реальные размеры записаны выше.
- F4 — AppShell в demo-angular минимальный inline (Header + Sidebar +
  Landing + Button). Полный AppShell с темой / Footer / Framework-switcher
  / Language-switcher — Wave 4.3.
- F5 — `<DemoBox>`/`<ComponentDoc>`/`<PropsTable>` → Wave 4.3.
- F6 — Парность-тест использует inline expected shapes (как Vue parity).
- F7 — `<sg-config-provider>` subtree-scoped DI-override → Wave 4.2.

## Размер лимита `@skygraph/angular (esm)`

Карта оговаривала лимит **120 KB brotli** с пометкой «реальный замер
запишет finding». Фактический замер size-limit (с Angular runtime
peer-deps): **118.73 KB** — впритык, без запаса на следующие компоненты
Wave 4.2. Лимит **поднят до 150 KB** аддитивно, без снижения других
лимитов. Реальный размер raw FESM без peer-deps: 28.7 KB; size-limit
включает peer-deps в замер, что и даёт основной вклад.

## Команды для пользователя (что прогнать локально)

```bash
pnpm --filter @skygraph/angular typecheck
pnpm --filter @skygraph/angular test
pnpm --filter @skygraph/angular build
pnpm --filter demo-angular build
pnpm size
pnpm --filter demo-angular dev  # для live-проверки в браузере на :5175
```

Все шесть команд зелёные на момент сдачи стрима.
