import { autoCompleteDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `autoCompleteDocEn`,
 * no extras.
 */
export const autoCompleteDocRu: { [K in keyof typeof autoCompleteDocEn]: string } = {
  pageTitle: 'AutoComplete',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbAutoComplete: 'AutoComplete',
  pageLead:
    'Текстовое поле с выпадающим списком отфильтрованных подсказок. Введённая строка — это финальное значение; выбор пункта просто записывает его обратно.',
  pageWhen1:
    'Свободный текст, где вероятны несколько известных значений (города, email, теги).',
  pageWhen2: 'Email-префиксы: автодополнение известных доменов после ввода имени.',
  pageWhen3:
    'Async-lookup на сервере — эмитим `@search`, прогресс показываем боковой подписью.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Статичные подсказки, фильтрация на клиенте по label.',
  demoEmailTitle: 'Подсказки email-доменов',
  demoEmailDesc: 'Список выводится из текущего ввода — классика mail-клиентов.',
  demoAsyncTitle: 'Async-поиск',
  demoAsyncDesc:
    'Дебаунс `@search` — пока ответ в полёте, показываем side-label.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small / default / large, согласовано с Input.',
  demoStatesTitle: 'Disabled-состояния',
  demoStatesDesc:
    '`disabled` блокирует ввод. У Vue пока нет loading-состояния (parity-gap).',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Скоуп `--sg-input-*` и глобальных токенов для ребрендинга одного экземпляра.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Headless-режим — только семантика, без классов SkyGraph.',

  tableAutoCompleteApi: 'API AutoComplete',
  tableOptionApi: 'AutoCompleteOption',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Текст через v-model',
  propValue: 'Совместимый псевдоним `modelValue`',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propOptions: 'Список подсказок (фильтруется по label)',
  propPlaceholder: 'Placeholder инпута',
  propSize: 'Пресет высоты (как у Input)',
  propDisabled: 'Блокировать взаимодействие',
  propUnstyled: 'Убрать классы SkyGraph (headless-режим)',
  emitUpdateModelValue: 'Эмитится при любом изменении текста (используется `v-model`)',
  emitChange: 'Зеркало `update:modelValue`',
  emitSearch: 'Эмитится на каждое нажатие клавиши — для async-lookup',
  emitSelect: 'Эмитится при клике по подсказке: `(value, option)`',
  emitBlur: 'Эмитится при потере фокуса',

  propOptionValue: 'Строка, записываемая в инпут при выборе',
  propOptionLabel:
    'Текст в списке + используемый для фильтрации (по умолчанию = `value`)',

  cssHint:
    'AutoComplete переиспользует всю группу `--sg-input-*` для самого поля; дропдаун использует те же глобалы, что и Select (bg-elevated, bg-hover, shadow-lg, border-radius).',

  cssSgInputAll:
    'AutoComplete переиспользует всю группу `--sg-input-*` для поля — см. Input для полного списка.',
  cssSgColorBgElevated: 'Фон дропдауна',
  cssSgColorBgHover: 'Подсветка опции на ховере',
  cssSgColorText: 'Цвет текста опции',
  cssSgColorTextTertiary: 'Цвет side-label в AsyncSearch демо',
  cssSgBorderRadius: 'Радиус дропдауна',
  cssSgShadowLg: 'Тень дропдауна',
  cssSgPaddingXs: 'Вертикальный паддинг дропдауна и опции',
  cssSgPaddingMd: 'Горизонтальный паддинг опции',
  cssSgTransitionDuration: 'Переход фона опции на ховере',
}
