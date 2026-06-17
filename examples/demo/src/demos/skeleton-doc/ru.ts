import { skeletonDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `skeletonDocEn`, no extras.
 */
export const skeletonDocRu: { [K in keyof typeof skeletonDocEn]: string } = {
  pageTitle: 'Skeleton',
  pageLead:
    'Плейсхолдер с учётом раскладки на время загрузки контента — блоки avatar, title и paragraph, опциональная шиммер-анимация.',
  pageWhen1: 'Элементы фида / списка, зависящие от сетевого запроса.',
  pageWhen2: 'Карточки и виджеты дашборда, гидрирующиеся после mount.',
  pageWhen3:
    'Любой экран, где переключение плейсхолдера на контент не должно прыгать по раскладке.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Заголовок + 3 строки, без анимации.',
  demoActiveTitle: 'Активная анимация',
  demoActiveDesc: 'Включить шиммер для долгоживущих плейсхолдеров.',
  demoAvatarTitle: 'С аватаром',
  demoAvatarDesc: 'Форма профиля / элемента фида.',
  demoRowsTitle: 'Строки и ширины параграфа',
  demoRowsDesc: 'Совместите количество строк и ширины с реальным контентом.',
  demoNoTitleTitle: 'Убрать блоки',
  demoNoTitleDesc: 'Скрыть title / paragraph / avatar выборочно.',
  demoLoadingTitle: 'Loading → подмена на контент',
  demoLoadingDesc: 'Переключите `loading`, чтобы подменить skeleton на `children` на месте.',
  demoCardTitle: 'Композиция карточки',
  demoCardDesc: 'Соберите несколько Skeleton, чтобы повторить сетку карточек.',
  demoTokensTitle: 'Кастомные темы скелета',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tableSkeletonApi: 'API Skeleton',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Skeleton использует два собственных токена — `--sg-skeleton-bg` (заливка плейсхолдера) и `--sg-skeleton-shimmer` (блик анимации). Меняйте оба на обёртке для тёмного режима или брендированного плейсхолдера; шиммер всегда читается, потому что блик ярче базы.',

  propActive: 'Включить шиммер-анимацию',
  propAvatar: 'Показать плейсхолдер аватара; объектная форма задаёт `size` и `shape`',
  propTitle: 'Показать полосу заголовка; объектная форма задаёт `width`',
  propParagraph:
    'Показать строки параграфа; объектная форма задаёт `rows` и `width` для каждой строки',
  propLoading: 'При `false` рендерится `children` вместо skeleton',
  propChildren: 'Реальный контент, отрисовываемый при `loading=false`',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы sg-skeleton-* (headless-режим)',

  cssSkeletonBg: 'Цвет заливки плейсхолдера (avatar / title / rows)',
  cssSkeletonShimmer: 'Цвет блика в градиенте шиммера (`active`)',
  cssRadius: 'Скругление углов квадратного аватара',
  cssRadiusSm: 'Скругление углов строк title и paragraph',
  cssPaddingLg: 'Зазор между аватаром и блоком контента',
  cssMarginSm: 'Зазор между строками параграфа',
  cssMarginMd: 'Зазор от заголовка до блока параграфа',
}
