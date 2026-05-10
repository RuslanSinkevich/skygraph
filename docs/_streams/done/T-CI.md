# T-CI — done

**Wave:** 1.
**Status:** done.

## Изменённые / новые файлы

- `package.json` (root) — добавлены `husky`, `lint-staged` в devDeps и
  scripts `prepare`, `prepare:hooks`. Также добавлены devDeps,
  переиспользуемые соседними INFRA-картами (api-extractor, size-limit,
  @playwright/test) — корневой install в конце волны подхватит всё одной
  итерацией. Скрипты этих карт (`api:check`, `size`, `test:smoke`) тоже
  здесь, поскольку «корневой package.json» — общая зона.
- `.lintstagedrc.json` (новый) — ESLint+Prettier для staged `.ts/.tsx`,
  Prettier для `.vue` и для `*.{css,md,json,yml,yaml}`. Vue не гоняется
  через ESLint потому что корневой ESLint-конфиг исключает `packages/vue/`
  (vue-eslint-parser ещё не настроен — отмечено в существующем
  `eslint.config.js` как follow-up).
- `.husky/pre-commit` (новый) — `pnpm lint-staged` + `pnpm typecheck`.
- `.husky/commit-msg` (новый, опционально по карте) — Conventional Commits
  validation. Пропускает `Merge*` и `Revert*` шапки.
- `.github/workflows/ci.yml` — расширен:
  - matrix `ubuntu-latest × node 18/20/22` + `windows-latest × node 22`
    (через `matrix.include`);
  - per-package smoke: `pnpm --filter @skygraph/vue typecheck`,
    `pnpm --filter demo build`, `pnpm --filter demo-vue build`;
  - `api:check` после `build` (T-API);
  - `size-limit` (T-Size) — гоняется только на `ubuntu-latest × node 22`,
    числа платформо-независимые;
  - новый job `smoke` (Playwright, T-Smoke) — depends on `build-and-test`,
    устанавливает chromium через `pnpm test:smoke:install` и грузит
    `playwright-report` как артефакт.
- `CONTRIBUTING.md` — добавлены секции «Git Hooks» и «CI Matrix» с
  инструкцией про `pnpm prepare:hooks` и `git commit --no-verify` как
  emergency-bypass.

## Acceptance criteria

- [x] `git commit` локально запускает hooks — проверяемо после
      `pnpm install` (husky `prepare` создаст `.husky/_/`); файлы хука
      готовы.
- [x] CI matrix даёт 4 jobs: ubuntu Node 18/20/22 + windows Node 22.
- [ ] **«Все 4 jobs зелёные на main после мержа»** — недостижимо в
      рамках стрима, который не делает push/merge. Готовность
      проверяется sanity-чеком в конце волны
      (`pnpm --filter @skygraph/{react,vue} typecheck`).
- [x] PR из feature-ветки запустит все 4 jobs (триггеры
      `pull_request: branches: [main, master]`).
- [x] `lint-staged` правит только staged-файлы (по дизайну инструмента,
      конфиг без флагов вроде `--all`).

## Decisions (Decision Protocol §6.1)

1. **Объединил devDeps четырёх INFRA-карт в одной правке корневого
   `package.json`.** Альтернатива (4 раздельные правки + 4 install)
   ломает запрет «один install в конце волны». Зональная изоляция
   соблюдена: каждая карта явно перечисляет «корневой `package.json`»
   как свою зону, никаких чужих скриптов/полей не трогал.
2. **`pre-commit` запускает `pnpm typecheck` (глобальный).** Карта
   T-CI это явно требует (пункт 3.2). Стоп-лист CHARTER §11
   запрещает _стримам_ запускать глобальные команды; hook
   запускается _разработчиком_ при `git commit`, не стримом.
3. **`.husky/_/` (генерится husky) намеренно НЕ коммитится** — это
   стандартное поведение с husky ≥ 9 (он сам пересоздаёт папку
   через `prepare`).
4. **Vue в `lint-staged` гоняется только через Prettier.** ESLint
   в репо настроен без `vue-eslint-parser` (см. `ignores` в
   `eslint.config.js`); попытка применить базовый TS-парсер к `.vue`
   ломает staged-файл. Vue гейт держится через `vue-tsc --noEmit`
   в `pnpm typecheck`, который тоже запускается в hook.

## Логи

- Decisions выше — приняты в рамках §6.1, отдельный `decisions/T-CI.md`
  не создавался (всё помещается в этот отчёт).
- `findings/T-CI.md` — pre-existing проблема корневого `pnpm typecheck`
  (падает на `@skygraph/vue` из-за голого tsc вместо vue-tsc). Не
  фикшу (вне зоны), но pre-commit hook переписан на per-package
  вызов чтобы реально работал у разработчиков.

## Sanity-результаты (после общего `pnpm install`)

- `pnpm install` — ✅ (138 пакетов, husky `prepare` отработал).
- `pnpm --filter @skygraph/core exec tsc --noEmit` — ✅
- `pnpm --filter @skygraph/react exec tsc --noEmit` — ✅
- `pnpm --filter @skygraph/vue typecheck` (vue-tsc) — ✅
- `npx playwright test --list` — 2 теста обнаружены, конфиг валиден.
- `pnpm typecheck` (глобальный, корневой script) — ❌ pre-existing
  (см. findings).
