import { chartsDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `chartsDocEn`, no extras.
 */
export const chartsDocRu: { [K in keyof typeof chartsDocEn]: string } = {
  pageTitle: 'Charts',
  pageLead:
    'SVG-графики (LineChart / BarChart / AreaChart / PieChart) с опциональными осями, легендой, анимациями, hover-крестом, brushing и печатью. Темизация — через CSS-токены SkyGraph.',
  pageWhen1:
    'Лёгкие визуализации (KPI, спарклайны, простые сравнения) без подключения сторонней chart-библиотеки.',
  pageWhen2:
    'Визуальный слой дашборда, где более богатая интерактивность (выделение, drill-down) живёт в вашем приложении.',
  pageWhen3:
    'Темизация графиков вместе с остальным UI через переопределение `--sg-color-primary`, `--sg-color-success` и т.п.',

  demoLineTitle: 'Линейный график',
  demoLineDesc: 'Две серии недельного трафика. Цвета серий — из дефолтной палитры SkyGraph.',
  demoBarTitle: 'Столбчатый график',
  demoBarDesc:
    'Группированные столбцы по кварталам. Базовая линия — ноль, отрицательные значения уйдут вниз.',
  demoAreaTitle: 'Area chart (stacked)',
  demoAreaDesc:
    'Стек дневного трафика по устройствам. Верхний штрих и заливка делят цвет серии (заливка с 25% прозрачности).',
  demoPieTitle: 'Pie / donut chart',
  demoPieDesc:
    'Сектора по часовой стрелке от 12 часов. Установите innerRadius > 0 для donut (справа). Отрицательные значения зажимаются в ноль.',

  demoAxesTitle: 'Оси (xAxis / yAxis)',
  demoAxesDesc:
    'Настраиваемое число тиков, форматтер тиков, заголовок оси и горизонтальные грид-линии. По умолчанию выключено — включается передачей prop.',
  demoLegendTitle: 'Размещение легенды',
  demoLegendDesc:
    'Встроенный prop `legend` рисует под SVG; для top / right / left композим `<ChartLegend>` снаружи через flexbox.',
  demoAnimationsTitle: 'Анимации + Replay',
  demoAnimationsDesc:
    'Pure-CSS анимация при mount / смене данных с настраиваемой длительностью. Кнопка Replay перемонтирует поддерево чарта, чтобы запустить анимацию заново.',
  demoCrosshairTitle: 'Crosshair-тултип',
  demoCrosshairDesc:
    'Вертикальная hover-направляющая с тултипом по сериям. `valueFormatter` форматирует числа как валюту.',
  demoBrushTitle: 'Brush (выбор диапазона)',
  demoBrushDesc:
    'Контролируемый brushing — drag внутри plot выделяет X-диапазон, двойной клик или Reset сбрасывают.',
  demoStackedTitle: 'Stacked и pre-aggregated',
  demoStackedDesc:
    'Prop `stacked` у AreaChart и те же данные с ручной pre-aggregation (cumulative sums) — визуально одинаково, оба варианта остаются композабельными.',
  demoMultiSeriesTitle: 'Multi-series — палитра',
  demoMultiSeriesDesc:
    'Пять серий используют токены дефолтной палитры — для смены темы переопределяй `--sg-color-*`, не правя сам график.',
  demoRealtimeTitle: 'Realtime sliding window',
  demoRealtimeDesc:
    'Окно из 30 точек сдвигается на тик каждые 500мс. Анимация выключена, чтобы draw-in не запускался на каждом обновлении.',
  demoHoverActionsTitle: 'Hover toolbar (Print / PNG / custom)',
  demoHoverActionsDesc:
    'Toolbar собирается вокруг чарта — Print дёргает `ref.print()`, PNG-экспорт сериализует SVG через canvas. Справа — пример custom actions.',
  demoContextMenuTitle: 'Context menu по сериям',
  demoContextMenuDesc:
    'Правый клик по чипу серии — скрыть её или скопировать значения как CSV. Сделано на уровне demo — chart остаётся примитивом.',
  demoResponsiveTitle: 'Responsive контейнер',
  demoResponsiveDesc:
    'Растяни правый нижний угол. Фикс SVG-сайзинга держит точки на сетке на любой ширине.',

  tableCommonApi: 'Общий API Chart',
  tableLineExtras: 'Дополнения LineChart',
  tableBarExtras: 'Дополнения BarChart',
  tableAreaExtras: 'Дополнения AreaChart',
  tableAxisApi: 'Опции оси',

  propCategories: 'Категории оси X (string[] или number[])',
  propSeries: 'Серии данных (id, label, values, опциональный color)',
  propWidth: 'CSS-ширина',
  propHeight: 'Высота в пикселях',
  propPadding: 'Отступы графика (одно число или [t,r,b,l])',
  propUnstyled: 'Убрать классы sg-chart',
  propClassName: 'className корневого SVG',
  propStyle: 'Inline-стиль корневого SVG',
  propLegend: 'Рендерить встроенную легенду под SVG',
  propAnimate: 'Анимация mount / смены данных. `false` — выкл, `{ duration }` — переопределить.',
  propXAxis: 'Объект опций оси X — если не передан, ось не рендерится',
  propYAxis: 'Объект опций оси Y — если не передан, ось не рендерится',
  propPrintable: 'Включает `ref.print()` и параметры popup-окна печати',
  propActions: 'Hover-тулбар с действиями (`true` для дефолтных или `ChartAction[]`)',
  propFileName: 'Базовое имя файла (без расширения) для экспортов SVG / PNG / печати',
  propOnSeriesContextMenu: 'Обработчик ПКМ по элементу серии (блокирует нативное меню)',
  propOnChartContextMenu: 'Обработчик ПКМ по плот-области (блокирует нативное меню)',

  propMarkers: 'Показать маркеры-точки в каждой точке',
  propStrokeWidth: 'Толщина линии в пикселях',
  propCrosshair: 'Hover-крест (`true` или `{ valueFormatter }`)',
  propBrush: 'Brushing (`true` или `ChartBrushConfig` для controlled-режима)',

  propGroupGap: 'Зазор между группами (0..1 от шага категории)',
  propBarGap: 'Зазор между столбцами внутри группы (0..1 от слота)',

  propStacked: 'Стекать серии друг над другом (накопительно)',
  propFillOpacity: 'Прозрачность заливки в 0..1 (дефолт 0.25)',

  propAxisTickCount: 'Количество тиков',
  propAxisTickFormatter: 'Форматтер подписей тиков',
  propAxisLabel: 'Опциональный заголовок оси',
  propAxisGridLines: 'Рисовать горизонтальные грид-линии (только Y)',
}
