import { timePickerDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `timePickerDocEn`, no extras.
 */
export const timePickerDocRu: { [K in keyof typeof timePickerDocEn]: string } = {
  pageTitle: 'TimePicker',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbTimePicker: 'TimePicker',

  pageLead:
    'Time-пикер со скролл-колонками. Эмитит **строку** в нужном формате — без жонглирования Date.',
  pageWhen1:
    'Любой ввод времени, где скролл-колонки удобнее свободного ввода (слоты записи, будильники).',
  pageWhen2: 'Когда нужен 12-часовой UX с AM/PM поверх 24-часовых данных.',
  pageWhen3:
    'Для диапазонов, предикатов отключения часов/минут или `loading` — используйте React-версию (Vue-паритет в работе).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый пикер с живым отображением.',
  demoFormatTitle: 'Формат',
  demoFormatDesc: 'Варианты: 24h / 12h / без секунд.',
  demoStepsTitle: 'Шаги',
  demoStepsDesc: 'Прореживаем колонки часов/минут — идеально для слотов.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Выровнено с Input / DatePicker.',
  demoStatesTitle: 'Состояния',
  demoStatesDesc:
    'Disabled блокирует dropdown. В Vue нет `loading` — второй ряд имитирует загрузку через `disabled` + подпись сбоку.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоуп глобальных токенов на обёртке для перекраски экземпляра.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Headless-режим, нативные классы убраны.',

  tableTimePickerApi: 'API TimePicker',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Привязка через v-model (Vue-идиома)',
  propValue: 'Совместимый алиас для `modelValue` (строка по формату)',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propPlaceholder: 'Placeholder при отсутствии значения',
  propFormat: 'Формат отображения и фиксации (HH/hh, mm, ss, A)',
  propUse12Hours: 'Переключение в 12-часовой режим с колонкой AM/PM',
  propHourStep: 'Шаг между значениями часов',
  propMinuteStep: 'Шаг между значениями минут',
  propSecondStep: 'Шаг между значениями секунд',
  propShowSecond: 'Показывать колонку секунд',
  propShowNow: 'Показывать кнопку «Now» внизу',
  propAllowClear: 'Кнопка × для очистки при наличии значения',
  propOpen: 'Управляемая видимость dropdown',
  propDisabled: 'Блокировать взаимодействие',
  propSize: 'Высота (как у Input)',
  propUnstyled: 'Снять SkyGraph-классы (headless-режим)',
  emitUpdateModelValue: 'Срабатывает при фиксации (v-model)',
  emitChange: 'Срабатывает с форматированной строкой времени',
  emitOpenChange: 'Срабатывает при открытии/закрытии dropdown',

  cssHint:
    'У TimePicker нет своих токенов: использует глобальные токены форм (высота, радиус, цвета) для input и токены поверхности (bg-elevated, shadow-lg, z-dropdown) для поповера.',

  cssSgColorBorder: 'Цвет границы триггера',
  cssSgColorBorderSecondary: 'Разделители колонок и сепаратор футера',
  cssSgColorPrimary: 'Граница фокуса + цвет кнопки Now',
  cssSgColorPrimaryHover: 'Граница триггера при наведении',
  cssSgColorPrimaryBg: 'Focus ring + фон активной ячейки',
  cssSgColorBgContainer: 'Фон триггера',
  cssSgColorBgElevated: 'Фон dropdown',
  cssSgColorBgHover: 'Фон ячейки при наведении',
  cssSgColorText: 'Цвет текста триггера и ячеек',
  cssSgColorTextTertiary: 'Цвет иконок суффикса',
  cssSgColorTextQuaternary: 'Цвет placeholder и кнопки очистки',
  cssSgColorTextDisabled: 'Цвет текста disabled-ячейки',
  cssSgBorderRadius: 'Радиус триггера',
  cssSgBorderRadiusSm: 'Радиус кнопки Now',
  cssSgBorderRadiusLg: 'Радиус dropdown',
  cssSgHeightSm: 'Высота триггера при size="small"',
  cssSgHeightMd: 'Высота триггера по умолчанию',
  cssSgHeightLg: 'Высота триггера при size="large"',
  cssSgFontSize: 'Размер шрифта триггера и иконки очистки',
  cssSgFontSizeSm: 'Размер шрифта ячеек и кнопки Now',
  cssSgPaddingXs: 'Отступ триггера, margin-top dropdown, отступ футера',
  cssSgZDropdown: 'Стек dropdown',
  cssSgShadowLg: 'Тень dropdown',
  cssSgTransitionDuration: 'Длительность всех hover/focus переходов',
}
