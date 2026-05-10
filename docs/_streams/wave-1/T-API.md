# T-API — Public API snapshot

**Wave:** 1 (INFRA).
**Goal:** Зафиксировать публичный API каждого пакета. Любое изменение даёт diff в PR — регрессии видны глазами.

## Зона файлов

- `api-extractor.json` в каждом пакете: `packages/core/`, `packages/react/`, `packages/vue/`
- `etc/<pkg>.api.md` в каждом пакете (snapshot, генерируется)
- `tsconfig.types.json` в каждом пакете (если нужен отдельный tsconfig для type-emit)
- `package.json` каждого пакета: добавить scripts `api:check`, `api:update`
- `.github/workflows/ci.yml` (минимальная правка: добавить шаг `pnpm api:check` в matrix)
- `docs/_streams/decisions/T-API.md` если выбор инструмента отклоняется от api-extractor

## Чек-лист

1. Установить `@microsoft/api-extractor` + `@microsoft/api-documenter` (если нужен docs-режим — иначе только extractor) на корень `pnpm add -D -w`.
2. В каждом пакете создать `api-extractor.json` со стандартной конфигурацией:
   - `mainEntryPointFilePath: <projectFolder>/dist/index.d.ts`
   - `apiReport.enabled: true`
   - `apiReport.reportFolder: <projectFolder>/etc/`
   - `dtsRollup.enabled: false` (опционально true)
3. Скрипт `api:check` в каждом пакете: запускает extractor, фейлит при дрифте.
4. Скрипт `api:update` обновляет snapshot.
5. Корневой `pnpm api:check` прогоняет все пакеты.
6. Сгенерировать первоначальные `etc/<pkg>.api.md` для каждого пакета и закоммитить как baseline.
7. Добавить шаг в CI после `pnpm build`: `pnpm api:check`. Падение → красный.
8. Документация: `docs/_streams/decisions/T-API.md` объясняет «когда коммитить обновлённый snapshot».

## Acceptance criteria

- [ ] `pnpm api:check` зелёный на main после мержа.
- [ ] Любая правка публичного экспорта в `packages/<pkg>/src/index.ts` без обновления `etc/<pkg>.api.md` валит CI.
- [ ] PR-описание автоматически содержит дифф `etc/*.api.md` (видно глазами в GitHub UI).
- [ ] Snapshot закоммичен для core, react, vue.

## Стоп-лист

- НЕ менять `dts` rollup флаги в существующих vite-конфигах пакетов.
- НЕ удалять никакие существующие экспорты ради «чистоты snapshot». Это работа T-React-Audit.

## Зависимости

Нет. Параллельно с T-CI.

## Pre-PR команды

```bash
pnpm build
pnpm api:check
pnpm typecheck
pnpm test
```
