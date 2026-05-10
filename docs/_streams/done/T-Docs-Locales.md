# T-Docs-Locales — done

## Часть 1 — TSDoc автоген (config-only, см. blocked)

Создан `typedoc.json` в корне репозитория. Запуск `npx typedoc`
заблокирован отсутствием зависимости (см. `blocked/T-Docs-Locales.md`).

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": [
    "packages/core/src/index.ts",
    "packages/react/src/index.ts",
    "packages/vue/src/index.ts"
  ],
  "entryPointStrategy": "expand",
  "out": "docs/api",
  "tsconfig": "tsconfig.base.json",
  "excludePrivate": true,
  "excludeInternal": true,
  "validation": { "invalidLink": true, ... }
}
```

После того как `typedoc` появится в `devDependencies` корневого
`package.json` (зона T-CI), генерация будет работать без правок
конфига. Все 6 unresolved `{@link}` вычищены T-React-Cleanup, поэтому
`validation.invalidLink: true` не вызовет ошибок.

## Часть 2 — 4 новые локали для React и Vue

### React (`packages/react/src/locales/`)

Создано:

- `zh_CN.ts` (Chinese, Simplified)
- `de_DE.ts` (German)
- `fr_FR.ts` (French)
- `es_ES.ts` (Spanish)

Каждый файл копирует структуру `en_US.ts` (после расширений
T-React-I18n-Styles) и переводит значения. Идентификаторы, `sg-*`
имена и unicode-глифы оставлены оригинальными (CHARTER §10).

Структурно каждая локаль покрывает все ключи финального `SgLocale`:

- empty, pagination, popconfirm, modal, form, upload, transfer
- calendar (12 месяцев + 7 дней + today/now/week/prev*/next*)
- inputPassword, searchInput, inlineEdit, tagInput
- drawer, notification, tag, spin, skeleton, breadcrumb
- carousel, rate, charts (6 ключей)
- datePicker, cascader (с noMatches), treeSelect (с noMatches)
- dashboard (4 ключа), gantt, resourceCalendar (6 ключей)
- timeline, schemaFormEditor (10 ключей)

`packages/react/src/locales/index.ts` дополнен экспортами
`zh_CN`/`de_DE`/`fr_FR`/`es_ES`.

`packages/react/src/index.ts` (зона добавлений I18n-Styles +
Cleanup-additive по CHARTER §4) — обновлён один re-export:

```ts
// Было: export { en_US, ru_RU } from './locales'
// Стало:
export { en_US, ru_RU, zh_CN, de_DE, fr_FR, es_ES } from './locales'
```

Так консьюмеры могут писать `import { zh_CN } from '@skygraph/react'`.

### Vue (`packages/vue/src/locales/`)

Создано:

- `zh_CN.ts`
- `de_DE.ts`
- `fr_FR.ts`
- `es_ES.ts`

Каждый файл копирует структуру `en_US.ts` пакета `@skygraph/vue`. Vue
`SgLocale` сейчас уже` (modal, popconfirm, empty, pagination,
inputPassword, searchInput, tagInput, pinInput, inlineEdit) — все
ключи переведены без английских заглушек.

`packages/vue/src/locales/index.ts` дополнен 4 ре-экспортами,
`packages/vue/src/index.ts` — соответствующим re-export'ом
(`zh_CN, de_DE, fr_FR, es_ES`).

## Acceptance criteria — статус

| Пункт | Статус | Комментарий |
|---|---|---|
| `typedoc.json` создан и валиден | ✅ | Без запуска генерации (blocked). |
| 4 новых локали для React существуют, экспортируются | ✅ | `packages/react/src/locales/index.ts` + `index.ts` re-exports. |
| 4 новых локали для Vue существуют, экспортируются | ✅ | `packages/vue/src/locales/index.ts` + `index.ts` re-exports. |
| `pnpm --filter @skygraph/react typecheck` | ✅ | OK |
| `pnpm --filter @skygraph/react test` | ✅ | 626 passed |
| `pnpm --filter @skygraph/vue typecheck` | ✅ | OK |
| `pnpm --filter @skygraph/vue test` | ✅ | 708 passed |
| Структура файлов локалей идентична `en_US.ts` | ✅ | Каждая локаль покрывает все ключи `SgLocale`. |

## Стоп-лист — соблюдение

- ✅ Не менял корневой `package.json`.
- ✅ Не менял `.gitignore` (нашёл проблему с `docs/api/`, см. findings).
- ✅ Не менял `SgLocale` тип (уже финализирован T-React-I18n-Styles).
- ✅ Не переводил ключи / имена `sg-*` классов.
- ✅ Не запускал `pnpm install`, `pnpm clean`, глобальные команды.

## Связанные документы

- `decisions/` — нет (всё по конструктивному пути).
- `blocked/T-Docs-Locales.md` — typedoc generation pending dependency install.
- `findings/T-Docs-Locales.md` — `.gitignore` для `docs/api/` + script for T-CI.
