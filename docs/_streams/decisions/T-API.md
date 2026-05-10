# T-API — decisions

## Когда коммитить обновлённый snapshot

`etc/<pkg>.api.md` — это **baseline публичного API пакета**. CI гоняет
`pnpm api:check`, который сравнивает свежий extract с тем что в
репозитории. Любое расхождение = красный CI.

### Workflow на изменение публичного API

1. Внёс изменение в `packages/<pkg>/src/index.ts` (или в любой
   реэкспортируемый отсюда тип).
2. Локально:
   ```bash
   pnpm --filter @skygraph/<pkg> build
   pnpm --filter @skygraph/<pkg> run api:update
   ```
3. Посмотреть diff `etc/<pkg>.api.md`. Это глазами видный паспорт
   изменения — добавь в PR description.
4. Закоммитить и `etc/<pkg>.api.md` вместе с изменениями исходника.

### Когда НЕ обновлять baseline

- Если CI красный «без причины» — это означает что публичный API
  поплыл, а ты не заметил. Не делай `api:update` бездумно. Сначала
  пойми **что** в snapshot изменилось.
- Внутренние реорганизации (перенос файла, переименование private
  функции) **не должны** менять snapshot. Если меняют — у тебя где-то
  утечка private наружу.

## Выбор инструмента

`@microsoft/api-extractor` — потому что:

- Парсит уже готовый `dist/index.d.ts` (не дублирует tsc).
- Snapshot — markdown, читаемый в GitHub UI без расширений.
- Стандарт де-факто для TS-библиотек (Rush, Loopback, Apollo).
- Не требует rollup'а d.ts (`dtsRollup.enabled: false`) — сохраняем
  существующую `tsup` / `vite-plugin-dts` сборку без правок.

## Конфигурация

Каждый пакет — свой `api-extractor.json`. Общий шаблон:

- `mainEntryPointFilePath: <projectFolder>/dist/index.d.ts` — основной
  публичный entry. Subpath-экспорты (`@skygraph/react/datagrid` и т.п.)
  не охвачены baseline'ом — они помечены как unstable surface;
  захотим закрыть — добавим отдельные `api-extractor-<entry>.json`.
- `compiler.overrideTsconfig` — потому что базовый `tsconfig.json`
  пакета `include`-ит только `src/`, и tsc из коробки не видит `dist/`.
  Override использует bundler-style moduleResolution, нужный
  workspace-симлинкам (`@skygraph/styles`, `@skygraph/core`).
- `dtsRollup.enabled: false` — стоп-лист T-API запрещает менять dts
  rollup флаги в существующих vite-конфигах.
- `apiReport.enabled: true` — генерим markdown-snapshot.
- Подавлены: `ae-missing-release-tag`, `ae-forgotten-export`,
  `ae-internal-missing-underscore`. Включать их = задача отдельного
  стрима по релиз-тегам, не INFRA.

## Initial baseline

Базовые `etc/<pkg>.api.md` генерируются разово после установки
зависимостей:

```bash
pnpm install
pnpm --filter @skygraph/core build
pnpm --filter @skygraph/react build
pnpm --filter @skygraph/vue build
pnpm api:update
```

Файлы коммитятся как baseline. Дальше любое расхождение валит CI
через `api:check`.

## Известные ограничения

- **Vue + .vue файлы.** Snapshot строится по `dist/index.d.ts`,
  сгенерированному `vite-plugin-dts` с `rollupTypes: true`. Если в
  будущем мы решим не сворачивать types — придётся пересмотреть
  стратегию для Vue.
- **`@skygraph/react` и subpaths.** `./form`, `./table`, `./tree`,
  `./datagrid`, `./virtual`, `./devtools` — каждый имеет свой
  `dist/<entry>.d.ts`, но baseline только для `dist/index.d.ts`.
  Регрессии в subpath-экспортах не ловятся API snapshot'ом — ловятся
  CI typecheck/build.
