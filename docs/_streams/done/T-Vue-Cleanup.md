# T-Vue-Cleanup — done

**Wave:** 2.
**Status:** done.

## Цель

Убрать `customClass` из 6 свежих Vue SFC, прийти к идиоматичному
attribute-fallthrough Vue, и добить parity-тест по этим компонентам.

## Изменённые / новые файлы

- `packages/vue/src/components/ui/InputPassword.vue` — удалена пропа
  `customClass?: string`, `wrapperClasses` больше не объединяет её с
  `sg-*` классами, унstyled-ветка не использует `:class="customClass"`.
- `packages/vue/src/components/ui/SearchInput.vue` — то же.
- `packages/vue/src/components/ui/TagInput.vue` — то же.
- `packages/vue/src/components/ui/PinInput.vue` — удалена пропа
  `customClass`; в шаблоне `:class="unstyled ? customClass : wrapperClasses"`
  заменено на `:class="unstyled ? '' : wrapperClasses"`. Дополнительно
  поправлен `cellRefs` (`ref([])` → plain array) — устранение
  recursive-update warning, см. `decisions/T-Vue-Cleanup.md` D2.
- `packages/vue/src/components/ui/InlineEdit.vue` — удалена пропа
  `customClass`, удалены все её упоминания во всех трёх view/edit-ветках
  шаблона.
- `packages/vue/src/components/ui/InputGroup.vue` — удалена пропа
  `customClass`; обе ветки шаблона больше не вешают её на root.
- `packages/vue/src/__tests__/styling-contract.parity.test.ts` —
  добавлены 9 новых кейсов (по 1-2 на каждый из 6 компонентов: idle и
  один реалистичный variant). Lookup root для `SgInlineEdit` через
  `wrapper.find('.sg-inline-edit-view').element` (см. D3).

## Что НЕ менялось

- `packages/vue/src/components/ui/index.ts` — все 6 уже экспортированы
  (включая локали `*Locale`-типов).
- `packages/vue/src/index.ts` — все 6 SFC и их `*Props`/`*Locale`-типы
  уже экспортированы (см. строки 258-274 и 411-416). Append-фаза не
  потребовалась.
- `packages/react/**`, `packages/styles/**`, `packages/vue/src/locales/**`,
  `examples/**` — не тронуты (вне зоны).

## Acceptance criteria

- [x] В шести SFC нет пропа `customClass`.
- [x] `vue-tsc` (`pnpm --filter @skygraph/vue typecheck`) — ✅ зелёный.
- [x] `pnpm --filter @skygraph/vue test` — ✅ 669/669 (включая
      новые 9 кейсов в `styling-contract.parity.test.ts`).
- [x] `pnpm --filter @skygraph/vue build` — ✅ собирается;
      `dist/index.{js,cjs,d.ts}` готов. Есть 2 pre-existing warning от
      `vite-plugin-dts` про `slots.foo` truthy-check в `List.vue` и
      `Table.vue` — вне зоны, см. `findings/T-Vue-Cleanup.md` F1.
- [x] `index.ts` пакета `@skygraph/vue` экспортирует все 6 компонентов
      и их типы пропов (плюс `PasswordStrength`, `*Locale`).

## Locale audit (CHARTER §10)

- `InputPassword`: aria-labels через `lp.value.{showPassword,hidePassword}`;
  `'◉'/'○'` оставлены как Unicode-символы (CHARTER §10).
- `SearchInput`: placeholder, кнопка, aria-label clear — через `lp`;
  `'⌕'/'×'` Unicode оставлены.
- `TagInput`: placeholder и `aria-label="${lp.removeTag} ${tag}"` через
  `lp`; `'×'` Unicode.
- `PinInput`: `aria-label="PIN input"` через `lp.ariaLabel`; `'○'`
  placeholder Unicode.
- `InlineEdit`: placeholder, aria-label save/cancel — через `lp`;
  `'✎/✓/✕'` Unicode.
- `InputGroup`: чисто структурный, текста нет.

## Decisions (см. `decisions/T-Vue-Cleanup.md`)

1. `customClass` удалён в пользу Vue attribute fallthrough.
2. `PinInput.cellRefs`: `ref([])` → plain array — починка recursive-update
   warning.
3. `SgInlineEdit` parity-тест читает root через `wrapper.find()` —
   multi-root шаблон не позволяет использовать общий `rootShape(wrapper)`.

## Findings (см. `findings/T-Vue-Cleanup.md`)

- F1: pre-existing TS2774 warnings от `vue-tsc` в `List.vue` / `Table.vue`
  (slot-accessor truthy-check). Вне зоны.
- F2: latent bug в `PinInput` (исправлено внутри зоны, см. D2).

## Команды (sanity)

```
pnpm --filter @skygraph/vue typecheck   # ✅
pnpm --filter @skygraph/vue test        # ✅ 669/669
pnpm --filter @skygraph/vue build       # ✅ 386 kB / 83 kB gzip
```
