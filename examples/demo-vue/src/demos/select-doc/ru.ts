import type { selectDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `selectDocEn`, no extras.
 */
export const selectDocRu: { [K in keyof typeof selectDocEn]: string } = {
  pageTitle: 'Select',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbSelect: 'Select',
  pageLead:
    'Селектор одного значения с клавиатурной навигацией, кастомной панелью и нативным fallback (`unstyled`).',
  pageWhen1: 'Когда пользователь выбирает одно значение из небольшого предопределённого списка.',
  pageWhen2: 'Для длинных списков с поиском используйте AutoComplete.',
  pageWhen3: 'Внутри форм — оберните в <SgField> для валидации.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемое значение через v-model.',
  demoUncontrolledTitle: 'Неуправляемый',
  demoUncontrolledDesc: '`defaultValue` задаёт начальный выбор; остальное ведёт SkyGraph.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small / middle / large — под плотность вашей формы.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Отключить весь контрол или отдельные опции.',
  demoEmptyTitle: 'Async / disabled-строки',
  demoEmptyDesc:
    'Disabled + пустой список опций заменяют «loading», пока у SgSelect нет prop `loading`.',
  demoNumericTitle: 'Числовые значения',
  demoNumericDesc: '`value` сохраняет числовые типы (важно для ID).',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоуп одного Select на другие токены — тот же компонент, другая шкурка.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Нативный <select> без стилей библиотеки — headless-режим.',

  tableSelectApi: 'API Select',
  tableOptionApi: 'SelectOption',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Значение для v-model (одиночное или массив в `multiple`)',
  propValue: 'Алиас для `modelValue`',
  propDefaultValue: 'Начальное выбранное значение (неуправляемое)',
  propOptions: 'Список опций',
  propPlaceholder: 'Placeholder при отсутствии выбора',
  propMultiple: 'Multi-select (Vue-only расширение API)',
  propSize: 'Размер контрола (наследуется от ConfigProvider)',
  propDisabled: 'Отключить селектор',
  propUnstyled: 'Отрисовать нативный <select> без стилей',
  emitUpdateModelValue: 'Срабатывает при изменении выбора',
  emitChange: 'Дубликат `update:modelValue`',
  emitBlur: 'Срабатывает при потере фокуса',

  propOptionLabel: 'Отображаемый текст',
  propOptionValue: 'Значение, передаваемое в onChange',
  propOptionDisabled: 'Сделать опцию невыбираемой',

  cssHint:
    'Select наследует токены Input плюс свои переменные панели выпадающего списка (фон, тень, подсветка).',

  cssSgInputHeight: 'Высота контрола (общая с Input)',
  cssSgInputPadding: 'Внутренние отступы',
  cssSgInputBg: 'Фон контрола',
  cssSgInputBorder: 'Цвет границы (зависит от состояния)',
  cssSgInputRadius: 'Скругление',
  cssSgInputColor: 'Цвет текста значения',
  cssSgColorPrimary: 'Граница в открытом состоянии + focus ring',
  cssSgColorPrimaryBg: 'Фон подсвеченной опции',
  cssSgColorBgElevated: 'Фон панели выпадающего списка',
  cssSgShadowLg: 'Тень панели выпадающего списка',
  cssSgColorTextPlaceholder: 'Цвет placeholder',
  cssSgSpinColor: 'Цвет спиннера загрузки внутри контрола',
}
