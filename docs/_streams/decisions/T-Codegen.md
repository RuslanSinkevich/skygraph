# T-Codegen — decisions

## 1. Расширение скрипта: `.mjs`, не `.ts`

**Контекст task-карты:**

> Чистый TS-скрипт под Node 18+ (используется `tsx` или `ts-node` уже
> стоящий в репо; если ничего нет — script на чистом JS либо запись
> в `blocked/T-Codegen.md`).

**Что обнаружено:**

- В корневом `package.json` нет `tsx` или `ts-node`.
- В `node_modules/.bin/` ни `tsx*`, ни `ts-node*` тоже не найдены
  (проверено `Get-ChildItem node_modules\.bin -Filter tsx*`).
- Поиск `"tsx"` / `"ts-node"` в `**/package.json` — пусто.
- `pnpm install` запрещён CHARTER §5 и task-картой («НЕ ставить новые
  dev-зависимости»), значит подтянуть `tsx` нельзя.

**Решение (минимально инвазивный путь, CHARTER §6.1):**

Скрипт оформлен как `scripts/gen-demo-page.mjs` — чистый Node 18+ ESM,
без новых dev-deps, запускается как `node scripts/gen-demo-page.mjs`.
Это полностью соответствует «либо script на чистом JS» из task-карты.

Acceptance criteria task-карты говорит про `.ts`-файл, но та же
task-карта явно описывает fallback на JS как валидный исход — поэтому
trade-off сделан в пользу работающего скрипта без `pnpm install`.

JSDoc типы оставлены там, где помогают чтению (`@typedef`, `@type`),
чтобы не терять статическую проверку при будущей миграции на `tsx`.
Сама миграция тривиальна: переименовать в `.ts`, заменить
`process.argv.slice(2)` / `parseArgs` импорт остаётся таким же,
запускающую команду — на `tsx scripts/gen-demo-page.ts`.

## 2. Без правок App.tsx / App.vue / locale-словарей

Task-карта явно запрещает автоматизировать эти правки (стоп-лист
T-Codegen + риск конфликтов с T-VueLayout / T-VueDemo-Pages /
T-Docs-Locales). Скрипт пишет только две файловых цели и **печатает
инструкцию** в stdout о том, что должен дописать разработчик руками.

## 3. Без `pnpm gen:demo-page` script

Корневой `package.json` — зона T-CI (CHARTER §4). T-Codegen в свою
зону его не включает, значит сам скрипт `pnpm gen:demo-page` не
прописывается. Рекомендация для T-CI зафиксирована в
`docs/_streams/findings/T-Codegen.md`.

## 4. Целевые пути из task-карты, не из текущего репо

Task-карта диктует:

- `examples/demo/src/demos/<name>/<PascalName>.tsx`
- `examples/demo-vue/src/demos/<name>/<PascalName>.vue`

Текущий репо для Vue использует `examples/demo-vue/src/pages/<Name>Page.vue`.
Соблюдается task-карта (она — спецификация). Если репо-конвенция
изменится, шаблоны и пути в `gen-demo-page.mjs` правятся в одной
функции `targets.push(...)` — это намеренно держится централизованно.

## 5. Refuse-overwrite по умолчанию

Скрипт отказывается перезаписывать существующий файл без `--force`.
Это страховка от случайного затирания уже написанной демо-страницы
при повторном запуске генератора с тем же `--name`.

## 6. `--dry-run` поддерживается

Task-карта отдельным пунктом упоминает «сухим прогоном (если
поддерживает)». Поддержано: `--dry-run` печатает список файлов,
которые были бы созданы, и не трогает диск.
