import { datePickerDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `datePickerDocEn`, no extras.
 */
export const datePickerDocRu: { [K in keyof typeof datePickerDocEn]: string } = {
  pageTitle: 'DatePicker',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbDatePicker: 'DatePicker',

  pageLead:
    'Календарный пикер даты / месяца / года, опционально со временем и предикатом отключения дней.',
  pageWhen1: 'Когда пользователю нужно выбрать календарную дату, месяц или год.',
  pageWhen2: 'Когда нужна комбинация даты и времени в одном контроле.',
  pageWhen3:
    'Для диапазонов, пресетов, недель или i18n-календаря — используйте React-версию (Vue-паритет в работе).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемое значение с живым ISO-выводом.',
  demoFormatsTitle: 'Форматы',
  demoFormatsDesc: 'Выберите формат отображения — парсинг идёт по тем же токенам.',
  demoPickerModesTitle: 'Режимы выбора',
  demoPickerModesDesc:
    '`picker` меняет гранулярность: date / month / year. В Vue нет `picker="week"`.',
  demoWithTimeTitle: 'Дата + время',
  demoWithTimeDesc:
    '`show-time` добавляет колонки часов/минут/секунд. В Vue только boolean — без шагов и шортката «Сейчас».',
  demoDisabledDatesTitle: 'Отключённые даты',
  demoDisabledDatesDesc: 'Предикат решает, какие ячейки заблокированы.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Три размера, единый API.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоуп токенов для перекраски одного пикера, не трогая остальные.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc:
    '`unstyled` снимает классы-якоря с обёртки; глобальные `.sg-datepicker-*` стили перестают применяться.',

  tableDatePickerApi: 'API DatePicker',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Привязка через v-model (Vue-идиома)',
  propValue: 'Совместимый алиас для `modelValue`',
  propDefaultValue: 'Начальная дата в неуправляемом режиме',
  propPlaceholder: 'Placeholder при отсутствии значения',
  propFormat: 'Формат отображения и парсинга (YYYY, MM, DD, HH, mm, ss)',
  propPicker: 'Гранулярность календаря',
  propShowTime: 'Колонки времени (в Vue только boolean)',
  propShowToday: 'Показывать шорткат «Сегодня» в футере',
  propAllowClear: 'Кнопка очистки при наличии значения',
  propDisabledDate: 'Предикат для блокировки конкретных дней',
  propOpen: 'Управляемая видимость выпадающего списка',
  propDisabled: 'Отключить весь контрол',
  propSize: 'Размер контрола',
  propUnstyled: 'Снять встроенные классы-якоря',
  emitUpdateModelValue: 'Срабатывает при выборе даты (v-model)',
  emitChange: 'Срабатывает после фиксации `(date, formattedString)`',
  emitOpenChange: 'Срабатывает при открытии/закрытии списка',

  cssHint:
    'DatePicker переиспользует токены Input для оболочки и `--sg-color-primary*` для выбранных/наведённых дней.',

  cssSgColorPrimary: 'Фон выбранного дня + focus ring',
  cssSgColorPrimaryBg: 'Наведённый день + оттенок focus ring',
  cssSgColorPrimaryHover: 'Цвет границы оболочки при наведении',
  cssSgColorBorder: 'Граница input / разделители календаря',
  cssSgColorBorderSecondary: 'Более тонкий разделитель внутри панели',
  cssSgColorBgContainer: 'Фон input',
  cssSgColorBgElevated: 'Фон панели выпадающего списка',
  cssSgColorText: 'Текст значения и ячеек дней',
  cssSgColorTextTertiary: 'Шапка дней недели, подписи футера',
  cssSgColorTextQuaternary: 'Дни вне месяца + placeholder-иконка',
  cssSgBorderRadius: 'Скругление input',
  cssSgBorderRadiusSm: 'Скругление ячейки дня',
  cssSgBorderRadiusLg: 'Скругление панели выпадающего списка',
  cssSgHeightMd: 'Высота input (через `size`)',
  cssSgShadowLg: 'Тень панели выпадающего списка',
  cssSgZDropdown: 'Слой стека выпадающего списка',
}
