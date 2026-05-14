import { transferDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `transferDocEn`, no extras.
 */
export const transferDocRu: { [K in keyof typeof transferDocEn]: string } = {
  pageTitle: 'Transfer',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbTransfer: 'Transfer',
  pageLead:
    'Двухколоночный shuttle для выбора подмножества элементов. Встроенный поиск, per-row disabled, one-way режим и темизация через CSS-токены.',
  pageWhen1: 'Когда нужно разделить набор на «доступно» и «выбрано» — права роли, теги, аудитория.',
  pageWhen2: 'Когда multi-Select слишком тесный, а порядок не важен.',
  pageWhen3:
    'Для расширенных лейблов (title + description) — используйте слот `item`, он получает целый TransferItem.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управление через `v-model` / `target-keys`.',
  demoSearchTitle: 'С поиском',
  demoSearchDesc: 'Фильтр в каждой колонке по title.',
  demoOneWayTitle: 'One-way',
  demoOneWayDesc: 'Скрываем кнопку move-left.',
  demoTitlesTitle: 'Заголовки',
  demoTitlesDesc: 'Свои заголовки колонок.',
  demoCustomRenderTitle: 'Кастомный рендер',
  demoCustomRenderDesc: 'Слот `item` подменяет дефолтную подпись более насыщенным лейблом.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Контрол целиком + per-row `disabled`.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc: 'Перекрашиваем панели через глобальную палитру.',

  tableTransferApi: 'API Transfer',
  tableTransferItem: 'TransferItem',
  tableCssVars: 'CSS-переменные',

  propDataSource: 'Все элементы — разделяются между source / target по `target-keys`',
  propModelValue: 'Привязка через v-model (Vue-идиома) для ключей правой колонки',
  propTargetKeys: 'Совместимый алиас для `modelValue`',
  propDefaultTargetKeys: 'Начальные target-keys в неуправляемом режиме',
  propShowSearch: 'Search-input над каждой колонкой (поиск по `title`)',
  propTitles: 'Заголовки колонок [source, target]',
  propOneWay: 'Скрыть кнопку move-left — элементы только в target',
  propDisabled: 'Disable обеих колонок (наследуется от `ConfigProvider`)',
  propItemSlot: 'Кастомный рендер строки — получает `{ item, side }`',
  propUnstyled: 'Снять все sg-transfer-* классы',
  emitUpdateModelValue: 'Срабатывает с новыми target-keys (v-model)',
  emitChange: 'Срабатывает после move: `(keys, direction, moveKeys)`',
  emitSelectChange: 'Срабатывает при изменении выбора чекбоксов в любой колонке',

  itemKey: 'Стабильный id — наличие в `target-keys` определяет колонку',
  itemTitle: 'Основная подпись + текст для поиска',
  itemDescription: 'Вторая строка — отображается через слот `item`',
  itemDisabled: 'Исключить из выбора / bulk-move',

  cssHint:
    'У Transfer нет component-local токенов. Перекрашивайте через глобальную палитру — chrome панелей опирается на `--sg-color-border`, `--sg-color-bg-secondary` (header), `--sg-color-bg-hover` (row) и `--sg-color-primary-bg` (selected).',

  cssSgColorBgContainer: 'Фон панели списка',
  cssSgColorBgSecondary: 'Фон шапки списка',
  cssSgColorBgHover: 'Hover-фон строки',
  cssSgColorPrimaryBg: 'Фон выбранной строки',
  cssSgColorBorder: 'Граница панели',
  cssSgColorBorderSecondary: 'Разделители шапки / поиска',
  cssSgColorText: 'Текст body',
  cssSgColorTextSecondary: 'Цвет счётчика / meta шапки',
  cssSgColorTextDisabled: 'Текст disabled-строки',
  cssSgBorderRadius: 'Внешний радиус панели',
  cssSgFontSize: 'Размер шрифта строки',
  cssSgFontSizeSm: 'Размер счётчика в шапке',
  cssSgPaddingXs: 'Вертикальный padding строки',
  cssSgPaddingSm: 'Вертикальный padding шапки + gap operation-кнопок',
  cssSgPaddingMd: 'Зазор между панелями + горизонтальный padding',
  cssSgHeightMd: 'Минимальная ширина operation-кнопки (move)',
  cssSgTransitionDuration: 'Переход hover строки',
}
