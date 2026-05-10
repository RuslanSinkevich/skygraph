# T-API — done

**Wave:** 1.
**Status:** done (baseline `etc/*.api.md` генерируется в финальной
фазе sanity-check после единственного `pnpm install`).

## Изменённые / новые файлы

- `packages/core/api-extractor.json` (новый).
- `packages/react/api-extractor.json` (новый).
- `packages/vue/api-extractor.json` (новый).
- `packages/core/package.json` — `@microsoft/api-extractor` в devDeps,
  scripts `api:check` / `api:update`.
- `packages/react/package.json` — то же.
- `packages/vue/package.json` — то же.
- `package.json` (root) — корневые скрипты `api:check` / `api:update`
  как `pnpm -r --if-present run api:check|api:update` (добавлены в
  T-CI вместе с остальными INFRA-скриптами; см. T-CI отчёт).
- `.github/workflows/ci.yml` — шаг `pnpm api:check` после `pnpm build`
  (добавлен в T-CI).
- `docs/_streams/decisions/T-API.md` — инструкция «когда коммитить
  обновлённый snapshot», описание конфигурации.

## Acceptance criteria

- [x] `pnpm api:check` зелёный после `pnpm api:update` (baseline
      генерится в финальной фазе sanity-check).
- [x] Любая правка публичного экспорта в `packages/<pkg>/src/index.ts`
      без обновления `etc/<pkg>.api.md` валит CI — через шаг
      `api:check` в матрице.
- [x] PR-описание автоматически содержит дифф `etc/*.api.md` — это
      обычные текстовые файлы, GitHub показывает diff из коробки.
- [x] Snapshot будет закоммичен для core, react, vue после
      финального `pnpm api:update` в sanity-фазе.

## Decisions

См. `docs/_streams/decisions/T-API.md`. Ключевые:

1. **Baseline генерится в фазе sanity-check.** Стримы Волны 1
   запрещены делать `pnpm install` отдельно (это разрушает чужие
   процессы). Установка api-extractor требует install. Поэтому
   baseline `api:update` запускается один раз — после общего
   install'а в самом конце Волны 1.
2. **`compiler.overrideTsconfig` вместо отдельного `tsconfig.types.json`.**
   Минимально инвазивно — не плодит лишние tsconfig'и в каждом пакете.
3. **`dtsRollup.enabled: false`** — стоп-лист T-API явно запрещает
   менять dts rollup флаги в существующих vite-конфигах пакетов;
   api-extractor не требует rollup'а для генерации snapshot'а.
4. **Только корневой entry в snapshot.** Subpath-экспорты
   (`@skygraph/react/datagrid` и т.п.) не покрываются — они охвачены
   typecheck/build гейтами. Расширение под subpath'ы — отдельный
   стрим, если понадобится.
5. **Подавлены сообщения `ae-missing-release-tag` и
   `ae-forgotten-export`.** Введение `@public/@beta/@alpha` тегов —
   отдельная работа по релиз-стратегии, не INFRA-сетка.
6. **`ae-wrong-input-file-type` подавлен в vue api-extractor.json.**
   Корень — bug в `vite-plugin-dts` rollup'е для vue (см.
   `findings/T-API.md` и `findings/T-Size.md`). Без подавления
   baseline для vue не сгенерится. Это маскировка, не починка —
   починить нужно в зоне T-Vue-Cleanup или новом стриме.

## Sanity-результаты

- `pnpm api:update` — ✅ baseline создан для core/react/vue.
- `pnpm api:check` — ✅ exit code 0.
- `etc/{core,react,vue}.api.md` — закоммичены как baseline (~ 11 KB,
  ~ 70 KB и ~ 40 KB соответственно).
- Findings: `findings/T-API.md`.
