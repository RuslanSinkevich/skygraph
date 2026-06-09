import { segmentedDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `segmentedDocEn`, no extras.
 */
export const segmentedDocRu: { [K in keyof typeof segmentedDocEn]: string } = {
  pageTitle: 'Segmented',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbSegmented: 'Segmented',
  pageLead: 'Селектор взаимоисключающих опций. Легче, чем Tabs, богаче, чем Radio Group.',
  pageWhen1: 'Небольшой фиксированный набор взаимоисключающих режимов или представлений.',
  pageWhen2:
    'Вместо Tabs, когда опций мало, они плоские и показываются inline (фильтры, переключатели вида).',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Передайте массив строк — Segmented сделает остальное.',
  demoControlledTitle: 'Управляемый',
  demoControlledDesc:
    'Управляйте выбором из state, чтобы интегрировать с URL, reducer или формами.',
  demoWithIconsTitle: 'С иконками',
  demoWithIconsDesc: 'Поле `icon` на опции (или слот `icon`) — для более насыщенных сегментов.',
  demoBlockTitle: 'Block',
  demoBlockDesc: 'Растягивает по ширине контейнера для full-width тулбаров.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc: 'Отключить весь контрол или отдельные опции.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small, middle, large.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc: 'Скоупим токены track / thumb, чтобы перекрасить контрол.',
  tableSegmentedApi: 'API Segmented',
  tableCssVars: 'CSS-переменные',

  propOptions: 'Определения сегментов — строки или объекты с label/value/icon/disabled',
  propValue: 'Управляемое выбранное значение',
  propDefaultValue: 'Начальное значение в неуправляемом режиме (по умолчанию — первая опция)',
  propBlock: 'Растянуть на всю ширину контейнера',
  propDisabled: 'Отключить весь контрол (наследуется и от ConfigProvider)',
  propSize: 'Пресет высоты / отступа / font-size (наследуется от ConfigProvider)',
  propUnstyled: 'Убрать все стили sg-segmented-* и отрендерить нативную radio-группу',
  emitChange: 'Срабатывает при изменении выбора',

  cssHint:
    'У Segmented нет локальных токенов компонента. Track использует `--sg-color-bg-secondary`, выбранный thumb — `--sg-color-bg-container` + `--sg-shadow-sm`. Ребрендинг — через скоуп этих токенов на обёртке.',

  cssSgColorBgSecondary: 'Фон track (рельса под сегментами)',
  cssSgColorBgContainer: 'Фон выбранного сегмента ("thumb")',
  cssSgColorText: 'Цвет label выбранного / наведённого сегмента',
  cssSgColorTextSecondary: 'Цвет label неактивного сегмента',
  cssSgColorTextDisabled: 'Цвет label отключённого сегмента',
  cssSgBorderRadius: 'Радиус внешнего track',
  cssSgBorderRadiusSm: 'Радиус сегмента (внутренний thumb)',
  cssSgShadowSm: 'Подъём (тень) выбранного thumb',
  cssSgHeightSm: 'Высота сегмента при `size="small"`',
  cssSgHeightMd: 'Высота сегмента при `size="middle"`',
  cssSgHeightLg: 'Высота сегмента при `size="large"`',
  cssSgPaddingXs: 'Зазор между иконкой и label внутри сегмента',
  cssSgPaddingSm: 'Горизонтальный padding при `size="small"`',
  cssSgPaddingMd: 'Горизонтальный padding при `size="middle"`',
  cssSgPaddingLg: 'Горизонтальный padding при `size="large"`',
  cssSgFontSizeSm: 'Размер label при `size="small"`',
  cssSgFontSize: 'Размер label при `size="middle"`',
  cssSgFontSizeLg: 'Размер label при `size="large"`',
  cssSgTransitionDuration: 'Длительность hover / selection переходов',
  cssSgTransitionTiming: 'Общая кривая сглаживания',
}
