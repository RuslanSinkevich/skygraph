import { autoCompleteDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `autoCompleteDocEn`, no extras.
 */
export const autoCompleteDocRu: { [K in keyof typeof autoCompleteDocEn]: string } = {
  pageTitle: 'AutoComplete',
  pageLead:
    'Текстовое поле с выпадающим списком отфильтрованных подсказок. Введённая строка — это и есть значение; выбор подсказки просто записывает её обратно.',
  pageWhen1: 'Свободный ввод, где вероятны несколько известных значений (города, почта, теги).',
  pageWhen2: 'Префиксы email: автодополнение известных доменов после ввода локальной части.',
  pageWhen3: 'Асинхронный поиск на сервере — `onSearch` + `loading` показывают прогресс.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Статичные подсказки, фильтрация по label на клиенте.',
  demoEmailTitle: 'Подсказки доменов почты',
  demoEmailDesc: 'Список выводится из текущего ввода — классическое поведение почтового клиента.',
  demoAsyncTitle: 'Асинхронный поиск',
  demoAsyncDesc: 'Debounced onSearch и состояние loading для серверных запросов.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small / default / large, согласовано с Input.',
  demoStatesTitle: 'Состояния',
  demoStatesDesc: 'Disabled и loading.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа — зелёный бренд, тёмное поле, glass pick — перекрашивают один AutoComplete.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись над полем — уезжает вверх при фокусе или после ввода. Чистый CSS + управляемое значение.',

  tableAutoCompleteApi: 'API AutoComplete',
  tableOptionApi: 'AutoCompleteOption',
  tableCssVars: 'CSS-переменные',

  propValue: 'Управляемое текстовое значение',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propOptions: 'Строки-подсказки (фильтруются по label)',
  propPlaceholder: 'Placeholder поля',
  propOnChange: 'Срабатывает при изменении текста (ввод или выбор)',
  propOnSearch: 'Срабатывает на каждое нажатие — для асинхронного поиска',
  propOnSelect: 'Срабатывает при клике по подсказке',
  propOnBlur: 'Срабатывает при потере фокуса',
  propSize: 'Высота (согласовано с Input)',
  propDisabled: 'Блокировать взаимодействие',
  propLoading: 'Inline-спиннер и блокировка взаимодействия',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы SkyGraph (headless-режим)',

  propOptionValue: 'Строка, записываемая в поле при выборе',
  propOptionLabel: 'Текст в списке и используемый для фильтрации',

  cssHint:
    'AutoComplete переиспользует весь набор `--sg-input-*` для самого поля; выпадающий список использует те же глобалы, что и Select (bg-elevated, bg-hover, shadow-lg, border-radius).',

  cssSgInputAll: 'AutoComplete переиспользует весь набор --sg-input-* для самого поля — см. Input.',
  cssSgColorBgElevated: 'Фон выпадающего списка',
  cssSgColorBgHover: 'Подсветка при наведении на подсказку',
  cssSgColorText: 'Цвет текста подсказки',
  cssSgColorTextTertiary: 'Цвет inline-спиннера при загрузке',
  cssSgBorderRadius: 'Скругление выпадающего списка',
  cssSgShadowLg: 'Тень выпадающего списка',
  cssSgPaddingXs: 'Вертикальные отступы списка и опции (top/bottom)',
  cssSgPaddingMd: 'Горизонтальные отступы опции',
  cssSgTransitionDuration: 'Переход фона при наведении на опцию',
}
