import { resourceCalendarDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `resourceCalendarDocEn`, no extras.
 */
export const resourceCalendarDocRu: {
  [K in keyof typeof resourceCalendarDocEn]: string
} = {
  pageTitle: 'Resource Calendar',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbResourceCalendar: 'Resource Calendar',
  pageLead:
    'Планировщик с дорожками по ресурсам: перетаскивание, изменение размера и онлайн-детекция конфликтов (перекрытия, превышение ёмкости, доступность). Доменная логика — в `@skygraph/core/calendar`, это React-адаптер.',
  pageWhen1:
    'Планирование смен, бронирований или встреч по ресурсам (людям, помещениям, оборудованию).',
  pageWhen2: 'Визуально показывать конфликты расписания без своей логики проверки пересечений.',
  pageWhen3: 'В паре с правилами доступности — запрет работы вне рабочих часов.',

  demoBasicTitle: 'Базовый пример',
  demoBasicDesc:
    'Четыре ресурса, одна неделя, шесть бронирований — два специально пересекаются у Bob, чтобы показать оверлей конфликта. Перетаскивайте блок для перемещения, край блока — для изменения размера.',
  demoCapacityTitle: 'Ёмкость слота',
  demoCapacityDesc:
    'Одна комната с `capacityPerSlot=2` и тремя одновременными бронированиями в первый день → все три помечаются как `over-capacity`. Панель ниже отражает `onConflict`.',

  tableResourceCalendarApi: 'API ResourceCalendar',
  tableCssVars: 'CSS-переменные',

  cssHint:
    'Все локальные токены живут на `.sg-rcal` и тянутся через глобальные `--sg-color-*`. Переопределите цвета конфликта / ориентировочного блока на отдельном экземпляре для ребрендинга.',

  propResources: 'Дорожки в левой панели (по одной строке на ресурс)',
  propAssignments: 'Привязанные ко времени бронирования внутри дорожек',
  propRules: 'Окна доступности (HH:MM, опционально с `dayOfWeek`)',
  propScale:
    'Шаг временной оси. Управляет тиками заголовка и шагом snap при перетаскивании / ресайзе',
  propRange: 'Видимый интервал. Если не задан — выводится из min(start) / max(end)',
  propColumnWidth: 'Ширина одного шага шкалы в пикселях',
  propRowHeight: 'Высота дорожки в пикселях',
  propSidebarWidth: 'Ширина левой панели',
  propDraggable: 'Включает перетаскивание блоков по временной оси',
  propResizable: 'Включает ручки на левом / правом краях для изменения размера блока',
  propOnAssignmentChange:
    'Срабатывает после перемещения или ресайза, передаёт обновлённый assignment',
  propOnConflict: 'Срабатывает при каждом изменении Conflict[]',
  propUnstyled: 'Сбросить классы SkyGraph (headless-режим)',
  propClassName: 'className на корневой обёртке',
  propStyle: 'inline-стиль на корневой обёртке',

  cssAvailabilityOffBg: 'Цвет полос «вне рабочего окна»',
  cssConflictColor: 'Цвет границы и штриховки конфликтных блоков',
  cssConflictBg: 'Цвет фона конфликтных блоков',
  cssTentativeBg: 'Фон ориентировочных (по умолчанию) блоков',
  cssTentativeBorder: 'Пунктирная граница ориентировочных блоков',
  cssConfirmedBg: 'Сплошной фон подтверждённых блоков',
  cssConfirmedText: 'Цвет текста внутри подтверждённых блоков',
  cssMarkerSize: 'Диаметр цветного маркера рядом с подписью ресурса',
}
