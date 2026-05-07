import { dashboardDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `dashboardDocEn`, no extras.
 */
export const dashboardDocRu: { [K in keyof typeof dashboardDocEn]: string } = {
  pageTitle: 'Dashboard',
  pageLead:
    'Сетка фиксированной раскладки для виджетов. v0 — фиксированные (x, y, w, h) на виджет; без drag, resize и auto-pack. Используйте как примитив для read-only дашбордов либо как слой рендера для более богатого редактора.',
  pageWhen1: 'Собрать read-only KPI / analytics-страницу с фиксированной раскладкой виджетов.',
  pageWhen2: 'Отрисовать визуальный слой редактора дашбордов (drag/resize живёт в вашем приложении).',
  pageWhen3: 'Комбинировать с Charts, Table, Diagram, своими виджетами — в ячейку влезает что угодно.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Сетка из 12 колонок: линейный график, KPI-плитка, столбчатый график и лента активности.',

  tableDashboardApi: 'API Dashboard',
  tableDashboardWidget: 'DashboardWidget',

  propWidgets: 'Виджеты, закреплённые за ячейками сетки',
  propColumns: 'Общее число колонок сетки',
  propRowHeight: 'Единая высота строки в пикселях',
  propGap: 'Зазор между ячейками в пикселях',
  propUnstyled: 'Убрать дефолтные классы sg-dashboard',
  propClassName: 'className корня',
  propStyle: 'Inline-стиль корня',

  widgetId: 'Стабильный id виджета',
  widgetTitle: 'Текст заголовка (не отображается при undefined)',
  widgetX: 'Начало колонки (с 1)',
  widgetY: 'Начало строки (с 1)',
  widgetW: 'Ширина в колонках',
  widgetH: 'Высота в строках',
  widgetChildren: 'Тело виджета',
  widgetRender: 'Альтернатива children — render-колбэк',
  widgetClassName: 'className виджета',
  widgetStyle: 'Inline-стиль виджета',
}
