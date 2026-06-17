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
    'Календарь month + year с маркерами событий, номерами недель, weekStart-настройкой и предикатом disabled-дней. Компактная или fullscreen-выкладка; range + multi выбор из коробки.',
  pageWhen1: 'Как месячный обзор внутри admin-дашборда или планировщика.',
  pageWhen2: 'Когда нужны лёгкие маркеры событий по дням.',
  pageWhen3:
    'Когда нужно выбрать диапазон, несколько дат или полностью кастомизировать chrome через слоты `#header` / `#cell`.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Сетка месяца, сегодня подсвечен.',
  demoCardTitle: 'Карточка',
  demoCardDesc: '`:fullscreen="false"` сворачивает календарь в компактную карточку.',
  demoControlledTitle: 'Управляемый',
  demoControlledDesc: 'Родитель владеет выбранной датой через v-model.',
  demoDisabledDatesTitle: 'Отключённые даты',
  demoDisabledDatesDesc: 'Серим прошлые дни и выходные через `disabled-date`.',
  demoYearModeTitle: 'Year-режим',
  demoYearModeDesc:
    '`mode="year"` показывает обзор из 12 месяцев; клик по месяцу возвращает в сетку дней.',
  demoWeekNumbersTitle: 'Номера недель',
  demoWeekNumbersDesc: 'Колонка ISO-недель + неделя с понедельника.',
  demoRangeSelectionTitle: 'Выбор диапазона',
  demoRangeSelectionDesc:
    '`range-selection` превращает сетку в two-tap выбор: первый клик — старт, второй — конец, между ними подсветка.',
  demoMultipleSelectionTitle: 'Множественный выбор',
  demoMultipleSelectionDesc:
    '`multiple-selection` тогглит даты по клику — идеально для «выбрать все рабочие дни месяца».',
  demoEventsTitle: 'События',
  demoEventsDesc:
    'Каждая ячейка показывает цветные точки событий. `max-events` ограничивает их количество, остаток сворачивается в `+N`.',
  demoCustomCellTitle: 'Кастомная ячейка',
  demoCustomCellDesc:
    'Слот `#cell` вставляет любой контент под номером дня — капасити-точки, бейджи и т. п.',
  demoCustomHeaderTitle: 'Кастомная шапка',
  demoCustomHeaderDesc:
    'Полностью свой chrome через слот `#header`: получаешь `{ value, type, onChange, onTypeChange }`.',
  demoLocaleTitle: 'Локализация',
  demoLocaleDesc:
    'Передай `locale` с локализованными именами месяцев/дней, кнопкой today и заголовком колонки недели.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  tableCalendarApi: 'API Calendar',
  tableCalendarEvent: 'CalendarEvent',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Привязка через v-model (Vue-идиома)',
  propValue: 'Совместимый алиас для `modelValue` — выбранная дата',
  propDefaultValue: 'Начальная дата в неуправляемом режиме',
  propMode: "Режим отображения ('month' | 'year')",
  propEvents: 'Маркеры событий по датам',
  propWeekStartDay: '0 = воскресенье … 6 = суббота',
  propShowWeekNumbers: 'Колонка ISO-недель',
  propDisabledDate: 'Блокировка взаимодействия для конкретных дат',
  propLocale: 'Переопределение имён месяцев / дней + текста кнопки today',
  propRangeSelection: 'Переключает сетку в two-tap выбор диапазона',
  propRangeValue: 'Управляемый `[start, end]` (используется с `@range-change`)',
  propMultipleSelection: 'Тогглить несколько дат по клику',
  propMultipleValue: 'Управляемый массив дат (используется с `@multiple-change`)',
  propHeaderSlot:
    'Свой chrome — слот `#header`, получает `{ value, type, onChange, onTypeChange }`',
  propCellSlot: 'Доп. контент в ячейке — слот `#cell`, получает `{ date, type }`',
  propUnstyled: 'Снять SkyGraph-обёртку — только семантика',
  emitUpdateModelValue: 'Срабатывает при выборе даты (v-model)',
  emitSelect: 'Срабатывает при выборе любой ячейки',
  emitPanelChange: 'Срабатывает при смене видимой панели/режима',
  emitRangeChange: 'Срабатывает с очередным `[start, end]`',
  emitMultipleChange: 'Срабатывает с очередным массивом выбранных дат',

  eventId: 'Стабильный идентификатор (для v-for `:key`)',
  eventDate: 'Дата события',
  eventTitle: 'Подпись (tooltip) на точке события',
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
