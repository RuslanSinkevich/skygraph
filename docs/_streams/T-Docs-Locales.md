# T-Docs-Locales — TSDoc автоген + новые локали zh/de/fr/es

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Docs-Locales
- **Волна:** 2

## Цель
1. Поднять автоген API-документации из TSDoc (`typedoc`) для `@skygraph/{core,react,vue}`.
2. Добавить локали `zh_CN`, `de_DE`, `fr_FR`, `es_ES` для React и Vue (на базе `en_US`).

## Зона файлов (можно трогать)

- `typedoc.json` (новый, корневой)
- `docs/api/` (выходная папка автогена)
- `packages/react/src/locales/zh_CN.ts` (новый)
- `packages/react/src/locales/de_DE.ts` (новый)
- `packages/react/src/locales/fr_FR.ts` (новый)
- `packages/react/src/locales/es_ES.ts` (новый)
- `packages/react/src/locales/index.ts` — **только** добавление новых export-ов
- `packages/vue/src/locales/zh_CN.ts` (новый)
- `packages/vue/src/locales/de_DE.ts` (новый)
- `packages/vue/src/locales/fr_FR.ts` (новый)
- `packages/vue/src/locales/es_ES.ts` (новый)
- `packages/vue/src/locales/index.ts` — **только** добавление новых export-ов

## Чек-лист

### Часть 1 — TSDoc автоген

1. **Зависимости:** `typedoc` и плагины могут отсутствовать. По CHARTER `pnpm install` запрещён.
   - Проверить корневой `package.json`. Если `typedoc` нет → записать в `blocked/T-Docs-Locales.md` и подготовить файлы конфигурации, но не запускать.
   - Если есть → продолжить.
2. Создать `typedoc.json`:
   - `entryPoints`: `packages/core/src/index.ts`, `packages/react/src/index.ts`, `packages/vue/src/index.ts`.
   - `out`: `docs/api`.
   - `excludePrivate: true`, `excludeInternal: true`, `excludeProtected: false`.
   - `entryPointStrategy: "expand"` или `"resolve"` — по факту работы с monorepo.
3. **Не добавлять npm-script** в корневой `package.json` (зона T-CI). Записать в `findings/T-Docs-Locales.md` рекомендацию для T-CI: добавить `"docs": "typedoc"`.
4. Прогнать вручную (если есть зависимости): `npx typedoc` — убедиться, что генерация проходит.
5. Проверить — git ignore: `docs/api/` должен быть в `.gitignore`. Если нет — записать в `findings/T-Docs-Locales.md`, **не трогать** `.gitignore` (корневой конфиг).

### Часть 2 — новые локали

1. Открыть `packages/react/src/locales/en_US.ts` — это базовая структура.
2. Для каждого языка (zh_CN, de_DE, fr_FR, es_ES):
   - Создать файл-копию структуры `en_US`.
   - Перевести значения. Машинного перевода достаточно для первой версии — главное полнота ключей.
   - Идентификаторы и `sg-*` имена — **не переводить** (см. CHARTER §10).
3. Аналогично для `packages/vue/src/locales/`.
4. Расширить `packages/{react,vue}/src/locales/index.ts`:
   ```ts
   export { en_US } from './en_US'
   export { ru_RU } from './ru_RU'
   export { zh_CN } from './zh_CN'
   export { de_DE } from './de_DE'
   export { fr_FR } from './fr_FR'
   export { es_ES } from './es_ES'
   ```
5. Проверка типов: новые локали должны удовлетворять `SgLocale`. Если `SgLocale` пополнится новыми ключами после T-React-I18n-Styles — этот стрим может не успеть. В таком случае:
   - Заполнить новые ключи **английским текстом** как заглушкой.
   - Записать в `findings/T-Docs-Locales.md` список ключей-заглушек.

### Финал

```bash
pnpm --filter @skygraph/react typecheck
pnpm --filter @skygraph/react test
pnpm --filter @skygraph/vue typecheck
pnpm --filter @skygraph/vue test
```
Зелёные.

## Acceptance criteria

- `typedoc.json` создан и валиден (если зависимости есть — генерация проходит).
- 4 новых локали для React существуют, экспортируются, `typecheck` проходит.
- 4 новых локали для Vue существуют, экспортируются, `typecheck` проходит.
- Структура файлов локалей идентична `en_US.ts`.

## Стоп-лист

- НЕ менять корневой `package.json`.
- НЕ менять `.gitignore`.
- НЕ менять `SgLocale` тип (это зона T-React-I18n-Styles).
- НЕ переводить ключи / имена классов / sg-идентификаторы.
- НЕ запускать `pnpm install`.

## Зависимости
- Желательно после T-React-I18n-Styles (тогда `SgLocale` финализирован). Если параллельно — заглушки английским и `findings/`.

## Финал
Отчёт: `docs/_streams/done/T-Docs-Locales.md`. Список добавленных локалей и заметка о состоянии typedoc-конфига.
