import { checkboxDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `checkboxDocEn`, no extras.
 */
export const checkboxDocRu: { [K in keyof typeof checkboxDocEn]: string } = {
  pageTitle: 'Checkbox',
  pageLead:
    'Бинарный переключатель с опциональными состояниями indeterminate, disabled, loading и rich-label. Работает отдельно или внутри Form.',
  pageWhen1:
    'Выбор одного или нескольких значений из списка (новости → release notes, beta-флаги).',
  pageWhen2: 'Как родительский «выбрать всё» для массового выбора.',
  pageWhen3: 'Подтверждения условий / privacy с валидацией.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый checkbox с подписью.',
  demoStatesTitle: 'Состояния',
  demoStatesDesc: 'Все визуальные состояния в одной колонке.',
  demoCheckAllTitle: 'Выбрать всё',
  demoCheckAllDesc: 'Родитель + дочерние с indeterminate.',
  demoRichLabelTitle: 'Сложные подписи',
  demoRichLabelDesc: 'Дочерние элементы ReactNode — описания, ссылки.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: "Обернуть в Field + valuePropName='checked'.",
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tableCssVars: 'CSS-переменные',

  propChecked: 'Управляемое состояние checked',
  propDefaultChecked: 'Начальное состояние в неуправляемом режиме',
  propIndeterminate: 'Нативное визуальное состояние indeterminate',
  propOnChange: 'Срабатывает с новым boolean',
  propDisabled: 'Блокировать взаимодействие (наследуется от ConfigProvider)',
  propLoading: 'Заменить input на inline-спиннер',
  propChildren: 'Содержимое подписи (ReactNode)',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы SkyGraph — оставить семантику',

  cssHint:
    'У Checkbox нет специфичных токенов. Цвет «галочки» задаётся нативным `accent-color`, который наследует `--sg-color-primary`. Для перекраски — скоуп глобальных токенов на обёртке.',

  cssSgColorPrimary: 'Нативный accent-color (заливка checked + indeterminate)',
  cssSgColorText: 'Цвет текста подписи по умолчанию',
  cssSgColorTextDisabled: 'Цвет текста подписи при disabled/loading',
  cssSgColorTextTertiary: 'Цвет inline-спиннера при загрузке',
  cssSgFontSize: 'Размер шрифта подписи',
  cssSgLineHeight: 'Line-height подписи',
  cssSgPaddingSm: 'Зазор между input и подписью',
}
