# Stream 3a — Demos React (`examples/demo`, `examples/showcases`)

> Часть плана `demo-and-fixes-plan.md` (индекс). Параллелен S1, S2, S3b. Зона — только React-demo.

## Charter (правила исполнения)
1. **Не останавливаться** до конца стрима. Не спрашивать — решать самому.
2. **Не выходить за свою файловую зону** (ниже). `packages/` и Vue-demo не трогать.
3. **Без субагентов.**
4. Definition of done: `pnpm --filter demo build` зелёный, token-демки чистые в «Show Code», props-таблицы синхронизированы.

## Ветка
`stream/demos-react`

## Файловая зона (эксклюзивно)
- `examples/demo/**`
- `examples/showcases/**`
- `examples/_shared-react/**`

НЕ трогать: `examples/demo-vue/**`, `examples/showcases-vue/**`, `examples/_shared-vue/**` (зона S3b), `examples/_shared/**` (общий пакет — не нужен), `packages/**`.

## Принцип «понятно джуну»
1. «Show Code» = чистый usage, без demo-обёрток.
2. Минимум логики, один блок = одна идея.
3. Каждый используемый проп — в props-таблице (и наоборот).

---

## D1 (React). Убрать TokenScopeCards → один inline тёмный блок
- Удалить `examples/demo/src/demos/_shared/TokenScopeCards.tsx`.
- Переписать ~44 `examples/demo/src/demos/*/TokensOverride.demo.tsx`: один `<div>` с inline-объектом тёмных CSS-переменных, внутри компонент. Без обёрток, без shared-констант, без `useDemoStrings` (литералы).
- Значения брать из существующих `DARK_SCOPE` + `extra.dark` каждого компонента (не подбирать заново). У `Input`/`Select` — `--sg-input-*`, у Button — `--sg-btn-*` и т.д.
- Переписать `demoTokensDesc` в `*-doc/en.ts`/`ru.ts`: «оберни компонент в элемент с CSS-переменными — он перекрасится».

**Эталон (Button):**

```tsx
import { Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
  '--sg-btn-bg': '#1e293b',
  '--sg-btn-color': '#e2e8f0',
  '--sg-btn-border': '#334155',
} as CSSProperties

export function TokensOverrideButton() {
  return (
    <div style={dark}>
      <Button type="primary">Get started</Button>
      <Button>Learn more</Button>
    </div>
  )
}
```

React — источник правды для D1; Vue (S3b) зеркалит этот же паттерн.

## D2. Аудит «пропсы демо vs props-таблица» (React only)
- Пройти все `examples/demo/src/demos/*Demo.tsx`, сверить используемые пропсы с `PropDef[]`.
- Известный пример: `onRowClick` в `BasicTable.demo.tsx` отсутствует в `tableProps`.
- Опционально: скрипт-проверка против дрейфа.

## D3 (React). Floating label у Select — проверка
- React Select demo использует `FloatingField` с rAF-фиксом blur. Перепроверить тайминг, что прыжка нет. Если есть — поправить в `examples/demo/src/demos/_shared/FloatingField.tsx`.
- (Основной фикс прыжка — в Vue, это S3b.)

## D4 (React). Sticky header demo
- Добавить демку «Фиксированная шапка» в React: `<Table sticky scroll={{ y: 360 }} ... />` + строка в props-таблицу и doc-strings.

---

## Для релиза (передать в E)
- Token-демки React упрощены (убран `TokenScopeCards`).
- Props-таблицы React синхронизированы с кодом.
- Добавлена React-демка таблицы с фиксированной шапкой.
