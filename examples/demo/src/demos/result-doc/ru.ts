import { resultDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `resultDocEn`, no extras.
 */
export const resultDocRu: { [K in keyof typeof resultDocEn]: string } = {
  pageTitle: 'Result',
  pageLead:
    'Раскладка страницы результата с пресетами иконок для success / error / info / warning и классическими экранами 404 / 403 / 500.',
  pageWhen1: 'После деструктивного или долгого действия, когда тоста недостаточно.',
  pageWhen2: 'Полноэкранные страницы ошибок (404 / 403 / 500 и т. п.).',
  pageWhen3: 'Управляемые сценарии (checkout, онбординг), завершающиеся экраном подтверждения.',

  demoSuccessTitle: 'Успех',
  demoSuccessDesc: 'Счастливый путь с основным CTA.',
  demoErrorTitle: 'Ошибка',
  demoErrorDesc: 'Негативный исход с CTA восстановления.',
  demoInfoTitle: 'Info и warning',
  demoInfoDesc: 'Мягкие варианты для нейтральных состояний или состояний внимания.',
  demoHttpTitle: 'HTTP-ошибки',
  demoHttpDesc: 'Встроенная иллюстрация для 404 / 403 / 500.',
  demoIconTitle: 'Своя иконка',
  demoIconDesc: 'Замените пресет на эмодзи / SVG / иконку из библиотеки.',
  demoContentTitle: 'С контентом',
  demoContentDesc: '`children` отрисовываются внутри мягкой панели для диагностики.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Брендинг через CSS-переменные — оттенки статуса + панель контента.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Сохранить aria и структуру; раскраска ваша.',

  tableResultApi: 'API Result',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Result нет приватных токенов — он читает глобальную палитру статусов (`--sg-color-success/error/warning/primary`) для иконок и стандартные токены текста и отступов для раскладки. Скоупьте их на обёртке, чтобы локально перебрендить.',

  propStatus: 'Пресет исхода — задаёт дефолтную иконку и оттенок',
  propTitle: 'Основной заголовок',
  propSubTitle: 'Поясняющий текст под заголовком',
  propIcon: 'Переопределить иконку пресета — эмодзи / SVG / любой node',
  propExtra: 'Ряд кнопок действий, центрированный под подзаголовком',
  propChildren: 'Опциональная панель контента под `extra`',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы sg-result-* (headless-режим)',

  cssSuccess: 'Цвет иконки для `status="success"`',
  cssError: 'Цвет иконки для `status="error"`',
  cssWarning: 'Цвет иконки для `status="warning"`',
  cssPrimary: 'Цвет иконки для `status="info"`',
  cssTextTertiary: 'Цвет иконки для 404 / 403 / 500 и приглушённого текста',
  cssText: 'Цвет заголовка',
  cssTextSecondary: 'Цвет подзаголовка',
  cssBgSecondary: 'Фон панели контента `children`',
  cssFontSize: 'Размер подзаголовка',
  cssFontSizeXl: 'Размер заголовка',
  cssLineHeight: 'Line-height параграфа',
  cssPaddingLg: 'Горизонтальные отступы обёртки + отступы панели `children`',
  cssPaddingXl: 'Вертикальные отступы обёртки',
  cssPaddingSm: 'Зазор между кнопками `extra`',
  cssMarginSm: 'Зазор заголовок → подзаголовок',
  cssMarginLg: 'Зазор между блоками иконка / подзаголовок / extra',
  cssRadius: 'Скругление углов панели `children`',
}
