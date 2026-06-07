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
  demoLoadingTitle: 'Загрузка',
  demoLoadingDesc:
    '`loading` блокирует ввод и показывает спиннер; `loading` у опции отмечает её как «синхронизируется».',
  demoNumericTitle: 'Числовые значения',
  demoNumericDesc: '`value` сохраняет числовые типы (важно для ID).',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа на токенах Select: зелёный бренд, тёмное поле (с фоном dropdown) и glass pick — тот же компонент, разные шкурки.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись на триггере Select: уезжает вверх при фокусе или когда значение выбрано (`:focus-within` + класс заполненности).',
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
  propLoading: 'Показать спиннер внутри контрола и заблокировать ввод',
  propUnstyled: 'Отрисовать нативный <select> без стилей',
  emitUpdateModelValue: 'Срабатывает при изменении выбора',
  emitChange: 'Дубликат `update:modelValue`',
  emitBlur: 'Срабатывает при потере фокуса',

  propOptionLabel: 'Отображаемый текст',
  propOptionValue: 'Значение, передаваемое в onChange',
  propOptionDisabled: 'Сделать опцию невыбираемой',
  propOptionLoading:
    'Отметить опцию как «синхронизируется» — визуально приглушена, клик игнорируется',

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
