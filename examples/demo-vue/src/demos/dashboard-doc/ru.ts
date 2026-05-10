import { dashboardDocEn } from './en'

export const dashboardDocRu: { [K in keyof typeof dashboardDocEn]: string } = {
  pageTitle: 'Dashboard',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbDashboard: 'Dashboard',
  pageLead:
    'Сетка фиксированной раскладки для виджетов с опциональным режимом drag/resize через `SgDashboardEditor`. Внутрь `#widget` слота помещается что угодно — Charts, Table, Diagram, свои виджеты.',
  pageWhen1: 'Собрать read-only KPI / analytics-страницу с фиксированной раскладкой.',
  pageWhen2: 'Отрисовать визуальный слой редактора дашбордов (drag/resize через `SgDashboardEditor`).',
  pageWhen3: 'Комбинировать с Charts, Table, Diagram, своими виджетами — в ячейку влезает что угодно.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Сетка из 12 колонок: линейный график, KPI-плитка, столбчатый график и лента активности.',

  demoEditorTitle: 'Редактор — drag & resize',
  demoEditorDesc:
    'Перетаскивайте виджеты за заголовок, ресайзите из правого нижнего угла. Раскладка снапится по сетке; `@layout-change` пишется в лог под канвасом.',

  demoActionsTitle: 'Действия на виджете',
  demoActionsDesc:
    'У Vue Dashboard нет `WidgetAction`-API — inline-кнопки внутри `#widget`-слота дают тот же UX. Клик по action вызывает локальный обработчик.',

  demoMixedTitle: 'Реальный контент',
  demoMixedDesc:
    'Смешанный набор: KPI-плитки, двух-серийный линейный + столбчатый графики, мини-таблица и плейсхолдер карты — всё на одном `SgDashboard`.',

  demoResponsiveTitle: 'Адаптивная сетка',
  demoResponsiveDesc:
    'Переключайте mobile / tablet / desktop, чтобы увидеть, как спаны виджетов схлопываются при уменьшении `columns`.',

  demoRealtimeTitle: 'Realtime monitoring',
  demoRealtimeDesc:
    '`setInterval` пушит новые значения в график каждые 2 сек — `SgDashboard` не пересоздаётся. Кнопка Pause замораживает поток.',

  demoLargeGridTitle: 'Большая сетка',
  demoLargeGridDesc:
    '12 виджетов на сетке 6×6: KPI, задачи, мини-чарты, heartbeat — стресс-тест плотности раскладки.',

  tableDashboardApi: 'API SgDashboard',
  tableDashboardWidget: 'DashboardWidget',
  tableEditorApi: 'API SgDashboardEditor',

  propWidgets: 'Виджеты, закреплённые за ячейками сетки',
  propColumns: 'Общее число колонок сетки',
  propRowHeight: 'Единая высота строки в пикселях',
  propGap: 'Зазор между ячейками в пикселях',
  propUnstyled: 'Убрать дефолтные классы sg-dashboard',

  widgetId: 'Стабильный id виджета',
  widgetTitle: 'Текст заголовка (не отображается при undefined)',
  widgetX: 'Начало колонки (с 1)',
  widgetY: 'Начало строки (с 1)',
  widgetW: 'Ширина в колонках',
  widgetH: 'Высота в строках',
  widgetClassName: 'className виджета',
  widgetStyle: 'Inline-стиль виджета',

  editorEmitLayoutChange:
    'Эмит с обновлённым массивом widgets после коммита drag / resize',
  editorDraggable: 'Выключить drag за заголовок без удаления chrome редактора',
  editorResizable: 'Выключить handle ресайза в правом нижнем углу',
  editorMinW: 'Минимальная ширина виджета в колонках',
  editorMinH: 'Минимальная высота виджета в строках',
}
