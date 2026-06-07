import { radioDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `radioDocEn`, no extras.
 */
export const radioDocRu: { [K in keyof typeof radioDocEn]: string } = {
  pageTitle: 'Radio',
  pageLead:
    'Группа выбора одного значения. Поставляется как `RadioGroup`, который управляет выбором; одиночные radio не предназначены для использования вне группы.',
  pageWhen1: 'Выбор ровно одного значения из 2–6 вариантов (тариф, способ доставки).',
  pageWhen2: 'Внутри формы, где radio — основной ответ.',
  pageWhen3: 'Когда пользователю важно видеть все варианты сразу (в отличие от Select).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемая RadioGroup с живым выводом значения.',
  demoVerticalTitle: 'Вертикальный',
  demoVerticalDesc: "direction='vertical' для длинных подписей.",
  demoStatesTitle: 'Состояния',
  demoStatesDesc: 'Disabled на уровне опции и на уровне группы + loading.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: 'RadioGroup в Field с валидацией.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоуп глобальных токенов для ребрендинга одной группы.',

  tableRadioGroupApi: 'API RadioGroup',
  tableRadioOptionApi: 'RadioOption',
  tableCssVars: 'CSS-переменные',

  propValue: 'Управляемое выбранное значение',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propOptions: 'Опции radio для отрисовки',
  propDirection: 'Направление раскладки',
  propOnChange: 'Срабатывает при изменении выбранного значения',
  propDisabled: 'Отключить всю группу',
  propLoading: 'Inline-спиннер рядом с группой',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы SkyGraph — только нативные radio',

  propOptionValue: 'Значение, передаваемое в onChange',
  propOptionLabel: 'Подпись (ReactNode)',
  propOptionDisabled: 'Отключить конкретную опцию',

  cssHint:
    'У Radio нет специфичных токенов. Точка checked задаётся через `accent-color: var(--sg-color-primary)`. Для перекраски — скоуп глобалов на обёртке.',

  cssSgColorPrimary: 'Нативный accent-color (точка checked)',
  cssSgColorText: 'Цвет подписи по умолчанию',
  cssSgColorTextDisabled: 'Цвет подписи при disabled/loading опции',
  cssSgColorTextTertiary: 'Цвет inline-спиннера при загрузке',
  cssSgFontSize: 'Размер шрифта подписи',
  cssSgPaddingMd: 'Зазор между опциями в группе',
  cssSgPaddingXs: 'Зазор между input и подписью',
}
