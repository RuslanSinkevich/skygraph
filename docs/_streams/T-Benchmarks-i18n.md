# Stream T-Benchmarks-i18n — Localise the React Benchmarks page

> Маленький автономный стрим. Локализует `/#/benchmarks` (хаб) и три
> вложенных страницы бенчмарков (`/#/benchmarks/{table,tree,chart}`),
> плюс `SingleBenchmarkPage` в `App.tsx`. Не пересекается ни с
> T-Vue-Parity, ни с T-Angular-Parity — те стримы работают в
> `examples/demo-vue/**` / `examples/demo-angular/**`.

---

## 0. Контекст и установки от владельца

- `http://localhost:5174/skygraph/#/benchmarks` сейчас полностью
  хардкожен по-английски.
- Стрим можно запускать **параллельно** другим — зоны не
  пересекаются (см. §2).
- Локализация — обе локали `en/ru`, ключи добавляются в существующий
  `DemoDict` (`examples/demo/src/i18n/types.ts`).

---

## 1. Что локализуем (по фактам)

### 1.1. `examples/demo/src/pages/Benchmarks/BenchmarksPage.tsx`

- Заголовок страницы: `SkyGraph runtime benchmarks`.
- Lead-параграф (несколько предложений про методологию).
- 3 disclaimer-блока (`Honest reporting.`, `Browser-only.`,
  `Trigger-based.`).
- Tab definitions (`TABS[]`):
  - `Table · 100k rows` / `Mount + scroll FPS + heap delta` /
    `vs antd <Table virtual>`,
  - `Form · 100 fields` / `Mount + per-change + submit bytes` /
    `vs react-hook-form + plain inputs`,
  - `LineChart · 1k×60` / `Median frame time + avg FPS` /
    `vs recharts <LineChart>`.
- `role="tablist"` — служебное, **не** локализуем.
- Секция «How to read these numbers» — `<h2>` + 4 пункта `<li>`
  («Median, not mean.», «Same dataset, same dom host.»,
  «Single-threaded numbers.», «Mount uses `flushSync`.»).

### 1.2. `examples/demo/src/App.tsx → SingleBenchmarkPage`

Используется на роутах `benchmarks/table`, `benchmarks/tree`,
`benchmarks/chart`. Хардкожены:
- Кнопка «← All benchmarks» (`bench-btn`).
- Per-route `title` / `subtitle`:
  - `Table benchmark` / `SkyGraph <Table> vs antd <Table virtual>`,
  - `Tree benchmark` / `SkyGraph <Tree> vs antd <Tree height>`,
  - `Chart benchmark` / `SkyGraph <BarChart> vs recharts <BarChart>`.

Названия библиотек, в т.ч. `antd`, `recharts`, `react-hook-form` и
имена `<Table>`/`<Tree>` — **не локализуем** (как технические
идентификаторы в духе CHARTER §8).

### 1.3. `examples/demo/src/demos/benchmarks/*Benchmark.tsx`

Пять файлов, ~350-450 строк каждый. Хардкожены:

- Заголовки колонок таблицы результатов (`Library`, `Median`, `Min`,
  `Max`, `Runs`).
- Кнопки управления (`Run`, `Run again`, `Reset`, `Abort`).
- Статусы (`Warming up...`, `Running...`, `Done`, `Aborted`,
  `Failed`).
- Подписи методологии под графиками («Lower is better», «Higher is
  better», «Heap delta available in Chromium only.»).
- Заголовки секций внутри страницы бенчмарка («Mount cost», «Scroll
  FPS», «Heap delta», «Per-change time», «Submit serialization
  bytes», «Median frame time», «Average FPS»).
- Подписи в FormBenchmark — `Label N`, `Placeholder N` — это
  технические шаблоны для 100 одинаковых полей; **локализовать
  не нужно**, это часть тестового сценария (нагрузка одинаковая
  для обеих библиотек, перевод метку не нагружает).
- Имена вариантов в таблице — `SkyGraph`, `antd`, `recharts`,
  `react-hook-form` — **не** локализуем (бренды).

Точный перечень кнопок и статусов — снять при работе через
`Grep`-проход по `examples/demo/src/demos/benchmarks/*.tsx`. Все
повторяющиеся ключи свести в одну группу (см. §3.2).

---

## 2. Зона стрима

**Можно**:
- `examples/demo/src/pages/Benchmarks/**` — `BenchmarksPage.tsx`,
  `benchmarks.css` **не трогать** (только разметка/тексты).
- `examples/demo/src/demos/benchmarks/**` — пять Benchmark-компонентов
  + `benchUtils.ts` (внутри `benchUtils.ts` строк UI **нет**, файл
  не правим, упомянуто для полноты).
- `examples/demo/src/App.tsx` — только функция `SingleBenchmarkPage` и
  её 3 instantiations (title/subtitle/back-кнопка).
- `examples/demo/src/i18n/types.ts` — добавить новую ветку
  `benchmarks` в `DemoDict` (см. §3.1).
- `examples/demo/src/i18n/dict-en.ts`, `dict-ru.ts` — соответствующие
  ключи.

**Нельзя**:
- `examples/demo-vue/**`, `examples/demo-angular/**` — другие стримы.
- `examples/_shared/**` — `showcasesLocale.ts` тут ни при чём.
- `packages/**`.
- Глобальные конфиги, vite.config, eslint и пр.
- CSS — `benchmarks.css` менять не надо, у локализации нет
  влияния на стили.

---

## 3. Поэтапный план

### 3.1. Добавить ветку `benchmarks` в `DemoDict` (P0)

`examples/demo/src/i18n/types.ts` — добавить:

```ts
benchmarks: {
  // Hub page
  pageTitle: string
  pageLead: string
  disclaimerHonestTitle: string
  disclaimerHonestBody: string
  disclaimerBrowserTitle: string
  disclaimerBrowserBody: string
  disclaimerTriggerTitle: string
  disclaimerTriggerBody: string

  // Tabs (3)
  tabTableLabel: string;    tabTableSub: string;    tabTableVs: string
  tabFormLabel: string;     tabFormSub: string;     tabFormVs: string
  tabChartLabel: string;    tabChartSub: string;    tabChartVs: string

  // "How to read these numbers"
  methodHeading: string
  method1: string
  method2: string
  method3: string
  method4: string

  // SingleBenchmarkPage
  backToAll: string
  singleTableTitle: string;  singleTableSubtitle: string
  singleTreeTitle: string;   singleTreeSubtitle: string
  singleChartTitle: string;  singleChartSubtitle: string

  // Shared controls / statuses (re-used by all 5 Benchmark widgets)
  runBtn: string
  runAgainBtn: string
  resetBtn: string
  abortBtn: string
  statusIdle: string
  statusWarmup: string
  statusRunning: string
  statusDone: string
  statusAborted: string
  statusFailed: string

  // Result tables
  colLibrary: string
  colMedian: string
  colMin: string
  colMax: string
  colRuns: string

  // Methodology notes
  noteLowerBetter: string
  noteHigherBetter: string
  noteHeapChromium: string

  // Section headings inside per-benchmark pages
  sectionMount: string
  sectionScrollFps: string
  sectionHeapDelta: string
  sectionPerChange: string
  sectionSubmitBytes: string
  sectionFrameTime: string
  sectionAvgFps: string
}
```

Имена ключей не финальные — финализировать при работе, но **набор
групп фиксированный**: hub / tabs / method / single / controls /
status / table-columns / notes / sections. Это упрощает обзор и
сравнение en/ru.

### 3.2. Заполнить `dict-en.ts` и `dict-ru.ts` (P0)

Дословный перенос английского текста + аккуратный русский. Стиль RU
— как в существующих ключах (`benchmarks: 'Бенчмарки'`,
`statShowcases: 'Шоукейсы'` и т.п.).

Ориентиры по RU:
- `pageTitle`: `Бенчмарки SkyGraph во время выполнения`.
- `pageLead`: «Параллельное сравнение с распространёнными React-
  библиотеками на одних и тех же данных, в одной и той же вкладке
  браузера. Никаких микробенчмарков: каждый тест монтирует реальное
  дерево компонентов, измеряет через `performance.now()` +
  `requestAnimationFrame`, берёт медиану нескольких запусков после
  отброшенного прогрева.»
- `runBtn`: `Запустить`. `runAgainBtn`: `Запустить ещё раз`.
- `resetBtn`: `Сбросить`. `abortBtn`: `Прервать`.
- `statusWarmup`: `Прогрев…`. `statusRunning`: `Выполняется…`.
  `statusDone`: `Готово`. `statusAborted`: `Прервано`.
  `statusFailed`: `Ошибка`.
- `colLibrary`: `Библиотека`. `colMedian`: `Медиана`.
  `colMin`: `Мин`. `colMax`: `Макс`. `colRuns`: `Запусков`.
- `noteLowerBetter`: `Меньше — лучше`. `noteHigherBetter`:
  `Больше — лучше`. `noteHeapChromium`: `Heap-метрика доступна
  только в Chromium.`
- `backToAll`: `← Все бенчмарки`.
- Заголовки секций (`sectionMount`, ...): краткие глагольные ru-формы
  (`Стоимость монтирования`, `FPS при прокрутке`, `Дельта heap`,
  `Время на изменение`, `Объём сериализации submit`,
  `Медианное время кадра`, `Средний FPS`).
- Methodology bullets — переводить близко к смыслу, не
  буквально (английский там в стиле buzz-bullet).

### 3.3. Применить локализацию в `BenchmarksPage.tsx` (P0)

```tsx
const { t } = useI18n()
const b = t.benchmarks

const TABS: TabDef[] = useMemo(() => [
  { key: 'table',  label: b.tabTableLabel,  subtitle: b.tabTableSub,  competitor: b.tabTableVs },
  { key: 'form',   label: b.tabFormLabel,   subtitle: b.tabFormSub,   competitor: b.tabFormVs },
  { key: 'chart',  label: b.tabChartLabel,  subtitle: b.tabChartSub,  competitor: b.tabChartVs },
], [b])
```

`useMemo([b])` — переключение языка триггерит пересборку.

В разметке заменить:
- `<h1>SkyGraph runtime benchmarks</h1>` → `{b.pageTitle}`.
- `<p>...</p>` lead → `{b.pageLead}` (с inline `<code>` оставленными
  как литералы).
- Три disclaimer-`<div>` → `b.disclaimer*Title` + `b.disclaimer*Body`.
- `<h2>How to read these numbers</h2>` → `{b.methodHeading}` + 4 пункта.

### 3.4. Применить локализацию в `App.tsx → SingleBenchmarkPage` (P0)

`SingleBenchmarkPage` — внутренний компонент `App.tsx`. Передавать
ему `title`/`subtitle`/`back` через пропсы из локализованных строк:

```tsx
if (route === 'benchmarks/table') {
  return (p) => (
    <SingleBenchmarkPage
      title={t.benchmarks.singleTableTitle}
      subtitle={t.benchmarks.singleTableSubtitle}
      backLabel={t.benchmarks.backToAll}
      onBack={() => p.onNavigate('benchmarks')}
    >
      <TableBenchmark />
    </SingleBenchmarkPage>
  )
}
```

Внутри `SingleBenchmarkPage` хардкоженый `← All benchmarks` →
`{backLabel}`.

### 3.5. Локализовать 5 Benchmark-компонентов (P1)

Файлы:
- `TableBenchmark.tsx`
- `FormBenchmark.tsx`
- `LineChartBenchmark.tsx`
- `ChartBenchmark.tsx`
- `TreeBenchmark.tsx`

Шаблон:

```tsx
import { useI18n } from '../../i18n'

export function TableBenchmark() {
  const { t } = useI18n()
  const b = t.benchmarks
  ...
  <button>{b.runBtn}</button>
  ...
  <th>{b.colLibrary}</th>
  ...
  <p className="bench-note">{b.noteLowerBetter}</p>
}
```

Если внутри Benchmark-компонента встретится строка, которая
**уникальна** (не попадает в shared-ключи) — её добавить в `DemoDict
.benchmarks` отдельным ключом и параллельно в обе локали.

### 3.6. Финальный проход (P0)

1. `Grep "= '..."` по `benchmarks/` и `BenchmarksPage.tsx` —
   убедиться что не осталось английских строк (кроме брендов /
   технических токенов).
2. Запустить `pnpm --filter demo dev`, переключиться на ru/en на
   `/#/benchmarks`, `/#/benchmarks/table`, `/#/benchmarks/tree`,
   `/#/benchmarks/chart`. Проверить:
   - Hub: заголовок, lead, 3 disclaimer, 3 tab, 4 bullet.
   - Single-page: «← Все бенчмарки», title/subtitle.
   - Внутри бенчмарка: кнопки Run/Reset/Abort, статусы, колонки
     таблицы, секционные заголовки, методологические заметки.
3. Прогон бенчмарка (нажать Run) — убедиться что переключатель ru/en
   не сбрасывает прогресс и не ломает рендер.

---

## 4. Acceptance

1. `pnpm --filter demo typecheck` — зелёный.
2. `pnpm --filter demo build` — зелёный.
3. На `/#/benchmarks` + всех 3 sub-routes:
   - переключатель ru/en меняет 100% UI-текста, кроме брендов,
     технических токенов и численных значений;
   - набор ключей в `dict-en` и `dict-ru` идентичен (одинаковый
     тип `DemoDict.benchmarks`).
4. Visual regression: разметка не сломана (никаких пустых
   `{undefined}`).
5. Никаких изменений в `examples/demo-vue/**`,
   `examples/demo-angular/**`, `packages/**`,
   `examples/_shared/**`.

---

## 5. Команды

```bash
pnpm --filter demo typecheck
pnpm --filter demo build
pnpm --filter demo dev
```

Глобальные `pnpm typecheck/build/test/install/clean/lint` — НЕЛЬЗЯ
(CHARTER §2.2).

---

## 6. Финал

Отчёт — `docs/_streams/done/T-Benchmarks-i18n.md`:
- список изменённых файлов;
- скриншоты ru/en для `/benchmarks` и одного `/benchmarks/<sub>`;
- если что-то намеренно оставили на английском (бренды, токены) —
  список с обоснованием.
