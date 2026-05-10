# Decisions — T-Vue-Demo-Foundation

> Принятые архитектурные решения по `T-Vue-Demo-Foundation` (Волна 3.1),
> которые отклоняются от буквы task-карты или CHARTER §6.1.

## 1. `demos/components/` — путь vs образец React

**Карта говорит**: образец берётся из `examples/demo/src/demos/components/`.
**Реальность**: в React-демо общие компоненты лежат в
`examples/demo/src/components/` (не в `demos/components/`):

```
examples/demo/src/components/
├─ ComponentDoc.tsx
├─ CssVarsTable.tsx
├─ DemoBox.tsx
├─ FrameworkSwitcher.tsx
├─ PropsTable.tsx
└─ index.ts
```

**Решение**: новые Vue-обёртки кладём по path **из task-карты** —
`examples/demo-vue/src/demos/components/` — и берём 1:1 за образец React-
файлы из `src/components/`. Это даёт нам чистое разделение «демо-обёртки
для новой архитектуры» от уже существующих `examples/demo-vue/src/components/`,
которые остаются как есть до Волны 3.2 (миграции страниц).

## 2. `useDemoStrings` импортируется из `../../i18n`, не из `useStrings.ts`

**Карта говорит**: `<comp>-doc/useStrings.ts` — `useDemoStrings`-обёртка.

В React `useButtonDocStrings` использует **`useI18n` + `useMemo` по локали**
прямо из `..i18n/types.ts`, **не** через `useDemoStrings`. У React и Vue
разное API:
- React `useDemoStrings(STRINGS)` — для **локального** малого словаря
  внутри одного `.demo.tsx`.
- React `use<Comp>DocStrings()` — для **большого** словаря страницы из
  `<comp>-doc/{en,ru}.ts`.

**Решение**:
- `examples/demo-vue/src/demos/<comp>/<Example>.demo.vue` использует
  локальный `useDemoStrings(STRINGS)` (как React `<Example>.demo.tsx`).
- `examples/demo-vue/src/demos/<comp>-doc/useStrings.ts` ВНУТРИ читает
  `useI18n` и возвращает `ComputedRef<<Comp>DocStrings>` (как React-аналог).

Это даёт точный паритет с React и не плодит лишний слой.

## 3. `?raw` для `*.vue` — без правок `vite.config.ts`

`vite` поддерживает `?raw` суффикс из коробки начиная с 2.x. Декларации
типов идут через `vite/client`. В `examples/demo-vue/tsconfig.app.json`
`"types": ["vite/client"]` отсутствует — добавляем **новый** файл
`examples/demo-vue/src/vite-env.d.ts` с одной директивой
`/// <reference types="vite/client" />`. Это создаёт типы и для `*?raw`,
и для `import.meta.env`.

**Не трогаем** `vite.config.ts` — поведение и так корректное.

## 4. PropsTable: пропы Button **только** существующие в `SgButton`

В Vue `SgButton.vue` НЕ экспортирует `unstyled`, `className`, `style`,
`onClick`-как-prop, `children`-как-prop (последние три — это особенность
React API). PropsTable Vue показывает то, что реально есть:
`type / size / htmlType / danger / block / disabled / loading` плюс
`@click` как эмит.

`Unstyled.demo.vue` не переносим — см. `findings/`.

## 5. CssVarsTable: те же 24 переменные, что и React

Полный список из `examples/demo/src/demos/ButtonDemo.tsx` копируется 1:1.
CSS-переменные определяются `@skygraph/styles`, а не самим компонентом, и
значения совпадают между React- и Vue-фреймворками (в этом смысл `sg-*`
контракта). Описания текстов — из `button-doc/{en,ru}.ts`.

## 6. Landing — без WhatsNew / ShowcasesPreview / FrameworkSwitcher

Эти 3 секции React-Landing намеренно не портируем (`wave-3/CHARTER.md`
§2 «Вне рамок»). Vue-Landing получает: Hero / StatsRow / FeatureGrid /
QuickInstall.

`StatsRow` показывает 4 числа (Components / Composables / Engines / Tests),
а не 5 как в React (там есть «0-runtime CSS» как stat-карточка). У Vue
`Composables` ставим грубое значение `14` (литерал, как было в текущей
`Landing.vue`) — точное число — это finding для будущей карты, не цель
3.1.

## 7. Стили Landing — в новом `pages/landing.css`

Существующий `examples/demo-vue/src/style.css` уже содержит `.dv-landing-*`
для текущей упрощённой Landing (~150 строк). Новые стили (QuickInstall,
StatRow с 4 колонками вместо 3 и т.д.) добавляем **в новом**
`examples/demo-vue/src/pages/landing.css` и импортируем из `Landing.vue`
через `import './landing.css'`. Старые `.dv-landing-*` правила в
`style.css` остаются — частично переиспользуются, частично перекрываются
новыми.

## 8. `scripts/gen-vue-demo.mjs` — без `dry-run`/`force` flags `gen-demo-page.mjs`

Чтобы не дублировать логику парсинга args, минимальный CLI:

```
node scripts/gen-vue-demo.mjs <comp-kebab> [--examples=N] [--with-css-vars]
```

Без `--framework`, потому что это уже Vue-only генератор.
Без `--dry-run`/`--force` в первой версии — `gen-demo-page.mjs` остаётся
основным инструментом для нового **полностью пустого** компонента; этот
генератор создаёт **скаффолд миграции** существующего pages/-демо в
demos/-архитектуру.

`--examples=N` — сколько `Default<i>.demo.vue` создать (по умолчанию 1).
`--with-css-vars` — добавляет CSS-vars блок в агрегатор + новый файл
`<comp>-doc/cssVars.ts` со скелетом.

## 9. Audit Playwright — finding, не блок

Запускать два dev-сервера и Chromium из автоматического стрима в
неинтерактивном окружении не выходит (см. `vue-broken-styles.md` §2).
По §6.3 это finding и аудит делает таб E на старте. Отчёт остаётся
append-only.
