import { selectDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `selectDocEn`, no extras.
 */
export const selectDocRu: { [K in keyof typeof selectDocEn]: string } = {
  pageTitle: 'Select',
  pageLead:
    'Селектор одного значения с клавиатурной навигацией, состояниями загрузки и нативным fallback.',
  pageWhen1: 'Когда пользователь выбирает одно значение из небольшого предопределённого списка.',
  pageWhen2: 'Для длинных списков с поиском используйте AutoComplete.',
  pageWhen3: 'Внутри форм — оберните в <Field> для валидации.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемое значение через `value` / `onChange`.',
  demoUncontrolledTitle: 'Неуправляемый',
  demoUncontrolledDesc: '`defaultValue` задаёт начальный выбор; остальное ведёт SkyGraph.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small / middle / large — под плотность вашей формы.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Отключить весь контрол или отдельные опции.',
  demoLoadingTitle: 'Loading',
  demoLoadingDesc: 'Loading на селекте vs. на одной опции.',
  demoNumericTitle: 'Числовые значения',
  demoNumericDesc: '`value` сохраняет числовые типы (важно для ID).',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись над триггером Select — уезжает вверх при фокусе или после выбора значения. Чистый CSS + управляемое значение, без правок ядра.',

  tableSelectApi: 'API Select',
  tableOptionApi: 'SelectOption',
  tableCssVars: 'CSS-переменные',

  propValue: 'Текущее выбранное значение',
  propDefaultValue: 'Начальное выбранное значение (неуправляемое)',
  propOnChange: 'Колбэк при изменении выбора',
  propOnBlur: 'Срабатывает при потере фокуса',
  propOptions: 'Список опций',
  propPlaceholder: 'Placeholder при отсутствии выбора',
  propSize: 'Размер контрола (наследуется от ConfigProvider)',
  propDisabled: 'Отключить селектор',
  propLoading: 'Показать спиннер и блокировать ввод',
  propUnstyled: 'Отрисовать нативный <select> без стилей',
  propClassName: 'Дополнительный class на контроле',
  propStyle: 'Inline-стили на контроле',

  propOptionLabel: 'Отображаемый текст',
  propOptionValue: 'Значение, передаваемое в onChange',
  propOptionDisabled: 'Сделать опцию невыбираемой',
  propOptionLoading: 'Состояние loading на конкретной опции',

  cssHint: 'Select наследует токены Input плюс свои переменные панели выпадающего списка.',

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
