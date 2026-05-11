# Decisions — T-Vue-Demo-Wrappers-Parity

> Принятые архитектурные решения по `T-Vue-Demo-Wrappers-Parity` (Волна 3.3a),
> которые отклоняются от буквы task-карты или дополняют её.

## 1. `#api` named slot в `ComponentDoc.vue` — оставлен

**Карта говорит** (§DOM-паритет п.1): «убрать `<slot name="api" />` снизу или
переименовать паритет с React» — в React `PropsTable` / `CssVarsTable`
рендерятся внутри `children` (`.doc-demos`) прямо после демо.

**Реальность**: 55+ страниц `examples/demo-vue/src/demos/*Demo.vue`
используют `<template #api> <PropsTable …/> <CssVarsTable …/> </template>`.
Эти страницы — зона Волны 3.2 (read-only для этого стрима).

**Решение**: оставить `<slot name="api" />` в нижней части `ComponentDoc`,
сразу под `<div class="doc-demos">`. DOM-результат визуально идентичен
React (таблицы под демо-карточками), отличие — формальное место
рендера. Это явно разрешено картой как «допустимое отклонение» и
зафиксировано в комментарии к компоненту.

Альтернатива (рендерить `PropsTable`/`CssVarsTable` внутри default-slot
после всех `DemoBox`) потребовала бы изменить все `*Demo.vue` —
выходит за зону стрима.

## 2. `SourceCode.vue` — упрощён до `<pre><code>` без классов

**Карта говорит** (§DOM-паритет п.2): «блок кода: `.demo-box-code > pre >
code{{code}}` (без `SourceCode.vue`-обёртки, либо `SourceCode.vue`
рендерит ровно такой DOM)».

**Решение**: `SourceCode.vue` оставлен (как seam для будущей подсветки
синтаксиса), но его шаблон упрощён до `<pre><code>{{ source }}</code></pre>`
**без классов `.dv-demo-code-pre` / `.dv-demo-code-code`**. Внешний
`<div class="demo-box-code">` (от `DemoBox.vue`) задаёт все стили
1:1 с React. Получившийся DOM — `<div class="demo-box-code"><pre>
<code>…</code></pre></div>` — идентичен React.

## 3. Legacy ключи `componentDoc.{propsTitle,copy,copied,showCode,hideCode}` — сохранены

**Карта говорит** (§i18n паритет): «В обёртках Vue заменить ссылки
`t.componentDoc.copy/copied/showCode/hideCode` на `t.demoBox.…`».

**Реальность**: те же ключи использует `examples/demo-vue/src/components/
{DemoBox,PropsTable}.vue` — pre-Wave-3 обёртки, которые **не входят в
зону этого стрима** (карта явно ограничивает зону папкой
`src/demos/components/*`). TypeScript-сборка проверит весь `src/**`,
поэтому удалить ключи из `DemoDict` без правки legacy-файлов нельзя.

**Решение**: добавить **новые** ключи `demoBox.*` и `propsTable.titleApi`
рядом, не трогая старые. Новые обёртки `src/demos/components/*` читают
`t.demoBox.*` / `t.propsTable.titleApi`, legacy-обёртки продолжают
читать `t.componentDoc.*` до их удаления.

Finding `legacy-wrappers-untouched` для следующей итерации (см.
`findings/T-Vue-Demo-Wrappers-Parity.md`).

## 4. `requiredLabel` (ru) — `обязательно` → `обязательное`

**До**: `dict-ru.ts` `propsTable.requiredLabel = 'обязательно'`.
**React-эталон**: `'обязательное'`.

**Решение**: привести к виду React. Лингвистически прилагательное к
«полю» — корректнее («обязательное поле»), грамматический паритет с
`required` aria-label.

## 5. `CssVarsTable` hint — inline-style вместо `.dv-css-vars-hint`

**Карта говорит** (§DOM-паритет п.4): «либо повторить inline-style 1:1,
либо ввести общее имя `.demo-css-vars-hint`. Предпочтительно — inline 1:1».

**Решение**: inline-style 1:1 с React (`margin: -4px 0 12px; font-size:
13px; color: var(--sg-color-text-secondary)`). Никакого нового класса
в `style.css` не добавлено.

## 6. `PropsTable` required asterisk — `{{ ' *' }}`

**До**: `<span style="color: …; margin-left: 2px">*</span>`.
**React-эталон**: `<span style="color: …">{' *'}</span>` (пробел —
часть текста, без `margin-left`).

**Решение**: убрать `margin-left: 2px`, рендерить `{{ ' *' }}` —
явный пробел перед `*` как часть текстового узла (Vue нормализует
пробелы из шаблона, поэтому строковый литерал в `{{ }}` — единственный
способ гарантировать пробел 1:1 с React).

## 7. `ComponentDoc` — добавлен `#notes` named slot вместо `notes` prop

**React**: `notes?: ReactNode` prop, рендерится в `<div class="doc-notes">…</div>`
сразу после блока `When To Use`.

**Решение**: в Vue использовать **named slot `#notes`** — это идиомичный
Vue-эквивалент `ReactNode` prop. Шаблон проверяет `$slots.notes` и
рендерит обёртку только если слот заполнен. DOM-результат идентичен
React. Это симметрично решению из Decision #1 (`#api`).

## 8. CSS-блок добавлен в конец `style.css`, старые `.dv-*` оставлены

**Карта говорит** (§CSS-порт п.3): «Не редактировать значения — только
копия. Если конфликт с существующими `.dv-*` правилами — старые `.dv-*`
оставить, новые `.demo-box*` / `.doc-*` добавить рядом».

**Решение**: блок-копия из `app.css` вставлен в самый конец
`style.css` между маркерами `BEGIN/END: ported from examples/demo/src/
app.css`. Старые `.dv-*` правила оставлены без изменений — они
используются legacy-обёртками из `src/components/*` (см. §3). Никаких
удалений в этом стриме.

Скопированные секции:
- `Doc page base` (`.doc-page`, `.doc-lead`, `.doc-crumbs`, `.doc-crumb-sep`,
  `.doc-header`, `.doc-badge`, `.doc-notes` + `.doc-notes code`)
- `Code blocks` (`.doc-code`, `.doc-code code`)
- `API tables` (`.doc-table` + `th/td/td code`)
- `Links` (`.doc-link`, `:hover`)
- `Component Doc Page` (`.doc-component-title`, `.doc-when-to-use` блок,
  `.doc-demos`)
- `DemoBox` (`.demo-box`, `.demo-box-preview` + flush/vertical,
  `.demo-box-meta` + `::before`, `.demo-box-title`, `.demo-box-description`,
  `.demo-box-actions`, `.demo-box-action` + hover/focus-visible,
  `.demo-box-code` + pre/code)
- `Surface-less components on the preview gradient` (`.demo-box-preview
  .sg-result|.sg-empty` + `> .sg-result|.sg-empty` + `.demo-card-host`
  opt-out)
- `PropsTable` (`.demo-props-section`, `.demo-props-title`)

**Не копировались** (не упомянуты в карте, нерелевантны для обёрток):
`.doc-card-row`, `.doc-next-card`, `.doc-features`, `.doc-feature-*`,
`.demo-unstyled-*`, `.demo-table-*`, `.demo-list-*`, `.demo-row|col|fill|kbd`,
`.demo-swatch-*`, `.demo-scope-*`, `.demo-dark-scope`, `.demo-slot-legend*`.
