# T-CI — findings

## ✅ Глобальный `pnpm typecheck` (`pnpm -r exec tsc --noEmit`) падает на `@skygraph/vue` — FIXED

> **Status:** FIXED после Волны 1 (вне scope T-CI, починено пользователем
> по ходу sanity-чека). Раздел оставлен для истории.

**Что было:** root-script `typecheck` определён как `pnpm -r exec tsc --noEmit`.
В `@skygraph/vue` он запускал голый `tsc` в папке пакета. tsc не
понимает импортов `*.vue` без vue-tsc + `vue-shims.d.ts`. Результат:
~150 ошибок `TS2307: Cannot find module './Foo.vue'`.

**Что починено:**

1. `packages/core/package.json` — добавлен скрипт `"typecheck": "tsc --noEmit"`.
2. `packages/react/package.json` — добавлен скрипт `"typecheck": "tsc --noEmit"`.
3. `package.json` (root) — `"typecheck": "pnpm -r exec tsc --noEmit"`
   заменено на `"typecheck": "pnpm -r --if-present run typecheck"`.
4. `packages/vue/package.json` уже содержал
   `"typecheck": "vue-tsc --noEmit"` — теперь корневой `pnpm typecheck`
   корректно его подхватывает.

**Sanity:** `pnpm typecheck` от корня — exit code 0, ~13 секунд,
9 workspace-проектов через `--if-present run`. Покрыты core, react,
vue, examples/showcases (у них уже был свой typecheck-скрипт).

**Что сделал T-CI стрим в обход (исторически):**

1. `.husky/pre-commit` — дёргает per-package: tsc для core/react,
   vue-tsc для vue. После починки корневого `typecheck` этот hook
   можно было бы упростить до `pnpm typecheck`, но не упрощаю —
   per-package быстрее на больших монорепо при штучных правках.
2. `.github/workflows/ci.yml` — оставил `pnpm typecheck` как было
   (workflow-шаг для зелёного CI теперь реально пройдёт).

## Корневой ESLint игнорирует `packages/vue/`

**Что:** `eslint.config.js` в корне явно содержит `packages/vue/` в
ignores с пометкой про vue-eslint-parser:

```js
// @skygraph/vue ships .vue SFCs which need vue-eslint-parser to lint
// properly. The current root config is type-aware TS-only.
'packages/vue/',
```

**Влияние на T-CI:** в `.lintstagedrc.json` я НЕ запускаю ESLint на
`*.vue` файлах — только Prettier. Если соседний стрим включит
vue-eslint-parser в корневой конфиг, lint-staged придётся обновить.
Сейчас — namespaced no-op для vue, и это сознательный choice (см.
`done/T-CI.md` decisions §4).
