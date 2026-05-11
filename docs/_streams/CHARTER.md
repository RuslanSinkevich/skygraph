# Skycode/SkyGraph — Parallel Streams Charter

> Этот документ читает **каждый** стрим перед стартом. Конституция работы.
> Если что-то здесь противоречит твоей task-карте — побеждает CHARTER.

---

## 1. Контекст репозитория

Монорепо `skygraph` (pnpm workspaces). Главные пакеты:

- `@skygraph/core` — ядро (Core, FormEngine, TableEngine, TreeEngine, GraphEngine, виртуализация). Без UI.
- `@skygraph/react` — React-адаптер. Полный набор компонентов (~80 экспортов).
- `@skygraph/vue` — Vue 3 адаптер. **В зачатке**, не на 100% покрывает React.
- `@skygraph/styles` — общий CSS (`.sg-*` классы). Используется обоими адаптерами.

Демо-сайты:

- `examples/demo` (React) — **эталон визуала** для Vue-сайта.
- `examples/demo-vue` (Vue) — **догоняет** demo по визуалу и страницам.
- `examples/showcases` (React) — 12 мини-апп. **Vue-аналога не будет.**
- `examples/_shared-react/layout` — общие AppShell/Header/Footer/Sidebar для React-демо.
- `examples/_shared` — кросс-фреймворковые константы и locale-словари.
- `examples/_shared-vue` — **ещё не существует**, его создаёт стрим `T-VueLayout`.

---

## 2. Цели проекта

1. **Vue полный паритет с React** в `@skygraph/vue`: компоненты, пропы, эмиты, локали.
2. **Vue-демо визуально как React-демо** (`examples/demo-vue` → `examples/demo`), кроме Showcases/Benchmarks.
3. **Аудит React-стека** на мёртвый код, мёртвые стили, хардкод строк/стилей.
4. **Защитная сетка против регрессий**.

### Не-цели

- Showcases в Vue — **не переносим**.
- Benchmarks в Vue — **не переносим**.
- Аудит `@skygraph/vue` — **не делаем** (в зачатке, нечего аудитировать).

---

## 3. Архитектура: волны

| Волна | Статус | Кратко |
|---|---|---|
| 1 — INFRA | закрыта | 4 task-карты, 1 таб последовательно |
| 2 — РАБОЧИЕ | закрыта | 13 task-карт в 8 параллельных табах |
| 3 — Vue Demo Parity | план | 10 task-карт: 1 фундамент + 5 параллельных воркеров 3.2 + 3 параллельных стрима паритета (3.3a обёртки + 3.3b DOM компонентов + 3.3c Diagram) + 1 пост-QA 3.3. См. `docs/_streams/wave-3/CHARTER.md` |
| 4 — Angular Adapter | план | Старт через `T-Angular-Foundation` (4.1). Каркас уже скаффолдён, `pnpm install` сделан. Идёт **параллельно** с 3.3a/b/c. Подволны 4.2/4.3/4.4 — позже. См. `docs/_streams/wave-4/CHARTER.md` |

### Волна 1 — INFRA (4 task-карты, 1 таб последовательно)

Защитная сетка. Запускаются первыми. Должны закончиться до старта Волны 2.

Все 4 карты пересекаются на корневом `package.json` (devDeps + scripts), поэтому идут **последовательно в одном табе**: T-CI → T-API → T-Size → T-Smoke. Один `pnpm install` в самом конце для всех зависимостей сразу.

| ID | Назначение |
|---|---|
| T-CI | CI matrix + husky/lint-staged |
| T-API | Public API snapshot (`@microsoft/api-extractor`) |
| T-Size | Bundle size guard (`size-limit`) |
| T-Smoke | Playwright smoke по обоим demo |

### Волна 2 — РАБОЧИЕ (13 task-карт в 8 параллельных табах)

Параллельность — на уровне **табов**, а не карт. Внутри Vue-, React- и VueLayout-групп карты идут **последовательно**, потому что пересекаются по общим файлам (`packages/vue/src/index.ts`, `packages/styles/components/*.css`, `SgLocale`, `examples/demo-vue/src/{nav.ts,main.ts}`).

| Таб | Карты | Режим внутри |
|---|---|---|
| 1 (Vue-группа) | T-Vue-Cleanup → T-Vue-Misc → T-Vue-Charts | последовательно |
| 2 (React-группа) | T-React-Cleanup → T-React-I18n-Styles → T-Docs-Locales | последовательно |
| 3 (VueLayout-группа) | T-VueLayout → T-VueDemo-Pages | последовательно |
| 4 | T-Quality | один |
| 5 | T-Codegen | один |
| 6 | T-Polish | один |
| 7 | T-Showcases-I18n | один |
| 8 | T-Table-Perf | один |

Описание самих карт:

| ID | Назначение |
|---|---|
| T-Vue-Cleanup | Уборка 6 SFC (`customClass` → fallthrough) + parity-тесты + index sync |
| T-Vue-Misc | `zodAdapter` + `HistoryPanel` + Diagram ref API/actions |
| T-Vue-Charts | `ChartCrosshair` / `ChartBrush` / `ChartHoverToolbar` / downloads / contextMenu |
| T-React-Cleanup | мёртвые экспорты + мёртвые `.sg-*` + 6 unresolved TSDoc @link (finding T-API) + MIGRATION.md |
| T-React-I18n-Styles | хардкод строк → `useConfig` + `style={{}}` → CSS (`packages/react/src/components/**` кроме Table) |
| T-Docs-Locales | TSDoc автоген + новые локали zh/de/fr/es |
| T-VueLayout | `_shared-vue/layout` + перевод `demo-vue` на него |
| T-VueDemo-Pages | догнать страницы demo-vue до уровня React-демо (~25-30 страниц) |
| T-Quality | A11y axe + расширение benchmarks |
| T-Codegen | генератор demo-страниц |
| T-Polish | Vue dts rollup + bundle budget guard + `sideEffects: false` |
| T-Showcases-I18n | локализация 12 SkyGraph Showcases (en/ru) |
| T-Table-Perf | профайлинг и быстрые wins по `<Table>` (12x отставание от antd) |

### Волна 3 — VUE DEMO PARITY (10 task-карт: 1 фундамент + 5 параллельных воркеров 3.2 + 3 параллельных стрима паритета 3.3a/3.3b/3.3c + 1 пост-QA 3.3)

После Волны 2 в `examples/demo-vue` 32 страницы по схеме «всё в одном
файле» — без `?raw`-импорта исходников, без `CssVarsTable`, словари
вшиты в страницу, Landing — заглушка ~2 KB. React-демо использует
другую архитектуру: `demos/<comp>/*.demo.tsx` + `demos/<comp>-doc/{en,ru}.ts`
+ `demos/<Comp>Demo.tsx` агрегатор. Волна 3 приводит Vue-демо к
паритету.

Подробности — `docs/_streams/wave-3/CHARTER.md`.

#### Волна 3.1 — фундамент (1 таб, последовательно)

| ID | Назначение |
|---|---|
| T-Vue-Demo-Foundation | Аудит разрывов + `vue-broken-styles.md` + `demos/components/{ComponentDoc,DemoBox,PropsTable,CssVarsTable,SourceCode}.vue` + `?raw`-импорты + `scripts/gen-vue-demo.mjs` + эталонная миграция Button + полная Landing |

#### Волна 3.2 — контент (5 параллельных табов, после 3.1)

| Таб | ID | Кол-во компонентов | Группа |
|---|---|---:|---|
| A | T-Vue-Demo-Forms | 18 | data-entry |
| B | T-Vue-Demo-Display | 13 | display |
| C | T-Vue-Demo-NavFeedback | 12 | navigation + feedback |
| D | T-Vue-Demo-Complex | 12 | complex (Form/Table/Tree/Charts/...) |
| E | T-Vue-Demo-StyleFixes | — | визуальные регрессии из аудита 3.1 |

#### Волна 3.3a — паритет демо-обёрток с React (1 таб, **параллельно с 3.3b и 3.3c**)

| ID | Назначение |
|---|---|
| T-Vue-Demo-Wrappers-Parity | Переписать `examples/demo-vue/src/demos/components/*.vue` под React-классы (`.demo-box*` / `.doc-*` / `.demo-props-*`), скопировать CSS из `examples/demo/src/app.css`, добавить i18n-ключи `demoBox` / `propsTable.titleApi` |

Карта: `docs/_streams/wave-3/T-Vue-Demo-Wrappers-Parity.md`.

#### Волна 3.3b — DOM-паритет компонентов `@skygraph/vue` (1 таб, **параллельно с 3.3a и 3.3c**)

| ID | Назначение |
|---|---|
| T-Vue-Components-DOM-Parity | Привести DOM/класcы/aria всех `packages/vue/src/components/**` (~88 SFC, **исключая `complex/Diagram/**`**) к паритету 1:1 с `packages/react/src/components/**`. Идём 4 батчами |

Карта: `docs/_streams/wave-3/T-Vue-Components-DOM-Parity.md`.

#### Волна 3.3c — полная доводка компонента Diagram (1 таб, **параллельно с 3.3a и 3.3b**)

| ID | Назначение |
|---|---|
| T-Diagram-Polish | Починить router рёбер (`packages/core/src/engines/graph/router.ts` + `obb.ts` + тесты), починить DnD из палитры на канвас (React + Vue), привести Diagram React↔Vue к паритету по DOM/className/props/events, отполировать `packages/styles/components/diagram.css`, при необходимости дополнить demo-страницы Diagram. Зона: `packages/{vue,react}/src/components/complex/Diagram/**`, `packages/core/src/engines/graph/**`, `packages/styles/components/diagram.css`, `examples/showcases/src/showcases/workflow-editor/**` |

Карта: `docs/_streams/wave-3/T-Diagram-Polish.md`.

#### Волна 3.3 — пост-миграционный QA (1 таб, после 3.3a + 3.3b + 3.3c)

| ID | Назначение |
|---|---|
| T-Vue-Demo-PostMigration-Audit | Полный аудит стилей/отображения demo-vue против React после миграции и приведения обёрток + компонентов в паритет; документ `audit/vue-demo-postmigration-audit.md`; правки в `demos/<comp>/**`, shell CSS; корни в `packages/**` — findings |

Карта: `docs/_streams/wave-3/T-Vue-Demo-PostMigration-Audit.md`.

### Волна 4 — Angular adapter (открыта 4.1, **параллельно с 3.3a/b/c**)

Третий адаптер `@skygraph/angular` по образцу React/Vue. Каркас
(packages/angular + examples/demo-angular, минимальные package.json /
tsconfig / public-api / main.ts) уже скаффолдён, `pnpm install` уже
выполнен — стрим 4.1 install **не запускает**, идёт параллельно с 3.3.

#### Волна 4.1 — фундамент

| ID | Назначение |
|---|---|
| T-Angular-Foundation | DI-эквивалент `useConfig` (provideSgConfig + injectSgConfig + `<sg-config-provider>`), эталонные SgButton + SgSpin (DOM 1:1 с React, attribute-selector `button[sg-button]`), локали en/ru, парность-тест с React, демо examples/demo-angular (Landing + Button) |

Карта: `docs/_streams/wave-4/T-Angular-Foundation.md`.

Подволны 4.2 (порт компонентов батчами) / 4.3 (полное Angular-демо) /
4.4 (post-migration QA) — заводятся после 4.1 на основе findings.

---

## 4. Карта зон (никто не трогает чужое)

| Зона | Стрим |
|---|---|
| `.github/workflows/`, `.husky/`, корневой `package.json` (lint-staged), `.lintstagedrc.json` | T-CI |
| `etc/<pkg>.api.md`, `api-extractor.json` (per-pkg), `<pkg>/package.json` (scripts api:check/api:update) | T-API |
| `.size-limit.json` или `.size-limit.config.js`, корневой `package.json` (script `size`) | T-Size |
| `tests/smoke/` (новая), `playwright.config.ts`, корневой `package.json` (script `test:smoke`) | T-Smoke |
| `packages/vue/src/components/ui/{InputPassword,SearchInput,TagInput,PinInput,InlineEdit,InputGroup}.vue`, `packages/vue/src/__tests__/styling-contract.parity.test.ts` (правки), `packages/vue/src/index.ts` (только для текущих 6) | T-Vue-Cleanup |
| `packages/vue/src/adapters/zodAdapter.ts` (новый), `packages/vue/src/components/devtools/` (новая), `packages/vue/src/components/complex/Diagram/Diagram.vue` (правки ref API), `packages/vue/src/index.ts` (добавления) | T-Vue-Misc |
| `packages/vue/src/components/complex/Charts/{ChartCrosshair,ChartBrush,ChartHoverToolbar}.vue` (новые), `packages/vue/src/components/complex/Charts/{download,contextMenu}.ts` (новые), `packages/vue/src/components/complex/Charts/index.ts` (добавления), `packages/vue/src/index.ts` (добавления) | T-Vue-Charts |
| `packages/react/src/index.ts` (только удаления), `packages/styles/components/*.css` (только удаления селекторов) | T-React-Cleanup |
| `packages/react/src/components/**/*.tsx` (i18n + style→CSS), `packages/react/src/locales/{en_US,ru_RU}.ts` (расширение), `packages/styles/components/*.css` (добавления новых классов) | T-React-I18n-Styles |
| `examples/_shared-vue/` (новая), `examples/demo-vue/src/{App.vue,main.ts,nav.ts}`, `examples/demo-vue/src/components/{Header,Sidebar,ThemeToggle,LanguageToggle}.vue` (удаление/перенос), `examples/demo-vue/package.json` (добавление `_shared-vue` в deps) | T-VueLayout |
| `examples/demo-vue/src/pages/*.vue` (новые), `examples/demo-vue/src/{nav.ts,main.ts}` (только append маршрутов после T-VueLayout), `examples/demo-vue/src/components/{DemoBox,ComponentDoc,PropsTable}.vue` (только аддитивно) | T-VueDemo-Pages |
| `tests/a11y/` (новая), `playwright-a11y.config.ts`, `examples/demo/src/demos/benchmarks/{TableBenchmark,TreeBenchmark,ChartBenchmark}.tsx` (новые) | T-Quality |
| `docs/api/` (автоген), `typedoc.json`, `packages/{react,vue}/src/locales/{zh_CN,de_DE,fr_FR,es_ES}.ts` (новые), `packages/{react,vue}/src/locales/index.ts` (добавления) | T-Docs-Locales |
| `scripts/gen-demo-page.ts` (новый), `scripts/README.md` | T-Codegen |
| `packages/vue/vite.config.ts`, `packages/vue/api-extractor.json` (только убрать подавления), `packages/vue/tsconfig.json` (если нужно), `scripts/check-bundle-budget.mjs` (новый), `package.json` (только добавить script `bundle:check`), `.github/workflows/ci.yml` (только step `Bundle budget`), `packages/{core,react,vue}/package.json` (только добавить поле `sideEffects`) | T-Polish |
| `examples/showcases/src/showcases/**/*.tsx`, `examples/_shared/src/showcasesLocale.ts`, `examples/_shared/src/index.ts` (только реэкспорт новых типов) | T-Showcases-I18n |
| `packages/core/src/engines/table/**`, `packages/react/src/components/complex/Table/{Table,TableBody,VirtualTableBody,TableHeader,TableGroupRow,useTableState,helpers}.{ts,tsx}`, `packages/react/src/__tests__/table-perf.test.tsx` (новый), `examples/demo/src/demos/benchmarks/TablePerfProbe.tsx` (новый, временный) | T-Table-Perf |
| `packages/{vue,react}/src/components/complex/Diagram/**`, `packages/core/src/engines/graph/**`, `packages/core/src/__tests__/graph.test.ts`, `packages/styles/components/diagram.css`, `examples/showcases/src/showcases/workflow-editor/**`, точечно `examples/demo-vue/src/demos/diagram/**` и `examples/demo/src/demos/diagram/**` | T-Diagram-Polish |
| `packages/angular/**` (всё внутри пакета: src, tsconfig дополнения, README, тесты), `examples/demo-angular/**` (всё), точечно `.size-limit.json` (только append двух новых записей для @skygraph/angular и demo-angular), `docs/_streams/{decisions,findings,done}/T-Angular-Foundation.md` | T-Angular-Foundation |

### Общие зоны (могут трогать несколько стримов)

- `packages/react/src/index.ts` — может править T-React-Cleanup (удаления) и T-React-I18n-Styles (добавления только если новые экспорты для локалей). Каждый правит **только свои строки**.
- `packages/vue/src/index.ts` — могут править T-Vue-Cleanup, T-Vue-Misc, T-Vue-Charts. Каждый добавляет **только свои экспорты**, никто никого не удаляет.
- `packages/styles/components/*.css` — T-React-Cleanup только удаляет, T-React-I18n-Styles только добавляет новые классы. Не одни и те же строки.

---

## 5. Правила параллельной работы (нарушение = чужой стрим сломан)

Стримы работают **параллельно в одном working tree** на машине пользователя. **Никаких git-веток, никаких worktrees, никаких коммитов.** Финальное ревью — пользователь делает сам через `git status` / `git diff`.

### Жёсткие запреты

1. **НЕ запускать `pnpm install`.** Пересоздаёт `node_modules` и убивает любые параллельные процессы. Если задача требует новых зависимостей — это **указано явно** в task-карте, и стрим оговаривается как одиночный.
2. **НЕ запускать глобальные команды:** `pnpm typecheck`, `pnpm build`, `pnpm test`, `pnpm lint` без `--filter`. Они трогают `node_modules/.cache/*` и временные файлы tsc → race condition.
3. **Только точечные команды через `--filter`:**
   - `pnpm --filter @skygraph/vue typecheck`
   - `pnpm --filter @skygraph/react test`
   - `pnpm --filter demo build`
   - `pnpm --filter demo-vue build`
4. **НЕ запускать `pnpm clean`** — снесёт `dist/` чужим стримам.
5. **Зоны изоляции из раздела 4 — закон.** Любая правка чужой зоны = катастрофа, потому что нет git-снимков для отката.

### Что разрешено

- Точечный typecheck/test/build своего пакета через `--filter`.
- Создание новых файлов в своей зоне.
- Чтение любых файлов в репо.

---

## 6. Decision Protocol (без обратной связи)

Стрим **не имеет права** задавать вопросы пользователю. Все решения сам по правилам:

### 6.1 Неоднозначное API
1. Минимально инвазивный вариант (минимум изменений в публичном API).
2. Запись в `docs/_streams/decisions/<stream-id>.md`.
3. Идти дальше.

### 6.2 Чужой файл понадобился
1. **НЕ ТРОГАТЬ.**
2. В своём файле сделать TODO/заглушку.
3. Запись в `docs/_streams/blocked/<stream-id>.md`.
4. Продолжить оставшийся scope.

### 6.3 Тесты падают
- 3 попытки чинить.
- Не вышло — отменить последнее изменение в **своих** файлах (не через git).
- Запись в `docs/_streams/blocked/<stream-id>.md`.
- Идти к следующей задаче scope.

### 6.4 Находка вне scope
- Сломано/мёртво/неконсистентно вне твоей зоны.
- **НЕ ЧИНИ.**
- Запись в `docs/_streams/findings/<stream-id>.md`.

---

## 7. Workflow стрима

### Старт
- Прочитать `CHARTER.md` целиком.
- Прочитать свою task-карту `T-<id>.md`.
- Свериться с картой зон (раздел 4) — какие файлы можно трогать.

### Во время работы
- Точечные команды (`pnpm --filter ...`) — можно.
- Глобальные команды — **запрещено**.
- Новые файлы только в своей зоне.

### Перед завершением
Прогнать **только своего пакета**:
```bash
pnpm --filter <свой-пакет> typecheck
pnpm --filter <свой-пакет> test
pnpm --filter <свой-пакет> build   # если применимо
```
Все три зелёные.

### Финал
Стрим **не делает PR**, **не делает commit**, **не делает push**. Пишет краткий отчёт в `docs/_streams/done/<stream-id>.md`:
- Список изменённых файлов.
- Acceptance criteria — что выполнено, что нет.
- Ссылки на decision/blocked/findings логи если есть.

---

## 8. Vue-идиоматика (читает каждый Vue-стрим)

Цель — код понятен большинству Vue-разработчиков. Без имитации React-паттернов.

### Скрипт
- `<script setup lang="ts">` всегда.
- Пропы: `withDefaults(defineProps<Props>(), {...})`.
- События: `defineEmits<{...}>()`.
- Слоты: `defineSlots<{...}>()`.
- v-model: `modelValue` + `update:modelValue`. Вспомогательные модели — `update:foo`.
- `ref` для скаляров, `reactive` только для сложных мутируемых коллекций.
- `computed` для производных, `watch`/`watchEffect` для эффектов.
- Lifecycle: `onMounted`/`onBeforeUnmount`/`onScopeDispose` (последнее — для композаблов с подписками core).
- Композабл = `use*`, возвращает `Ref<T>` или объект из `Ref`-ов. Не сырое значение.
- DI: `provide`/`inject` через `InjectionKey<T>`.

### Шаблон
- **Не объявлять `class` как проп.** Vue сам пробрасывает `class` на корень. Никаких `customClass`.
- `v-bind="$attrs"` где надо явно прокинуть атрибуты в дочерний элемент.
- `v-show` для частых toggle, `v-if` для условного маунта.
- DOM-ref: `const el = ref<HTMLElement | null>(null)` + `:ref="el"`.

### Запрещено
- Имитировать `useState`/`useEffect` через `reactive`-обёртки.
- Возвращать «готовое значение» из композабла вместо `Ref`.
- Объявлять `class`/`style` пропами «как в React».
- `defineExpose` без явной необходимости.

### Имена
- Компоненты — `Sg*` (`SgInput`, `SgChartCrosshair`).
- Композаблы — `use*`.
- Публичные типы — без префикса (`InputProps`, `TableColumn`).

---

## 9. API Parity (определение)

**Паритет = публичный API одинаков, реализация идиоматична для фреймворка.**

### Должно совпадать с React
- Список экспортов из `index.ts` (имена, типы, дженерики).
- Имена пропов и их типы.
- Имена эмитов/коллбэков и сигнатуры.
- DOM-структура и `sg-*` классы.
- Ключи в `SgLocale`.
- Поведение в граничных случаях.

### Может (и должно) отличаться
- Внутренний state (`ref`/`computed` vs `useState`/`useMemo`).
- Сигнатура композаблов: React `T`, Vue `Ref<T>`.
- Render lifecycle.
- Слоты Vue ↔ render-props/children React по смыслу, не по сигнатуре.

---

## 10. Локализация — что переводим, что нет

### НЕ локализуем (хардкод оставляем)
- Символы Unicode: `✓ ✕ ○ ◉ ⌕ × ✎ →` и подобные.
- Технические идентификаторы: имена ключей роутов, классы, ARIA-роли.
- `sg-*` имена классов.

### Локализуем
- Все человекочитаемые строки UI: placeholders, button labels, error messages, aria-label с текстом.
- Имена меню, заголовки секций.

---

## 11. Глобальный стоп-лист

Запрещено любому стриму:

- Менять `pnpm-lock.yaml` руками.
- Запускать `pnpm install` (если task-карта явно не разрешает).
- Запускать глобальные команды без `--filter`.
- Удалять чужие тесты.
- Расширять scope за пределы task-карты.
- Менять CSS-токены в `packages/styles/tokens.css` (если task-карта явно не разрешает).
- Менять версии в корневых `package.json` без согласования.
- Создавать новые корневые конфиги (eslint, ts, vite) — только в своих зонах.
- Удалять файлы в `docs/_audit/` или `docs/_streams/`.
- Коммитить `dist/` или `node_modules/`.

---

## 12. Логи стримов

Каждый стрим может создавать в `docs/_streams/`:

- `decisions/<stream-id>.md` — принятые решения.
- `blocked/<stream-id>.md` — заблокированные пункты.
- `findings/<stream-id>.md` — находки вне scope.
- `done/<stream-id>.md` — финальный отчёт.

Эти файлы — **только append**. Не редактируй чужие записи.

---

## 13. Команды монорепо (для справки)

```bash
# Per-package (РАЗРЕШЕНО)
pnpm --filter @skygraph/core test
pnpm --filter @skygraph/react test
pnpm --filter @skygraph/react typecheck
pnpm --filter @skygraph/vue typecheck
pnpm --filter @skygraph/vue test
pnpm --filter @skygraph/vue build
pnpm --filter demo build
pnpm --filter demo-vue build
pnpm --filter demo-vue typecheck

# Глобальные (ЗАПРЕЩЕНО — race condition с другими стримами)
# pnpm typecheck
# pnpm build
# pnpm test
# pnpm install
# pnpm clean
# pnpm lint

# Аудит стилей (существует, можно вызывать)
pnpm audit:styles
pnpm check:styles
```

---

## 14. Реестр task-карт

### Волна 1 — `docs/_streams/wave-1/`
- `wave-1/T-CI.md`
- `wave-1/T-API.md`
- `wave-1/T-Size.md`
- `wave-1/T-Smoke.md`

### Волна 2 — `docs/_streams/`
- `T-Vue-Cleanup.md`
- `T-Vue-Misc.md`
- `T-Vue-Charts.md`
- `T-React-Cleanup.md` (включает finding `ae-unresolved-link` от T-API + MIGRATION.md)
- `T-React-I18n-Styles.md`
- `T-VueLayout.md`
- `T-VueDemo-Pages.md`
- `T-Quality.md`
- `T-Docs-Locales.md`
- `T-Codegen.md`
- `T-Polish.md` (Vue dts rollup + bundle budget guard + sideEffects)
- `T-Showcases-I18n.md` (локализация 12 показ-апп)
- `T-Table-Perf.md` (профайлинг Table)

### Волна 3 — `docs/_streams/wave-3/`
- `wave-3/CHARTER.md` (мини-конституция Волны 3)
- `wave-3/T-Vue-Demo-Foundation.md` (3.1 — фундамент)
- `wave-3/T-Vue-Demo-Forms.md` (3.2 / Tab A — 18 data-entry компонентов)
- `wave-3/T-Vue-Demo-Display.md` (3.2 / Tab B — 13 display компонентов)
- `wave-3/T-Vue-Demo-NavFeedback.md` (3.2 / Tab C — 12 nav+feedback компонентов)
- `wave-3/T-Vue-Demo-Complex.md` (3.2 / Tab D — 12 complex компонентов)
- `wave-3/T-Vue-Demo-StyleFixes.md` (3.2 / Tab E — фиксы регрессий)
- `wave-3/T-Vue-Demo-Wrappers-Parity.md` (3.3a — паритет демо-обёрток с React)
- `wave-3/T-Vue-Components-DOM-Parity.md` (3.3b — DOM-паритет компонентов `@skygraph/vue`)
- `wave-3/T-Diagram-Polish.md` (3.3c — полная доводка Diagram: router, DnD, парность)
- `wave-3/T-Vue-Demo-PostMigration-Audit.md` (3.3 — пост-QA после миграции)

### Волна 4 — `docs/_streams/wave-4/`
- `wave-4/CHARTER.md` (мини-конституция Волны 4)
- `wave-4/T-Angular-Foundation.md` (4.1 — фундамент Angular-адаптера, параллельно с 3.3a/b/c)
