# T-Vue-Demo-Foundation — фундамент Волны 3

> Прочитал `docs/_streams/CHARTER.md` и `docs/_streams/wave-3/CHARTER.md`?
> Если нет — прочитай сначала. Этот файл — расширение, не замена.

## ID и волна
- **ID:** T-Vue-Demo-Foundation
- **Волна:** 3.1
- **Режим:** один таб, последовательно. Никакой 

ГЛАВНОЕ ПРАВИЛО НЕ ОСТАНАВЛИВАТЬ СТРИМ НИЧЕГО НЕ СПРАШИВАТЬ ЕСТЬ НЕПОНЯТКИ РЕШАЙ САМ ПОТОМ КОНЦЕ НАПИШЕШ ЧТО БЫЛО РЕШЕНО В НЕ ПЛАНА.

## Контекст

После Волны 2 в `examples/demo-vue/src/pages/<Comp>Page.vue` лежат
32 страницы по схеме «всё в одном файле». В `examples/demo/src/demos/`
(React) совершенно другая архитектура: атомные `.demo.tsx` + `*-doc/{en,ru}.ts`
+ `<Comp>Demo.tsx` агрегатор с `?raw`-импортом исходников и
`CssVarsTable`. У Vue нет ни `?raw`, ни `CssVarsTable`, исходник кода
вшит строкой в страницу и расходится с реальным шаблоном.

Этот стрим:
1. Делает аудит разрывов и сломанных стилей.
2. Создаёт архитектурный фундамент `demos/` для Vue (компоненты + генератор).
3. Переносит **только** Button как эталонную миграцию.
4. Поднимает Landing до уровня React (без WhatsNew/ShowcasesPreview).
5. Открывает дорогу 5 параллельным контентным стримам Волны 3.2.

## Зона файлов (можно трогать)

### Создание (новые файлы)
- `examples/demo-vue/src/demos/` — вся новая папка.
- `examples/demo-vue/src/demos/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable,SourceCode,index}.vue|.ts`.
- `examples/demo-vue/src/demos/button/{Types,Sizes,Loading,Disabled,WithIcon,ComponentTokens,ScopedBrand,Unstyled}.demo.vue`
  (или подмножество — какие поддаются переносу, см. §«Чек-лист»).
- `examples/demo-vue/src/demos/button-doc/{en,ru,useStrings}.ts`.
- `examples/demo-vue/src/demos/ButtonDemo.vue` — агрегатор.
- `scripts/gen-vue-demo.mjs` — генератор-скаффолд.
- `scripts/templates/vue-demo-aggregator.vue.tmpl`,
  `scripts/templates/vue-demo-example.vue.tmpl`,
  `scripts/templates/vue-demo-doc-en.ts.tmpl`,
  `scripts/templates/vue-demo-doc-ru.ts.tmpl`,
  `scripts/templates/vue-demo-doc-strings.ts.tmpl`.
- `docs/_streams/audit/T-Vue-Demo-Parity.md` — таблица разрывов.
- `docs/_streams/audit/vue-broken-styles.md` — список визуальных
  регрессий с маршрутами и описанием.

### Правки существующих
- `examples/demo-vue/src/pages/Landing.vue` — полная переработка.
- `examples/demo-vue/src/router/index.ts` — переключить маршрут
  `/components/button` с `pages/ButtonPage.vue` на
  `demos/ButtonDemo.vue`. **Только Button**, остальные не трогаем.
- `examples/demo-vue/src/nav.ts` — без структурных правок (порядок и
  ключи Button оставить).
- `examples/demo-vue/src/i18n/dict-en.ts`, `dict-ru.ts` — добавить ключи
  для нового Landing (`landing.featureXxx`, `landing.quickInstallXxx`,
  `landing.statXxx` если ещё нет).
- `examples/demo-vue/vite.config.ts` — **только если** `?raw`-импорты
  не работают «из коробки» (обычно работают). Не править ради красоты.
- `scripts/README.md` — append секция «Vue demo generator».

### Удаление (после миграции Button)
- `examples/demo-vue/src/pages/ButtonPage.vue` — после того как
  `demos/ButtonDemo.vue` зарегистрирован в роутере и работает.

### НЕЛЬЗЯ трогать
- `packages/**` — целиком read-only.
- `examples/demo/**` — целиком read-only.
- `examples/showcases/**` — целиком read-only.
- `examples/_shared/**`, `examples/_shared-react/**`,
  `examples/_shared-vue/**` — read-only.
- Любая страница `pages/*Page.vue` **кроме** `Landing.vue` и
  `ButtonPage.vue` (Button удаляется, остальные ждут Волны 3.2).
- `.size-limit.json` — лимит demo-vue main bundle уже поднимался один
  раз. Если упирается — finding, не повышаем сами.

## Чек-лист

### Шаг 0. Прочитать обязательное (15 мин)
- `docs/_streams/CHARTER.md` (основной).
- `docs/_streams/wave-3/CHARTER.md` (Волна 3).
- `examples/demo/src/demos/ButtonDemo.tsx` — образец агрегатора React.
- `examples/demo/src/demos/button/Types.demo.tsx` — образец атомного примера.
- `examples/demo/src/demos/button-doc/{en,ru}.ts` + `useButtonDocStrings.ts`.
- `examples/demo/src/demos/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable}.tsx`.
- `examples/demo-vue/src/pages/ButtonPage.vue` — текущая Vue-страница.
- `examples/demo-vue/src/components/{ComponentDoc,DemoBox,PropsTable}.vue` — текущие демо-обёртки.

### Шаг 1. Аудит разрывов (45 мин)

Файл: `docs/_streams/audit/T-Vue-Demo-Parity.md`.

Сформировать таблицу по образцу:

| Component | React examples | React CSS-vars | React props | Vue examples (now) | Vue CSS-vars (now) | Vue props (now) | Gap (примеров / vars) |
|---|---:|---:|---:|---:|---:|---:|---|

Считать по `examples/demo/src/demos/<Comp>Demo.tsx` (имя `<DemoBox`,
`PropsTable data=`, `CssVarsTable data=`) и
`examples/demo-vue/src/pages/<Comp>Page.vue`.

Не пропускать ни один компонент из списка React. Если в Vue компонента
нет — фиксируем `Vue: missing`.

### Шаг 2. Аудит сломанных стилей (45 мин)

Файл: `docs/_streams/audit/vue-broken-styles.md`.

1. Запустить `pnpm --filter demo-vue dev` (если уже не запущен).
2. Запустить `pnpm --filter demo dev` параллельно (другой порт).
3. Через Playwright headless (как в `tests/smoke/`) пройти по всем 32
   маршрутам demo-vue, для каждого:
   - сделать `page.screenshot({ fullPage: true })`,
   - в файл `docs/_streams/audit/screenshots/vue/<comp>.png`,
   - то же для React-аналога → `screenshots/react/<comp>.png`.
4. Просмотреть пары глазами (или через diff-инструмент). Зафиксировать
   расхождения **только по стилям**, не по контенту:
   - сломанная сетка/выравнивание,
   - неправильный фон/рамка/радиус,
   - не работает hover/focus visual,
   - сломаны размеры sg-* классов,
   - явно отсутствующие стили (FOUC).
5. В `vue-broken-styles.md` запись на каждое:
   - Маршрут.
   - Описание (1-2 строки).
   - Возможная причина (CSS-класс, который сломан / отсутствует).
   - Локализация: `examples/_shared-vue/src/layout/styles.css` /
     `examples/demo-vue/src/style.css` /
     `packages/styles/components/<file>.css` (последнее = finding для
     T-Vue-Cleanup-2, не наша зона).

Эти данные использует таб **E** (`T-Vue-Demo-StyleFixes`) Волны 3.2.

Если Playwright недоступен (нет браузера в окружении) — попробовать
визуально по 5-10 ключевым страницам через тот же `chromium.launch()`
из `@playwright/test`. Если совсем никак — finding, и тогда таб E
делает аудит сам в начале своей работы.

### Шаг 3. Демо-обёртки `demos/components/` (45 мин)

Создать новые компоненты в `examples/demo-vue/src/demos/components/`,
**не трогая** старые в `examples/demo-vue/src/components/`.

1. **`SourceCode.vue`** — отображает строку с подсветкой. Пока без
   prism/highlight.js (тяжёлая зависимость) — простой `<pre><code>{{ source }}</code></pre>`
   как в текущем `DemoBox`. Класс `.dv-demo-code` оставить.
2. **`DemoBox.vue`** — порт текущего, плюс пропс `code: string` теперь
   ожидает результат `?raw`-импорта (полный файл). Внутри показывать
   через `SourceCode`. Поведение copy/show/hide — без изменений.
3. **`ComponentDoc.vue`** — порт текущего. Без архитектурных правок.
4. **`PropsTable.vue`** — порт текущего. Без архитектурных правок.
5. **`CssVarsTable.vue`** — НОВЫЙ компонент. Образец:
   `examples/demo/src/demos/components/CssVarsTable.tsx`. Колонки:
   `Variable`, `Default`, `Description`. Локали — через
   `useDemoStrings` локально, тексты вынесены в `*-doc/{en,ru}.ts`
   агрегатора компонента.
6. **`index.ts`** — реэкспорт всех 5 компонентов + типов
   (`PropDef`, `CssVarDef` — взять из React-аналога 1:1).

После: `pnpm --filter demo-vue typecheck` зелёный.

### Шаг 4. Генератор `scripts/gen-vue-demo.mjs` (45 мин)

CLI-скаффолд по образцу `scripts/gen-demo-page.mjs`. Использование:

```bash
node scripts/gen-vue-demo.mjs <comp-kebab> [--examples=N] [--with-css-vars]
```

Создаёт:
- `examples/demo-vue/src/demos/<comp-kebab>/Default.demo.vue` (1 пример-болванка).
- `examples/demo-vue/src/demos/<comp-kebab>-doc/{en.ts,ru.ts,useStrings.ts}`.
- `examples/demo-vue/src/demos/<Comp>Demo.vue` (агрегатор).

**Не регистрирует** маршрут автоматически (по тому же принципу что
`gen-demo-page.mjs`) — выводит инструкцию в stdout.

Шаблоны — в `scripts/templates/vue-demo-*.tmpl`. На вход принимает
`{{compKebab}}`, `{{compPascal}}`, `{{compTitle}}`.

`scripts/README.md` — append секция «Vue demo generator» с примером.

### Шаг 5. Эталонная миграция Button (60 мин)

1. **Атомные примеры.** Для Button скопировать из React (по принципу
   1:1 с минимальными адаптациями TSX → Vue SFC):
   - `Types.demo.vue`
   - `Sizes.demo.vue`
   - `Loading.demo.vue`
   - `Disabled.demo.vue`
   - `WithIcon.demo.vue`
   - `ComponentTokens.demo.vue`
   - `ScopedBrand.demo.vue`
   - `Unstyled.demo.vue`

   Если какой-то пример **не переносится** в Vue в разумные сроки
   (например, использует React-only API типа `forwardRef`+`useImperativeHandle`
   с конкретным паттерном) — пропустить, в `findings/T-Vue-Demo-Foundation.md`
   запись «Button/<Example>: skipped because <reason>». Должно быть
   **минимум 5** перенесено.

   Каждый `.demo.vue` — `<script setup lang="ts">`, импортирует то что нужно
   из `@skygraph/vue`, использует **локальный** `useDemoStrings({en, ru})`
   для строк (не глобальный i18n демо).

2. **Словари.** `button-doc/en.ts` + `button-doc/ru.ts` — копия из
   React (там и `pageTitle`, и `demoTypesTitle/Desc`, и описания props,
   и описания CSS-vars). `useStrings.ts` — `useDemoStrings`-обёртка.

3. **Агрегатор `ButtonDemo.vue`** — порт `ButtonDemo.tsx` 1:1:
   - `import TypesSource from './button/Types.demo.vue?raw'` для каждого примера.
   - `<ComponentDoc>` с `t.pageTitle/t.pageBadge/t.crumb*/t.pageLead/t.pageWhen*`.
   - `<DemoBox>` × N, `:code="TypesSource"`.
   - `<PropsTable :data="buttonProps">` — массив `PropDef[]`.
   - `<CssVarsTable :data="buttonCssVars">` — массив `CssVarDef[]`.

4. **Роутер.** `examples/demo-vue/src/router/index.ts`:
   - Заменить `import('../pages/ButtonPage.vue')` на `import('../demos/ButtonDemo.vue')`.
   - Удалить `import('../pages/ButtonPage.vue')` если он больше нигде не используется.
5. **Старый `ButtonPage.vue` → удалить** (`Delete` tool).

После: `pnpm --filter demo-vue build` + dev server проверка маршрута
`/#/components/button` глазами через Playwright (скриншот в
`docs/_streams/audit/screenshots/button-after.png` для отчёта).

### Шаг 6. Landing (45 мин)

Полностью переписать `examples/demo-vue/src/pages/Landing.vue` по
структуре `examples/demo/src/pages/Landing/Landing.tsx`:

- **Hero** — `t.app.tagline + t.app.heroSub + 2 CTA` (Browse components → `/components/button`,
  Read source → GitHub).
- **StatsRow** — 4 счётчика: Components / Composables / Engines / Tests.
  Числа берутся из `@skygraph-examples/shared/constants/stats` (там
  `COMPONENT_COUNT`, `TEST_COUNT`, `ENGINE_COUNT`). Для composables —
  считаем директории в `packages/vue/src/composables/` (грубо ~14, но
  лучше найти в shared если уже вынесено).
- **FeatureGrid** — 4 карточки: Reactive core / Zero-runtime CSS /
  Accessible by default / Same DOM, same CSS. Тексты — из текущих
  `t.landing.featureXxx`.
- **QuickInstall** — блок кода `pnpm add @skygraph/vue @skygraph/styles` +
  кнопка copy. Тексты — `t.landing.quickInstallTitle/Desc` (новые ключи в
  `dict-en.ts/dict-ru.ts`).

**НЕ ПОРТИМ:**
- WhatsNew (парсинг CHANGELOG.md). Это React-эксклюзив до отдельного решения.
- ShowcasesPreview. Showcases в Vue нет, их и не будет.

Стили — в `examples/demo-vue/src/style.css` или новом
`examples/demo-vue/src/pages/landing.css` (импорт из `Landing.vue`).
Класс-неймспейс `dv-landing-*` оставить.

После: глазами проверить `/` маршрут.

### Шаг 7. Финал

```bash
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
pnpm size  # demo-vue main bundle ≤ 160 KB
```

Все три зелёные. Иначе — finding, **лимит size не повышаем**.

Отчёт: `docs/_streams/done/T-Vue-Demo-Foundation.md`. В отчёте обязательно:
- ссылка на `docs/_streams/audit/T-Vue-Demo-Parity.md`
- ссылка на `docs/_streams/audit/vue-broken-styles.md`
- список созданных файлов в `demos/components/` и `demos/button/`
- статус миграции Button (сколько примеров перенесено / сколько skip + причина)
- статус Landing (что добавлено)
- если что-то заблокировало — `docs/_streams/blocked/T-Vue-Demo-Foundation.md`.

## Acceptance criteria

- `docs/_streams/audit/T-Vue-Demo-Parity.md` существует, содержит полную
  таблицу по всем ~50 React-компонентам.
- `docs/_streams/audit/vue-broken-styles.md` существует. Если регрессий
  не найдено — так и записать, **не оставлять пустым**.
- `examples/demo-vue/src/demos/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable,SourceCode}.vue`
  + `index.ts` — созданы и `typecheck` зелёный.
- `examples/demo-vue/src/demos/ButtonDemo.vue` + `button/*.demo.vue` (≥5)
  + `button-doc/{en,ru,useStrings}.ts` — созданы.
- `examples/demo-vue/src/router/index.ts` — `/components/button` →
  `demos/ButtonDemo.vue`.
- `examples/demo-vue/src/pages/ButtonPage.vue` — удалён.
- `Landing.vue` — содержит Hero / StatsRow / FeatureGrid / QuickInstall.
- `scripts/gen-vue-demo.mjs` + 5 `.tmpl` — созданы.
- `pnpm --filter demo-vue typecheck && pnpm --filter demo-vue build && pnpm size` — зелёные.
- На `/#/components/button` через Playwright headless: ≥ 5 `<button class="sg-button*">`,
  есть `<table>` для PropsTable, есть `<table>` для CssVarsTable. Скриншот
  лежит в `docs/_streams/audit/screenshots/button-after.png`.

## Стоп-лист

- НЕ трогать `packages/**`.
- НЕ трогать `examples/demo/**`, `examples/showcases/**`,
  `examples/_shared/**`, `examples/_shared-react/**`, `examples/_shared-vue/**`.
- НЕ удалять `pages/*Page.vue` КРОМЕ `ButtonPage.vue` (после миграции).
- НЕ повышать лимит `.size-limit.json`.
- НЕ запускать `pnpm install`.
- НЕ запускать глобальные команды без `--filter`.
- НЕ делать `git commit`/`git push`/`git rebase`/`git stash`.
- НЕ добавлять новые npm-зависимости в `examples/demo-vue/package.json`
  (использовать только то, что уже стоит).

## Зависимости
- **СТРОГО ПОСЛЕ** Волны 2 (закрыта).
- **СТРОГО ДО** Волны 3.2 (5 параллельных табов).

## Финал
Отчёт: `docs/_streams/done/T-Vue-Demo-Foundation.md`.
