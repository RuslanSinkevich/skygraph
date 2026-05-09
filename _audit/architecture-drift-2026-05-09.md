# Architecture Drift Audit — 2026-05-09

> Read-only обход `packages/core/` и `packages/styles/` против инвариантов из
> `ARCHITECTURE.md`, `docs/multi-framework.md`, `docs/styling-contract.md`.
> Никаких правок в коде не сделано — только этот отчёт.

## Summary

- **core**: PASS (с оговорками) — 6 findings (2 warn / 4 note).
- **styles**: PASS — 3 findings (3 note).
- Все три audit-скрипта зелёные. Все 388 unit-тестов `@skygraph/core` проходят (1 skipped).
- Дрейфа уровня "критическое нарушение контракта" не обнаружено. Есть документационный дрейф между `ARCHITECTURE.md` и реальным кодом (calendar появился, validation-engine исчез) и одна структурная несимметричность в `engines/virtual/`.

## Findings

| #  | Severity | Зона   | Файл:строка | Что не так | Цитата из доков |
|----|----------|--------|-------------|------------|-----------------|
| 1  | warn     | core   | `ARCHITECTURE.md` §1, диаграмма engines/ | В диаграмме перечислены `form / table / tree / virtual / graph / validation/`, но в коде `validation/`-engine отсутствует (вся валидация живёт внутри `engines/form/FormEngine.ts` + `middleware/validation.ts`). При этом фактический шестой движок — `calendar/` — в диаграмме не упомянут. Документ рассинхронизирован с реальностью. | ARCHITECTURE.md §1: «engines/ … validation/ — sync + async». В то же время `docs/multi-framework.md` §Foundations: «plus 6 engines (form, table, tree, virtual, graph, calendar)». |
| 2  | warn     | core   | `ARCHITECTURE.md` §1, таблица «Engine path namespaces»; `ARCHITECTURE.md` §8 файловая структура | В таблице зарезервированных префиксов перечислены только `form / table / tree / graph` (нет `calendar` → `$calendar.`). В §8 «Структура файлов» в `engines/` перечислены только `form / table / tree / virtual` — нет `graph/` и `calendar/`. Реальный код регистрирует `CALENDAR_PREFIX = '$calendar.'` и `GRAPH_PREFIX = '$graph.'` в `packages/core/src/engines/namespaces.ts`. | ARCHITECTURE.md §1: «Engine, который пишет в Core store под `$`-префиксом, обязан зарезервировать свой префикс через `reservePrefix(engineName, prefix)`». |
| 3  | warn     | core   | `packages/core/src/engines/virtual/index.ts` | Все 6 движков, кроме `virtual/`, следуют паттерну `index.ts + types.ts + {Name}Engine.ts`. У `virtual/` нет `types.ts` и нет отдельного `VirtualEngine.ts` — фабрика, типы и публичный API объединены в `index.ts`, рядом только `measure.ts`. Структура движков неединообразна. | ARCHITECTURE.md §1: «engines/ form/ — FormEngine, table/ — TableEngine, …». Подразумеваемая параллельная структура. Тестовый файл `subpath-exports.test.ts` явно опирается на эту параллель: `import { createVirtual } from '../engines/virtual/index'`. |
| 4  | note     | core   | `packages/core/src/runtime/Scheduler.ts:28-29` | Используется DOM-API `requestAnimationFrame` (вызов спрятан за `typeof requestAnimationFrame !== 'undefined'` с `queueMicrotask` fallback). Это не делает core зависимым от браузера, но тонкая утечка «browser-aware» логики в pure-TS ядре. | `docs/multi-framework.md` §Foundations: «`@skygraph/core` — pure TS, 0 deps». ARCHITECTURE.md §7: «Любой код, упоминающий … document.*, window.* — потенциальная утечка». `requestAnimationFrame` — globals того же класса. |
| 5  | note     | core   | `packages/core/src/middleware/persistence.ts:19,28,38` | `persistenceMiddleware` по умолчанию хватает `localStorage` через `typeof localStorage !== 'undefined'`. Опционально, но всё же DOM-aware default. | См. цитату для finding #4. |
| 6  | note     | core   | `packages/core/src/engines/virtual/measure.ts` (комментарий 6) | Комментарий явно ссылается на React-адаптер: «Подписки нужны React-адаптеру, чтобы перерисоваться, когда измерение строки изменилось». Сам код framework-agnostic, но комментарий завязывает дизайнерское обоснование на конкретный фреймворк, что противоречит формулировке «`@skygraph/core` не знает про React / Vue / Angular». | ARCHITECTURE.md §10: «`@skygraph/core` не знает про React / Vue / Angular». |
| 7  | note     | styles | `packages/styles/components/colorpicker.css:139,173` | Магические hex-цвета вне токен-системы: `border: 2px solid #fff;` — без `var(--sg-color-white, #fff)`-обёртки и без комментария-обоснования. Соседние строки (например `linear-gradient(... #f00 0%, #ff0 17%, #0f0 33%, ...)` в hue-полосе) — допустимы как «литерал спектра» (по сути сырая радуга для UI-пикера), но «белая обводка курсора» должна жить через токен. | `docs/styling-contract.md` §7: «Никаких … магических hex-цветов в компонентных CSS — только через токены (исключения документируются отдельно)». |
| 8  | note     | styles | `packages/styles/components/diagram.css`, `tree.css`, `datepicker.css`, `modal.css`, `pagination.css` (выборочно — см. §Audit script outputs) | По данным `audit-styles.mjs` 20 классов с `.sg-*` определены в CSS, но не используются ни одним adapter-ом и не генерируются template-литералом. Кандидаты на dead-code: `.sg-diagram-controls`, `.sg-diagram-minimap`, `.sg-diagram-toolbar`, `.sg-dp-footer-link`, `.sg-dp-time-cell` (+ `-active`), `.sg-modal-body-loading`, `.sg-no-print`, `.sg-pagination-item-active`, `.sg-tree-action-btn`, `.sg-tree-action-danger`, и весь блок `.sg-tree-indent-*` / `.sg-tree-switcher-*` / `.sg-tree-title*`. | Имплицитно: ни в одном документе не зафиксирован allowlist «только в CSS» — то есть dead-CSS считается дрейфом. Контракт `docs/styling-contract.md` §7.2 требует, чтобы для каждого «слота» был DOM-снапшот, а тут классы вообще не появляются в DOM. |
| 9  | note     | styles | `audit-styles.mjs` отчёт §2, список «Только в DOM» | 108 классов `sg-*` встречаются в DOM React-адаптера, но не имеют стилей в `@skygraph/styles`. Часть из них — модификаторы состояния, рассчитанные на наследование (`sg-list-item-hoverable`, `sg-collapse-panel-active`, `sg-radio-checked`, `sg-progress`), часть выглядит как полноценные слоты без CSS-определения (`sg-datagrid-body`, `sg-datagrid-loading`, `sg-datagrid-header-cell--asc/--desc/--drag-over`, `sg-datagrid-row--even/--odd/--selected/--hoverable`, `sg-datagrid-summary*`, `sg-gantt-arrow`, `sg-input-number-plus/-minus`, `sg-field-feedback*`, `sg-field-warning`, `sg-field-has-warning`, `sg-list-virtual-container`, `sg-tree-node-leaf/-expanded/-show-line/-block/-directory`). Это потенциальный дрейф «слот заявлен в DOM, не задокументирован в `styling-contract.md`, не покрыт стилями» — либо реализация ушла вперёд, либо CSS-пакет отстал. | `docs/styling-contract.md` §3.2: «У каждого компонента зафиксирован корневой класс и набор классов-слотов» и §7.2: «Для каждого компонента из раздела 4 существует снапшот-тест, проверяющий наличие в DOM заявленных слотовых классов». |

### Чисто и без findings

- `@skygraph/core/package.json`: 0 runtime-`dependencies`, 0 `peerDependencies`. Только `devDependencies` (vitest / tsup / typescript / rimraf / cross-env / coverage). Соответствует «pure TS, 0 deps».
- `@skygraph/styles/package.json`: ни `dependencies`, ни `peerDependencies`, `sideEffects: ["*.css"]`. Чистый CSS-пакет.
- `runtime/` → `engines/` импортов нет (`grep` по `packages/core/src/runtime` на `from '../engines/`).
- Кросс-импортов между движками нет (`grep` по `packages/core/src/engines` на относительные пути соседних engine-папок).
- Ни одного `import` из `react`, `vue`, `@angular/*`, `rxjs` в `packages/core/src` (`grep` по `^import .* from ['"](react|vue|@angular|rxjs)`).
- Ни одного использования `useState / useEffect / useMemo / useRef / useCallback / React.` в `packages/core/src`. `computed(` встречается только как часть собственного Core API (`core.computed(target, deps, fn)`), не Vue-`computed()`.
- Subpath exports в `packages/core/package.json#exports` (`./form ./table ./tree ./virtual ./graph ./calendar ./runtime-internal`) полностью совпадают с `entry`-полем `tsup.config.ts`. Тест `subpath-exports.test.ts` смокает каждую точку входа и проходит.
- `engines/namespaces.ts` регистрирует все 5 нужных префиксов (`$meta. $table. $tree. $graph. $calendar.`) без коллизий — virtual работает в памяти и Core-store не пишет, поэтому префикс не нужен.
- В `packages/styles/**/*.css` нет ни одного классового селектора без префикса `.sg-` (проверено `grep "^\.[a-z]" *.css` — все 1046 совпадений начинаются с `.sg-`).
- Все 91 уникальное имя `var(--sg-*)`, использованное в компонентных CSS, объявлено в `tokens.css` (см. `check-tokens.mjs`).
- Все `!important` строго в allowlisted-местах: `transitions.css` (a11y, `prefers-reduced-motion`), `print.css` и блоки `@media print` в `table.css`, `prefers-reduced-motion` в `charts.css`. Каждая запись задокументирована прямо в `scripts/check-no-important.mjs`.
- Тема через `data-sg-theme="light|dark"` соблюдена: переключение цветов идёт через семантические токены в `tokens.css`, темы лежат в `themes/default.css` и `themes/dark.css`, ни один компонентный CSS не хардкодит `[data-sg-theme="dark"]` своими `--sg-*`-перекрытиями.

## Audit script outputs

### scripts/check-tokens.mjs

```
check-tokens: OK (91 tokens, 70 files)
```

### scripts/check-no-important.mjs

```
check-no-important: OK (71 files)
```

### scripts/audit-styles.mjs

Скрипт пишет полный отчёт в `docs/_audit/styling-audit.md`. Цифры (на 2026-05-09):

```
1. Токены
   - tokens.css объявляет:                     91 имён
   - Компонентные CSS используют «чужие»:       0
   - Магические hex-значения (всего uniq):      8
       #000  → packages/styles/print.css
       #00f  → colorpicker.css   (hue spectrum)
       #0f0  → colorpicker.css   (hue spectrum)
       #0ff  → colorpicker.css   (hue spectrum)
       #f00  → colorpicker.css   (hue spectrum)
       #f0f  → colorpicker.css   (hue spectrum)
       #ff0  → colorpicker.css   (hue spectrum)
       #fff  → avatar/badge/colorpicker/menu/pagination/steps/print
                (в большинстве — fallback внутри `var(--sg-color-white, #fff)`,
                кроме colorpicker.css:139,173 — прямой hex)

2. Классы .sg-*
   - Определено в CSS:                       1046
   - Использовано строк-классов в DOM:        894
   - Совпадают:                               786
   - Только в CSS, runtime transitions:        41 (исключены)
   - Только в CSS, template literals в коде:  199 (исключены)
   - Только в CSS, **возможно мёртвый код**:   20  ← см. finding #8
   - Только в DOM (нет стилей):               108  ← см. finding #9
   - Template-prefix'ов в JS:                  70
```

### pnpm --filter @skygraph/core test

```
 Test Files  14 passed (14)
      Tests  388 passed | 1 skipped (389)
   Duration  1.71s
```

Все файлы:

- `core.test.ts` — 20 ✓
- `subpath-exports.test.ts` — 11 ✓
- `typed.test.ts` — 5 ✓
- `middleware.test.ts` — 17 ✓
- `history.test.ts` — 15 ✓
- `form.test.ts` — 19 ✓
- `form-extended.test.ts` — 28 ✓
- `table.test.ts` — 61 ✓ (1 skipped)
- `table-extended.test.ts` — 27 ✓
- `tree.test.ts` — 45 ✓
- `virtual.test.ts` — 29 ✓
- `graph.test.ts` — 69 ✓
- `calendar.test.ts` — 35 ✓
- `benchmark.test.ts` — 8 ✓ (10k set: 15.0ms, 10k get: 1.8ms; 1000 register/setValue/validate ≤ ~23ms)

## Recommendations

В порядке убывания пользы:

1. **Подровнять `ARCHITECTURE.md` под реальность кода** (findings #1, #2):
   - в §1 диаграмме `engines/` убрать `validation/`, добавить `calendar/`;
   - в §1 таблице зарезервированных префиксов добавить `calendar → $calendar.`;
   - в §8 файловой структуре добавить `engines/graph/` и `engines/calendar/`.
2. **Привести `engines/virtual/` к общему паттерну** (finding #3): выделить `types.ts` (`VirtualEngine`, `VirtualRange`, `VirtualItem`, `VirtualEngineOptions`, `VirtualEngineEvent`, `VirtualEngineListener`) и `VirtualEngine.ts` (фабрика `createVirtual`). `index.ts` оставить barrel'ом, `measure.ts` не трогать. Это ничего не сломает (барель уже единственная точка входа), но снимет «странность» при чтении кода.
3. **Дописать DOC-комментарии у DOM-aware кода в core** (findings #4, #5, #6): явно зафиксировать «`requestAnimationFrame` / `localStorage` — best-effort default, гасится в SSR через `typeof undefined`», убрать упоминание React из `engines/virtual/measure.ts` (заменить на «адаптер»). Это не код-фикс, а маркировка контракта.
4. **Прочистить dead-CSS** (finding #8): по 20 кандидатам пройти один раз вручную (`rg -F '.sg-diagram-controls' packages/`) — те, что действительно не использует ни один adapter, удалить или поставить `/* @public-token: explicitly exposed for unstyled overrides */` если оставлены сознательно.
5. **Аудит «слотов без CSS»** (finding #9): по 108 DOM-only классам построить таблицу `class → component → намеренно ли пуст`. Часть из них (`sg-datagrid-body`, `sg-datagrid-summary*`, `sg-field-feedback*`, `sg-tree-node-leaf/-expanded`) — серьёзные кандидаты на «слот без визуального дефолта», их нужно либо одеть в стили, либо явно зафиксировать в `styling-contract.md` §4 как «опубликованный hook без визуала».
6. **Точечно убрать магический `#fff`** в `colorpicker.css:139,173` — заменить на `var(--sg-color-white, #fff)` или ввести `--sg-colorpicker-cursor-border` со значением `var(--sg-color-white, #fff)`. Hue-спектр (`#f00 → #ff0 → ...`) трогать не надо — это литерал «радуги», не тема.

Если ничего из этого не делается — критичного дрейфа всё равно нет, инварианты «0 deps / framework-agnostic / 3-слойные токены / .sg-*-префикс / data-sg-theme / pipeline / неизменяемые сигнатуры» соблюдены.
