import { tooltipDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `tooltipDocEn`, no extras.
 */
export const tooltipDocRu: { [K in keyof typeof tooltipDocEn]: string } = {
  pageTitle: 'Tooltip',
  pageLead:
    'Подсказка по hover с четырьмя вариантами размещения. Контент — любой ReactNode; ARIA describedby подключается автоматически.',
  pageWhen1: 'Объяснение иконки или обрезанной подписи по hover.',
  pageWhen2: 'Раскрытие причины, по которой действие отключено.',
  pageWhen3: 'Показ горячей клавиши или полного значения, обрезанного по ширине.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Наведите курсор на ребёнка, чтобы увидеть подсказку.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc: 'Четыре стороны, без авто-флипа — выбирайте под раскладку.',
  demoRichTitle: 'Сложное содержимое',
  demoRichDesc:
    'title принимает любой ReactNode — оберните широкий контент в div с заданным размером, чтобы перебить дефолтный nowrap.',
  demoDisabledTitle: 'На отключённом элементе',
  demoDisabledDesc:
    'Tooltip слушает обёртку, поэтому disabled-дочки всё равно показывают подсказку.',
  demoIconTitle: 'На иконке info',
  demoIconDesc:
    'Классический паттерн «?» — задайте tabIndex, чтобы клавиатурный пользователь мог сфокусироваться.',
  demoTokensTitle: 'Кастомные стили тултипов',
  demoTokensDesc:
    'Три непохожих скина (мутное стекло, сочный градиент, мягкая карточка) — каждый прокидывает className на обёртку и стилизует `.sg-tooltip-content` / `.sg-tooltip-arrow`.',

  tableTooltipApi: 'API Tooltip',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Tooltip два собственных токена — `--sg-color-tooltip-bg` и `--sg-color-tooltip-text`. Всё остальное (padding, radius, shadow, z-index) из глобальных токенов. Скоупьте их на обёртке, чтобы переоформить без правки глобальной темы.',

  propTitle: 'Содержимое подсказки — строка или ReactNode',
  propPlacement: 'Сторона триггера, с которой показывать подсказку',
  propChildren: 'Один элемент, который оборачивает Tooltip',
  propClassName: 'className обёртки',
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
