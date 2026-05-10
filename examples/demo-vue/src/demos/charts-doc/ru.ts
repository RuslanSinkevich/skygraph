import type { ChartsDocStrings } from './en'

/** Russian translations — keys must mirror `chartsDocEn` exactly. */
export const chartsDocRu: ChartsDocStrings = {
  pageTitle: 'Charts',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbCharts: 'Charts',
  pageLead:
    'Лёгкие SVG-графики (LineChart / BarChart / AreaChart / PieChart) с осями, легендой, анимацией, печатью и экспортом в PNG. Темизация через Skygraph CSS-токены.',
  pageWhen1: 'Лёгкие KPI / sparkline / time-series без тяжёлых chart-библиотек.',
  pageWhen2: 'Визуальный слой дашборда; реактивность / drill-down — на уровне приложения.',
  pageWhen3: 'Темизация вместе с остальным UI через `--sg-color-*`.',

  demoLineTitle: 'Line chart',
  demoLineDesc: 'Две серии с маркерами и дефолтной палитрой Skygraph.',
  demoBarTitle: 'Bar chart',
  demoBarDesc: 'Группы баров по категории, нулевой baseline.',
  demoAreaTitle: 'Area chart (stacked)',
  demoAreaDesc: 'Стеком по дням. Stroke + fill с opacity 25%.',
  demoPieTitle: 'Pie / donut chart',
  demoPieDesc:
    'Сектора по часовой стрелке от 12 часов. `inner-radius > 0` превращает в donut (справа).',
  demoAxesTitle: 'Оси (xAxis / yAxis)',
  demoAxesDesc: 'Тики, формат меток, label, grid-lines.',
  demoLegendTitle: 'Расположение легенды',
  demoLegendDesc:
    'Встроенный `legend` рендерит снизу; для top / right / left используйте `<SgChartLegend>` снаружи + flexbox.',
  demoMultiSeriesTitle: 'Multi-series palette',
  demoMultiSeriesDesc: 'Пять серий, дефолтные токены палитры.',
  demoStackedTitle: 'Stacked vs pre-aggregated',
  demoStackedDesc:
    '`stacked` на AreaChart vs те же данные предагрегированные (cumulative sums).',
  demoAnimationsTitle: 'Анимации + Replay',
  demoAnimationsDesc:
    'CSS-анимация на маунт с custom duration. Replay меняет `:key`, чтобы перепроиграть.',
  demoRealtimeTitle: 'Realtime sliding window',
  demoRealtimeDesc: 'Окно 30 точек, тик каждые 500мс. Анимация выкл — иначе draw-in повторялся бы.',
  demoHoverActionsTitle: 'Hover-toolbar (Print / PNG / custom)',
  demoHoverActionsDesc:
    'Toolbar собран вокруг графика. Print — `chartRef.print()`; PNG — `downloadSvgAsPng()`.',
  demoContextMenuTitle: 'Context menu по сериям',
  demoContextMenuDesc:
    'Right-click по чипу серии — скрыть / показать или скопировать в CSV. Собирается на уровне демо.',
  demoResponsiveTitle: 'Responsive container',
  demoResponsiveDesc: 'Тяните угол чтобы изменить размер. SVG sizing держит точки на сетке.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Сбросить классы `sg-chart*` — приносите собственный дизайн вокруг голого SVG.',

  tableCommonApi: 'Общий API графиков',
  tableLineExtras: 'LineChart-доп',
  tableBarExtras: 'BarChart-доп',
  tableAreaExtras: 'AreaChart-доп',
  tablePieExtras: 'PieChart-доп',
  tableAxisApi: 'Опции осей',
  tableExposeApi: 'Методы ref',

  propCategories: 'Категории X-оси (string[] или number[])',
  propSeries: 'Серии данных (id, label, values, optional color)',
  propWidth: 'CSS-ширина',
  propHeight: 'Пиксельная высота',
  propPadding: 'Padding plot-области (число или [t,r,b,l])',
  propUnstyled: 'Сбросить sg-chart-классы',
  propClassName: 'Класс корня',
  propStyle: 'Inline-стиль корня',
  propLegend: 'Встроенная легенда снизу',
  propAnimate: 'Mount / data-change анимация. `false` — выкл, `{ duration }` — override',
  propXAxis: 'Объект опций X-оси (опц.)',
  propYAxis: 'Объект опций Y-оси (опц.)',
  propFileName: 'Базовое имя файла для `ref.print()` и экспортов',

  propMarkers: 'Маркеры в точках (LineChart)',
  propStrokeWidth: 'Толщина линии / контура (Line/Area)',

  propGroupGap: 'Зазор между группами (0..1 шага категории) — BarChart',
  propBarGap: 'Зазор между барами в группе (0..1 слота) — BarChart',

  propStacked: 'Стек серий поверх друг друга (cumulative) — AreaChart',
  propFillOpacity: 'Прозрачность заливки 0..1 (default 0.25) — AreaChart',

  propInnerRadius: 'Внутренний радиус donut (0..1 от outer)',
  propLabels: 'Подписи внутри секторов',

  propAxisTickCount: 'Количество тиков',
  propAxisTickFormatter: 'Форматтер меток тиков',
  propAxisLabel: 'Title оси',
  propAxisGridLines: 'Горизонтальные grid-линии (только Y)',

  exposePrint: 'Открыть browser print preview',
  exposeExportSvg: 'Сериализовать SVG в строку',
}
