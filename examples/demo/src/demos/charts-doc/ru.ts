import { chartsDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `chartsDocEn`, no extras.
 */
export const chartsDocRu: { [K in keyof typeof chartsDocEn]: string } = {
  pageTitle: 'Charts',
  pageLead:
    'Минимальные SVG-графики (v0): LineChart и BarChart. В этой версии без осей, тултипа и анимаций — только чистые примитивы, уважающие CSS-токены SkyGraph.',
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

  tableCommonApi: 'Общий API Chart',
  tableLineExtras: 'Дополнения LineChart',
  tableBarExtras: 'Дополнения BarChart',

  propCategories: 'Категории оси X (string[] или number[])',
  propSeries: 'Серии данных (id, label, values, опциональный color)',
  propWidth: 'CSS-ширина',
  propHeight: 'Высота в пикселях',
  propPadding: 'Отступы графика (одно число или [t,r,b,l])',
  propUnstyled: 'Убрать классы sg-chart',
  propClassName: 'className корневого SVG',
  propStyle: 'Inline-стиль корневого SVG',

  propMarkers: 'Показать маркеры-точки в каждой точке',
  propStrokeWidth: 'Толщина линии в пикселях',

  propGroupGap: 'Зазор между группами (0..1 от шага категории)',
  propBarGap: 'Зазор между столбцами внутри группы (0..1 от слота)',
}
