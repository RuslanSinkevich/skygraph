# T-Vue-Demo-Display — Волна 3.2 / Tab B: data-display компоненты

> Прочитал `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/findings/T-Vue-Demo-Foundation.md`,
> `docs/_streams/decisions/T-Vue-Demo-Foundation.md`,
> `docs/_streams/audit/T-Vue-Demo-Parity.md`? Если нет — прочитай сначала.
> Этот таб **строго после** T-Vue-Demo-Foundation.

## ID и волна
- **ID:** T-Vue-Demo-Display
- **Волна:** 3.2
- **Режим:** один таб, параллельно с 3.2/Tab A/C/D/E.
- **Бюджет агента:** ≤3 часа (13 компонентов × ~10 минут).

## ⚠️ Правила автономности стрима — читать первым

**Этот стрим автономный. Никогда не останавливайся, не задавай вопросов
пользователю, не жди подтверждений.** Если поток рассуждений упирается в
неопределённость — решаешь сам по правилам ниже:

1. **Конфликт карты и кода → доверяй коду**, фиксируй запись в
   `docs/_streams/decisions/T-Vue-Demo-Display.md`.
2. **Нет API в `@skygraph/vue`** для буквального переноса React-примера →
   **пропусти пример**, finding в `docs/_streams/findings/T-Vue-Demo-Display.md`,
   **в `packages/vue/**` не лезь**.
3. **Попытка не работает 3 раза** → finding `decision-protocol-N`, идёшь дальше.
4. **Параллельно работают табы A/C/D/E.** Их зоны не пересекаются с твоими.
   В `router/index.ts` правишь только свои 13 строк.
5. **Никаких вопросов пользователю.** Если что-то надо «уточнить» —
   принимай решение, документируешь и идёшь дальше.

В конце — отчёт `docs/_streams/done/T-Vue-Demo-Display.md` обязательно содержит:
- acceptance criteria checklist (✓/✗ по каждому пункту),
- таблицу «N примеров перенесено / N в React» по всем 13 компонентам,
- список созданных/удалённых файлов,
- ссылки на все decisions и findings,
- секцию **«Решения вне плана»** — что сделал не по карте и почему.

**Запрещено:** спрашивать пользователя, останавливаться без отчёта,
блокировать другие табы, делать `git commit`/`git push`/`git stash`/`git rebase`,
запускать `pnpm install`, трогать чужие зоны.

## Контекст
Тот же что в `T-Vue-Demo-Forms.md` §«Контекст». Этот таб занимается
display-компонентами.

## Зона ответственности — компоненты (13)

| comp-kebab | comp-pascal | React-агрегатор | React-DemoBox / CSS-vars |
|---|---|---|---:|
| `avatar` | `Avatar` | `examples/demo/src/demos/AvatarDemo.tsx` | 8 / 1 |
| `badge` | `Badge` | `BadgeDemo.tsx` | 8 / 1 |
| `tag` | `Tag` | `TagDemo.tsx` | 8 / 1 |
| `tooltip` | `Tooltip` | `TooltipDemo.tsx` | 7 / 1 |
| `carousel` | `Carousel` | `CarouselDemo.tsx` | 7 / 1 |
| `collapse` | `Collapse` | `CollapseDemo.tsx` | **12 / 1 — самый тяжёлый** |
| `descriptions` | `Descriptions` | `DescriptionsDemo.tsx` | 9 / 1 |
| `empty` | `Empty` | `EmptyDemo.tsx` | 8 / 1 |
| `result` | `Result` | `ResultDemo.tsx` | 8 / 1 |
| `skeleton` | `Skeleton` | `SkeletonDemo.tsx` | 9 / 1 |
| `spin` | `Spin` | `SpinDemo.tsx` | 10 / 1 |
| `progress` | `Progress` | `ProgressDemo.tsx` | 9 / 1 |
| `timeline` | `Timeline` | `TimelineDemo.tsx` | 10 / 1 |

Точные числа — в `docs/_streams/audit/T-Vue-Demo-Parity.md` §1.
У всех 13 компонентов в React **есть** `CssVarsTable` → создаём и в Vue.

Если для какого-то нет React-агрегатора — finding, пропуск.

## Зона файлов

Идентична `T-Vue-Demo-Forms.md` §«Зона файлов», но для своих
**13 компонентов** из таблицы выше. Свои строки в `router/index.ts`,
свои страницы для удаления, свои папки в `demos/<comp>/`.

### НЕЛЬЗЯ трогать
То же что в Forms: `packages/**`, `examples/demo/**`,
`examples/showcases/**`, `examples/_shared*/**`,
`examples/demo-vue/src/demos/components/**`,
`examples/demo-vue/src/demos/button*`,
страницы и роуты **чужих** компонентов (forms/nav/complex/style-fixes),
`Landing.vue`, `.size-limit.json`, `examples/demo-vue/package.json`,
`pnpm install`.

## Чек-лист

Идентичен `T-Vue-Demo-Forms.md` §«Чек-лист», шаги 0-8 (включая Шаг 0a
«Универсальные правила миграции» — две обёртки строк, нет API → finding,
PropsTable только реальные props, CssVarsTable 1:1 с React, `?raw`
работает из коробки). Применять для каждого из 13 компонентов из
таблицы выше.

Команда генератора:

```bash
node scripts/gen-vue-demo.mjs <comp-kebab> --examples=<N> --with-css-vars
```

`<N>` берётся из колонки «React-DemoBox» в таблице выше. Флаг
`--with-css-vars` — обязателен (у всех 13 React-демо есть `CssVarsTable`).

## Acceptance criteria

- Для всех 13 компонентов:
  - `demos/<comp>/*.demo.vue` (≥ N-1 от React),
  - `demos/<comp>-doc/{en,ru,useStrings}.ts`,
  - `demos/<Comp>Demo.vue`,
  - роутер указывает на `demos/<Comp>Demo.vue`,
  - старый `pages/<Comp>Page.vue` удалён.
- `pnpm --filter demo-vue typecheck && pnpm --filter demo-vue build && pnpm size` — зелёные.
- `findings/T-Vue-Demo-Display.md` — skip-ы с причинами или «no skips».
- Отчёт `done/T-Vue-Demo-Display.md` — таблица «N примеров перенесено / N в React».

## Стоп-лист
То же что в Forms (см. `T-Vue-Demo-Forms.md` §«Стоп-лист»).

## Зависимости
- **СТРОГО ПОСЛЕ** T-Vue-Demo-Foundation (3.1).
- **Параллельно** с T-Vue-Demo-Forms, T-Vue-Demo-NavFeedback,
  T-Vue-Demo-Complex, T-Vue-Demo-StyleFixes.

## Конфликты с другими табами 3.2
То же что в Forms (§«Конфликты»).

## Финал
Отчёт: `docs/_streams/done/T-Vue-Demo-Display.md`.
