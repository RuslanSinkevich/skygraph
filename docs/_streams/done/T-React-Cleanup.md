# T-React-Cleanup — done

## Изменённые файлы

### TSDoc — починка 6 unresolved `{@link Foo}`

- `packages/react/src/components/complex/FormContext.ts` — `{@link FormContextValue}` → `` `FormContextValue` `` (plain).
- `packages/react/src/hooks/useGraph.ts` — `{@link createGraph}` → `` `createGraph` `` (from `@skygraph/core`).
- `packages/react/src/components/complex/Diagram/HoverActions.tsx` — `{@link GraphNode}` → `` `GraphNode` ``; `{@link NodeAction}` → `` `NodeAction` ``.
- `packages/react/src/components/complex/Diagram/Diagram.tsx` — `{@link routeOrthogonal}` → `` `routeOrthogonal` `` router options.
- `packages/react/src/components/ui/PinInput.tsx` — `{@link length}` → `` `length` ``.

### `api-extractor` config

- `packages/react/api-extractor.json` — убрал подавление
  `ae-unresolved-link`. `pnpm --filter @skygraph/react api:check`
  зелёный без него.

### CSS — мёртвые `.sg-*` правила

- `packages/styles/components/modal.css` — удалён `.sg-modal-body-loading`.
- `packages/styles/components/datepicker.css` — удалены `.sg-dp-footer-link` и `:hover`.

### Аудит / docs

- `docs/_audit/react-dead-exports.md` — список 187 кандидатов и
  обоснование почему ни один не удалён.
- `docs/_audit/styles-dead-classes.md` — что удалено (2 класса),
  что зарезервировано (3), что используется (15).
- `MIGRATION.md` — корневой файл, секция «2026-05-10 — Wave 2 cleanup».
- `docs/_streams/decisions/T-React-Cleanup.md` — решение по deferred
  удалению экспортов.
- `docs/_streams/findings/T-React-Cleanup.md` — пре-existing demo build
  fail из-за зоны T-Showcases-I18n.

### Скрипты (новые, repeatable)

- `scripts/find-dead-exports.mjs` — повторяемый аудит публичных
  экспортов `@skygraph/react`.
- `scripts/check-dead-classes.mjs` — повторяемая проверка по списку
  классов из `pnpm audit:styles`.

## Acceptance criteria — статус

| Пункт | Статус | Комментарий |
|---|---|---|
| `index.ts` без экспортов без потребителей | ⏸ deferred | См. `decisions/T-React-Cleanup.md`: нельзя удалять без `api:update` (запрещён task'ом). Все 187 кандидатов — публичный API. |
| В CSS нет мёртвых `.sg-*` правил | ✅ | Удалены 2 truly-dead класса; 3 зарезервированы (документировано); 15 используются (false-positive аудита). |
| `pnpm --filter demo build` зелёный | ❌ pre-existing | Падает по 3 ошибкам в `examples/showcases/...showcaseLocaleContext.tsx` (зона T-Showcases-I18n). См. `findings/T-React-Cleanup.md`. |
| `pnpm audit:styles` без regression | ✅ | Список «возможно мёртвый код» сократился с 20 до 18. |
| `pnpm --filter @skygraph/react api:check` зелёный без `ae-unresolved-link` | ✅ | Подавление снято; api-extractor passes. |
| Отчёты в `docs/_audit/` | ✅ | `react-dead-exports.md`, `styles-dead-classes.md`. |
| `MIGRATION.md` с секцией | ✅ | Корневой файл создан. |

## Прогон проверок

```
pnpm --filter @skygraph/react typecheck   # OK
pnpm --filter @skygraph/react test        # 626 passed | 2 skipped
pnpm --filter @skygraph/react build       # OK
pnpm --filter @skygraph/react api:check   # OK (без ae-unresolved-link)
pnpm --filter demo build                  # FAIL — внешний (T-Showcases-I18n)
pnpm audit:styles                         # OK, 18 кандидатов вместо 20
pnpm check:styles                         # OK
```

## Стоп-лист — соблюдение

- ✅ Не трогал runtime-код TSX (только TSDoc-комментарии).
- ✅ Не добавлял новые CSS-селекторы (только удалял).
- ✅ Не трогал `packages/styles/tokens.css`.
- ✅ Не трогал `examples/_shared-react/layout`.
- ✅ Не удалял экспорты Table-компонентов.
- ✅ Не перегенерировал `etc/react.api.md`.
- ✅ Не запускал `pnpm install` / `pnpm clean` / глобальные команды.
