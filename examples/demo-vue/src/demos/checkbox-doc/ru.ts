import type { checkboxDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `checkboxDocEn`, no extras.
 */
export const checkboxDocRu: { [K in keyof typeof checkboxDocEn]: string } = {
  pageTitle: 'Checkbox',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbCheckbox: 'Checkbox',
  pageLead:
    'Бинарный переключатель с опциональными состояниями indeterminate, disabled и rich-label. Работает отдельно или внутри Form.',
  pageWhen1: 'Выбор одного или нескольких значений из списка (новости → release notes, beta-флаги).',
  pageWhen2: 'Как родительский «выбрать всё» для массового выбора.',
  pageWhen3: 'Подтверждения условий / privacy с валидацией.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый checkbox с подписью.',
  demoStatesTitle: 'Состояния',
  demoStatesDesc: 'Все визуальные состояния в одной колонке (у Vue пока нет состояния loading).',
  demoCheckAllTitle: 'Выбрать всё',
  demoCheckAllDesc: 'Родитель + дочерние с indeterminate.',
  demoRichLabelTitle: 'Сложные подписи',
  demoRichLabelDesc: 'VNodes в слоте по умолчанию — описания, ссылки.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: 'Обернуть в `<SgField>`, прокинуть `:checked` / `@change` из слота.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоуп глобальных токенов на обёртке для перекраски.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Нативный input + label, без классов SkyGraph.',

  tableCheckboxApi: 'API Checkbox',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Boolean для v-model',
  propChecked: 'Алиас для `modelValue`',
  propDefaultChecked: 'Начальное состояние в неуправляемом режиме',
  propIndeterminate: 'Нативное визуальное состояние indeterminate',
  propDisabled: 'Блокировать взаимодействие (наследуется от ConfigProvider)',
  propUnstyled: 'Убрать классы SkyGraph — оставить семантику',
  emitUpdateModelValue: 'Срабатывает с новым boolean',
  emitChange: 'Дубликат `update:modelValue`',

  cssHint:
    'У Checkbox нет специфичных токенов. Цвет «галочки» задаётся нативным `accent-color`, который наследует `--sg-color-primary`. Для перекраски — скоуп глобальных токенов на обёртке.',

  cssSgColorPrimary: 'Нативный accent-color (заливка checked + indeterminate)',
  cssSgColorText: 'Цвет текста подписи по умолчанию',
  cssSgColorTextDisabled: 'Цвет текста подписи при disabled',
  cssSgColorTextTertiary: 'Цвет inline-спиннера при загрузке (когда поддерживается)',
  cssSgFontSize: 'Размер шрифта подписи',
  cssSgLineHeight: 'Line-height подписи',
  cssSgPaddingSm: 'Зазор между input и подписью',
}
