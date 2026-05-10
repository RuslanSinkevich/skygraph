# T-React-I18n-Styles — React: хардкод строк → useConfig + style={{}} → CSS

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-React-I18n-Styles
- **Волна:** 2

## Цель
Закрыть две связанные дыры в React-компонентах:
1. Хардкод user-facing строк в TSX → перевести на `useConfig().locale.*`.
2. Инлайновые `style={{...}}` со статичными значениями → CSS-классы `.sg-*`.

## Зона файлов (можно трогать)

- `packages/react/src/components/**/*.tsx` (все компонентные файлы) **кроме** `packages/react/src/components/complex/Table/**` — это зона T-Table-Perf.
- `packages/react/src/locales/en_US.ts` — **только** добавление новых ключей
- `packages/react/src/locales/ru_RU.ts` — **только** добавление новых ключей
- `packages/react/src/types.ts` — **только** расширение `SgLocale` под новые ключи
- `packages/styles/components/*.css` — **только** добавление новых классов (имя `sg-<component>-<modifier>`). Файлы относящиеся к Table (`table.css` и т. п.) — НЕ ТРОГАТЬ, это зона T-Table-Perf если он решит править стили.

## Чек-лист

### Часть 1 — i18n хардкоды

1. По `packages/react/src/components/**/*.tsx` пройтись и найти строки:
   - Регулярки-ориентир: `>[A-Za-zА-Яа-я][^<{]+<`, `aria-label="..."` со словами, `placeholder="..."`, `title="..."`.
2. По каждому компоненту:
   - Если строка осмысленная и user-facing → завести ключ в `SgLocale` (TS-тип).
   - Имя ключа: `<componentLowerCase>.<purpose>` (например, `tagInput.placeholder`).
   - Дополнить `en_US.ts` и `ru_RU.ts` переводами.
   - В TSX заменить на `const { locale } = useConfig(); ... locale.tagInput.placeholder`.
3. Не локализовать (см. CHARTER §10):
   - Unicode-символы (`✓`, `×`, `→`, и т. д.).
   - `data-*` атрибуты, имена классов, ARIA-роли (`role="button"`).
   - Технические идентификаторы.

### Часть 2 — инлайн-стили

1. Поиск: `rg "style=\{\{" packages/react/src/components/`.
2. Для каждого попадания:
   - Если значения **статичные** (фиксированные пиксели, цвета без переменных) → перенести в CSS-класс. Имя класса `sg-<component>-<descriptor>`. CSS-правило в соответствующий файл `packages/styles/components/<component>.css`.
   - Если значения **динамические** (зависят от пропов/state) → оставить как `style`, но через CSS-переменные если возможно: `style={{ '--sg-foo-w': widthPx }}`. CSS правило: `.sg-foo { width: var(--sg-foo-w) }`.
3. Прогон `pnpm check:styles` — не должно быть новых regression.

### Финал

```bash
pnpm --filter @skygraph/react typecheck
pnpm --filter @skygraph/react test
pnpm --filter @skygraph/react build
pnpm --filter demo build
pnpm check:styles
```

## Acceptance criteria

- В `packages/react/src/components/` нет user-facing хардкод строк (только unicode и тех. идентификаторы).
- Инлайновых `style={{...}}` со статичными значениями нет.
- `SgLocale` тип расширен новыми ключами.
- `en_US` и `ru_RU` имеют все новые ключи.
- `pnpm --filter demo build` и `pnpm check:styles` зелёные.

## Стоп-лист

- Не трогать `index.ts` пакета `@skygraph/react` (там работает T-React-Cleanup).
- Не удалять CSS-правила (там работает T-React-Cleanup).
- Не трогать `packages/vue/`.
- Не трогать новые локали `zh_CN` / `de_DE` / `fr_FR` / `es_ES` (это T-Docs-Locales).
- Не менять `packages/styles/tokens.css`.
- **НЕ трогать `packages/react/src/components/complex/Table/**`** — это зона T-Table-Perf. Если в Table-компонентах есть хардкод-строки или инлайн-стили — записать в `findings/T-React-I18n-Styles.md`, не править.

## Зависимости
- Можно стартовать сразу после Волны 1.
- Конфликт по `packages/styles/components/*.css` с T-React-Cleanup: T-React-Cleanup только удаляет, ты только добавляешь. Не одни и те же строки.

## Финал
Отчёт: `docs/_streams/done/T-React-I18n-Styles.md`. В отчёте — список новых ключей локалей и список новых CSS-классов.
