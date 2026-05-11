# Done — T-Vue-Demo-Wrappers-Parity (Волна 3.3a)

> Полный отчёт по стриму. Карта: `docs/_streams/wave-3/T-Vue-Demo-Wrappers-Parity.md`.
> Решения вне карты: `docs/_streams/decisions/T-Vue-Demo-Wrappers-Parity.md`.
> Findings и кандидаты на cleanup: `docs/_streams/findings/T-Vue-Demo-Wrappers-Parity.md`.

## Цель

Переписать общие демо-обёртки `examples/demo-vue/src/demos/components/*`
(`ComponentDoc`, `DemoBox`, `PropsTable`, `CssVarsTable`, `SourceCode`)
**1:1 с React-эталоном** `examples/demo/src/components/*.tsx`:
тот же DOM, те же `className`, те же i18n-ключи. Скопировать соответствующие
CSS-правила из `examples/demo/src/app.css` в `examples/demo-vue/src/style.css`.

## Изменённые файлы

```
examples/demo-vue/src/demos/components/ComponentDoc.vue   — переписан
examples/demo-vue/src/demos/components/DemoBox.vue        — переписан
examples/demo-vue/src/demos/components/PropsTable.vue     — переписан
examples/demo-vue/src/demos/components/CssVarsTable.vue   — переписан
examples/demo-vue/src/demos/components/SourceCode.vue     — упрощён
examples/demo-vue/src/i18n/types.ts                       — +demoBox, +propsTable.titleApi
examples/demo-vue/src/i18n/dict-en.ts                     — +demoBox, +propsTable.titleApi
examples/demo-vue/src/i18n/dict-ru.ts                     — +demoBox, +propsTable.titleApi, requiredLabel sync
examples/demo-vue/src/style.css                           — +порт-блок из app.css
docs/_streams/decisions/T-Vue-Demo-Wrappers-Parity.md     — 8 решений
docs/_streams/findings/T-Vue-Demo-Wrappers-Parity.md      — 5 findings
docs/_streams/done/T-Vue-Demo-Wrappers-Parity.md          — этот файл
```

**Не тронуто** (вне зоны): `examples/demo/**`, `examples/_shared*/**`,
`packages/**`, `examples/demo-vue/src/router/**`, `nav.ts`, `App.vue`,
`main.ts`, `pages/Landing.vue`, `pages/landing.css`, `.size-limit.json`,
`examples/demo-vue/src/components/*.vue` (legacy, см. finding #1),
все `examples/demo-vue/src/demos/<comp>/**` и `<comp>-doc/**`.

## Карта переименований классов (DOM-паритет)

| React (эталон)                          | Vue (было)                              | Vue (стало)                             |
|-----------------------------------------|-----------------------------------------|-----------------------------------------|
| `.demo-box`                             | `.dv-demo`                              | `.demo-box`                             |
| `.demo-box-preview`                     | `.dv-demo-preview`                      | `.demo-box-preview`                     |
| `.demo-box-preview-flush`               | `.dv-demo-preview-flush`                | `.demo-box-preview-flush`               |
| `.demo-box-preview-vertical`            | `.dv-demo-preview-vertical`             | `.demo-box-preview-vertical`            |
| `.demo-box-meta`                        | `.dv-demo-meta`                         | `.demo-box-meta`                        |
| `.demo-box-title`                       | `.dv-demo-title`                        | `.demo-box-title`                       |
| `.demo-box-description`                 | `.dv-demo-desc`                         | `.demo-box-description`                 |
| `.demo-box-actions`                     | `.dv-demo-actions`                      | `.demo-box-actions`                     |
| `.demo-box-action`                      | `.dv-demo-action`                       | `.demo-box-action`                      |
| `.demo-box-code`                        | `.dv-demo-code`                         | `.demo-box-code`                        |
| `.doc-page`                             | `.dv-doc`                               | `.doc-page`                             |
| `.doc-crumbs`                           | `.dv-doc-crumbs`                        | `.doc-crumbs`                           |
| `.doc-crumb`                            | `.dv-doc-crumb`                         | `.doc-crumb`                            |
| `.doc-crumb-sep`                        | `.dv-doc-crumb-sep`                     | `.doc-crumb-sep`                        |
| `.doc-header`                           | `.dv-doc-header`                        | `.doc-header`                           |
| `.doc-component-title`                  | `.dv-doc-title`                         | `.doc-component-title`                  |
| `.doc-badge`                            | `.dv-doc-badge`                         | `.doc-badge`                            |
| `.doc-lead`                             | `.dv-doc-lead`                          | `.doc-lead`                             |
| `.doc-when-to-use`                      | `.dv-doc-when`                          | `.doc-when-to-use`                      |
| `.doc-notes`                            | *(отсутствовал)*                        | `.doc-notes` (через `#notes` slot)      |
| `.doc-demos`                            | `.dv-doc-demos`                         | `.doc-demos`                            |
| `.demo-props-section`                   | `.dv-props-section`                     | `.demo-props-section`                   |
| `.demo-props-title`                     | `.dv-props-title`                       | `.demo-props-title`                     |
| `.doc-table`                            | `.dv-doc-table`                         | `.doc-table`                            |
| *(нет — у React inline `<pre><code>`)*  | `.dv-demo-code-pre` / `.dv-demo-code-code` | *(нет — у Vue inline `<pre><code>`)* |
| *(нет — inline-style на `<p>`)*         | `.dv-css-vars-hint`                     | *(нет — inline-style 1:1 с React)*      |
| *(нет — у React `<h2>` без класса)*     | `.dv-doc-section-title`                 | *(нет — `<h2>` без класса)*             |

Acceptance #1 проверен: `rg "\bdv-(demo|doc|props|css-vars)"
examples/demo-vue/src/demos/components/` → **0 совпадений**.

## i18n-паритет

### Новые ключи в `i18n/types.ts` + `dict-en.ts` + `dict-ru.ts`

| Ключ                          | EN              | RU              | React-источник       |
|-------------------------------|-----------------|-----------------|----------------------|
| `demoBox.toolbarLabel`        | `Demo actions`  | `Действия демо` | `demoBox.toolbarLabel` |
| `demoBox.showCode`            | `Show Code`     | `Показать код`  | `demoBox.showCode`   |
| `demoBox.hideCode`            | `Hide Code`     | `Скрыть код`    | `demoBox.hideCode`   |
| `demoBox.showCodeAria`        | `Show code`     | `Показать код`  | `demoBox.showCodeAria` |
| `demoBox.hideCodeAria`        | `Hide code`     | `Скрыть код`    | `demoBox.hideCodeAria` |
| `demoBox.copyCode`            | `Copy code`     | `Скопировать код` | `demoBox.copyCode` |
| `demoBox.copy`                | `Copy`          | `Копировать`    | `demoBox.copy`       |
| `demoBox.copied`              | `Copied`        | `Скопировано`   | `demoBox.copied`     |
| `demoBox.copiedToast`         | `Copied!`       | `Скопировано!`  | `demoBox.copiedToast` |
| `propsTable.titleApi`         | `API`           | `API`           | `propsTable.titleApi` |

### Sync-сдвиги

- `propsTable.requiredLabel` (ru): `'обязательно'` → `'обязательное'`
  для паритета с React-словарём.

### Старые ключи — сохранены (см. Decision #3)

`componentDoc.{propsTitle, copy, copied, showCode, hideCode}` — оставлены
для legacy-обёрток в `examples/demo-vue/src/components/*.vue` (вне зоны;
finding #1 / #2 на cleanup).

## CSS-порт

Блок `BEGIN/END: ported from examples/demo/src/app.css (T-Vue-Demo-Wrappers-Parity)`
добавлен в конец `examples/demo-vue/src/style.css` (см. строки 451..конец).

Скопированы 1:1 (без изменения значений) следующие секции из `app.css`:

- `Doc page base` — `.doc-page` / h1 / h2 / h2:first-of-type / p / code,
  `.doc-lead`, `.doc-crumbs`, `.doc-crumb-sep`, `.doc-header`,
  `.doc-badge`, `.doc-notes` + `.doc-notes code`
- `Code blocks` — `.doc-code` + `.doc-code code`
- `API tables` — `.doc-table` / th / td / td code
- `Links` — `.doc-link` + `:hover`
- `Component Doc Page` — `.doc-component-title`, `.doc-when-to-use` + h2 + ul + li, `.doc-demos`
- `DemoBox (Ant-like)` — `.demo-box` + hover, `.demo-box-preview` + flush + vertical,
  `.demo-box-meta` + `::before`, `.demo-box-title`, `.demo-box-description`,
  `.demo-box-actions`, `.demo-box-action` + hover + focus-visible,
  `.demo-box-code` + pre + code
- `Surface-less components on the preview gradient` —
  `.demo-box-preview .sg-result|.sg-empty`, `> .sg-result|.sg-empty`,
  `.demo-card-host` opt-out
- `PropsTable` — `.demo-props-section`, `.demo-props-title`

Старые `.dv-doc*` / `.dv-demo*` / `.dv-props-*` / `.dv-doc-table` /
`.dv-css-vars-hint` оставлены без изменений (используются legacy-обёртками,
см. finding #2 на следующую итерацию). `.dv-landing*` — вне зоны.

Acceptance #2 проверен: блок-копия равен соответствующим строкам
`app.css` с точностью до маркеров и комментариев.

## Acceptance criteria

| Критерий                                                                    | Статус |
|-----------------------------------------------------------------------------|--------|
| Нет упоминаний `dv-(demo\|doc\|props\|css-vars)` в `demos/components/*.vue` | ✅      |
| `style.css` содержит «ported from app.css» блок                              | ✅      |
| `i18n/types.ts` содержит `demoBox` секцию 1:1 с React                        | ✅      |
| `pnpm --filter demo-vue build` зелёный                                       | ✅      |
| `pnpm size` зелёный (≤ 400 KB main bundle)                                   | ✅      |
| Отчёт с таблицей переименований, i18n-ключами, CSS-секциями, decisions       | ✅      |

## Сборка и size

`pnpm --filter demo-vue build` → exit 0, 1969 modules, 4.85s.

`pnpm size`:
```
examples/demo-vue (main bundle)
  Size limit:   400 kB
  Size:         323.49 kB with all dependencies, minified and brotlied
```

Бандл вырос **из-за добавления порт-блока CSS** в `style.css` (примерно
+5..8 KB raw, ~1..2 KB brotli) и нескольких новых i18n-строк (~200 b).
Запас до лимита `400 - 323.49 = 76.5 KB`. Лимит не двигался.

## Решения вне плана

См. `docs/_streams/decisions/T-Vue-Demo-Wrappers-Parity.md`:

1. `#api` named slot оставлен в `ComponentDoc.vue` (55+ страниц-консьюмеров).
2. `SourceCode.vue` упрощён до `<pre><code>` без классов (паритет inline DOM React).
3. Legacy `componentDoc.{propsTitle,copy,…}` сохранены (используются `src/components/*`).
4. `requiredLabel` (ru): `обязательно` → `обязательное` для паритета.
5. `CssVarsTable` `hint` — inline-style вместо нового класса.
6. `PropsTable` required asterisk — `{{ ' *' }}` (пробел в тексте), без `margin-left`.
7. `ComponentDoc` `notes` — named slot `#notes` (Vue-эквивалент React `ReactNode` prop).
8. CSS-блок в конец `style.css`, `.dv-*` правила сохранены.

## Findings (кандидаты на следующие итерации)

См. `docs/_streams/findings/T-Vue-Demo-Wrappers-Parity.md`:

1. `legacy-wrappers-untouched` — удалить `src/components/{ComponentDoc,
   DemoBox,PropsTable}.vue` (не используются никем) и обрезать
   legacy-ключи в `i18n/types.ts`.
2. `dv-namespace-cleanup` — после #1 удалить мёртвые `.dv-doc*` /
   `.dv-demo*` / `.dv-props-*` / `.dv-doc-table` / `.dv-css-vars-hint`
   правила из `style.css`.
3. `vue-pre-class-injection` — визуально проверить код-блок на одной
   странице (например `/components/button`) после упрощения SourceCode.
4. `requiredLabel-ru-shift` — намеренный sync; для информации.
5. `notes-slot-no-consumers-yet` — никто пока не передаёт `<template
   #notes>`; добавить при появлении первой страницы с заметками.

## Зависимости

- **После**: Wave 3.2 router-switch — был выполнен в `master`.
- **Строго до**: `T-Vue-Demo-PostMigration-Audit` (3.3). После закрытия
  этого стрима PostMigration-Audit получает чистую базу — визуал
  обёрток совпадает с React, остаётся проверять только конкретные
  `.demo.vue`-страницы.

## Параллельно

Стрим работал параллельно с **3.3b** (`packages/vue/**`) и **3.3c**
(`Diagram`, graph engine, `diagram.css`) — пересечений зон нет.
