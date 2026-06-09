import { breadcrumbDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `breadcrumbDocEn`, no extras.
 */
export const breadcrumbDocRu: { [K in keyof typeof breadcrumbDocEn]: string } = {
  pageTitle: 'Breadcrumb',
  pageBadge: 'Навигация',
  crumbCategory: 'Навигация',
  crumbBreadcrumb: 'Breadcrumb',
  pageLead:
    'Иерархический индикатор местоположения. Последний сегмент неинтерактивен — это текущая страница; всё, что слева, — ссылки.',
  pageWhen1: 'Иерархия в три уровня и глубже, когда нужен путь обратно к родителю.',
  pageWhen2: 'Длинные страницы, где одного заголовка мало для ориентации.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Цепочка из двух ссылок и текущей страницы.',
  demoSeparatorTitle: 'Свой разделитель',
  demoSeparatorDesc: 'Обычная строка — символ, шеврон, точка.',
  demoOnClickTitle: 'Обработчик itemClick',
  demoOnClickDesc: 'Перехват навигации для SPA-роутеров через эмит @itemClick.',
  demoIconsTitle: 'С иконками',
  demoIconsDesc: 'Слот `item` позволяет добавить иконки рядом с подписью.',
  demoDropdownTitle: 'С дропдауном',
  demoDropdownDesc:
    'Встройте `SgDropdown` внутрь слота `item`, чтобы переключаться между соседями.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоупите палитру текста и `--sg-color-primary` для ребрендинга.',
  tableBreadcrumbApi: 'API Breadcrumb',
  tableBreadcrumbItem: 'BreadcrumbItem',
  tableCssVars: 'CSS-переменные',

  cssHint:
    'У Breadcrumb нет своих токенов — переиспользуется палитра текста и `--sg-color-primary` для ховера ссылок. Скоупите их на обёртке для секционной темы — переопределения классов не нужны.',

  propItems: 'Упорядоченная цепочка от корня до текущей страницы',
  propSeparator: 'Строка, отрисованная между сегментами',
  propItemSlot: 'Кастомный рендер сегмента (получает `{ item, index }`)',
  propUnstyled: 'Убрать классы sg-breadcrumb-* (nav и a11y остаются)',
  emitItemClick: 'Срабатывает при клике по сегменту (передаёт item + index)',

  itemTitle: 'Подпись сегмента (string)',
  itemHref: 'Рендерит сегмент как <a href>',

  cssText: 'Цвет обёртки и текущего сегмента (полужирный)',
  cssTextSecondary: 'Цвет связанного сегмента',
  cssTextTertiary: 'Цвет разделителя',
  cssPrimary: 'Цвет ссылки при наведении',
  cssFontSize: 'Размер шрифта сегмента',
  cssLineHeight: 'Line-height обёртки',
  cssPaddingSm: 'Горизонтальные отступы разделителя',
  cssTransitionDuration: 'Переход при наведении на ссылку',
  cssTransitionTiming: 'Общая кривая сглаживания',
}
