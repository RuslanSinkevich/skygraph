# T-Vue-Cleanup — Уборка 6 Vue SFC + parity-тесты

> Прочитал `CHARTER.md`? Если нет — прочитай сначала. Этот документ — частное.

## ID и волна
- **ID:** T-Vue-Cleanup
- **Волна:** 2 (рабочие)

## Цель
Убрать хак с `customClass` из 6 свежих Vue SFC, привести к идиоматичному Vue (атрибут-fallthrough), и закрыть дыры в parity-тесте по этим компонентам.

## Зона файлов (можно трогать)

- `packages/vue/src/components/ui/InputPassword.vue`
- `packages/vue/src/components/ui/SearchInput.vue`
- `packages/vue/src/components/ui/TagInput.vue`
- `packages/vue/src/components/ui/PinInput.vue`
- `packages/vue/src/components/ui/InlineEdit.vue`
- `packages/vue/src/components/ui/InputGroup.vue`
- `packages/vue/src/components/ui/index.ts` (только если там лежит ре-экспорт этих 6)
- `packages/vue/src/__tests__/styling-contract.parity.test.ts` (только секции для этих 6)
- `packages/vue/src/index.ts` — **только** строки экспорта этих 6 компонентов и их типов

## Чек-лист

1. Для каждого SFC:
   - Убрать пропу `customClass?: string` (если есть).
   - В шаблоне убрать явное связывание `:class="['sg-…', customClass]"` — заменить на `class="sg-…"`. Vue сам прокинет внешний `class` на корень.
   - Если в SFC несколько корневых элементов — выставить `inheritAttrs: false` через `defineOptions({ inheritAttrs: false })` и явно `v-bind="$attrs"` на нужный корень. Только если это реально нужно.
   - Проверить, что `class` нигде не дублируется.
2. Сверить пропы/эмиты с React-аналогами (`packages/react/src/components/ui/<Name>.tsx`):
   - Имена пропов совпадают.
   - Типы совпадают.
   - Имена эмитов соответствуют (`update:modelValue`, `update:foo`, etc.).
   - DOM-ребро и `sg-*` классы совпадают.
3. Проверить локализацию:
   - Все user-facing строки идут через `useConfig()` / `useConfigWithDefaults()`.
   - Никаких хардкодов (кроме unicode-символов из CHARTER §10).
4. Расширить `styling-contract.parity.test.ts`:
   - По каждому из 6 компонентов — кейс «React vs Vue: одинаковый набор `sg-*` классов на корневом элементе».
   - Если компонент уже покрыт частично — добавить недостающее.
5. Прогнать своего пакета:
   ```bash
   pnpm --filter @skygraph/vue typecheck
   pnpm --filter @skygraph/vue test
   pnpm --filter @skygraph/vue build
   ```

## Acceptance criteria

- В шести SFC нет пропа `customClass`.
- `vue-tsc` не ругается на эти файлы.
- `styling-contract.parity.test.ts` зелёный, и в нём есть кейс на каждый из 6 компонентов.
- `pnpm --filter @skygraph/vue build` зелёный.
- `index.ts` пакета `@skygraph/vue` экспортирует все 6 компонентов и их типы пропов.

## Стоп-лист (этому стриму)

- Не трогать другие SFC (`Input.vue`, `Select.vue` и т. д.).
- Не трогать `packages/vue/src/locales/` — это зона T-Docs-Locales.
- Не добавлять новые компоненты — это T-Vue-Misc / T-Vue-Charts.

## Зависимости
Нет блокирующих. Можно стартовать сразу после Волны 1.

## Финал
Отчёт: `docs/_streams/done/T-Vue-Cleanup.md`.
