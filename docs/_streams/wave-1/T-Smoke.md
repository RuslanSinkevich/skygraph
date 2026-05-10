# T-Smoke — Playwright smoke tests для demo-сайтов

**Wave:** 1 (INFRA).
**Goal:** Дешёвая проверка что обе demo-сборки запускаются и все роуты не падают с uncaught error в консоли.

## Зона файлов

- `tests/smoke/` (новая папка)
- `tests/smoke/demo.spec.ts` — обходит все роуты `examples/demo`
- `tests/smoke/demo-vue.spec.ts` — обходит все роуты `examples/demo-vue`
- `playwright.config.ts` (новый, корневой)
- `package.json` (корневой) — `@playwright/test` в `devDependencies` + scripts `test:smoke`, `test:smoke:install`
- `.github/workflows/ci.yml` (минимальная правка: новый job `smoke` после `build`)

## Чек-лист

1. Установить `@playwright/test` (`pnpm add -D -w @playwright/test`).
2. `npx playwright install --with-deps chromium` (только Chromium для скорости).
3. `playwright.config.ts`:
   - `testDir: 'tests/smoke'`
   - `use: { headless: true, baseURL устанавливается per-project }`
   - 2 проекта: `demo` (port 5173) и `demo-vue` (port 5174).
   - Reuse: после `pnpm build` стартуем `vite preview` для каждого demo.
4. `demo.spec.ts`: парсит sidebar/nav, обходит каждый роут, проверяет:
   - Страница не вернула 5xx (через response observer).
   - В консоли нет `uncaught` ошибок (через `page.on('pageerror', ...)`).
   - На странице есть якорь mount-узла (например `[data-testid="app-root"]` или просто `body > #app/#root`).
5. `demo-vue.spec.ts`: то же.
6. Скрипт корневой `pnpm test:smoke`:
   - Прогоняет билды (или ожидает что уже есть).
   - Стартует `vite preview` оба demo.
   - Прогоняет playwright.
   - Останавливает превью.
7. CI job `smoke`: depends on `build-and-test`. Использует артефакты сборки.
8. Документация: `docs/_streams/decisions/T-Smoke.md` — инструкция «как добавлять новый роут в smoke».

## Acceptance criteria

- [ ] `pnpm test:smoke` локально проходит.
- [ ] CI job `smoke` зелёный на main.
- [ ] Smoke ловит регрессию: если временно сломать `App.tsx` (вкинуть `throw`), CI красный.
- [ ] Длительность smoke ≤ 3 минуты.

## Стоп-лист

- НЕ писать функциональные тесты UI («клик сюда, проверь там»). Только smoke: монтаж + console.
- НЕ покрывать Showcases (отдельное приложение, отдельный билд — не трогаем).
- НЕ пытаться запускать смоук в watch-режиме `vite dev` — только `vite preview` после `vite build`.

## Зависимости

Нет (но для устойчивости лучше после T-CI, чтобы попасть в новую структуру CI).

## Pre-PR команды

```bash
pnpm build
pnpm test:smoke
```
