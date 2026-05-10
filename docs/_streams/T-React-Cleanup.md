# T-React-Cleanup — React: мёртвые экспорты + мёртвые .sg-* стили + TSDoc @link

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-React-Cleanup
- **Волна:** 2

## Цель
Удалить из `@skygraph/react` мёртвые экспорты в `index.ts`, удалить из `@skygraph/styles` мёртвые `.sg-*` селекторы и починить 6 unresolved `{@link Foo}` в TSDoc-комментариях React-компонентов (finding из Волны 1 / T-API).

## Зона файлов (можно трогать)

- `packages/react/src/index.ts` — **только удаления** строк-экспортов
- `packages/styles/components/*.css` — **только удаления** селекторов и связанных правил
- `packages/react/src/**/*.tsx`, `packages/react/src/**/*.ts` — **только TSDoc-комментарии**, ничего внутри функций/JSX/типов. Только текст в `/** ... */` блоках.
- `packages/react/api-extractor.json` — **только** убрать подавление `ae-unresolved-link` после починки ссылок.
- `docs/_audit/react-dead-exports.md` (новый — отчёт)
- `docs/_audit/styles-dead-classes.md` (новый — отчёт; если есть существующий — append)
- `MIGRATION.md` (новый, в корне репо; если уже существует — append секцией с заголовком даты `## 2026-MM-DD — Wave 2 cleanup`)

## Чек-лист

### Часть 1 — мёртвые экспорты в React index.ts

1. Собрать список экспортов из `packages/react/src/index.ts`. Это символы и типы.
2. Для каждого экспорта проверить использование:
   - В `examples/demo/src/**/*.tsx`.
   - В `examples/showcases/src/**/*.tsx`.
   - В `examples/_shared-react/**`.
   - В `examples/_shared/**`.
   - В `packages/react/src/__tests__/**`.
3. Если экспорт **нигде** не используется → кандидат на удаление.
4. Перед удалением убедиться, что:
   - Это не часть документированного публичного API (поиск по `README.md`, `docs/`).
   - Это не используется в Storybook/демо-коде, который пока выключен.
5. Удалить из `index.ts`.
6. Записать в `docs/_audit/react-dead-exports.md` список удалённого с обоснованием (1 строка на каждое).
7. Append в корневой `MIGRATION.md` (создать если нет) секцию со списком удалённого:
   ```md
   ## 2026-MM-DD — Wave 2 cleanup

   The following exports were removed from `@skygraph/react` because they were
   unused both internally and in demos. If you used them externally, here are
   the replacements:

   - `RemovedSymbol` — was deprecated alias for `NewSymbol`. Use `NewSymbol`.
   - `AnotherRemoved` — replaced by `Variant` prop on `Button`. Pass `<Button variant="..." />`.
   - ...
   ```
   Для каждого удалённого экспорта — реальная замена. Если замены нет (символ был просто dead) — указать «no direct replacement, this was internal helper».

### Часть 2 — мёртвые .sg-* классы

1. Уже есть скрипт `pnpm audit:styles` — запустить и взять его вывод как стартовую точку.
2. Для каждого «потенциально мёртвого» класса:
   - `rg "sg-classname"` в `packages/{react,vue}/src/`, `examples/**/src/`, `packages/styles/`.
   - Если класс ссылается на сам себя (через `&` или `:has`) — проверить, что родительский селектор используется.
3. Класс мёртв если: нет ссылок в TSX/Vue/CSS компонентов и не используется в `packages/styles/` как часть составного селектора.
4. Удалить мёртвые правила в `packages/styles/components/*.css`.
5. Записать в `docs/_audit/styles-dead-classes.md` список удалённого.

### Часть 3 — починить 6 unresolved TSDoc `{@link}` (finding из T-API)

Контекст: `packages/react/api-extractor.json` сейчас подавляет `ae-unresolved-link`, потому что 6 TSDoc `{@link Foo}` ссылаются на символы, которых нет в публичном экспорте.

Список (из `findings/T-API.md`):

- `FormContextValue` (`dist/form.d.ts:258`)
- `createGraph` (`dist/index.d.ts:1785`)
- `GraphNode` (`dist/index.d.ts:1792`)
- `NodeAction` (`dist/index.d.ts:1808`)
- `routeOrthogonal` (`dist/index.d.ts:1918`)
- `length` (`dist/index.d.ts:3512`)

Шаги:

1. Найти первоисточник каждой ссылки в `packages/react/src/**/*.{ts,tsx}` через `rg "@link\s+FormContextValue"` (и так для остальных).
2. Для каждой ссылки решить:
   - Если символ существует, но не экспортирован → переписать `{@link Foo}` на просто `Foo` в plaintext (без `@link`), либо на корректный путь типа `{@link import('./form').FormContextValue}` если api-extractor поддерживает.
   - Если символ не существует / переименован — заменить ссылку на корректное имя.
   - Если ссылка устарела и нечего ставить — убрать `{@link Foo}`, оставить только текст без обёртки.
3. Запустить `pnpm --filter @skygraph/react build && pnpm --filter @skygraph/react api:check` — должны быть зелёными ещё с подавлением.
4. Убрать из `packages/react/api-extractor.json` подавление `ae-unresolved-link`.
5. Запустить `pnpm --filter @skygraph/react api:check` — зелёный без подавления.
6. Если остаются новые `ae-unresolved-link` — повторить шаги 1-5 для них (этот стрим закрывает все).

Стоп: НЕ перегенерировать `etc/react.api.md`. Это сделает пользователь руками после Волны 2.

### Финал

```bash
pnpm --filter @skygraph/react typecheck
pnpm --filter @skygraph/react test
pnpm --filter @skygraph/react build
pnpm --filter @skygraph/react api:check
pnpm --filter demo build
pnpm audit:styles
pnpm check:styles
```

## Acceptance criteria

- `index.ts` пакета `@skygraph/react` не содержит экспортов без потребителей.
- В CSS нет мёртвых `.sg-*` правил.
- `pnpm --filter demo build` зелёный.
- `pnpm audit:styles` без новых regression.
- `pnpm --filter @skygraph/react api:check` зелёный без подавления `ae-unresolved-link` **или** в `findings/T-React-Cleanup.md` описано почему не получилось.
- Отчёты в `docs/_audit/` присутствуют.
- `MIGRATION.md` (в корне репо) содержит секцию по удалённым символам и инструкции по замене.

## Стоп-лист

- Не трогать **runtime-код** TSX-файлов (JSX, hooks, обработчики, типы — это зона T-React-I18n-Styles). **Можно** только TSDoc-комментарии в `/** ... */` блоках.
- Не **добавлять** новые селекторы — только удалять.
- Не удалять из `packages/styles/tokens.css`.
- Не трогать `examples/_shared-react/layout` — отдельный аудит.
- Если экспорт используется только в Showcases — НЕ удалять, Showcases часть демо.
- НЕ перегенерировать `etc/react.api.md` baseline.
- НЕ удалять / не править экспорты Table-компонентов из `packages/react/src/components/complex/Table/index.ts` — это зона T-Table-Perf. Если внутри Table-папки экспортируется что-то «мёртвое» — записать в `findings/T-React-Cleanup.md`, не трогать.

## Зависимости
- Желательно после T-API (тогда есть `etc/skygraph-react.api.md` как baseline). Если T-API не закончен — стартовать всё равно, но **без** обновления `etc/*.api.md`.

## Финал
Отчёт: `docs/_streams/done/T-React-Cleanup.md`.
