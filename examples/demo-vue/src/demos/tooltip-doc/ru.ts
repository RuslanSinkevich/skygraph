import type { tooltipDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `tooltipDocEn`, no extras.
 */
export const tooltipDocRu: { [K in keyof typeof tooltipDocEn]: string } = {
  pageTitle: 'Tooltip',
  pageLead:
    'Подсказка по hover с четырьмя вариантами размещения. ARIA describedby подключается автоматически. У Vue `title` — string (без слота под JSX-контент, см. findings).',
  pageWhen1: 'Объяснение иконки или обрезанной подписи по hover.',
  pageWhen2: 'Раскрытие причины, по которой действие отключено.',
  pageWhen3: 'Показ горячей клавиши или полного значения, обрезанного по ширине.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Наведите курсор на ребёнка, чтобы увидеть подсказку.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc: 'Четыре стороны, без авто-флипа — выбирайте под раскладку.',
  demoDisabledTitle: 'На отключённом элементе',
  demoDisabledDesc: 'Tooltip слушает обёртку, поэтому disabled-дочки всё равно показывают подсказку.',
  demoIconTitle: 'На иконке info',
  demoIconDesc: 'Классический паттерн «?» — задайте tabindex, чтобы клавиатурный пользователь мог сфокусироваться.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: '--sg-color-tooltip-bg и --sg-color-tooltip-text — единственные два цветовых токена.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Сохранить поведение и ARIA, поменять всю отрисовку через CSS.',

  tableTooltipApi: 'API Tooltip',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Tooltip два собственных токена — `--sg-color-tooltip-bg` и `--sg-color-tooltip-text`. Всё остальное (padding, radius, shadow, z-index) из глобальных токенов. Скоупьте их на обёртке, чтобы переоформить без правки глобальной темы.',

  propTitle: 'Текстовое содержимое подсказки (у Vue — только string)',
  propPlacement: 'Сторона триггера, с которой показывать подсказку',
  propChildren: 'Один элемент, который оборачивает Tooltip (Vue: default-слот)',
  propUnstyled: 'Убрать классы sg-tooltip-* (headless-режим)',

  cssTooltipBg: 'Фон подсказки + заливка стрелки',
  cssTooltipText: 'Цвет текста подсказки',
  cssFontSizeSm: 'Размер текста подсказки',
  cssPaddingXs: 'Вертикальные отступы подсказки',
  cssPaddingSm: 'Горизонтальные отступы подсказки',
  cssRadiusSm: 'Скругление углов подсказки',
  cssShadow: 'Тень подсказки',
  cssZTooltip: 'Слой стекинга над dropdown / popover',
}
