import { calendarDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `calendarDocEn`, no extras.
 */
export const calendarDocRu: { [K in keyof typeof calendarDocEn]: string } = {
  pageTitle: 'Calendar',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbCalendar: 'Calendar',

  pageLead:
    'Месячный календарь с опциональными событиями, номерами недель, weekStart-настройкой и предикатом disabled-дней. Компактная выкладка — без fullscreen.',
  pageWhen1: 'Как месячный обзор внутри admin-дашборда или планировщика.',
  pageWhen2: 'Когда нужны лёгкие маркеры событий по дням.',
  pageWhen3:
    'Для range / multiple selection, кастомных ячеек, локали или fullscreen — используйте React-версию (Vue-паритет в работе).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Сетка месяца, сегодня подсвечен.',
  demoControlledTitle: 'Управляемый',
  demoControlledDesc: 'Родитель владеет выбранной датой через v-model.',
  demoEventsTitle: 'События',
  demoEventsDesc:
    'Каждая ячейка перечисляет совпавшие события. Vue использует `{ id, title, type }`, без `maxEvents`-overflow.',
  demoWeekStartTitle: 'Неделя с понедельника',
  demoWeekStartDesc: '`week-start-day="1"` ротейтит колонки дней недели.',
  demoWeekNumbersTitle: 'Номера недель',
  demoWeekNumbersDesc: 'Колонка ISO-недель + неделя с понедельника.',
  demoDisabledDatesTitle: 'Отключённые даты',
  demoDisabledDatesDesc: 'Серим прошлые дни и выходные.',
  demoYearModeTitle: 'Year-режим',
  demoYearModeDesc:
    '`mode="year"` принимается, но Vue-сетка та же, что и `month` (gap).',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc: 'Скоуп глобальных токенов на обёртке для перекраски.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Только семантика, рисуем своим CSS.',

  tableCalendarApi: 'API Calendar',
  tableCalendarEvent: 'CalendarEvent',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Привязка через v-model (Vue-идиома)',
  propValue: 'Совместимый алиас для `modelValue` — выбранная дата',
  propDefaultValue: 'Начальная дата в неуправляемом режиме',
  propMode: 'Режим отображения (в Vue полностью реализован только `month`)',
  propEvents: 'Маркеры событий по датам',
  propWeekStartDay: '0 = воскресенье … 6 = суббота',
  propShowWeekNumbers: 'Колонка ISO-недель',
  propDisabledDate: 'Блокировка взаимодействия для конкретных дат',
  propUnstyled: 'Снять SkyGraph-обёртку — только семантика',
  emitUpdateModelValue: 'Срабатывает при выборе даты (v-model)',
  emitSelect: 'Срабатывает при выборе любой ячейки',
  emitPanelChange: 'Срабатывает при смене видимой панели/режима',

  eventId: 'Стабильный идентификатор (для v-for `:key`)',
  eventDate: 'Дата события',
  eventTitle: 'Короткая подпись в ячейке',
  eventType: 'Свободный тег для группировки/фильтрации',

  cssHint:
    'У Calendar нет своих токенов — он полностью управляется глобальной палитрой, отступами и радиусами. Переопределяйте их на обёртке для перекраски экземпляра.',

  cssSgColorPrimary: 'Выбранный день + акцент «Сегодня» + фокус',
  cssSgColorPrimaryBg: 'Hover-фон для выбранных ячеек',
  cssSgColorBgContainer: 'Поверхность календаря + фон chrome',
  cssSgColorBgHover: 'Hover-фон ячейки',
  cssSgColorText: 'Текст числа дня и контролов',
  cssSgColorTextSecondary: 'Шапки колонок, кнопки prev/next',
  cssSgColorTextTertiary: 'Дни вне месяца, helper-подписи',
  cssSgColorTextDisabled: 'Отключённые дни',
  cssSgColorBorder: 'Границы input/select в chrome',
  cssSgColorBorderSecondary: 'Разделитель сетки, нижняя граница шапки',
  cssSgBorderRadiusLg: 'Радиус внешней карточки',
  cssSgBorderRadiusSm: 'Радиус ячейки и кнопок chrome',
  cssSgFontSize: 'Базовый размер шрифта',
  cssSgFontSizeSm: 'Шапки колонок, события',
  cssSgPaddingXs: 'Внутренние отступы сетки и chrome',
  cssSgPaddingMd: 'Отступ шапки',
  cssSgTransitionDuration: 'Переход hover / выбор ячейки',
}
