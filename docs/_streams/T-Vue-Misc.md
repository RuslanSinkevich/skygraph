# T-Vue-Misc — Vue: zodAdapter + HistoryPanel + Diagram ref API

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Vue-Misc
- **Волна:** 2

## Цель
Добить три точечных пробела в Vue-паритете: zod-адаптер форм, HistoryPanel devtool и публичный ref API у Diagram (методы actions через `defineExpose`).

## Зона файлов (можно трогать)

- `packages/vue/src/adapters/zodAdapter.ts` (новый)
- `packages/vue/src/adapters/index.ts` (только добавить ре-экспорт zodAdapter, если файл существует; иначе создать)
- `packages/vue/src/components/devtools/HistoryPanel.vue` (новый)
- `packages/vue/src/components/devtools/index.ts` (новый или добавление)
- `packages/vue/src/components/complex/Diagram/Diagram.vue` (правки только публичного ref API)
- `packages/vue/src/index.ts` — **только** строки добавления новых экспортов
- `packages/vue/src/__tests__/` — добавить тесты для zodAdapter и HistoryPanel (новые файлы)

## Чек-лист

### zodAdapter

1. Открыть React-аналог: `packages/react/src/adapters/zodAdapter.ts` (или ближайшее имя). Понять контракт.
2. Создать `packages/vue/src/adapters/zodAdapter.ts`:
   - Экспорт `zodAdapter(schema)` или такой же сигнатуры, как в React.
   - Возвращать объект с методом `validate(values)` (или такая же сигнатура).
   - Никаких React-зависимостей. Никаких `ref` — это чистая функция.
3. Тест: `packages/vue/src/__tests__/zodAdapter.test.ts` — покрыть happy-path и пару граничных.

### HistoryPanel

1. Открыть React-аналог: `packages/react/src/components/devtools/HistoryPanel.tsx` (или близкое имя).
2. Создать `packages/vue/src/components/devtools/HistoryPanel.vue`:
   - Идиоматично: `<script setup>`, `useConfig()` для locale, `useWatch(core, '...')` для подписок на core.
   - DOM-структура и `sg-*` классы как в React.
   - Локализация через `useConfig().locale.devtools.historyPanel.*` (если ключи отсутствуют — записать в `findings/T-Vue-Misc.md`, **не добавлять** ключи в локали — это зона T-Docs-Locales).
3. Тест: `packages/vue/src/__tests__/HistoryPanel.test.ts` — рендер, базовая интерактивность.

### Diagram ref API

1. Открыть `packages/react/src/components/complex/Diagram/Diagram.tsx`. Найти `useImperativeHandle` или `forwardRef` — список публичных методов.
2. В `packages/vue/src/components/complex/Diagram/Diagram.vue`:
   - Если методы не выставлены — выставить через `defineExpose({ ... })`.
   - Имена и сигнатуры строго как в React.
3. Если в Vue Diagram есть структурные расхождения с React — записать в `decisions/T-Vue-Misc.md`, не лезть в чужой scope.

### Финал

```bash
pnpm --filter @skygraph/vue typecheck
pnpm --filter @skygraph/vue test
pnpm --filter @skygraph/vue build
```
Все зелёные.

## Acceptance criteria

- `zodAdapter` есть, экспортирован из `@skygraph/vue`, тест зелёный.
- `HistoryPanel.vue` есть, экспортирован, тест зелёный.
- `Diagram.vue` через `defineExpose` отдаёт те же публичные методы, что React-аналог.
- Build пакета зелёный.

## Стоп-лист (этому стриму)

- Не трогать локали (`packages/vue/src/locales/`).
- Не трогать 6 SFC из зоны T-Vue-Cleanup.
- Не трогать Charts-зону.
- Не делать больше одного `defineExpose` чем в React.

## Зависимости
Нет блокирующих. Возможный конфликт — `packages/vue/src/index.ts`. Добавлять только свои строки.

## Финал
Отчёт: `docs/_streams/done/T-Vue-Misc.md`.
