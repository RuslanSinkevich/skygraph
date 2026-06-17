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
    'Календарный пикер даты / месяца / года: опциональное время, пресеты, диапазоны, настраиваемая локаль.',
  pageWhen1: 'Когда пользователю нужно выбрать календарную дату, месяц или год.',
  pageWhen2: 'Когда нужна комбинация даты и времени в одном контроле.',
  pageWhen3: 'Когда нужен диапазон `[start, end]` — используйте `SgRangePicker`.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемое значение с живым ISO-выводом.',
  demoFormatsTitle: 'Форматы',
  demoFormatsDesc: 'Выберите формат отображения — парсинг идёт по тем же токенам.',
  demoPickerModesTitle: 'Режимы выбора',
  demoPickerModesDesc: '`picker` меняет гранулярность: date / month / year.',
  demoWithTimeTitle: 'Дата + время',
  demoWithTimeDesc:
    '`show-time` добавляет колонки часов/минут/секунд. Передайте объект для настройки шагов.',
  demoRussianLocaleTitle: 'Русская локаль',
  demoRussianLocaleDesc:
    '`SgConfigProvider` с пресетом `ru_RU` подменяет названия месяцев, дней недели и подписи кнопок «Сегодня», «Сейчас», OK.',
  demoDisabledDatesTitle: 'Отключённые даты',
  demoDisabledDatesDesc: 'Предикат решает, какие ячейки заблокированы.',
  demoPresetsTitle: 'Пресеты',
  demoPresetsDesc: 'Сайдбар-шорткаты, фиксирующие значение одним кликом.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Три размера, единый API.',
  demoRangeTitle: 'Диапазон',
  demoRangeDesc: 'Двухмесячная панель, возвращающая `[start, end]`.',
  demoRangePresetsTitle: 'Пресеты диапазона',
  demoRangePresetsDesc:
    'Значение пресета может быть кортежем `[Date, Date]` — клик заполняет оба конца сразу.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись на контроле DatePicker: уезжает вверх при фокусе или когда дата выбрана.',

  tableDatePickerApi: 'API DatePicker',
  tableRangePickerApi: 'API RangePicker',
  tableShowTimeConfig: 'ShowTimeConfig',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Привязка через v-model (Vue-идиома)',
  propValue: 'Совместимый алиас для `modelValue`',
  propDefaultValue: 'Начальная дата в неуправляемом режиме',
  propPlaceholder: 'Placeholder при отсутствии значения',
  propFormat: 'Формат отображения и парсинга (YYYY, MM, DD, HH, mm, ss)',
  propPicker: 'Гранулярность календаря',
  propShowTime: 'Колонки времени (boolean или ShowTimeConfig)',
  propShowToday: 'Показывать шорткат «Сегодня» в футере',
  propShowNow: 'Показывать шорткат «Сейчас» (со `show-time`)',
  propAllowClear: 'Кнопка очистки при наличии значения',
  propDisabledDate: 'Предикат для блокировки конкретных дней',
  propPresets: 'Сайдбар-шорткаты, фиксирующие значение одним кликом',
  propPlacement: 'Угол выравнивания выпадающего списка',
  propOpen: 'Управляемая видимость выпадающего списка',
  propInputReadOnly: 'Отрисовать текст вместо редактируемого input',
  propDisabled: 'Отключить весь контрол',
  propSize: 'Размер контрола',
  propUnstyled: 'Снять встроенные классы-якоря',
  emitUpdateModelValue: 'Срабатывает при выборе даты (v-model)',
  emitChange: 'Срабатывает после фиксации `(date, formattedString)`',
  emitOpenChange: 'Срабатывает при открытии/закрытии списка',

  propRangeValue: 'Управляемый кортеж `[start, end]` (`null` если не задан)',
  propRangeDefaultValue: 'Начальный диапазон в неуправляемом режиме',
  propRangePlaceholder: 'Placeholders для начального и конечного полей',
  propRangeFormat: 'Формат отображения и парсинга для обоих концов',
  propRangeShowTime: 'Колонки времени для обоих концов',
  propRangeAllowClear: 'Кнопка очистки если задан хотя бы один конец',
  propRangeDisabledDate: 'Предикат для блокировки конкретных дней',
  propRangePresets: 'Сайдбар-шорткаты, фиксирующие диапазон одним кликом',
  propRangeSeparator: 'Узел между начальным и конечным значениями',
  propRangePlacement: 'Угол выравнивания выпадающего списка для диапазона',
  emitRangeUpdateModelValue: 'Срабатывает при фиксации диапазона (v-model)',
  emitRangeChange: 'Срабатывает после фиксации `(dates, dateStrings)`',

  propTimeFormat: 'Формат времени (HH, mm, ss)',
  propTimeHourStep: 'Шаг между выбираемыми часами',
  propTimeMinuteStep: 'Шаг между выбираемыми минутами',
  propTimeSecondStep: 'Шаг между выбираемыми секундами',
  propTimeDefaultValue: 'Начальное время при открытии без значения',

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
