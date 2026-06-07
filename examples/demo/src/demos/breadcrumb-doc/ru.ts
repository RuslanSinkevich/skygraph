import { breadcrumbDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `breadcrumbDocEn`, no extras.
 */
export const breadcrumbDocRu: { [K in keyof typeof breadcrumbDocEn]: string } = {
  pageTitle: 'Breadcrumb',
  pageLead:
    'Иерархический индикатор местоположения. Последний сегмент неинтерактивен — это текущая страница; всё, что слева, — ссылки.',
  pageWhen1: 'Иерархия в три уровня и глубже, когда нужен путь обратно к родителю.',
  pageWhen2: 'Длинные страницы, где одного заголовка мало для ориентации.',
  pageWhen3: 'Приложения с роутером — нужна лёгкая навигационная цепочка.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Цепочка из двух ссылок и текущей страницы.',
  demoSeparatorTitle: 'Свой разделитель',
  demoSeparatorDesc: 'Любой ReactNode — символ, шеврон, точка.',
  demoOnClickTitle: 'Обработчики onClick',
  demoOnClickDesc: 'Перехват навигации для SPA-роутеров.',
  demoIconsTitle: 'С иконками',
  demoIconsDesc: 'ReactNode в title — добавьте визуальные подсказки.',
  demoDropdownTitle: 'С Dropdown',
  demoDropdownDesc: 'Встроенный Dropdown в сегменте для перехода к соседним страницам.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоупите палитру текста и `--sg-color-primary` для ребрендинга.',

  tableBreadcrumbApi: 'API Breadcrumb',
  tableBreadcrumbItem: 'BreadcrumbItem',
  tableCssVars: 'CSS-переменные',

  cssHint:
    'У Breadcrumb нет своих токенов — переиспользуется палитра текста и `--sg-color-primary` для ховера ссылок. Скоупите их на обёртке для секционной темы — переопределения классов не нужны.',

  propItems: 'Упорядоченная цепочка от корня до текущей страницы',
  propSeparator: 'Узел, отрисованный между сегментами',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы sg-breadcrumb-* (nav и a11y остаются)',

  itemTitle: 'Содержимое сегмента — ReactNode',
  itemHref: 'Рендерит сегмент как <a href>',
  itemOnClick: 'Обработчик клика; перехватывает навигацию, если задан и href',

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
