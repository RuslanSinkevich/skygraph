import { ganttDocEn } from './en'

export const ganttDocRu: { [K in keyof typeof ganttDocEn]: string } = {
  pageTitle: 'Gantt',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbGantt: 'Gantt',
  pageLead:
    'Полосы задач над дискретной временной осью с опциональными drag, resize, стрелками зависимостей и дорожками ресурсов. Арифметика времени, snapping и ортогональная маршрутизация зависимостей живут в `@skygraph/core`.',
  pageWhen1:
    'Когда нужен view расписания проекта: задачи привязаны к датам, зависимости рисуются стрелками, дорожки — для команд или ресурсов.',
  pageWhen2:
    'Когда пользователь должен мочь перетащить полосу по оси времени или продлить дедлайн, потянув за правый край.',
  pageWhen3:
    'Когда одни и те же данные нужно показывать в разных масштабах (день / неделя / месяц / квартал) без перерисовки источника.',

  demoBasicTitle: 'Базовый — шкала day',
  demoBasicDesc:
    'Перетащите полосу чтобы передвинуть (snap по дням), потяните за правый край — продлить дедлайн. Стрелки зависимостей обновляются вживую через `routeOrthogonal`.',
  demoScaleTitle: 'Переключатель шкалы',
  demoScaleDesc:
    'Переключение гранулярности оси времени в рантайме. Полосы остаются привязанными к своим датам — меняется только ширина колонки и шаг snap.',

  tableGanttApi: 'API Gantt',
  tableTaskApi: 'GanttTask',
  tableResourceApi: 'GanttResource',
  tableCssVars: 'CSS-переменные',

  propTasks: 'Задачи, отображаемые как полосы',
  propResources:
    'Дорожки для вертикальной группировки. Если не задано — каждая задача в своей строке в порядке источника',
  propScale: 'Гранулярность временной оси. Определяет header-tick-и и шаг snap при drag/resize',
  propRange:
    'Видимое временное окно. Если не задано — выводится из `min(start)` / `max(end)` с отступом в один шаг `scale`',
  propRowHeight: 'Высота строки в пикселях',
  propColumnWidth: 'Ширина одного шага `scale` в пикселях (день, неделя, ...)',
  propSidebarWidth: 'Ширина левой панели (списка задач / ресурсов)',
  propEmitTaskChange:
    'Срабатывает при перемещении (drag) или ресайзе задачи. Исходная задача не мутируется — обновляйте состояние из переданного task',
  propDraggable: 'Включает click-and-drag для перемещения полос по оси времени',
  propResizable: 'Включает drag правого края полосы для расширения `end`',
  propUnstyled: 'Убрать дефолтные классы sg-gantt-*',

  propTaskId: 'Стабильный id (Vue key + `data-task-id`)',
  propTaskName: 'Подпись внутри полосы и в левом списке задач',
  propTaskStart: 'Включающее начало задачи. `Date` или epoch ms',
  propTaskEnd: 'Исключающий конец задачи. `Date` или epoch ms',
  propTaskProgress: 'Прогресс `0..1`. Когда задан — рисуется внутренняя полоса прогресса',
  propTaskParentId: 'Id родительской задачи (для группировки / иерархии). Зарезервировано для v1+',
  propTaskDependencies: 'Id восходящих задач; в текущую задачу рисуется стрелка зависимости',
  propTaskResourceId:
    'Id дорожки (соответствует `GanttResource.id`) — задача закреплена за дорожкой',
  propTaskColor: 'Сплошной цвет заливки полосы. По умолчанию — токен',

  propResourceId: 'Стабильный id (сопоставляется с `GanttTask.resourceId`)',
  propResourceName: 'Подпись для левой панели',

  cssHint:
    'У Gantt нет локальных токенов — он использует глобальные: `--sg-color-primary` (заливка полосы), `--sg-color-bg*` (sidebar / header / зебра), `--sg-color-border*` (разделители), `--sg-color-text*` (подписи), `--sg-font-size-sm` (tick-и / строки sidebar), `--sg-shadow-sm` (тень полосы). Ширина колонки drag-сетки задаётся inline через `--sg-gantt-column-width`.',

  cssSgColorPrimary: 'Цвет заливки полосы по умолчанию (перекрывается через `color` у задачи)',
  cssSgColorPrimaryActive: 'Цвет внутренней полосы прогресса (когда задан `task.progress`)',
  cssSgColorWhite: 'Цвет подписи внутри полосы',
  cssSgColorBg: 'Фон внешней обёртки',
  cssSgColorBgContainer: 'Фон левой панели (sidebar)',
  cssSgColorBgElevated: 'Фон header-а sidebar и временной оси',
  cssSgColorBgSecondary: 'Фон чётной строки (зебра)',
  cssSgColorBorder: 'Внешняя граница + разделители sidebar / header',
  cssSgColorBorderSecondary: 'Разделители строк, разделители tick-ов, линия resize handle',
  cssSgColorText: 'Текст в строке sidebar',
  cssSgColorTextSecondary: 'Цвет подписи tick, цвет стрелки зависимости',
  cssSgFontSize: 'Размер шрифта тела',
  cssSgFontSizeSm: 'Размер шрифта tick-а / строки sidebar',
  cssSgBorderRadius: 'Скругление внешней обёртки',
  cssSgBorderRadiusSm: 'Скругление полосы',
  cssSgPaddingMd: 'Горизонтальные отступы строки sidebar',
  cssSgPaddingXs: 'Горизонтальные отступы полосы / tick',
  cssSgShadowSm: 'Тень полосы',
}
