# Decisions — T-Vue-Demo-Forms

> Принятые архитектурные решения по `T-Vue-Demo-Forms` (Wave 3.2 / Tab A),
> которые отклоняются от буквы task-карты или CHARTER §6.1.

---

## D-001 — Textarea как Vue-only standalone + дублирование внутри Input demo

**Контекст:** Textarea не имеет отдельного React `TextareaDemo.tsx` —
React-side три Textarea-демо (`TextareaBasic`, `TextareaCount`,
`TextareaStates`) живут внутри `examples/demo/src/demos/InputDemo.tsx`.
В Vue же есть legacy `pages/TextareaPage.vue` с 4 примерами.

**Решение:**
1. `demos/textarea/` — самостоятельная страница с 4 демо из
   `pages/TextareaPage.vue` (Basic, Rows, Count, Sizes). `CssVarsTable`
   **не создаём** (как договорено в `T-Vue-Demo-Foundation`/findings:
   `react-textarea-no-demo`).
2. `demos/input/` дополнительно содержит 3 Textarea-демо
   (`TextareaBasic`, `TextareaCount`, `TextareaStates`) ради паритета с
   React `InputDemo`. `InputDemo.vue` показывает `PropsTable` для обоих
   `Input` и `Textarea`.

**Почему:** legacy `TextareaPage.vue` — единственная Vue-документация по
Textarea. Терять её нельзя. Но и React-паритет на `/components/input`
надо удержать, иначе будут регрессии скриншотов.

## D-002 — Select.Loading.demo заменён EmptyState.demo

`SgSelect` не имеет `loading` (см. findings → `select-loading-not-in-vue`).
React-демо `Loading.demo.tsx` нерелевантен.

**Решение:** заменён на `EmptyState.demo.vue`, который покрывает
disabled + пустой `options=[]`. Это полезный паттерн (раньше нигде не
показан) и сохраняет 8 примеров в `SelectDemo.vue` (паритет по числу
карточек с React).

## D-003 — Не используем `scripts/gen-vue-demo.mjs`

Foundation-стрим оставил CLI-скаффолдер. Я **не** использую его, потому
что:
- скаффолд не знает про parity-gaps (loading и пр.) и генерирует прямой
  port React-структуры — потом всё равно править руками;
- объём правок post-генерации ~ объёму ручной записи; ручной режим
  быстрее и даёт лучший контроль над зависимостями (`SgField` slot,
  `useDemoStrings`).

Скрипт остаётся в проекте — его может использовать кто-то другой.

## D-004 — i18n локальных строк через `useDemoStrings(STRINGS)`

Каждый `*.demo.vue` объявляет локальный `STRINGS` объект (`en`/`ru`) и
получает t через `useDemoStrings(STRINGS)`. Глобальные (page-level) ключи
живут в `<comp>-doc/{en,ru}.ts` + `useStrings.ts`. Это полностью
повторяет паттерн Foundation (`Button`).

## D-005 — Vue-only props сохраняем (multiple в Select, possibly future)

`SgSelect` в Vue имеет `multiple` (нет в React). Не выпиливаем — это
осознанный Vue superset. Документируем в `select-doc` как
`propMultiple` с пометкой "Vue-only".

Аналогично будем поступать с другими Vue-уникальными props (e.g. если
обнаружится в Switch/Slider/etc.).
