import { popconfirmDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `popconfirmDocEn`, no extras.
 */
export const popconfirmDocRu: { [K in keyof typeof popconfirmDocEn]: string } = {
  pageTitle: 'Popconfirm',
  pageLead:
    'Компактный диалог подтверждения, привязанный к триггеру. Легче чем Modal, заметнее чем Tooltip; пока открыт — focus trap.',
  pageWhen1: 'Деструктивные действия в строках таблиц / списков (удалить, архивировать).',
  pageWhen2: 'Действия панели инструментов, которым нужен последний шанс отказаться без modal.',
  pageWhen3: 'Везде, где нужно «Точно?» без выпадения из потока страницы.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Колбэки confirm / cancel и инлайн-статус.',
  demoDescTitle: 'Заголовок + описание',
  demoDescDesc: 'Вторая строка под заголовком, рядом с иконкой предупреждения.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc: 'Четыре стороны, без авто-флипа.',
  demoDisabledTitle: 'Disabled = pass-through',
  demoDisabledDesc: 'При disabled срабатывает onClick самого триггера, без bubble.',
  demoTableTitle: 'Удаление в строке',
  demoTableDesc: "Канонический сценарий для таблиц — placement='left' держит bubble внутри тела.",
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Перекрасьте поверхности через --sg-color-bg-elevated, --sg-color-warning и --sg-color-primary.',

  tablePopconfirmApi: 'API Popconfirm',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Popconfirm нет собственных токенов — переиспользует палитру поверхностей и текста. Меняйте `--sg-color-warning` для иконки, `--sg-color-primary` — для брендинга OK. Для чистой косметики (тень, радиус) скоупьте глобальные `*-lg`.',

  propTitle: 'Основной вопрос подтверждения — рядом с иконкой ⚠',
  propDescription: 'Опциональная вторая строка под заголовком',
  propOnConfirm: 'Срабатывает на нажатие OK',
  propOnCancel: 'Срабатывает на нажатие Cancel',
  propOkText: 'Подпись основной кнопки',
  propCancelText: 'Подпись вторичной кнопки',
  propPlacement: 'Сторона триггера, с которой открывается bubble',
  propDisabled: 'Полностью пропустить confirm; триггер срабатывает своим onClick',
  propChildren: 'Один элемент, по клику на который открывается bubble',
  propClassName: 'className обёртки',
  propUnstyled: 'Убрать классы sg-popconfirm-* (headless-режим)',

  cssBgElevated: 'Фон bubble + заливка стрелки',
  cssBorderSecondary: 'Граница bubble + граница стрелки',
  cssText: 'Цвет заголовка',
  cssTextSecondary: 'Цвет описания',
  cssWarning: 'Цвет иконки предупреждения рядом с заголовком',
  cssPrimary: 'Основная кнопка OK — меняйте для смены подтверждающего действия',
  cssFontSize: 'Размер шрифта заголовка',
  cssFontSizeSm: 'Размер шрифта описания',
  cssFontSizeLg: 'Размер иконки предупреждения',
  cssPaddingSm: 'Зазор иконка ↔ заголовок и зазор между кнопками',
  cssPaddingMd: 'Внутренние отступы bubble',
  cssMarginXs: 'Зазор заголовок ↔ описание',
  cssRadiusLg: 'Скругление углов bubble',
  cssShadowLg: 'Тень bubble',
}
