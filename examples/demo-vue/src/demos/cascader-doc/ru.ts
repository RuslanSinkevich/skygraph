import { cascaderDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `cascaderDocEn`,
 * no extras.
 */
export const cascaderDocRu: { [K in keyof typeof cascaderDocEn]: string } = {
  pageTitle: 'Cascader',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbCascader: 'Cascader',
  pageLead:
    'Колоночный picker для упорядоченных иерархических данных: регион → город → район, таксономия → подкатегория → тег и т. д.',
  pageWhen1: 'Когда значение — путь, а не одиночный узел (область + город + район).',
  pageWhen2:
    'Когда опции образуют чёткую иерархию и колонка-за-колонкой быстрее, чем глубокое дерево.',
  pageWhen3:
    'Когда полезен commit на промежуточном уровне (`change-on-select`) или встроенный поиск по путям.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый drill-down с value и labels.',
  demoDefaultValueTitle: 'Значение по умолчанию',
  demoDefaultValueDesc: 'Неуправляемый cascader с предустановленным путём.',
  demoHoverTriggerTitle: 'Hover-триггер',
  demoHoverTriggerDesc: 'Открывать следующую колонку по hover для быстрого drill-down.',
  demoChangeOnSelectTitle: 'Change on select',
  demoChangeOnSelectDesc: 'Commit на каждом уровне, не только на leaf.',
  demoSearchTitle: 'Поиск',
  demoSearchDesc:
    'Встроенный поиск. `{ filter }` подменяет матчер по умолчанию (также допустимо boolean для простых случаев).',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc:
    '`multiple` хранит каждый зафиксированный путь как удаляемый tag; `max-tag-count` сворачивает overflow.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small / middle / large — в одном ритме с Input + Select.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Отключить весь контрол или отдельные опции.',
  demoCustomRenderTitle: 'Кастомный триггер',
  demoCustomRenderDesc: 'Заменить лейбл триггера форматтером `(labels, options) => string`.',
  demoAsyncLoadTitle: 'Async-загрузка',
  demoAsyncLoadDesc:
    'Пометь узел `isLeaf: false`; по клику cascader вызывает `load-data(selectedOptions)` и показывает спиннер, пока children не подгрузятся.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc:
    'Три скоупа на токенах Cascader: зелёный бренд, тёмное поле (с панелями) и glass pick.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись на контроле Cascader: уезжает вверх при фокусе или когда путь выбран.',
  tableCascaderApi: 'API Cascader',
  tableOption: 'CascaderOption',
  tableCssVars: 'CSS-переменные',

  propOptions: 'Опции верхнего уровня; каждая может содержать children',
  propModelValue: 'Выбранный путь от корня до текущего значения (`v-model`)',
  propValue: 'Совместимый псевдоним `modelValue`',
  propDefaultValue: 'Начальный путь в неуправляемом режиме',
  propPlaceholder: 'Placeholder триггера',
  propAllowClear: 'Показывать кнопку очистки (×) при наличии значения',
  propDisabled: 'Отключить весь cascader',
  propSize: 'Согласовано с Input/Select',
  propShowSearch: 'Включить поиск; `{ filter }` подменяет матчер по умолчанию',
  propExpandTrigger: 'Открывать следующую колонку по клику или hover',
  propChangeOnSelect: 'Commit на каждом уровне, не только на leaf',
  propDisplayRender: 'Кастомный форматтер лейбла триггера `(labels, options) => string`',
  propMultiple: 'Разрешить несколько leaf-путей как удаляемые tag-и',
  propMaxTagCount: 'Максимум видимых tag-ов в режиме `multiple` перед "+N"',
  propLoadData: 'Async-загрузчик children `(selectedOptions) => void`',
  propUnstyled: 'Убрать классы SkyGraph — оставить только семантику',
  emitUpdateModelValue: 'Эмитится со следующим путём (используется `v-model`)',
  emitChange: 'Эмитится `(value, selectedOptions)` — полный путь + resolved option chain',

  optionValue: 'Стабильное значение этого уровня',
  optionLabel: 'Подпись (строка)',
  optionChildren: 'Вложенные опции',
  optionDisabled: 'Затемнить и блокировать выбор',
  optionIsLeaf: 'Установи `false`, чтобы пометить async-children (работает с `load-data`)',

  cssHint:
    'У Cascader нет компонентных токенов — он полностью построен на глобальной палитре. Для перекраски — скоуп глобалов на обёртке.',

  cssSgColorPrimary: 'Цвет focus-бордера, индикатора активной строки',
  cssSgColorPrimaryHover: 'Цвет hover-бордера триггера',
  cssSgColorPrimaryBg: 'Focus-glow + фон активной строки',
  cssSgColorBgContainer: 'Фон триггера и панели',
  cssSgColorBgElevated: 'Фон поверхности дропдауна',
  cssSgColorBgHover: 'Фон строки на ховере',
  cssSgColorText: 'Цвет текста опций и значения',
  cssSgColorTextPlaceholder: 'Placeholder и текст пустой панели',
  cssSgColorTextTertiary: 'Стрелка-разделитель, базовая иконка clear',
  cssSgColorTextDisabled: 'Цвет текста disabled-опции',
  cssSgColorBorder: 'Бордер триггера',
  cssSgColorBorderSecondary: 'Разделитель колонок',
  cssSgBorderRadius: 'Радиус триггера и панели',
  cssSgBorderRadiusSm: 'Радиус тегов',
  cssSgShadowLg: 'Тень дропдауна',
  cssSgFontSize: 'Базовый размер шрифта',
  cssSgFontSizeSm: 'Шрифт small',
  cssSgFontSizeLg: 'Шрифт large',
  cssSgHeightSm: 'Min-height триггера small',
  cssSgHeightMd: 'Min-height триггера default',
  cssSgHeightLg: 'Min-height триггера large',
  cssSgPaddingXs: 'Вертикальный паддинг и зазор строк',
  cssSgPaddingSm: 'Зазор иконки опции',
  cssSgPaddingMd: 'Горизонтальный паддинг строки',
  cssSgPaddingLg: 'Паддинг пустой панели',
  cssSgTransitionDuration: 'Hover / focus transition',
  cssSgTransitionTiming: 'Easing transition',
}
