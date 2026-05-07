import { dashboardDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `dashboardDocEn`, no extras.
 */
export const dashboardDocRu: { [K in keyof typeof dashboardDocEn]: string } = {
  pageTitle: 'Dashboard',
  pageLead:
    'Сетка фиксированной раскладки для виджетов с опциональными hover-действиями, контекстным меню и режимом drag/resize через `DashboardEditor`. Внутрь ячейки помещается что угодно — Charts, Table, Diagram, свои виджеты.',
  pageWhen1: 'Собрать read-only KPI / analytics-страницу с фиксированной раскладкой виджетов.',
  pageWhen2: 'Отрисовать визуальный слой редактора дашбордов (drag/resize через `DashboardEditor`).',
  pageWhen3: 'Комбинировать с Charts, Table, Diagram, своими виджетами — в ячейку влезает что угодно.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Сетка из 12 колонок: линейный график, KPI-плитка, столбчатый график и лента активности.',

  demoEditorTitle: 'Редактор — drag & resize',
  demoEditorDesc: 'Перетаскивайте виджеты за заголовок, ресайзите из угла. Раскладка снапится по сетке; события `onLayoutChange` пишутся в лог под канвасом.',

  demoActionsTitle: 'Действия на виджете',
  demoActionsDesc: 'Каждый виджет показывает своё `⋯`-меню через `actions`. Наведите курсор — появится триггер, клик по пункту вызывает callback.',

  demoMixedTitle: 'Реальный контент',
  demoMixedDesc: 'Смешанный набор: KPI-плитки, двух-серийный линейный + столбчатый графики, мини-таблица и плейсхолдер карты — всё на одном `Dashboard`.',

  demoResponsiveTitle: 'Адаптивная сетка',
  demoResponsiveDesc: 'Переключайте mobile / tablet / desktop, чтобы увидеть, как спаны виджетов схлопываются при уменьшении `cols`.',

  demoRealtimeTitle: 'Realtime monitoring',
  demoRealtimeDesc: '`setInterval` пушит новые значения в график каждые 2 сек — `Dashboard` не пересоздаётся. Кнопка Pause замораживает поток.',

  demoLargeGridTitle: 'Большая сетка',
  demoLargeGridDesc: '12 виджетов на сетке 6×6: KPI, таблица, мини-чарты, heartbeat — стресс-тест плотности раскладки.',

  tableDashboardApi: 'API Dashboard',
  tableDashboardWidget: 'DashboardWidget',
  tableWidgetAction: 'WidgetAction',
  tableEditorApi: 'API DashboardEditor',

  propWidgets: 'Виджеты, закреплённые за ячейками сетки',
  propColumns: 'Общее число колонок сетки',
  propRowHeight: 'Единая высота строки в пикселях',
  propGap: 'Зазор между ячейками в пикселях',
  propUnstyled: 'Убрать дефолтные классы sg-dashboard',
  propClassName: 'className корня',
  propStyle: 'Inline-стиль корня',
  propOnWidgetContextMenu: 'Правый клик по виджету. preventDefault() выполняется только если prop задан.',
  propOnDashboardContextMenu: 'Правый клик по фону дашборда. preventDefault() выполняется только если prop задан.',

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
  widgetActions: 'Действия hover-меню для виджета. Пустой массив отключает меню; undefined берёт дефолты редактора.',

  actionId: 'Стабильный id действия',
  actionLabel: 'Видимый текст пункта',
  actionIcon: 'Иконка перед текстом (опционально)',
  actionOnClick: 'Обработчик клика — получает виджет',
  actionVariant: '"default" либо "danger" (пункт окрашен в красный)',
  actionHidden: 'Предикат: при true пункт не показывается',

  editorOnLayoutChange: 'Вызывается с обновлённым массивом widgets после drag / resize / дефолтного Remove',
  editorEditable: 'Выключить drag / resize, не убирая chrome редактора',
  editorOnWidgetRefresh: 'Подключает дефолтное действие Refresh',
  editorOnWidgetSettings: 'Подключает дефолтное действие Settings',
  editorOnWidgetRemove: 'Переопределяет дефолтное Remove (по умолчанию виджет удаляется из массива через onLayoutChange)',
}
