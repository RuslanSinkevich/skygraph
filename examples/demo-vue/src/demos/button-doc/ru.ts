import { buttonDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `buttonDocEn`,
 * no extras.
 */
export const buttonDocRu: { [K in keyof typeof buttonDocEn]: string } = {
  pageTitle: 'Button',
  pageBadge: 'Общие',
  crumbGeneral: 'Общие',
  crumbButton: 'Кнопка',
  pageLead:
    'Запуск действий. Пять визуальных вариантов, три размера, состояния загрузки и отключения, набор локальных токенов компонента. У Vue-варианта дополнительно есть `danger` и `block`.',
  pageWhen1: 'Кнопка означает операцию — по клику запускается бизнес-логика.',
  pageWhen2:
    'Primary — основное действие, default — вторичное, dashed — «добавить», text / link — для инлайн-панелей.',

  demoTypesTitle: 'Типы',
  demoTypesDesc: 'Default, primary, dashed, text, link.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Маленький, средний, большой.',
  demoLoadingTitle: 'Загрузка',
  demoLoadingDesc: 'Встроенный Spin, aria-busy и блокировка кликов.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc: 'Затемнение и aria-disabled для всех вариантов.',
  demoIconTitle: 'С иконкой',
  demoIconDesc: 'Flex-gap выравнивает иконку и подпись на любом размере.',
  demoTokensTitle: 'Токены компонента',
  demoTokensDesc: 'Скоуп `--sg-btn-*` для локальной формы (pill, крупнее, компактнее).',
  demoBrandTitle: 'Бренд в скоупе',
  demoBrandDesc: 'Переопределите `--sg-color-primary*` для поддерева.',

  tableButtonApi: 'API Button',
  tableCssVars: 'CSS-переменные',

  propType: 'Визуальный вариант',
  propSize: 'Размер кнопки (наследуется от ConfigProvider)',
  propHtmlType: 'Нативный атрибут type элемента button',
  propDanger: 'Визуально помечает деструктивное действие',
  propBlock: 'Растягивает кнопку на всю ширину родителя',
  propDisabled: 'Отключить кнопку (также наследуется от ConfigProvider)',
  propLoading: 'Показать встроенный Spin; aria-busy и блокировка кликов',
  emitClick: 'Эмитится по клику; передаётся нативное MouseEvent',

  cssHint:
    'У Button свой скоуп `--sg-btn-*` (высота, отступы, скругление, размер шрифта, фон, цвет, граница) — переопределяйте на обёртке для формы. Палитра тянется из глобальных `--sg-color-primary*` и `--sg-color-text*`, ребрендинг — через primary.',

  cssSgBtnHeight: 'Высота кнопки (локальный токен — с запасом из глобальной шкалы размеров)',
  cssSgBtnPadding: 'Горизонтальные отступы',
  cssSgBtnRadius: 'Скругление углов — до 999px для pill-кнопок',
  cssSgBtnFontSize: 'Размер шрифта подписи',
  cssSgBtnBg: 'Фон (у primary подменяется на `--sg-color-primary`)',
  cssSgBtnColor: 'Цвет подписи',
  cssSgBtnBorder: 'Цвет границы',
  cssSgColorPrimary: 'Базовый цвет для `type="primary" | "link"` + focus ring',
  cssSgColorPrimaryHover: 'Цвет при наведении для primary / link / default',
  cssSgColorPrimaryActive: 'Цвет нажатия',
  cssSgColorPrimaryBg: 'Свечение focus ring',
  cssSgColorWhite: 'Цвет подписи при `type="primary"`',
  cssSgColorBgHover: 'Фон при наведении для `type="text"`',
  cssSgColorBgDisabled: 'Фон в отключённом состоянии',
  cssSgColorTextDisabled: 'Цвет подписи в отключённом состоянии',
  cssSgHeightSm: 'Высота при `size="small"` (через `--sg-btn-height`)',
  cssSgHeightMd: 'Высота при `size="middle"`',
  cssSgHeightLg: 'Высота при `size="large"`',
  cssSgPaddingXs: 'Зазор между иконкой и подписью',
  cssSgPaddingSm: 'Горизонтальные отступы при `size="small"`',
  cssSgPaddingMd: 'Горизонтальные отступы при `size="middle"`',
  cssSgPaddingLg: 'Горизонтальные отступы при `size="large"`',
  cssSgTransitionDuration: 'Длительность перехода при hover / focus',
  cssSgTransitionTiming: 'Общая кривая сглаживания',
}
