import { diagramDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `diagramDocEn`, no extras.
 */
export const diagramDocRu: { [K in keyof typeof diagramDocEn]: string } = {
  pageTitle: 'Diagram',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbDiagram: 'Diagram',
  pageLead:
    'Визуальный слой для GraphEngine — DOM-узлы и SVG-наложение для рёбер. v0: только прямые рёбра; ортогональная маршрутизация, drag-and-drop и zoom/pan — в следующих итерациях.',
  pageWhen1: 'Отрисовать flowchart, оргструктуру или граф зависимостей с реактивным состоянием.',
  pageWhen2:
    'Построить редактор в духе Visio: топология живёт в `@skygraph/core`, визуальный слой — тонкая React-проекция.',
  pageWhen3:
    'Комбинировать с FormEngine / TableEngine / TreeEngine (например, визуализировать зависимости между строками таблицы).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc:
    'Три прямоугольных узла и два прямых ребра. Рёбра привязываются к якорям контура по стабильным ID (`nw`, `ne`, `se`, `sw`).',

  tableDiagramApi: 'API Diagram',
  tableUseGraphApi: 'Опции useGraph(options)',

  propGraph: 'Инстанс GraphEngine (из `useGraph()`)',
  propState: 'Реактивный snapshot из `useGraph()`',
  propWidth: 'Ширина холста',
  propHeight: 'Высота холста',
  propRenderNode: 'Кастомный рендерер содержимого узла',
  propClassName: 'className корня',
  propStyle: 'Inline-стиль корня',
  propUnstyled: 'Убрать дефолтные классы sg-diagram',

  propUseGraphCore: 'Собственный инстанс Core (координация между движками)',
  propUseGraphName: 'Опциональное debug-имя движка',
}
