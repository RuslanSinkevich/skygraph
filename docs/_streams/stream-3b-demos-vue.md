# Stream 3b — Demos Vue (`examples/demo-vue`, `examples/showcases-vue`)

> Часть плана `demo-and-fixes-plan.md` (индекс). Параллелен S1, S2, S3a. Зона — только Vue-demo.

## Charter (правила исполнения)
1. **Не останавливаться** до конца стрима. Не спрашивать — решать самому.
2. **Не выходить за свою файловую зону** (ниже). `packages/` и React-demo не трогать.
3. **Без субагентов.**
4. Definition of done: `pnpm --filter demo-vue build` зелёный, token-демки чистые в «Show Code», прыжок floating-label устранён.

## Ветка
`stream/demos-vue`

## Файловая зона (эксклюзивно)
- `examples/demo-vue/**`
- `examples/showcases-vue/**`
- `examples/_shared-vue/**`

НЕ трогать: `examples/demo/**`, `examples/showcases/**`, `examples/_shared-react/**` (зона S3a), `examples/_shared/**` (общий пакет — не нужен), `packages/**`.

## Принцип «понятно джуну»
1. «Show Code» = чистый usage, без demo-обёрток.
2. Минимум логики, один блок = одна идея.
3. Каждый используемый проп — в props-таблице (и наоборот).

## Ориентир
React — источник правды. Паттерны (token-демка, sticky) берём из этого файла и из S3a; зеркалим 1:1 на Vue-синтаксис, работаем независимо от хода S3a (спека ниже самодостаточна).

---

## D1 (Vue). Убрать TokenScopeCards → один inline тёмный блок
- Удалить `examples/demo-vue/src/demos/_shared/TokenScopeCards.vue`.
- Переписать ~44 `examples/demo-vue/src/demos/*/TokensOverride.demo.vue`: один `<div :style="dark">` с inline-объектом тёмных CSS-переменных, внутри компонент. Без обёрток, без shared-констант, без `useDemoStrings` (литералы).
- Значения брать из существующих `extra.dark` каждого компонента + общий тёмный набор (как в текущем `DARK_SCOPE`). У `SgInput`/`SgSelect` — `--sg-input-*`, у `SgButton` — `--sg-btn-*` и т.д.
- Переписать `demoTokensDesc` в `*-doc/en.ts`/`ru.ts`: «оберни компонент в элемент с CSS-переменными — он перекрасится».

**Эталон (Button):**

```vue
<script setup lang="ts">
import { SgButton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
  '--sg-btn-bg': '#1e293b',
  '--sg-btn-color': '#e2e8f0',
  '--sg-btn-border': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgButton type="primary">Get started</SgButton>
    <SgButton>Learn more</SgButton>
  </div>
</template>
```

## D3 (Vue). Floating label «прыгает» (Select) — основной фикс
- **Репорт:** `/vue/#/components/select~plavayuschiy-label` — лейбл прыгает.
- **Корень:** Vue Select demo использует inline `fl-field` на `:focus-within` без rAF-фикса гонки focus/filled → bounce. React demo использует `FloatingField` с фиксом.
- **Фикс:** перевести Vue demo Select (и DatePicker/AutoComplete/TreeSelect/InputNumber — та же дыра) на общий `examples/demo-vue/src/demos/_shared/FloatingField.vue` (его сейчас корректно использует только ColorPicker).

## D4 (Vue). Sticky header demo
- Добавить демку «Фиксированная шапка» в Vue: `<SgTable :sticky="true" :scroll="{ y: 360 }" ... />` + строка в props-таблицу и doc-strings.

## D5 (Vue). Проверка empty-state demo
- После мержа S1/A2 (фикс центрирования в ядре) перепроверить `examples/demo-vue/src/demos/table/EmptyState.demo.vue` — в `examples/` менять ничего не нужно, только визуальная проверка.

---

## Для релиза (передать в E)
- Token-демки Vue упрощены (убран `TokenScopeCards`).
- Исправлен прыжок floating-label у Select и связанных полей (Vue demo).
- Добавлена Vue-демка таблицы с фиксированной шапкой.
