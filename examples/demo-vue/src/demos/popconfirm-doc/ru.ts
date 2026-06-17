import { popconfirmDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `popconfirmDocEn`, no extras.
 */
export const popconfirmDocRu: { [K in keyof typeof popconfirmDocEn]: string } = {
  pageTitle: 'Popconfirm',
  pageBadge: 'Обратная связь',
  crumbCategory: 'Обратная связь',
  crumbPopconfirm: 'Popconfirm',
  pageLead:
    'Компактный confirm-диалог, привязанный к триггеру. Легче Modal, заметнее Tooltip, с focus trap пока открыт.',
  pageWhen1: 'Деструктивные действия на уровне строки в таблицах / списках (delete, archive).',
  pageWhen2: 'Действия в тулбаре с last-chance подтверждением, но без модалки.',
  pageWhen3: 'Везде, где нужно "Точно?" без перерыва в потоке страницы.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Колбэки confirm / cancel и inline-строка статуса.',
  demoDescTitle: 'Title + description',
  demoDescDesc: 'Вторая строка под заголовком, рядом с warning-иконкой.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc: 'Четыре стороны, без auto-flip.',
  demoDisabledTitle: 'Disabled = pass-through',
  demoDisabledDesc: 'При disabled срабатывает собственный @click триггера, без всплытия bubble.',
  demoTableTitle: 'Удаление строки',
  demoTableDesc: "Каноничное использование в таблице — placement='left' держит bubble внутри тела.",
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  tablePopconfirmApi: 'API Popconfirm',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Popconfirm нет приватных токенов — используется общая палитра. `--sg-color-warning` — иконка, `--sg-color-primary` — кнопка OK. Для косметики (тень, радиус) — глобальные `*-lg`.',

  propTitle: 'Основной вопрос подтверждения — рядом с ⚠',
  propDescription: 'Опциональная вторая строка под заголовком',
  propOkText: 'Подпись primary-кнопки',
  propCancelText: 'Подпись secondary-кнопки',
  propPlacement: 'Сторона триггера, с которой открывается bubble',
  propDisabled: 'Пропустить confirm; триггер сразу запускает собственный @click',
  propUnstyled: 'Убрать все классы sg-popconfirm-* (headless-режим)',
  emitConfirm: 'Эмитится при нажатии OK',
  emitCancel: 'Эмитится при нажатии Cancel',
  slotDefault: 'Один триггер-элемент, открывающий bubble по клику',

  cssBgElevated: 'Фон bubble и заливка стрелки',
  cssBorderSecondary: 'Граница bubble и стрелки',
  cssText: 'Цвет заголовка',
  cssTextSecondary: 'Цвет описания',
  cssWarning: 'Цвет warning-иконки рядом с заголовком',
  cssPrimary: 'Primary-кнопка OK — меняйте для рестайла confirm-действия',
  cssFontSize: 'Размер шрифта заголовка',
  cssFontSizeSm: 'Размер шрифта описания',
  cssFontSizeLg: 'Размер warning-иконки',
  cssPaddingSm: 'Зазор иконка ↔ заголовок и между кнопками',
  cssPaddingMd: 'Padding bubble',
  cssMarginXs: 'Зазор заголовок ↔ описание',
  cssRadiusLg: 'Радиус углов bubble',
  cssShadowLg: 'Тень bubble',
}
