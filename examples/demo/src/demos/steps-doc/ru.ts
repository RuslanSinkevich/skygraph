import { stepsDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `stepsDocEn`, no extras.
 */
export const stepsDocRu: { [K in keyof typeof stepsDocEn]: string } = {
  pageTitle: 'Steps',
  pageBadge: 'Навигация',
  crumbNavigation: 'Навигация',
  crumbSteps: 'Шаги',
  pageLead:
    'Ведёт пользователя по линейной последовательности. Автоматически выводит `finish / process / wait` из `current`; у каждого шага можно переопределить свой `status`.',
  pageWhen1: 'Задача сложная и распадается на упорядоченные подзадачи.',
  pageWhen2: 'Длинная форма должна быть разбита на навигируемые этапы.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Горизонтальные шаги с авто-выводом статусов.',
  demoClickableTitle: 'Кликабельные',
  demoClickableDesc: 'Передача `onChange` превращает шаги в кнопки.',
  demoVerticalTitle: 'Вертикальные',
  demoVerticalDesc: 'Стек для сайдбаров и высоких визардов.',
  demoErrorTitle: 'Статус ошибки',
  demoErrorDesc: '`status` отдельного шага перебивает `current`.',
  demoCustomIconTitle: 'Своя иконка',
  demoCustomIconDesc: 'Любой узел; цвет всё равно следует статусу шага.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: '`small` и кольца иконки по умолчанию.',
  demoNavigationTitle: 'Navigation',
  demoNavigationDesc: 'Вариант с подчёркиванием как у вкладок, без иконок.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Цвет finish / process следует за `--sg-color-primary`.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Без классов — только `data-status` + ваши элементы.',

  tableStepsApi: 'API Steps',
  tableStepItem: 'StepItem',
  tableCssVars: 'CSS-переменные',

  cssHint:
    'У Steps нет локальных токенов компонента — всё берётся из глобальной палитры. Ребрендинг — через скоуп `--sg-color-primary` (finish / process) и `--sg-color-error` на обёртке.',

  propCurrent: 'Индекс активного шага (с 0)',
  propItems: 'Упорядоченные шаги',
  propDirection: 'Направление раскладки',
  propOnChange: 'Срабатывает при клике на шаг. Наличие prop также делает шаги кликабельными',
  propType: 'Визуальный вариант — default (нумерованные) или navigation (подчёркивание как у вкладок)',
  propSize: 'Пресет иконки / шрифта — наследуется от ConfigProvider',
  propClassName: 'Дополнительный class на корне',
  propStyle: 'Inline-стиль на корне',
  propUnstyled: 'Убрать все стили sg-steps-*; `data-status` на каждой строке остаётся',

  itemTitle: 'Основной заголовок шага',
  itemDescription: 'Вторая строка под заголовком',
  itemIcon: 'Своя иконка (заменяет номер / галочку)',
  itemStatus: 'Принудительный статус (перебивает выведенный из `current`)',

  cssPrimary: 'Заливка текущего шага и цвет завершённого хвоста / кольца',
  cssError: 'Кольцо, подпись и navigation-подчёркивание при `status="error"`',
  cssText: 'Цвет заголовка по умолчанию',
  cssTextDisabled: 'Заголовок и текст иконки при `status="wait"`',
  cssTextTertiary: 'Цвет текста описания',
  cssBorder: 'Кольцо иконки шага в состоянии `wait` / default',
  cssBorderSecondary: 'Соединительный хвост между шагами',
  cssWhite: 'Цвет подписи внутри заполненного `process`-кольца',
  cssFontSize: 'Размер шрифта заголовка',
  cssFontSizeSm: 'Размер описания и заголовка `size="small"`',
  cssFontSizeLg: 'Размер шрифта кастомной иконки внутри кольца',
  cssPaddingSm: 'Зазор между иконкой и контентом',
  cssPaddingLg: 'Отступы вертикальных элементов и navigation-режима',
  cssMarginXs: 'Зазор между заголовком и описанием',
  cssMarginSm: 'Внешний отступ горизонтального хвоста',
  cssTransitionDuration: 'Переходы статусов',
  cssTransitionTiming: 'Общая кривая сглаживания',
}
