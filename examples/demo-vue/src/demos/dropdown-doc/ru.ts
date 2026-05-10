import { dropdownDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `dropdownDocEn`, no extras.
 */
export const dropdownDocRu: { [K in keyof typeof dropdownDocEn]: string } = {
  pageTitle: 'Dropdown',
  pageBadge: 'Навигация',
  crumbCategory: 'Навигация',
  crumbDropdown: 'Dropdown',
  pageLead:
    'Выпадающее меню действий, привязанное к якорю. Открывается по клику или ховеру, полностью доступно с клавиатуры, поддерживает строки danger / disabled / divider.',
  pageWhen1: 'Действия для строки или kebab-меню — иначе шумно как inline-кнопки.',
  pageWhen2: 'Меню типа File / Edit / View, где элементы объединены по смыслу.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Открыть по ховеру; @select получает item.key.',
  demoTriggerTitle: 'Триггер',
  demoTriggerDesc: 'Click для меню действий, hover для chrome.',
  demoPlacementTitle: 'Расположение',
  demoPlacementDesc: 'Четыре угла — выберите тот, что попадает во вьюпорт.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc: 'Меню не открывается; @select не вызывается.',
  demoKeyboardTitle: 'Клавиатура',
  demoKeyboardDesc: 'Space / Enter — открыть, ↑ / ↓ — переход, Esc — закрыть.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Перекрасьте surface, hover и danger-токены на обёртке.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Поведение и обработка клавиатуры остаются — стили подставьте свои.',

  tableDropdownApi: 'API Dropdown',
  tableDropdownItem: 'DropdownItem',
  tableCssVars: 'CSS-переменные',

  cssHint:
    'У Dropdown нет своих токенов — компонент использует палитру elevated-поверхности и фон при наведении. Строки `danger` используют `--sg-color-error` и `--sg-color-error-bg`. Подкрутите `--sg-border-radius-lg` для более скруглённых меню.',

  propItems: 'Строки меню и разделители',
  propTrigger: 'Открыть меню по клику или ховеру',
  propPlacement: 'Угол, к которому привязано меню',
  propDisabled: 'Запрет открытия и выбора',
  propUnstyled: 'Убрать классы sg-dropdown-* (headless-режим)',
  emitSelect: 'Срабатывает с key выбранного элемента',
  slotDefault: 'Элемент, выступающий триггером',

  itemKey: 'Стабильный идентификатор, передаваемый в @select',
  itemLabel: 'Текст строки (string)',
  itemDisabled: 'Заблокировать строку',
  itemDanger: 'Окрасить строку в цвета ошибки',
  itemDivider: 'Отрисовать разделитель вместо строки (label игнорируется)',

  cssBgElevated: 'Фон меню',
  cssBorderSecondary: 'Граница меню и цвет разделителя',
  cssBgHover: 'Фон строки при наведении',
  cssText: 'Цвет текста строки',
  cssTextDisabled: 'Цвет отключённой строки',
  cssError: 'Текст danger-строки',
  cssErrorBg: 'Фон danger-строки при наведении',
  cssFontSize: 'Размер текста строки',
  cssLineHeight: 'Line-height строки',
  cssPaddingXs: 'Вертикальные отступы строки и меню',
  cssPaddingMd: 'Горизонтальные отступы строки',
  cssMarginXs: 'Вертикальные отступы разделителя',
  cssBorderRadiusLg: 'Скругление меню',
  cssShadowLg: 'Тень меню',
  cssZDropdown: 'Слой z-index меню',
  cssTransitionDuration: 'Длительность ховера строки и анимации открытия',
  cssTransitionTiming: 'Общая кривая сглаживания',
}
