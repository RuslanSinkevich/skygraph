# T-Vue-Demo-Wrappers-Parity — Волна 3.3a: визуальный паритет demo-обёрток с React

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/decisions/T-Vue-Demo-Foundation.md`.

## ID и волна

- **ID:** T-Vue-Demo-Wrappers-Parity
- **Волна:** 3.3a (один независимый стрим, **строго до** `T-Vue-Demo-PostMigration-Audit` — иначе подерутся за `demos/components/*`)
- **Режим:** один таб

## Зачем стрим

В Wave 3.1 общие демо-обёртки **`examples/demo-vue/src/demos/components/*.vue`**
были написаны как **«свои»** для Vue: тот же DOM, но **другие имена классов**
(`.dv-demo*`, `.dv-doc*`, `.dv-props-*`) и **частичные** стили в
`examples/demo-vue/src/style.css`. React-эталон —
`examples/demo/src/components/*.tsx` + правила `.demo-box*`/`.doc-*`/`.demo-props-*`
в `examples/demo/src/app.css` (~15 KB). Из-за расхождения namespace и неполного
порта стилей **визуал страниц demo-vue отличается от React-эталона**, хотя сами
`Sg*` компоненты внутри превью отрисовываются одинаково (общие `sg-*` классы из
`@skygraph/styles`).

Этот стрим — **переписать Vue-обёртки 1:1 с React по классам/DOM/i18n** и
**скопировать** недостающие CSS-правила в Vue. Никакого нового визуала, никаких
правок React.

## Зона файлов

### Можно править

- `examples/demo-vue/src/demos/components/ComponentDoc.vue`
- `examples/demo-vue/src/demos/components/DemoBox.vue`
- `examples/demo-vue/src/demos/components/PropsTable.vue`
- `examples/demo-vue/src/demos/components/CssVarsTable.vue`
- `examples/demo-vue/src/demos/components/SourceCode.vue` (только классы кодоблока, если нужно)
- `examples/demo-vue/src/demos/components/index.ts` (если меняется реэкспорт)
- `examples/demo-vue/src/style.css` — порт CSS-правил из `examples/demo/src/app.css`
- `examples/demo-vue/src/i18n/types.ts` + `dict-en.ts` + `dict-ru.ts` — добавить
  ключи паритета (см. §«i18n паритет» ниже)
- `docs/_streams/{decisions,findings,done}/T-Vue-Demo-Wrappers-Parity.md`

### Нельзя трогать

- `examples/demo/**` — React read-only
- `examples/demo-vue/src/demos/<comp>/**` и `<comp>-doc/**` — зона контентных табов 3.2
- `examples/demo-vue/src/router/**`, `nav.ts`, `App.vue`, `main.ts`,
  `pages/Landing.vue`, `pages/landing.css`
- `packages/**` — целиком read-only
- `examples/_shared/**`, `examples/_shared-vue/**` — не правим в этом стриме
- `.size-limit.json` — лимит зафиксирован Wave 3.2 (400 KB), не двигать

## ⚠️ Правила автономности

Не останавливаться, не задавать вопросов. Решения вне карты —
`docs/_streams/decisions/T-Vue-Demo-Wrappers-Parity.md`. Пропуски и корни в
пакете — `docs/_streams/findings/T-Vue-Demo-Wrappers-Parity.md`. В конце —
отчёт `docs/_streams/done/T-Vue-Demo-Wrappers-Parity.md`. Никаких
`git commit`/`push`/`pnpm install`.

## Целевая таблица паритета классов

Перепиши Vue-обёртки так, чтобы **DOM и className** совпадали 1:1 с React.

| React (эталон) | Vue (сейчас) | Действие |
|---|---|---|
| `.demo-box` | `.dv-demo` | переименовать в Vue → `.demo-box` |
| `.demo-box-preview` (+`-flush`, `-vertical`) | `.dv-demo-preview` (+`-flush`, `-vertical`) | переименовать |
| `.demo-box-meta` | `.dv-demo-meta` | переименовать |
| `.demo-box-title` | `.dv-demo-title` | переименовать |
| `.demo-box-description` | `.dv-demo-desc` | переименовать (имя `description`, не `desc`) |
| `.demo-box-actions` | `.dv-demo-actions` | переименовать |
| `.demo-box-action` | `.dv-demo-action` | переименовать |
| `.demo-box-code` | `.dv-demo-code` | переименовать |
| `.doc-page` | `.dv-doc` | переименовать |
| `.doc-crumbs`, `.doc-crumb`, `.doc-crumb-sep` | `.dv-doc-crumbs`, `.dv-doc-crumb`, `.dv-doc-crumb-sep` | переименовать |
| `.doc-header` | `.dv-doc-header` | переименовать (Vue сейчас имеет такой класс) |
| `.doc-component-title` | `.dv-doc-title` | переименовать |
| `.doc-badge` | `.dv-doc-badge` | переименовать |
| `.doc-lead` | `.dv-doc-lead` | переименовать |
| `.doc-when-to-use` | `.dv-doc-when` | переименовать |
| `.doc-notes` | (нет в Vue) | добавить slot `#notes` + класс `.doc-notes` |
| `.doc-demos` | `.dv-doc-demos` | переименовать |
| `.demo-props-section` | `.dv-props-section` | переименовать |
| `.demo-props-title` | `.dv-props-title` | переименовать |
| `.doc-table` | `.dv-doc-table` | переименовать |

## DOM-паритет (что ещё надо синхронизировать)

1. **`ComponentDoc`** — добавить в Vue:
   - проп `notes?: any` + slot `#notes` или `notes` строка → блок
     `<div class="doc-notes">…</div>` сразу после `whenToUse`, **до**
     заголовка «Examples» (совпадает с React).
   - `<h2>{{ examples }}</h2>` без класса (как в React, у Vue сейчас
     `.dv-doc-section-title` — убрать класс).
   - убрать `<slot name="api" />` снизу или переименовать паритет с React
     (в React API-таблицы рендерятся внутри `children` секции `doc-demos`
     прямо после демо). **Решение**: оставить named slot `#api`, но в
     карте описать, что это Vue-специфика для удобства; finding если
     ломает совместимость со страницами 3.2 (проверить, как `<Comp>Demo.vue`
     передают props/cssvars-таблицы).

2. **`DemoBox`** — DOM уже совпадает по структуре (`preview` → `meta` →
   `actions` → `code`). Добавить:
   - на `.demo-box-actions` атрибут `aria-label="..."` из i18n
     (в React: `t.demoBox.toolbarLabel`).
   - кнопка «copy»: атрибут `title={copied ? toast : copy}`
     (в Vue сейчас нет).
   - кнопка «toggle»: `aria-label` (показ/скрытие).
   - блок кода: `.demo-box-code > pre > code{{code}}` (без `SourceCode.vue`-
     обёртки, либо `SourceCode.vue` рендерит ровно такой DOM —
     **решение**: либо рефакторить SourceCode под `<pre><code>` с
     теми же классами, либо вызывать прямо `<pre><code>` как React.
     **Допустимое отклонение**: оставить SourceCode для подсветки
     синтаксиса, если она появилась в 3.2; в этом случае класс на
     обёртке `.demo-box-code` всё равно нужен — finding с описанием).

3. **`PropsTable`** — DOM в Vue уже совпадает. Дополнительно:
   - `<span>` с `*` для required: в React inline-style
     `color: var(--sg-color-error)`; в Vue добавлено `margin-left: 2px`
     отдельно — убрать `margin-left`, ставить как в React: пробел в
     текстовом узле `' *'` или CSS-эквивалент. **Решение**: убрать
     `margin-left` из inline-style, рендерить ` *` в одном `<span>`
     с пробелом перед звёздочкой (см. React код).
   - дефолтный заголовок: React берёт из `t.propsTable.titleApi`, Vue —
     из `t.componentDoc.propsTitle`. **Решение**: добавить в Vue словарь
     ключ `propsTable.titleApi`, рендерить из него (паритет имени).

4. **`CssVarsTable`** — DOM совпадает. `hint` в React inline-style
   `{margin: '-4px 0 12px', fontSize: 13, color: 'var(--sg-color-text-secondary)'}`,
   Vue — class `.dv-css-vars-hint`. **Решение**: либо повторить inline-style
   1:1, либо ввести **общее** имя `.demo-css-vars-hint` и ровно те же
   правила в `style.css`. Предпочтительно — inline 1:1 (минимум CSS).

## i18n паритет

В React используются:
- `t.demoBox.toolbarLabel` / `copyCode` / `copy` / `copied` / `copiedToast` /
  `showCode` / `hideCode` / `showCodeAria` / `hideCodeAria`
- `t.componentDoc.whenToUse` / `examples`
- `t.propsTable.titleApi` / `colProperty` / `colDescription` / `colType` /
  `colDefault` / `requiredLabel`
- `t.cssVarsTable.title` / `colVariable` / `colDefault` / `colDescription`

Текущий Vue-словарь для DemoBox использует `t.componentDoc.copy` /
`copied` / `showCode` / `hideCode`. Нужно:

- Добавить в `examples/demo-vue/src/i18n/types.ts` секцию `demoBox` 1:1
  с React-DemoDict.
- Заполнить `dict-en.ts` / `dict-ru.ts` теми же строками что в
  `examples/demo/src/i18n/dict-en.ts` / `dict-ru.ts`.
- Добавить `propsTable.titleApi` и `propsTable.requiredLabel` если
  отсутствуют.
- В обёртках Vue заменить ссылки `t.componentDoc.copy/copied/showCode/hideCode`
  на `t.demoBox.copy/copied/showCode/hideCode`.

## CSS-порт

`examples/demo/src/app.css` — единственный источник правил `.demo-box*` /
`.doc-*` / `.demo-props-*` / `.doc-table`. Шаги:

1. Считать релевантные блоки правил из `app.css` (только эти namespace,
   ничего постороннего).
2. Скопировать в `examples/demo-vue/src/style.css` в новую секцию между
   маркерами:
   ```
   /* === BEGIN: ported from examples/demo/src/app.css (T-Vue-Demo-Wrappers-Parity) === */
   …
   /* === END:   ported from examples/demo/src/app.css === */
   ```
3. **Не редактировать значения** — только копия. Если конфликт с
   существующими `.dv-*` правилами — старые `.dv-*` оставить (для
   страниц вне миграции, если такие найдутся), новые `.demo-box*` /
   `.doc-*` добавить рядом.
4. Если в `style.css` есть мёртвые `.dv-*` правила, которые больше не
   используются (после переименования всех мест) — **в этом стриме не
   удалять**, finding `dv-namespace-cleanup` для следующей итерации.

## Чек-лист

### Шаг 0. Прочитать обязательное (~15 мин)

- React: `examples/demo/src/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable,FrameworkSwitcher}.tsx`
- React CSS: `examples/demo/src/app.css` (только секции `.demo-box*` / `.doc-*` / `.demo-props-*`)
- Vue: `examples/demo-vue/src/demos/components/*.vue` + `examples/demo-vue/src/style.css`
- React i18n: `examples/demo/src/i18n/types.ts` + `dict-en.ts` + `dict-ru.ts` (секции `demoBox`, `propsTable`, `cssVarsTable`, `componentDoc`)
- Vue i18n: `examples/demo-vue/src/i18n/types.ts` + `dict-en.ts` + `dict-ru.ts`

### Шаг 1. Расширить i18n (~20 мин)

- В `types.ts` добавить `demoBox` секцию + недостающие ключи в `propsTable`.
- В `dict-en.ts` / `dict-ru.ts` заполнить значения по образцу React.
- `pnpm --filter demo-vue build` после правки i18n — должен быть зелёным
  (TS проверит ключи).

### Шаг 2. Переписать обёртки (~60 мин)

По таблице выше: переименовать классы, поправить DOM, поправить
i18n-ссылки, повторить inline-стили React 1:1 (где они там есть). После
каждой обёртки — `pnpm --filter demo-vue build`.

### Шаг 3. Скопировать CSS (~30 мин)

Из `app.css` скопировать секции `.demo-box*` / `.doc-*` / `.demo-props-*` /
`.doc-table` в `style.css` в маркированный блок. Сборку прогнать.

### Шаг 4. Финал

```text
pnpm --filter demo-vue build
pnpm size
```

Оба зелёные. Если size упал — finding, не повышать лимит.

### Шаг 5. (Опц.) Скриншот-проверка

Если есть Chromium — `node scripts/screenshot-audit.mjs` + сравнить
**один** маршрут (`/components/button`) до/после в
`docs/_streams/audit/screenshots/wrappers-parity-{before,after}/`. Если
визуал явно сошёлся — стрим закрыт. Полный аудит делает 3.3.

## Acceptance criteria

- В `examples/demo-vue/src/demos/components/*.vue` нет ни одного
  упоминания префикса `dv-` в className/class (можно проверить
  через `rg "\bdv-(demo|doc|props|css-vars)" examples/demo-vue/src/demos/components/`).
- `examples/demo-vue/src/style.css` содержит блок «ported from app.css»
  с правилами `.demo-box*` / `.doc-*` / `.demo-props-*` / `.doc-table`
  идентичными React-источнику.
- `examples/demo-vue/src/i18n/types.ts` содержит секцию `demoBox` с
  тем же набором ключей, что в React.
- `pnpm --filter demo-vue build` зелёный.
- `pnpm size` зелёный (≤ 400 KB main bundle).
- Отчёт `docs/_streams/done/T-Vue-Demo-Wrappers-Parity.md` сдан с
  таблицей класс-→-класс, списком i18n-ключей, ссылкой на CSS-блок,
  секцией «Решения вне плана».

## Зависимости

- **После** Wave 3.2 router-switch (уже сделано в `master`, ahead 6).
- **Строго до** `T-Vue-Demo-PostMigration-Audit` (3.3) — иначе оба стрима
  подерутся за `demos/components/*` и `style.css`. После закрытия этой
  карты PostMigration-Audit получает чистую базу: визуал обёрток
  совпадает с React, остаётся проверять только конкретные `.demo.vue`.

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Vue-Demo-Wrappers-Parity (Волна 3.3a) в репозитории skygraph.

Задача: переписать общие демо-обёртки demo-vue (DemoBox, ComponentDoc,
PropsTable, CssVarsTable, опционально SourceCode) так, чтобы DOM и
className были 1:1 с React-эталоном examples/demo/src/components/*.tsx,
а соответствующие CSS-правила были скопированы из examples/demo/src/app.css
в examples/demo-vue/src/style.css. Никаких правок в React, packages/**,
demos/<comp>/**, router и nav. Лимит size 400 KB не повышать.

Полная карта: docs/_streams/wave-3/T-Vue-Demo-Wrappers-Parity.md

Правила автономности: не останавливаться, не спрашивать, decisions/
findings документировать. В конце —
docs/_streams/done/T-Vue-Demo-Wrappers-Parity.md. Никаких git commit /
pnpm install.

Старт: Шаг 0 карты (прочитать React-обёртки + app.css + i18n).
```
