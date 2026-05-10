# T-Codegen — done

**Wave:** 2.
**Status:** done.

CLI-генератор `node scripts/gen-demo-page.mjs --name <kebab-case>`
создаёт скелеты demo-страниц для React и/или Vue из шаблонов в
`scripts/templates/`. Без новых dev-зависимостей, без правок чужих
зон, без `pnpm install`.

## Изменённые / новые файлы

Все — внутри зоны T-Codegen (CHARTER §4):

- `scripts/gen-demo-page.mjs` (новый) — CLI: `--name`, `--framework`,
  `--locale-key`, `--dry-run`, `--force`, `-h/--help`. Чистый Node 18+
  ESM, использует `node:util` `parseArgs`, `node:fs`, `node:path`.
- `scripts/templates/demo-page.react.tsx.tmpl` (новый) — React-шаблон
  с `useConfig` из `@skygraph/react`.
- `scripts/templates/demo-page.vue.vue.tmpl` (новый) — Vue-шаблон
  с `<script setup lang="ts">` + `useConfig` из `@skygraph/vue`.
- `scripts/README.md` (новый) — описание команды, таблица
  «создаётся / делается руками», список placeholders, exit-коды.
- `docs/_streams/decisions/T-Codegen.md` (новый).
- `docs/_streams/findings/T-Codegen.md` (новый).
- `docs/_streams/done/T-Codegen.md` (этот файл).

Чужие зоны не тронуты: ни `examples/demo/src/App.tsx`, ни
`examples/demo-vue/src/App.vue`, ни `nav.ts`, ни локали, ни корневой
`package.json`. Артефакты пробного запуска (`scratch-test-page`)
удалены.

## Acceptance criteria

| Пункт | Статус | Комментарий |
|---|---|---|
| `scripts/gen-demo-page.{ts,mjs}` существует, валидный код | ✅ | `.mjs` (decisions §1). `node --check` проходит. |
| `--name foo --framework both` создаёт 2 файла страницы | ✅ | Проверено на `scratch-test-page` — оба файла на месте, удалены после. |
| Шаблоны идиоматичны (Vue: `<script setup>`, React: hooks) | ✅ | Vue-шаблон — `<script setup lang="ts">` + `useConfig()`. React — функциональный компонент + `useConfig()`. |
| `scripts/README.md` описывает использование | ✅ | Таблица опций, примеры, exit-коды, placeholders. |
| Никаких артефактов от пробных запусков в репо | ✅ | `scratch-test-page` удалён вместе с пустой директорией `examples/demo-vue/src/demos/`. `git status` показывает только мою зону. |

### Стоп-лист — соблюдён

- ✅ `App.tsx` / `App.vue` не правятся автоматом — генератор печатает
  инструкции в stdout.
- ✅ Локали не правятся автоматом.
- ✅ Никаких новых dev-deps, никакого `pnpm install`.
- ✅ Корневой `package.json` не тронут — рекомендация по
  `pnpm gen:demo-page` лежит в `findings/T-Codegen.md`.

## Пример использования

```bash
# Сгенерировать React + Vue одновременно.
node scripts/gen-demo-page.mjs --name color-picker

# Только Vue, с явным locale-key.
node scripts/gen-demo-page.mjs --name color-picker --framework vue --locale-key colorPicker

# Сухим прогоном — посмотреть, что было бы создано.
node scripts/gen-demo-page.mjs --name color-picker --dry-run
```

Что появляется на диске после первой команды:

```
examples/demo/src/demos/color-picker/ColorPicker.tsx
examples/demo-vue/src/demos/color-picker/ColorPicker.vue
```

Что выводится в stdout (next steps делаются руками):

```
Generated:
  + .../examples/demo/src/demos/color-picker/ColorPicker.tsx
  + .../examples/demo-vue/src/demos/color-picker/ColorPicker.vue

Next steps (do these by hand to avoid clashing with parallel streams):
  1. Register a route for "ColorPicker" in examples/demo/src/App.tsx
  2. Add the "colorPicker" key to examples/demo/src/i18n/dict-en.ts and dict-ru.ts
  3. Register a route for "ColorPicker" in examples/demo-vue/src/App.vue or src/router/index.ts
  4. Add the "colorPicker" key to examples/demo-vue/src/i18n/dict-en.ts and dict-ru.ts
```

## CLI-валидация (sanity)

| Сценарий | Команда | Exit | Ожидание |
|---|---|---|---|
| Help | `--help` | 0 | usage + примеры |
| Без `--name` | (пусто) | 1 | error: `--name is required` |
| Не kebab-case | `--name BadName` | 1 | error: `--name must be kebab-case` |
| Невалидный framework | `--framework wrong` | 1 | error: framework must be one of react\|vue\|both |
| Существующий target | повторный запуск без `--force` | 1 | error: refuses to overwrite, hint про `--force` |
| Dry run | `--dry-run` | 0 | `[dry-run] would write …` без записи |
| Реальный прогон | `--name scratch-test-page --framework both` | 0 | 2 файла + next steps |

Все сценарии прогнаны вручную, поведение совпадает с ожидаемым.

## Decisions

См. `docs/_streams/decisions/T-Codegen.md`. Ключевые:

1. **`scripts/gen-demo-page.mjs`, не `.ts`** — ни `tsx`, ни `ts-node`
   в репо нет, `pnpm install` запрещён. Чистый Node 18+ ESM —
   единственный способ выдать рабочий скрипт без новых dev-deps.
   Task-карта явно разрешает этот fallback.
2. **Не правим `App.*` / локали / корневой `package.json` автоматом.** —
   риск конфликтов с параллельными стримами.
3. **Refuse-overwrite по умолчанию.** — `--force` существует, но
   default — отказ, чтобы не затирать готовые страницы при rerun.
4. **`--dry-run` поддерживается** — упомянут в task-карте отдельным
   пунктом.

## Findings

См. `docs/_streams/findings/T-Codegen.md`. Краткое:

1. Рекомендация для T-CI: добавить `"gen:demo-page": "node
   scripts/gen-demo-page.mjs"` в `scripts` корневого `package.json`.
2. Расхождение task-карты и репо по пути Vue-страниц
   (`demos/<name>/<PascalName>.vue` vs фактический
   `pages/<Name>Page.vue`). Соблюдается task-карта; шаблон тривиально
   правится в одном месте, если конвенция изменится.
3. Pre-existing typecheck-ошибки в demo / demo-vue / showcases / core
   из соседних стримов (T-Showcases-I18n, T-VueLayout, T-Docs-Locales,
   T-Table-Perf). Они НЕ связаны с T-Codegen — мои файлы не входят
   в граф компиляции этих пакетов. CHARTER §6.4 — не чиню.

## Перепроверки в финале

- `node scripts/gen-demo-page.mjs --help` → exit 0.
- `node scripts/gen-demo-page.mjs --name scratch-test-page --framework both --dry-run` → exit 0, файлы НЕ созданы.
- `node scripts/gen-demo-page.mjs --name scratch-test-page --framework both` → exit 0, 2 файла созданы.
- Просмотр сгенерированного React + Vue файла → корректные
  placeholders, корректные импорты, идиоматично.
- Удаление артефактов (`scratch-test-page` папка целиком) → `git
  status` показывает только мою зону.
- `ReadLints` по `scripts/**` и `docs/_streams/**/T-Codegen.md` →
  чисто.
