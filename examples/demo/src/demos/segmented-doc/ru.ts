import { segmentedDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `segmentedDocEn`, no extras.
 */
export const segmentedDocRu: { [K in keyof typeof segmentedDocEn]: string } = {
  pageTitle: 'Segmented',
  pageBadge: 'Ввод данных',
  crumbDataEntry: 'Ввод данных',
  crumbSegmented: 'Segmented',
  pageLead:
    'Селектор взаимоисключающих вариантов. Легче, чем Tabs, выразительнее, чем Radio Group.',
  pageWhen1: 'Небольшой фиксированный набор взаимоисключающих режимов или представлений.',
  pageWhen2:
    'Вместо Tabs, когда варианты короткие, плоские и показываются инлайн (фильтры, переключатели вида).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Передайте массив строк — Segmented сделает остальное.',
  demoControlledTitle: 'Контролируемый',
  demoControlledDesc: 'Управляйте выбором из state для интеграции с URL, reducer’ами или формами.',
  demoWithIconsTitle: 'С иконками',
  demoWithIconsDesc: 'Передавайте объекты, чтобы смешать иконки и подписи — или только иконки.',
  demoBlockTitle: 'Block',
  demoBlockDesc: 'Растягивается на всю ширину контейнера для full-width тулбаров.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc: 'Отключить весь контрол или отдельные опции.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Маленький, средний, большой.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc: 'Скоуп токенов track / thumb для перекраски контрола.',

  tableSegmentedApi: 'API Segmented',
  tableCssVars: 'CSS-переменные',

  propOptions: 'Описания сегментов — строки или объекты с label/value/icon/disabled',
  propValue: 'Контролируемое выбранное значение',
  propDefaultValue: 'Начальное значение в неконтролируемом режиме (по умолчанию — первая опция)',
  propOnChange: 'Срабатывает при изменении выбора',
  propBlock: 'Растягивать на всю ширину контейнера',
  propDisabled: 'Отключить весь контрол (также наследуется от ConfigProvider)',
  propSize: 'Пресет height / padding / font-size (также наследуется от ConfigProvider)',
  propClassName: 'Дополнительный class на корневом элементе',
  propStyle: 'Inline-стиль на корневом элементе',
  propUnstyled: 'Убрать все стили sg-segmented-* и отрисовать нативную radio-group',

  cssHint:
    'У Segmented нет собственных локальных токенов. Трек использует `--sg-color-bg-secondary`, выбранный thumb — `--sg-color-bg-container` + `--sg-shadow-sm`. Ребрендинг — через скоуп этих токенов на обёртке.',

  cssSgColorBgSecondary: 'Фон трека (рейка под сегментами)',
  cssSgColorBgContainer: 'Фон «thumb» выбранного сегмента',
  cssSgColorText: 'Цвет подписи выбранного / при наведении',
  cssSgColorTextSecondary: 'Цвет подписи в покое',
  cssSgColorTextDisabled: 'Цвет подписи в отключённом состоянии',
  cssSgBorderRadius: 'Радиус внешнего трека',
  cssSgBorderRadiusSm: 'Радиус сегмента (внутренний thumb)',
  cssSgShadowSm: 'Подъём (тень) выбранного thumb',
  cssSgHeightSm: 'Высота сегмента при `size="small"`',
  cssSgHeightMd: 'Высота сегмента при `size="middle"`',
  cssSgHeightLg: 'Высота сегмента при `size="large"`',
  cssSgPaddingXs: 'Зазор между иконкой и подписью внутри сегмента',
  cssSgPaddingSm: 'Горизонтальные отступы при `size="small"`',
  cssSgPaddingMd: 'Горизонтальные отступы при `size="middle"`',
  cssSgPaddingLg: 'Горизонтальные отступы при `size="large"`',
  cssSgFontSizeSm: 'Размер подписи при `size="small"`',
  cssSgFontSize: 'Размер подписи при `size="middle"`',
  cssSgFontSizeLg: 'Размер подписи при `size="large"`',
  cssSgTransitionDuration: 'Длительность перехода hover / selection',
  cssSgTransitionTiming: 'Общая кривая сглаживания',
}
