import { radioDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `radioDocEn`, no extras.
 */
export const radioDocRu: { [K in keyof typeof radioDocEn]: string } = {
  pageTitle: 'Radio',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbRadio: 'Radio',
  pageLead:
    'Группа выбора одного значения. Vue-вариант — `SgRadio` (RadioGroup, владеющая выбором); одиночные radio не предназначены для использования вне группы.',
  pageWhen1: 'Выбор ровно одного значения из 2–6 вариантов (тариф, способ доставки).',
  pageWhen2: 'Внутри формы, где radio — основной ответ.',
  pageWhen3: 'Когда пользователю важно видеть все варианты сразу (в отличие от Select).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый `SgRadio` с v-model и живым выводом значения.',
  demoVerticalTitle: 'Вертикальный',
  demoVerticalDesc: "direction='vertical' для длинных подписей.",
  demoStatesTitle: 'Disabled-состояния',
  demoStatesDesc: '`disabled` на уровне опции и группы. У Vue `SgRadio` пока нет prop `loading`.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: '`SgRadio` в `SgField` с required-валидацией.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  tableRadioGroupApi: 'API SgRadio',
  tableRadioOptionApi: 'RadioOption',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Выбранное значение через `v-model`',
  propValue: 'Совместимый псевдоним `modelValue`',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propOptions: 'Опции radio для отрисовки',
  propDirection: 'Направление раскладки (`horizontal` | `vertical`)',
  propUpdateModelValue: 'Эмитится при смене выбора (используется `v-model`)',
  propChange: 'Эмитится с новым значением (алиас `update:modelValue`)',
  propDisabled: 'Отключить всю группу',
  propUnstyled: 'Убрать классы SkyGraph — только нативные radio',

  propOptionValue: 'Значение, передаваемое в `update:modelValue`/`change`',
  propOptionLabel: 'Подпись (строка)',
  propOptionDisabled: 'Отключить конкретную опцию',

  cssHint:
    'У Radio нет специфичных токенов. Точка checked задаётся через `accent-color: var(--sg-color-primary)`. Для перекраски — скоуп глобалов на обёртке.',

  cssSgColorPrimary: 'Нативный accent-color (точка checked)',
  cssSgColorText: 'Цвет подписи по умолчанию',
  cssSgColorTextDisabled: 'Цвет подписи при disabled-опции',
  cssSgFontSize: 'Размер шрифта подписи',
  cssSgPaddingMd: 'Зазор между опциями в группе',
  cssSgPaddingXs: 'Зазор между input и подписью',
}
