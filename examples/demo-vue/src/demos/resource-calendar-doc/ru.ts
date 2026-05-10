import { resourceCalendarDocEn } from './en'

export const resourceCalendarDocRu: { [K in keyof typeof resourceCalendarDocEn]: string } = {
  pageTitle: 'Resource Calendar',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbResourceCalendar: 'ResourceCalendar',
  pageLead:
    'Планировщик на дорожки-ресурсы с drag, resize и живым обнаружением конфликтов (overlap, capacity, availability). Доменная логика — в `@skygraph/core/calendar`; здесь — Vue-адаптер.',
  pageWhen1: 'Расписание смен, бронирование, назначения по ресурсам (люди, комнаты, техника).',
  pageWhen2: 'Визуально показать конфликты расписания без своей clash-логики.',
  pageWhen3: 'В паре с availability rules — запретить работу вне рабочих часов.',

  demoWeekTitle: 'Шкала weeks',
  demoWeekDesc:
    'Дефолт `scale="week"` — дневные колонки над одной неделей, три ресурса, пять assignment-ов.',
  demoDayTitle: 'Шкала day',
  demoDayDesc:
    'Колонки по часам при `scale="day"`. Удобно для планирования смен внутри одного дня.',
  demoInteractiveTitle: 'Интерактив — drag и resize',
  demoInteractiveDesc:
    'Полосы становятся click-and-drag (move) и edge-drag (resize). `@assignmentChange` срабатывает после каждой коммитнутой правки.',

  tableCalendarApi: 'API ResourceCalendar',
  tableCssVars: 'CSS-переменные',

  propResources: 'Дорожки на левой панели (по одной строке на ресурс)',
  propAssignments: 'Time-anchored bookings внутри дорожек',
  propRules: 'Опциональные окна доступности (HH:MM, опционально dayOfWeek)',
  propScale: 'Гранулярность временной оси. Определяет header-tick-и и шаг snap при drag/resize',
  propRange: 'Видимое окно. По умолчанию выводится из min(start)/max(end)',
  propColumnWidth: 'Ширина одного шага шкалы в пикселях',
  propRowHeight: 'Высота дорожки в пикселях',
  propSidebarWidth: 'Ширина левой панели',
  propDraggable: 'Click-and-drag для перемещения блоков по оси времени',
  propResizable: 'Drag правого/левого края для resize блока',
  propEmitAssignmentChange: 'Срабатывает после move или resize с патченным assignment',
  propEmitConflict: 'Срабатывает при изменении списка обнаруженных Conflict[]',
  propUnstyled: 'Убрать классы SkyGraph (headless)',

  cssHint:
    'Все локальные токены — на `.sg-rcal` и пробрасываются через глобальные `--sg-color-*`. Переопределяйте цвета конфликта / tentative для ребрендинга.',

  cssSgRcalAvailabilityOffBg: 'Фон полос "вне доступности"',
  cssSgRcalConflictColor: 'Цвет границы и штриховки для конфликтных блоков',
  cssSgRcalConflictBg: 'Фон конфликтных блоков',
  cssSgRcalTentativeBg: 'Фон tentative (по умолчанию) assignment блоков',
  cssSgRcalTentativeBorder: 'Пунктирная граница tentative блоков',
  cssSgRcalConfirmedBg: 'Сплошной фон confirmed блоков',
  cssSgRcalConfirmedText: 'Цвет текста внутри confirmed блоков',
  cssSgRcalMarkerSize: 'Диаметр цветной точки у подписи ресурса',
}
