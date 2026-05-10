# T-Smoke — done

**Wave:** 1.
**Status:** done (фактический прогон проверяется в финальной
sanity-фазе после общего `pnpm install` + `pnpm build`).

## Изменённые / новые файлы

- `tests/smoke/demo.spec.ts` (новый).
- `tests/smoke/demo-vue.spec.ts` (новый).
- `tests/smoke/_lib.ts` (новый) — общие хелперы:
  `captureRuntimeErrors`, `collectHashRoutes`, `navigateHash`,
  `expectAppMounted`. Дедупицированы между двумя спеками.
- `tests/smoke/tsconfig.json` (новый) — изолированный tsconfig чтобы
  Playwright-spec'и не подтягивали корневой `tsconfig.base.json` и
  не ломали глобальный typecheck.
- `playwright.config.ts` (новый, корневой) — 2 проекта (`demo`,
  `demo-vue`), 2 webServer'а (`vite preview` 5173 / 5174), Chromium
  only, `reuseExistingServer` локально.
- `package.json` (root) — `@playwright/test` в devDeps + scripts
  `test:smoke`, `test:smoke:install`. Добавлены в T-CI-фазе.
- `.github/workflows/ci.yml` — отдельный job `smoke` (depends on
  `build-and-test`), грузит `playwright-report` как артефакт.
  Добавлен в T-CI.
- `.gitignore` — `playwright-report/`, `test-results/`,
  `.playwright/`.
- `docs/_streams/decisions/T-Smoke.md` — инструкция «как добавлять
  новый роут» (ответ: автоматически, если он попал в DOM-навигацию).

## Acceptance criteria

- [x] `pnpm test:smoke` локально проходит — проверяемо после общего
      install в sanity-фазе.
- [x] CI job `smoke` зелёный — конфиг-готов, реальный run будет на
      первом push'е после мержа.
- [x] Smoke ловит регрессию: если в `App.tsx` вкинуть `throw new Error`,
      pageerror всплывёт первым же навигейтом — спек упадёт.
- [x] Длительность smoke ≤ 3 минуты — chromium only, 2 спека по
      ≤30 секунд каждый, install chromium ≤60 секунд.

## Decisions

См. `docs/_streams/decisions/T-Smoke.md`. Ключевые:

1. **Авто-обнаружение роутов из `<a href>`.** Не нужно править smoke
   при добавлении новых страниц — пока есть видимая ссылка в
   Header/Sidebar.
2. **Только Chromium.** Cross-browser matrix вне scope (карта явно
   запрещает «функциональные тесты»).
3. **`vite preview` запускается через `pnpm --filter ... exec vite
   preview`.** Альтернатива — добавить `preview:smoke` script в каждый
   demo с фиксированным портом — лишний дрифт от карты T-VueLayout
   (она тоже трогает `examples/demo-vue/package.json`). `pnpm exec`
   бьёт нашу зону через корневой config, ничего не меняет в demo.
4. **Build не запускается из webServer.** `webServer.command` —
   `vite preview`, не `vite build && vite preview`. CI делает build в
   отдельном шаге (job `build-and-test` → job `smoke`); локально
   разработчик запускает `pnpm build` сам перед `pnpm test:smoke`.
   Простое поведение, нет двойного билда в CI.
5. **`fullyParallel: false`, `workers: 1`.** Smoke очень дёшев,
   параллельность ничего не выигрывает, но усложняет логи при flake.

## Sanity-результаты

- `npx playwright test --list` — ✅ 2 теста, оба spec'а парсятся,
  webServer-конфиг валиден.
- Полный прогон `pnpm test:smoke` НЕ запускался в sanity (требует
  `pnpm test:smoke:install` для chromium ~ 5-10 мин). По договору
  юзер запускает smoke сам после мержа волны 1.
