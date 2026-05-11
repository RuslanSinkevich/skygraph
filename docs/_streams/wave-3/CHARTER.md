# Wave 3 — Vue Demo Parity (расширение основного CHARTER)

> Этот документ — мини-конституция Волны 3. Он **не заменяет** корневой
> `docs/_streams/CHARTER.md`, а дополняет его. Все стримы Волны 3
> сначала читают корневой CHARTER, потом этот.

---

## 1. Контекст

Волны 1-2 закрыты, 17 коммитов уже в `master`. После Волны 2:

- В `examples/demo-vue/src/pages/` лежит 32 страницы по схеме
  «1 файл = 1 компонент, всё внутри: примеры, словарь, исходники в виде
  строк, props-таблица».
- В `examples/demo/src/demos/` (React) лежит совершенно другая
  архитектура: `<comp>/*.demo.tsx` (атомные примеры) +
  `<comp>-doc/{en,ru}.ts` (словари + CSS-vars описания) +
  `<Comp>Demo.tsx` (агрегатор с `?raw`-импортом исходника каждого
  примера + `ComponentDoc + DemoBox + PropsTable + CssVarsTable`).
- Большинство Vue-страниц короче React-аналога:
  - меньше примеров (5 vs 8 для Button),
  - нет `CssVarsTable`,
  - исходник кода вшит строкой и расходится с реальным шаблоном,
  - словари en/ru вшиты в страницу.
- `Landing.vue` — заглушка ~2 KB. React-Landing — 21 KB
  (Hero + Stats + Features + WhatsNew + ShowcasesPreview + QuickInstall).
- Часть Vue-страниц имеет визуальные регрессии (стили). Конкретный
  список собирает Волна 3.1 (см. T-Vue-Demo-Foundation).

---

## 2. Цель Волны 3

Привести `examples/demo-vue` к **визуальному и архитектурному паритету**
с `examples/demo` (React).

**В рамках:**
- Архитектура `demos/<comp>/<Example>.demo.vue` + `demos/<comp>-doc/{en,ru}.ts`
  + `demos/<Comp>Demo.vue` + `?raw`-импорт исходников.
- `CssVarsTable.vue` — новый компонент по образцу React-аналога.
- Полная Landing с Hero / Stats / FeatureGrid / QuickInstall.
- Все ~50 компонентов: количество примеров и CSS-vars ≥ React-аналога.
- Фикс визуальных регрессий, найденных в аудите.

**Вне рамок (как и в Волне 2):**
- Showcases в Vue (явное решение в основном CHARTER §2).
- Benchmarks в Vue (то же).
- Изменения в `packages/vue/**` — если в аудите всплывает поломанный
  Vue-компонент, открывается `findings/<task>.md` и заводится отдельная
  карта `T-Vue-Cleanup-2`. **Демо-стримы внутрь `packages/vue/**` не
  лезут.**
- WhatsNew (парсер CHANGELOG) и ShowcasesPreview на Landing — это
  React-only, не портим.

---

## 3. Архитектура Волны 3

Две подволны.

### Волна 3.1 — фундамент (1 таб, последовательно)

Один стрим. Делает архитектурный фундамент + аудит + 1 эталонную
миграцию (Button). Должен закончиться **до** старта Волны 3.2, потому
что 3.2 пользуется его `gen-vue-demo.mjs` и `demos/components/*`.

| ID | Назначение |
|---|---|
| T-Vue-Demo-Foundation | Аудит разрывов, `demos/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable}.vue`, `?raw`-импорты, `scripts/gen-vue-demo.mjs`, эталонная миграция Button, обновлённый Landing |

### Волна 3.2 — контент (5 параллельных табов)

После того как 3.1 закрыт. Все 5 табов идут **параллельно**, каждый —
свой непересекающийся набор компонентов или зона стилей. Структура
файлов уже создана в 3.1, новые компоненты добавляются по шаблону.

| Таб | ID | Кол-во компонентов | Группа |
|---|---|---:|---|
| A | T-Vue-Demo-Forms | 18 | data-entry |
| B | T-Vue-Demo-Display | 13 | display |
| C | T-Vue-Demo-NavFeedback | 12 | navigation + feedback |
| D | T-Vue-Demo-Complex | 12 | complex (Form/Table/Tree/...) |
| E | T-Vue-Demo-StyleFixes | — | визуальные регрессии из аудита |

Точные списки компонентов на каждый таб — в самих task-картах.

### Волна 3.3a — паритет демо-обёрток с React (1 таб, **параллельно с 3.3b**, до 3.3)

В Wave 3.1 общие обёртки `examples/demo-vue/src/demos/components/*.vue`
написаны как «свои» (`.dv-*` namespace), а не как **порт React-эталонов**
`examples/demo/src/components/*.tsx` (`.demo-box*` / `.doc-*` namespace).
Из-за этого визуал страниц demo-vue отличается от React. Этот стрим —
переписать обёртки 1:1 с React по DOM/класcам/i18n и скопировать
правила из `examples/demo/src/app.css` в `examples/demo-vue/src/style.css`.

| ID | Назначение |
|---|---|
| T-Vue-Demo-Wrappers-Parity | Переписать `demos/components/*.vue` под React-классы, добавить i18n-ключи, скопировать CSS из `app.css` |

Карта: `docs/_streams/wave-3/T-Vue-Demo-Wrappers-Parity.md`.

### Волна 3.3b — DOM-паритет компонентов `@skygraph/vue` с React (1 таб, **параллельно с 3.3a и 3.3c**, до 3.3)

Компоненты `@skygraph/vue` (~88 SFC) писались отдельно от React (~96
файлов): базовые `sg-*` классы общие, но местами расходится DOM
(лишние обёртки `sg-button-spin`, отсутствующий `unstyled` prop,
дополнительные slots и т.д.). Этот стрим проходит все SFC батчами
и приводит DOM/className/aria 1:1 к React **без слома публичного API**.
**Исключает зону `packages/vue/src/components/complex/Diagram/**`** —
эта зона принадлежит стриму 3.3c.

| ID | Назначение |
|---|---|
| T-Vue-Components-DOM-Parity | Привести DOM/класcы/aria всех `packages/vue/src/components/**` (кроме `complex/Diagram/**`) к паритету с `packages/react/src/components/**`, добавлять опциональные props можно, удалять/переименовывать — finding |

Карта: `docs/_streams/wave-3/T-Vue-Components-DOM-Parity.md`.

### Волна 3.3c — полная доводка компонента Diagram (1 таб, **параллельно с 3.3a и 3.3b**, до 3.3)

В showcase «Редактор процессов» (`workflow-editor/WorkflowEditorApp.tsx`)
у `SgDiagram` сломан DnD из палитры на канвас, а маршрутизация рёбер
(`packages/core/src/engines/graph/router.ts`) даёт пересекающие узлы
линии. Стрим — полный аудит и доводка Diagram: router, DnD, hover-
actions, селекция, парность React↔Vue, visual polish CSS. Никаких
других компонентов не трогает.

| ID | Назначение |
|---|---|
| T-Diagram-Polish | Починить router рёбер (`graph/router.ts` + `obb.ts` + тесты), починить DnD из палитры на канвас (React + Vue), привести Diagram React↔Vue к DOM/className/props/events-паритету, отполировать `packages/styles/components/diagram.css`, при необходимости дополнить demo-страницы Diagram |

Карта: `docs/_streams/wave-3/T-Diagram-Polish.md`.

**Зоны 3.3a, 3.3b и 3.3c не пересекаются:**
- 3.3a → `examples/demo-vue/src/demos/components/*` + `examples/demo-vue/src/style.css` + `examples/demo-vue/src/i18n/**`
- 3.3b → `packages/vue/src/components/**` (кроме `complex/Diagram/**`) + точечно `packages/styles/components/*.css` (кроме `diagram.css`)
- 3.3c → `packages/{vue,react}/src/components/complex/Diagram/**` + `packages/core/src/engines/graph/**` + `packages/styles/components/diagram.css` + `examples/showcases/src/showcases/workflow-editor/**`

### Волна 3.3 — пост-миграционный QA (1 таб, после 3.3a + 3.3b + 3.3c)

Один независимый стрим **после** мержа всех воркеров 3.2 и **после
закрытия 3.3a + 3.3b + 3.3c**. Делает полный аудит demo-vue (стили,
отображение, консоль, визуальный паритет с React). К этому моменту
обёртки демо, DOM компонентов пакета и Diagram уже паритетны — аудит
ловит только остаточные расхождения в страницах `demos/<comp>/**`.

| ID | Назначение |
|---|---|
| T-Vue-Demo-PostMigration-Audit | Полный QA + `vue-demo-postmigration-audit.md` + точечные фиксы в зоне демо/shell; `packages/**` — только findings |

Карта: `docs/_streams/wave-3/T-Vue-Demo-PostMigration-Audit.md`.

---

## 4. Карта зон (Волна 3)

| Зона | Стрим |
|---|---|
| `examples/demo-vue/src/demos/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable,SourceCode}.vue` (новые) | T-Vue-Demo-Foundation |
| `examples/demo-vue/src/demos/button/*.demo.vue`, `examples/demo-vue/src/demos/button-doc/{en,ru,useStrings}.ts`, `examples/demo-vue/src/demos/ButtonDemo.vue` (новые) | T-Vue-Demo-Foundation |
| `examples/demo-vue/src/pages/Landing.vue` (полная переработка) | T-Vue-Demo-Foundation |
| `examples/demo-vue/src/router/index.ts`, `src/nav.ts` (миграция Button + удаление старого `ButtonPage.vue`) | T-Vue-Demo-Foundation |
| `examples/demo-vue/vite.config.ts` (если нужны правки `?raw`) | T-Vue-Demo-Foundation |
| `scripts/gen-vue-demo.mjs` (новый) | T-Vue-Demo-Foundation |
| `docs/_streams/audit/T-Vue-Demo-Parity.md`, `docs/_streams/audit/vue-broken-styles.md` (новые) | T-Vue-Demo-Foundation |
| `examples/demo-vue/src/demos/{input,inputnumber,textarea,select,checkbox,radio,switch,slider,rate,autocomplete,cascader,treeselect,colorpicker,datepicker,timepicker,calendar,upload,transfer}/**` + соответствующие `*-doc/` + `<Comp>Demo.vue` + удаление старых `pages/<Comp>Page.vue` + правка `router/index.ts` | T-Vue-Demo-Forms |
| Аналогично для display: `avatar,badge,tag,tooltip,carousel,collapse,descriptions,empty,result,skeleton,spin,progress,timeline` | T-Vue-Demo-Display |
| Аналогично для nav+feedback: `tabs,menu,breadcrumb,dropdown,pagination,steps,segmented,modal,drawer,popconfirm,notification,configprovider` | T-Vue-Demo-NavFeedback |
| Аналогично для complex: `form,table,tree,list,diagram,charts,dashboard,gantt,event-timeline,resource-calendar,schema-form-editor` | T-Vue-Demo-Complex |
| `packages/styles/components/*.css` (только фиксы конкретных селекторов из аудита), `examples/demo-vue/src/style.css`, `examples/_shared-vue/src/layout/styles.css` (только фиксы) | T-Vue-Demo-StyleFixes |
| `examples/demo-vue/src/demos/components/*.vue` (порт классов/DOM React 1:1), `examples/demo-vue/src/style.css` (порт правил `.demo-box*` / `.doc-*` / `.demo-props-*` из `examples/demo/src/app.css`), `examples/demo-vue/src/i18n/{types.ts,dict-en.ts,dict-ru.ts}` (секции `demoBox`, `propsTable`) | T-Vue-Demo-Wrappers-Parity |
| `packages/vue/src/components/**` (DOM/класcы/aria-паритет с React, без слома API, **исключая `complex/Diagram/**`**), точечно `packages/styles/components/*.css` (только Vue-специфичные правила, общие — finding, **исключая `diagram.css`**) | T-Vue-Components-DOM-Parity |
| `packages/{vue,react}/src/components/complex/Diagram/**`, `packages/core/src/engines/graph/**`, `packages/styles/components/diagram.css`, `examples/showcases/src/showcases/workflow-editor/**`, точечно `examples/demo-vue/src/demos/diagram/**` и `examples/demo/src/demos/diagram/**` | T-Diagram-Polish |
| `docs/_streams/audit/vue-demo-postmigration-audit.md` (новый/append), при необходимости `docs/_streams/audit/screenshots/postmigration/**` | T-Vue-Demo-PostMigration-Audit |
| `examples/demo-vue/src/demos/**/*.vue` (фиксы отображения после миграции; **`demos/components/*` уже фиксирован 3.3a — не трогать без явной причины**), `examples/demo-vue/src/style.css`, `examples/demo-vue/src/styles/**`, `examples/_shared-vue/src/layout/styles.css`, `examples/demo-vue/src/pages/Landing.vue` + `landing.css` | T-Vue-Demo-PostMigration-Audit |

### Общие зоны

- `examples/demo-vue/src/router/index.ts`, `src/nav.ts` — пересекаются
  у всех 4 контентных стримов 3.2. Каждый правит **только свои строки**
  (свой блок lazy-импортов и свой блок маршрутов). Никто не удаляет чужие
  записи. Если конфликт — последний пришедший делает merge через
  `git diff` (без `git rebase`, без `git stash` — только взять чужие
  строки в свой файл руками и сохранить).
- `examples/demo-vue/src/i18n/dict-en.ts` / `dict-ru.ts` — могут
  обновляться разными стримами (раздел `menuSections` если появляется
  новая категория). Каждый добавляет **только свои ключи**.
- `examples/demo-vue/src/demos/components/**` — после 3.1 зафиксирован,
  стримы 3.2 трогают только `<readonly>`. Если нужен новый общий компонент
  — finding и пропуск этого примера.

---

## 5. Правила работы стримов Волны 3

Те же что в основном CHARTER §5, плюс:

1. **Не трогать `packages/**`.** Поломки в Vue-компонентах = `findings/`,
   не правим. Демо-стрим в `packages/vue/**` не лезет.
2. **Не удалять примеры из React-демо** (`examples/demo/**` целиком
   read-only для Волны 3).
3. **Никаких `pnpm install`.** Если нужна новая зависимость — finding,
   решает пользователь после Волны 3.
4. **Никаких `git commit`/`git push`/`git stash`/`git rebase`.** Все
   изменения — в working tree, мерж в конце пользователь делает сам.
5. **Старые `pages/<Comp>Page.vue` удаляются после миграции** — это
   нормально и единственный способ избежать дубликатов маршрутов.
   Каждый стрим удаляет **только** страницы из своего списка.
6. **Локали (`@skygraph/vue`)** уже расширены в Волне 2. Если в новом
   примере для строки нет ключа в `SgLocale` — берём из локального
   словаря демо `<comp>-doc/{en,ru}.ts`, **в `packages/vue/src/locales/**`
   не лезем**.
7. **`?raw`-импорты:** vite поддерживает их из коробки. Используем
   синтаксис `import TypesSource from './button/Types.demo.vue?raw'`.
   `?raw` отдаёт исходный файл целиком, включая `<script setup>` —
   это нормально, в `DemoBox` показываем как есть.
8. **Отчёт в `docs/_streams/done/<id>.md`** — список добавленных файлов,
   удалённых старых страниц, и `findings`-ссылок.

---

## 6. Зависимости волн

```
Волна 1 (закрыта) → Волна 2 (закрыта) → Волна 3.1 → Волна 3.2 (5 параллельных табов) → Волна 3.3a + 3.3b + 3.3c (параллельно) → Волна 3.3 (1 таб, пост-QA)
```

Запускать 3.2 **до** окончания 3.1 — нельзя: воркеры будут вручную
повторять архитектурные решения и разойдутся.

Запускать 3.3a **до** закрытия 3.2 router-switch — нельзя: будут
сборочные ошибки на ещё не подключённых обёртках.

3.3a, 3.3b и 3.3c — **параллельные**: зоны
(`examples/demo-vue/src/demos/components/*` vs
`packages/vue/src/components/**` без Diagram vs
Diagram-граф во всех пакетах) не пересекаются.

Запускать 3.3 **до** закрытия 3.3a + 3.3b + 3.3c — нельзя:
PostMigration-Audit будет видеть «не паритетный» визуал и попытается
чинить чужие зоны.

---

## 7. Критерии "Волна 3 закрыта"

- `pnpm --filter demo-vue build` зелёный.
- `pnpm --filter demo-vue typecheck` зелёный.
- `pnpm size` зелёный (лимит для demo-vue main bundle подняли до 160 KB
  в Волне 2 — больше не поднимаем без явного решения; если упирается,
  стрим открывает finding и не повышает лимит сам).
- На каждом маршруте `/components/*` рендерится агрегатор `<Comp>Demo.vue`,
  старого `<Comp>Page.vue` нет.
- Кол-во `DemoBox` на странице ≥ кол-ву в React-аналоге.
- На страницах, где у React есть `CssVarsTable`, она есть и в Vue.
- Подсветка кода в `DemoBox` берётся из `?raw`-импорта реального файла,
  а не из ручной строки.
- `Landing.vue` показывает Hero + Stats + FeatureGrid + QuickInstall
  (без WhatsNew/ShowcasesPreview).
- Все регрессии из `docs/_streams/audit/vue-broken-styles.md` отмечены
  как `FIXED` или `findings/T-Vue-Cleanup-2.md` (если поломка в самом
  пакете, не в демо).
- Скриншоты Vue-страниц визуально совпадают с React-страницами в
  пределах разумного (одинаковая компоновка DemoBox, одинаковые
  заголовки, одинаковый порядок примеров).

Закрытие **полного визуального/UX QA** после миграции — отдельный
критерий Волны 3.3 (`T-Vue-Demo-PostMigration-Audit`): матрица в
`vue-demo-postmigration-audit.md`, без открытых P1.

---

## 8. Реестр карт Волны 3

| Файл |
|---|
| `docs/_streams/wave-3/T-Vue-Demo-Foundation.md` |
| `docs/_streams/wave-3/T-Vue-Demo-Forms.md` |
| `docs/_streams/wave-3/T-Vue-Demo-Display.md` |
| `docs/_streams/wave-3/T-Vue-Demo-NavFeedback.md` |
| `docs/_streams/wave-3/T-Vue-Demo-Complex.md` |
| `docs/_streams/wave-3/T-Vue-Demo-StyleFixes.md` |
| `docs/_streams/wave-3/T-Vue-Demo-Wrappers-Parity.md` |
| `docs/_streams/wave-3/T-Vue-Components-DOM-Parity.md` |
| `docs/_streams/wave-3/T-Diagram-Polish.md` |
| `docs/_streams/wave-3/T-Vue-Demo-PostMigration-Audit.md` |
