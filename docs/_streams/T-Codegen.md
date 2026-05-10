# T-Codegen — Генератор demo-страниц

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Codegen
- **Волна:** 2

## Цель
CLI-утилита `pnpm gen:demo-page <name>` (или `node scripts/gen-demo-page.ts <name>`), которая создаёт скелет новой demo-страницы для React и/или Vue с правильной структурой, route-регистрацией и i18n-ключами.

## Зона файлов (можно трогать)

- `scripts/gen-demo-page.ts` (новый)
- `scripts/templates/` (новая папка с шаблонами)
- `scripts/templates/demo-page.react.tsx.tmpl` (новый)
- `scripts/templates/demo-page.vue.vue.tmpl` (новый)
- `scripts/README.md` (новый или append)

## Чек-лист

### Шаг 1. Прототип

1. Создать `scripts/gen-demo-page.ts`:
   - Чистый TS-скрипт под Node 18+ (используется `tsx` или `ts-node` уже стоящий в репо; если ничего нет — script на чистом JS либо запись в `blocked/T-Codegen.md`).
   - CLI-аргументы:
     - `--name <kebab-case>` — обязательный.
     - `--framework react|vue|both` — по умолчанию `both`.
     - `--locale-key <camelCase>` — по умолчанию из `--name` (kebab→camel).
   - Действия:
     - Создать `examples/demo/src/demos/<name>/<PascalName>.tsx` (если react/both).
     - Создать `examples/demo-vue/src/demos/<name>/<PascalName>.vue` (если vue/both).
     - **Не трогать** `examples/demo/src/App.tsx` и `examples/demo-vue/src/App.vue` автоматически. Вывести в stdout инструкцию: «Добавь route в `App.tsx` и `App.vue`».
     - **Не трогать** локали автоматически. Вывести инструкцию.
2. Шаблоны:
   - `demo-page.react.tsx.tmpl`: минимум — `import { useConfig } from '@skygraph/react'`, базовая структура страницы с заголовком из локали-ключа.
   - `demo-page.vue.vue.tmpl`: аналогично, `<script setup>` + `useConfig()` из `@skygraph/vue`.

### Шаг 2. Документация

1. `scripts/README.md`:
   - Описание команды.
   - Примеры вызова.
   - Таблица — что создаёт и что нужно довести руками.

### Шаг 3. Проверка

1. Запустить генератор сухим прогоном (если поддерживает) или на тестовом имени (`scratch-test-page`):
   ```bash
   node scripts/gen-demo-page.ts --name scratch-test-page --framework both
   ```
2. Убедиться, что файлы созданы корректно.
3. **Удалить** созданные файлы для `scratch-test-page` после проверки. Они не должны попадать в финальное состояние.
4. Запустить typecheck demo:
   ```bash
   pnpm --filter demo typecheck
   pnpm --filter demo-vue typecheck
   ```
   (Скрипт не должен ломать сборки.)

## Acceptance criteria

- `scripts/gen-demo-page.ts` существует, валидный TS.
- При запуске с `--name foo --framework both` создаются 2 файла страницы.
- Шаблоны идиоматичны (Vue: `<script setup>`, React: hooks).
- `scripts/README.md` описывает использование.
- Никаких артефактов от пробных запусков в репо.

## Стоп-лист

- НЕ автоматизировать правки `App.tsx`/`App.vue` (риск конфликтов с другими стримами).
- НЕ автоматизировать правки локалей.
- НЕ ставить новые dev-зависимости (`pnpm install` запрещён).
- НЕ трогать `package.json` корня (зона T-CI). Команду `pnpm gen:demo-page` пользователь добавит сам или в рамках T-CI — зафиксировать рекомендацию в `findings/T-Codegen.md`.

## Зависимости
Нет блокирующих. Можно стартовать сразу после Волны 1.

## Финал
Отчёт: `docs/_streams/done/T-Codegen.md` с примером использования.
