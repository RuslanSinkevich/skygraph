import { emptyDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `emptyDocEn`, no extras.
 */
export const emptyDocRu: { [K in keyof typeof emptyDocEn]: string } = {
  pageTitle: 'Empty',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbEmpty: 'Пусто',
  pageLead:
    'Заглушка для пустого состояния — центрированная иллюстрация, подпись и опциональный футер для действий восстановления.',
  pageWhen1: 'Пустые таблицы, списки и результаты поиска.',
  pageWhen2: 'Свежесозданные аккаунты, в которых ещё ничего нет.',
  pageWhen3: 'Состояния «нет совпадений» без ошибки, приглашающие пользователя действовать.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Иллюстрация по умолчанию + подпись.',
  demoDescriptionTitle: 'Своя подпись',
  demoDescriptionDesc: 'Строка или ReactNode — оба варианта подходят.',
  demoNoDescriptionTitle: 'Без подписи',
  demoNoDescriptionDesc: '`description={null}` полностью убирает подпись.',
  demoActionsTitle: 'С действиями',
  demoActionsDesc: 'Добавьте основной CTA через `children`.',
  demoCustomImageTitle: 'Своё изображение',
  demoCustomImageDesc: 'Эмодзи, <img />, SVG, Lottie — что угодно, что рендерится.',
  demoInCardTitle: 'Внутри карточки',
  demoInCardDesc: 'Канонический вариант размещения внутри Table / Card / List.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Перекрасьте иллюстрацию и подпись через CSS-переменные.',

  tableEmptyApi: 'API Empty',
  tableCssVars: 'CSS-переменные',

  propImage: 'Иллюстрация над подписью — по умолчанию встроенная SVG',
  propDescription: 'Подпись; по умолчанию `«No Data»`, скрыта при null',
  propChildren: 'Слот футера для CTA',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать все классы sg-empty-* (headless-режим)',

  cssHint:
    'У Empty нет приватных токенов. Встроенная иллюстрация рисуется через `currentColor` → `--sg-color-text-disabled`; подпись — `--sg-color-text-tertiary`. Отступы — глобальные `--sg-padding-xl` / `--sg-margin-*`.',

  cssSgColorTextDisabled: 'Цвет иллюстрации по умолчанию (currentColor)',
  cssSgColorTextTertiary: 'Цвет описания / подписи',
  cssSgFontSize: 'Размер шрифта подписи',
  cssSgLineHeight: 'Line-height подписи',
  cssSgPaddingXl: 'Вертикальный padding обёртки',
  cssSgMarginSm: 'Отступы изображение → подпись и подпись → футер',
  cssSgMarginMd: 'Отступ подпись → футер (`children`)',
}
