# TODO от стримов — отложенные задачи

> Сюда попадают задачи, которые в текущем стриме отложены по правилу "минимальный скоуп".
> Каждая запись — кандидат в будущий стрим или мини-стрим.

---

## От Стрима 2 (i18n demo) — найденные существующие проблемы (не от моих правок)

- **`packages/react/src/components/complex/SchemaForm.tsx:75`** — `react-hooks/rules-of-hooks` ошибка: `useConfig` вызван условно. Существовало до Стрима 2. Кандидат в мини-стрим cleanup или в Стрим 9.
- **`packages/react/src/components/ui/TagInput.tsx:90`** — `prefer-const` ошибка: `next` никогда не переприсваивается. Существовало до Стрима 2.
- **`packages/react/src/components/complex/Table/Table.tsx:87`** — warning `react-hooks/exhaustive-deps` про `rowNumConfig`.
- **`packages/react/src/components/complex/Tree/Tree.tsx:420`** — warning про missing deps в useCallback.
- **`packages/react/src/components/ui/DatePicker.tsx:980`** — warning unused eslint-disable directive.
- **TS-ошибки в demo**, существовавшие до стрима (в файлах из git status как `M`/`MM`/`AM`):
  - `CollapseDemo.tsx`, `ProgressDemo.tsx`, `ResultDemo.tsx` — `'required'` не существует в `PropDef`. Видимо, тип `PropDef` менялся, а демо не обновили.
  - `config-provider/Locale.demo.tsx`, `datepicker/RussianLocale.demo.tsx` — пытаются импортировать `en_US`/`ru_RU` из `@skygraph/react`, но они не экспортированы (хотя в `packages/react/src/index.ts` строка 19 их экспортирует! — ❓ возможно `dist/` устарел).
  - `descriptions/data.ts`, `timeline/data.ts` — пытаются импортировать `DescriptionsItem`/`TimelineItem`, не экспортированные.
  - `steps/data.ts` — `StepItem` declared locally, but not exported.
  - `Modal` — отсутствует prop `onOk` (видимо переименован).
  - `Tabs` — отсутствует prop `type`.
  - `config-provider/Bordered.demo.tsx` — `id: number` несовместим с `id: string` в `Record<string, unknown>` контракте.

Всё это нужно почистить в **отдельном мини-стриме «починить уже сломанный demo build»** или в Стрим 4 (рефакторинг showcases).

## От Стрима 2 (i18n demo)

- **Локализация отдельных demo-страниц.** В `examples/demo/src/demos/` ~480 файлов с хардкодными английскими строками (заголовки `ComponentDoc`, описания `whenToUse`, hint'ы `DemoBox`, описания `PropsTable`/`CssVarsTable`). В Стрим 2 сделана только инфраструктура + локализация шапки/меню/Overview. Оставшиеся страницы — серия мини-стримов:
  - Мини-стрим 2a: главные `*Page.tsx` (StylingShowcasePage, DesignTokensPage, GettingStartedPage, ThemingPage, CoreApiPage, ConfigProviderDemo).
  - Мини-стрим 2b: страницы Form (FormDemo, FormComponentsDemo, ConfigProvider locale demo).
  - Мини-стрим 2c: страницы Table / Tree / List / DataGrid.
  - Мини-стрим 2d: остальные XxxDemo.tsx (40+).
  - Мини-стрим 2e: маленькие `<comp>/<Variant>.demo.tsx` (~440 файлов — описания внутри маленьких демо обычно очень короткие, можно проходом).
- **`PropsTable` и `CssVarsTable`** — компоненты в `examples/demo/src/components/`. У них есть фиксированные строки заголовков, кнопок, ariaLabels — добавить их ключи в `DemoDict` (мини-стрим 2a).
- **`examples/showcases/`** — отдельная задача, попадает в Стрим 4 (рефакторинг showcases). Локализация showcases там же.
- **`@skygraph/react/locales/en_US.ts` и `ru_RU.ts`** — это локали **самой библиотеки** (не demo). Можно подключить их вместе с `ConfigProvider locale={ru_RU}` при выборе языка. Пока не реализовано — записан как кандидат для следующего мини-стрима.

## От Стрима 1 (Аудит)

### Архитектура

- **`runtime-internal.ts` не используется.** Публичный entrypoint для авторов кастомных engines, но ни встроенные engines (form/table/tree/virtual), ни `@skygraph/react` его не импортируют. Решить: оставить как surface для GraphEngine (Стрим 5), либо убрать как dead surface area.
- **`examples/` исключены из ESLint.** В `eslint.config.js` стоит `ignores: ['examples/']`. Демо может бесконтрольно импортировать внутренности. Кандидат: добавить отдельную конфигурацию для examples с базовыми правилами.

### Документация и публичный API

- **Числа в README устарели.** UI 44 → 50, complex 11 → 16, total 55+ → 66, CSS 49 → 56, тесты 428 → 497. Обновить в Стриме 9.
- **`docs/status.md` устарел сильно** (2026-04-06). Содержит ложное утверждение «нет тестов TreeEngine» (есть). Обновить или пометить archived в Стриме 9.
- **Расхождение CI vs локальная ветка.** CI триггерится на `main`, локально `master`. Проверить состояние удалённого репо, унифицировать.
- **Дубль lockfile.** В корне `package-lock.json` + `pnpm-lock.yaml`. Удалить `package-lock.json`, добавить в `.gitignore`.

### Зависимости и инфраструктура

- **Дубль workspace декларации.** Корневой `package.json` имеет `"workspaces": ["packages/*"]` (npm), плюс `pnpm-workspace.yaml`. Удалить npm-вариант или подтвердить намерение оставить.
- **Examples вне workspace.** `examples/demo` и `examples/showcases` подключают core/react через `file:../../packages/...`. Решить: расширить `pnpm-workspace.yaml` до `examples/*` + использовать `workspace:*`, или оставить `file:` намеренно.
- **React 18 vs React 19.** `packages/react` тестируется на R18 (devDep `^18.0.0`), demo/showcases используют R19. Добавить вторую матрицу тестов на R19 ИЛИ обновить devDep.
- **Удалить `package-lock.json`** в корне (атавизм npm). Добавить в `.gitignore` ИЛИ git rm и закоммитить.
- **`audit:styles` не запускается в CI.** Добавить как шаг проверки (фейлить если изменился `_audit/styling-audit.md`).
- **`format` и `lint` в root скриптах не покрывают `examples/`.** Расширить до `examples/**` или добавить отдельные команды.
- **CI не имеет coverage step.** Добавить вместе с настройкой coverage в Стрим 10.
- **Subpaths `table/tree/virtual` отсутствуют в `core/tsup.config.ts`** как entrypoints. Только `index`, `form`, `runtime-internal`. Если хочется отдельный путь `@skygraph/core/table` (как в react) — добавить.

### Стилевой контракт

- **228 dead-классов в CSS.** Сгенерированы по старым паттернам именования (`.sg-button-large`, `.sg-table-large`, `.sg-form-vertical`, ...). Часть из них — transitions (используются динамически при анимации). Большая часть — legacy. Кандидат на чистку в мини-стриме после Стрима 7.
- **124 класса в DOM без CSS** (`sg-btn`, `sg-btn-primary`, `sg-datagrid-*`, `sg-tree-select-*`, `sg-field-feedback-*`, ...). Решить: добавить стили или удалить из JSX.
- **Магический `#ff4d4f` в `form.css`** — заменить на `var(--sg-red-5)` или `var(--sg-color-error)`.
- **Магический `#fff` в 6 файлах** (avatar, badge, colorpicker, menu, pagination, steps) — заменить на `var(--sg-gray-1)` или `var(--sg-color-bg)`. Критично для dark theme.
- **`themes/default.css` и `themes/dark.css` — пустые `@import '../tokens.css'`.** Подключение `dark.css` даёт оба theme-селектора, что вводит пользователя в заблуждение. Решить: либо удалить эти файлы, либо вынести в них только соответствующие селекторы темы.
- **`audit:styles` не интегрирован в CI.** Кандидат: запускать в CI с проверкой что `_audit/styling-audit.md` не изменился, либо в pre-commit.

### a11y и локализация

- **Нет автоматических a11y-тестов.** Кандидат: добавить `@axe-core/react` или `jest-axe` в `packages/react/devDependencies`, написать `a11y.test.tsx` с проверкой основных компонентов. Сделать в Стрим 3.
- **Гибридная локализация.** Часть компонентов через `ConfigProvider.locale` (Empty, Pagination, Modal, Form, Upload, Transfer, Calendar, Popconfirm), часть через локальный `locale={...}` проп (Table, Tree, DataGrid). Не баг, но кандидат на унификацию или явное документирование. Стрим 9.
- **Компоненты без локалей в `SgLocale`:** `TreeSelect`, `Cascader`, `Mentions`, `AutoComplete`, `ColorPicker`, `Steps`, `Carousel`, `Result`, `Tabs`, `Drawer`, `Notification`, `Dropdown`, `Menu`, `Breadcrumb`. Если они используют локали — добавить в SgLocale в Стрим 2.
- **Минорные пробелы a11y по beglyму обзору** (требует ручной проверки в Стрим 3): `Carousel`, `Slider` (мало `aria-value*`), `Switch` (нет явного `role="switch"`), `Mentions` (нет `role="combobox"`), `Segmented` (нет radiogroup), `Cascader` (нет упоминаний), `Empty` (без aria), `VirtualList` (не нашёл).

### Дубли и путаница в публичном API

- ❌ **TreeSelect — два разных компонента под одним именем.** `import from '@skygraph/react'` даёт UI-версию, `import from '@skygraph/react/tree'` — complex-версию. Серьёзный баг публичного API. Решить: какая основная, удалить вторую. **Отдельный мини-стрим вне основной очереди.**
- ❌ **`complex/Transfer/` — мёртвый код.** Не экспортируется ни из одного entrypoint, используется только в тестах. Решить: удалить или вернуть в API.
- ⚠ **`ui/Calendar.tsx` — реэкспорт от complex.** Нарушает идею "ui без core" косвенно (через реэкспорт компонента, использующего core). Не баг, но кандидат на унификацию.

### Тесты

- **README пишет 428 тестов, фактически 497.** Цифры устарели. Обновить в Стриме 9 (документация).
- **Coverage не настроен.** Ни в `packages/core`, ни в `packages/react` нет конфига coverage и нет `@vitest/coverage-*` в devDependencies. Невозможно посчитать % покрытия. Решить: добавить coverage в Стрим 10 (бенчмарки/перфоманс).
- **`table.test.ts > scalability > 100k rows` занимает 11 секунд.** Замедляет dev-цикл и CI. Кандидат: вынести в отдельный slow-набор (`*.bench.test.ts` с условным `describe.skip` или флагом `RUN_BENCH=1`).
- **`packages/core` не имеет своего `vitest.config.ts`.** Работает на дефолтах. Не критично, но если потребуется setup или coverage — придётся создавать.
- **TableEngine sort/filter на 100k строках медленные** (6.6s / 3.1s). Кандидат на оптимизацию в Стрим 6 (Table pro).
- **Косвенное покрытие `runtime/CycleDetector` и `runtime/SubscriptionEngine`.** Тестируются через `core.test.ts` транзитивно. Прямые unit-тесты этих модулей отсутствуют — кандидат на расширение тестов.

---
