# Findings — T-Vue-Demo-Foundation

> Append-only. Каждая запись — что нашли вне scope или что пропустили.

## button-unstyled-skipped

`SgButton` (`packages/vue/src/components/Button/Button.vue`) НЕ имеет
проп `unstyled` (есть в React `Button`). Значит React-пример
`Unstyled.demo.tsx` не переносим в Vue 1:1 — пропуск.

- **Что**: `examples/demo-vue/src/demos/button/Unstyled.demo.vue` —
  **не создаётся**.
- **Почему**: нет паблик-API в `@skygraph/vue`.
- **Что вместо**: 7 из 8 React-примеров перенесены (`Types`, `Sizes`,
  `Loading`, `Disabled`, `WithIcon`, `ComponentTokens`, `ScopedBrand`).
  Карта требовала **минимум 5** — выполнено с запасом.
- **Зона ремонта**: `packages/vue/src/components/Button/Button.vue`
  (добавить `unstyled` prop). Это **вне зоны** Волны 3 целиком
  (`wave-3/CHARTER.md` §2 — «не лезем в `packages/vue/**`»).
  Открыть отдельную карту `T-Vue-Cleanup-2` или дополнить существующую,
  если такая будет.

## audit-styles-no-playwright

Скриншот-аудит 32 страниц через Playwright headless **не сделан**
этим стримом.

- **Что**: `docs/_streams/audit/screenshots/` — папка не создана.
- **Почему**: для скриншотов нужно одновременно поднять
  `pnpm --filter demo dev` и `pnpm --filter demo-vue dev`, что в этом
  стриме невозможно без долгоживущих процессов и без `pnpm install`.
  Карта явно разрешает fallback на таб E.
- **Что вместо**: документ `docs/_streams/audit/vue-broken-styles.md`
  создан с разделом 2 «Статус сбора скриншотов» и инструкцией для таба E
  начинать со скриншотов на старте своей работы.

## react-textarea-no-demo

В `examples/demo/src/demos/` отсутствует `TextareaDemo.tsx` — у Vue есть
`pages/TextareaPage.vue`. В аудит-таблице помечено как «Vue-only, нет
React-аналога». Возможные действия будущих волн:

1. Создать React-`TextareaDemo` (часть `T-React-Cleanup-2` или новая
   карта). **Не делается** в Волне 3, потому что `examples/demo/**` —
   read-only.
2. Удалить Vue `TextareaPage`. **Не делается** — это полезный демо-
   компонент.

В рамках Волны 3.2 / таб A `T-Vue-Demo-Forms` Textarea **остаётся** —
портируется в `demos/textarea/` без шаблона из React, доку пишет руками
по DOM-контракту `sg-textarea-*`.

## form-components-page-no-vue

`examples/demo/src/demos/FormComponentsDemo.tsx` (10 DemoBox + 4 PropsTable)
— это сводная страница «компоненты внутри Form». В Vue нет аналога
`/components/form-components`. Не зарождать в 3.2 — это «meta»-демо,
не самостоятельный компонент. **Не делать**, оставить как находку.

## getting-started-page-no-vue

`examples/demo/src/demos/GettingStartedPage.tsx` — гайд, не компонент.
В Vue гайд пока не реализован, маршрут `/guide/*` зарезервирован. Не
делается в Волне 3 — гайд = отдельная карта будущего.

## charts-no-css-vars-react

В `examples/demo/src/demos/ChartsDemo.tsx` нет `<CssVarsTable>`. В
`packages/styles/components/charts.css` могут быть CSS-vars (`sg-chart-*`),
но React их не документирует. Vue в Волне 3.2 при миграции Charts
выбирает: либо повторить решение React (без CssVarsTable), либо опередить
React и описать токены сам. **Решение для Волны 3.2 / таб D**: повторить
React-решение (без CssVarsTable), чтобы паритет сохранялся «снизу вверх».
Если таб D захочет описать токены — это +1 запись в decisions/T-Vue-Demo-Complex.

## composables-count-hardcode

В `examples/_shared/src/constants/stats.ts` нет константы
`COMPOSABLE_COUNT`. В Vue `Landing.vue` число composables захардкожено
как `14`. На уровне репо это **finding для shared**: добавить
`COMPOSABLE_COUNT` (либо генератор счётчика по
`packages/vue/src/composables/`).

В рамках 3.1 — **не правим** `examples/_shared/**` (read-only по `wave-3`
§4). Vue Landing продолжает использовать литерал `14` с комментарием,
ссылающимся на этот finding.
