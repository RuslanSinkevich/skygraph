# T-Vue-Demo-Header-Parity — findings (Wave 3.4)

Известные пропуски, ограничения и pre-existing проблемы, замеченные
в ходе стрима. Не фиксы, а заметки на будущее.

---

## guide-stubs — три guide-страницы остались stub'ами

**Что:** `examples/demo-vue/src/guide/{StylingShowcase,DesignTokens,
ConfigProviderGuide}.vue` — это **stub-страницы** с заголовком, лидом
и ссылкой на React-эталон / `/components/configprovider`. Полного
содержимого нет.

**Почему:**

1. `StylingShowcasePage.tsx` (~890 строк) — это галерея 15
   интерактивных рецептов:
   - palette / semantic / scoped swatches,
   - dark scope с `<Tag>`/`<Badge>`,
   - условные строки `<Table>` через `rowClassName`,
   - условные ячейки через `cellClassName(value)`,
   - per-feature brand с двумя `<input>` контролами и `<Table>`
     внутри,
   - headless `<Modal>` + `<Button unstyled>` + `<Input unstyled>`.

   Все используемые компоненты есть и в `@skygraph/vue` (`SgTable`,
   `SgModal`, `SgList` etc.), но 1:1 порт каждого рецепта со всеми
   `useStylingShowcaseDocStrings.ts`-ключами — это работа не одного
   часа. По карте 3.4 на весь шаг 4 заложено 30 минут — этого хватает
   на 3 stub'а + 3 полных порта, но не на полный styling-showcase.

2. `DesignTokensPage.tsx` импортирует `examples/demo/src/tokens/
   tokens-data.ts` — таблицу из ~650 token-определений с категориями
   (`palette`, `color`, `background`, `text`, `border`, …). Этот файл
   не экспортирован из `examples/_shared`, а зона `examples/demo/**`
   у нас read-only. Чтобы порт работал, надо либо
   - переместить `tokens-data` в `_shared` (нужно правки и в
     React-демо — конфликт с другими стримами), либо
   - дублировать его в `demo-vue` (≥800 строк копипасты, рассинхрон
     гарантирован).

3. `ConfigProviderDemo.tsx` (тот, что подключён под guide/config-
   provider в React) — это та же демо-страница, что и
   `/components/configprovider`. У Vue уже есть
   `ConfigProviderDemo.vue` под `/components/configprovider`,
   дублировать рендер смысла нет; stub просто перенаправляет.

**Когда чинить:** отдельный стрим Wave 3.x или 4.x —
T-Vue-Demo-Guide-Full-Port. Объём оценочно 1–2 дня
(styling-showcase) + 0.5 дня (design-tokens) + миграция
`tokens-data` в `_shared`.

**Acceptance Wave 3.4:** карта явно разрешает stub при отсутствии
ресурса (см. шаг 4) — поэтому критерий приёмки выполнен.

---

## roadmap-event-slot — рендер сложного title через слот, не пропс

**Что:** В React `<EventTimeline>` поле `title` принимает `ReactNode`,
поэтому `Roadmap.tsx` рендерит сложный заголовок (id, статус-пилюля,
секционный заголовок) прямо как JSX в `events[i].title`.

В Vue-`<SgEventTimeline>` поля `title` / `description` интерполируются
через `{{ }}` — только строки. Vue-Roadmap.vue обходит ограничение
через слот `event` (см. `decisions/T-Vue-Demo-Header-Parity.md#D2`),
но это **не паритет API**, а паритет визуала.

**Что хотелось бы:** добавить в `packages/vue/.../EventTimeline.vue`
типизированные слоты или пропсы `renderTitle`/`renderDescription`
для симметрии с React. Вне зоны 3.4 (packages/** read-only).

**Когда чинить:** ближайший stream, который трогает Vue Timeline.

---

## todo-md-relative-path — Roadmap зависит от относительного пути TODO.md

**Что:** `Roadmap.vue` импортирует
`'../../../../TODO.md?raw'` — это работает, потому что монорепо
содержит `TODO.md` в корне. Если файл переедет (или Vue-демо когда-то
переедет в новую глубину каталогов), путь сломается тихо —
TypeScript/`vue-tsc` ловит missing module, vite ловит missing file,
но в виде runtime-ошибки.

**Альтернатива:** экспортировать `TODO.md` через `@skygraph-examples/
shared` (например, как `getTodoText()`). В React-эталоне сделано
ровно через относительный путь, так что это симметричная проблема —
finding для React/Vue одновременно.

**Когда чинить:** при рефакторинге `_shared` (Wave 4+).

---

## guide-i18n-volume — i18n DemoDict вырос на ~110 ключей

**Что:** Wave 3.4 добавил в `DemoDict`:
- `menuItems` (6 ключей),
- `roadmap` (7 ключей),
- `about` (20 ключей),
- `gettingStarted` (20 ключей),
- `theming` (27 ключей),
- `coreApi` (12 ключей),
- `guideStub` (7 ключей),
- `frameworkSwitcher` (2 ключа).

Итого ~101 новый ключ × 2 локали = 202 строки в каждом dict-*.ts. Это
зеркалит React-эталон (`examples/demo/src/i18n/types.ts`), который
содержит 250+ ключей.

**Почему важно:** при следующем расширении (например, T-Vue-Demo-
Guide-Full-Port для styling-showcase) объём вырастет ещё в 2-3 раза.
Стоит подумать про co-locating ключей рядом со страницей (по образцу
`examples/demo/src/demos/*-doc/useStrings.ts`) или про вынесение
общих секций (`guideStub`, `frameworkSwitcher`) в shared-vue. Не в
этой волне.

---

## size-limit-pre-existing — `@skygraph/react` и `@skygraph/vue` оверлимит

**Что:** `pnpm size` падает на двух пакетах:

```
@skygraph/react (esm)  Size: 141.2 kB / limit 110 kB  (+31.2 kB)
@skygraph/vue   (esm)  Size: 91.63 kB / limit 90 kB   (+1.63 kB)
```

Оба пакета — **вне зоны** этого стрима (`packages/**` read-only).
Бандл `examples/demo-vue (main bundle)` = **349.05 kB / 400 kB
(brotli)** — лимит держится, прироста по нему нет (новые маршруты
все lazy через `() => import(...)`, в main попадает только App.vue +
nav + i18n).

**Что делать:** не наша зона. Скорее всего сейчас идут параллельные
стримы T-Vue-Components-Functional-Fixes (3.5) и
T-Angular-Wave42-Components (4.2), которые добавляют код в
`packages/vue/**` (компоненты), и кто-то из них уже либо подождёт
оптимизации либо повысит лимит.

**Если ошибочно припишут нам:** прирост от 3.4 в `packages/vue` — 0
строк (зона `examples/demo-vue/**` + `examples/demo-vue/src/i18n/**`
+ `docs/**` исключительно).

---

## frameworkswitcher-disabled-by-default — клик React/Angular ничего не делает

**Что:** Vue-вариант `<FrameworkSwitcher>` рендерит React и Angular
как `<span aria-disabled="true">` (см. decisions D1). Это значит,
что из demo-vue **нельзя** одним кликом перейти на demo-react или
demo-angular, даже если они собраны рядом (например, через
`pnpm --filter '*' build` и общий `dist/`).

**Когда чинить:** когда появится единый landing-сервер `/`, `/vue/`,
`/angular/` (это инфраструктурная задача, не UI). Тогда поменять
`ready: false` → `true` для соответствующих framework'ов.

---

## changelog-not-on-roadmap-route — guide/changelog не реализован

**Что:** React-эталон `App.tsx` имеет в `LEGACY_GUIDE_KEYS`
ключ `changelog` → `guide/changelog`, но самого `guide/changelog`
маршрута в реестре `guidePages` нет (рендерится как Landing).

В Vue-копии мы тоже не добавили `/guide/changelog`. Это синхронно с
React, но **не явно** упомянуто в карте 3.4. Зафиксировано здесь,
чтобы будущий «Roadmap+Changelog» стрим знал.
