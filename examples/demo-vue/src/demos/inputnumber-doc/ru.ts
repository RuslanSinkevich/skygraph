import type { inputNumberDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `inputNumberDocEn`, no extras.
 */
export const inputNumberDocRu: { [K in keyof typeof inputNumberDocEn]: string } = {
  pageTitle: 'InputNumber',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbInputNumber: 'InputNumber',
  pageLead:
    'Числовое поле со встроенным stepper-ом, ограничениями и точностью. Возвращает `number | null` — `null` означает, что пользователь очистил поле.',
  pageWhen1: 'Только числовые значения, где простой текст не подходит (возраст, количество, цена).',
  pageWhen2: 'Ограниченные значения с кнопками `+` / `−` (количества, оценки).',
  pageWhen3: 'Валюты или проценты, где точность должна соблюдаться.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемое значение с живым выводом (включая очищенный null).',
  demoMinMaxStepTitle: 'Min / Max / Step',
  demoMinMaxStepDesc: 'Ограничения и шаг stepper-а.',
  demoPrecisionTitle: 'Точность',
  demoPrecisionDesc: 'Округление до фиксированного числа знаков.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Пресеты small / middle / large.',
  demoStatesTitle: 'Состояния',
  demoStatesDesc: 'Disabled (у Vue InputNumber пока нет prop loading).',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: 'Валидаторы required и диапазона на числовых полях.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа на токенах InputNumber: зелёный бренд, тёмное поле и glass pick (поле + степперы).',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись на поле InputNumber: уезжает вверх при фокусе или когда число введено.',
  tableInputNumberApi: 'API InputNumber',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Числовое значение для v-model',
  propValue: 'Алиас для `modelValue`',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propMin: 'Нижняя граница (ограничивает при вводе и через stepper)',
  propMax: 'Верхняя граница (ограничивает при вводе и через stepper)',
  propStep: 'Шаг кнопок + / −',
  propPrecision: 'Округление до N знаков после ограничения',
  propPlaceholder: 'Placeholder при пустом поле',
  propDisabled: 'Блокировать взаимодействие',
  propSize: 'Пресет высоты / отступов',
  propUnstyled: 'Убрать классы SkyGraph, оставить логику stepper-а',
  emitUpdateModelValue: 'Срабатывает с числом или null при очистке',
  emitChange: 'Дубликат `update:modelValue`',
  emitBlur: 'Срабатывает при потере фокуса',

  cssHint:
    'InputNumber использует только глобальные токены. Своих `--sg-input-number-*` нет; для ребрендинга — скоупите глобалы из таблицы на обёртке.',

  cssSgColorBorder: 'Внешняя граница контрола',
  cssSgBorderRadius: 'Внешнее скругление',
  cssSgColorBgContainer: 'Фон input',
  cssSgColorBgSecondary: 'Фон кнопок stepper-а',
  cssSgColorBgHover: 'Фон кнопок stepper-а при наведении',
  cssSgColorText: 'Цвет текста input и stepper-а',
  cssSgColorTextDisabled: 'Цвет текста stepper-а при достижении min/max',
  cssSgColorTextTertiary: 'Цвет inline-спиннера при загрузке',
  cssSgFontSize: 'Размер шрифта по умолчанию',
  cssSgFontSizeSm: 'Размер шрифта при size="small"',
  cssSgFontSizeLg: 'Размер шрифта при size="large"',
  cssSgHeightSm: 'Высота контрола при size="small"',
  cssSgHeightMd: 'Высота контрола по умолчанию',
  cssSgHeightLg: 'Высота контрола при size="large"',
  cssSgPaddingXs: 'Правый margin inline-спиннера',
  cssSgTransitionDuration: 'Переход hover на кнопках stepper-а',
}
