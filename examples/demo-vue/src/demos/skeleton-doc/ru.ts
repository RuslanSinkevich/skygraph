import type { SkeletonDocStrings } from './en'

export const skeletonDocRu: SkeletonDocStrings = {
  pageTitle: 'Skeleton',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbSkeleton: 'Skeleton',
  pageLead:
    'Layout-placeholder для асинхронного контента — заголовок, абзац, опционально аватар. Подбирай форму под итоговый контент, чтобы избежать «прыжков».',
  pageWhen1: 'Первая отрисовка карточек / списков / panels.',
  pageWhen2: 'Длинные операции, где нужен сигнал «ещё работаю» (`active`).',
  pageWhen3: 'Pre-fetched маршруты, где layout известен, но контент ещё грузится.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Заголовок + 3 строки абзаца, без анимации.',
  demoActiveTitle: 'Active',
  demoActiveDesc: '`active` запускает 1.5s shimmer-анимацию.',
  demoWithAvatarTitle: 'С аватаром',
  demoWithAvatarDesc: '`avatar` добавляет круг / квадрат, настраиваемый.',
  demoNoTitleTitle: 'Убрать части',
  demoNoTitleDesc: 'Скрыть title / paragraph; включить avatar; задать ширины.',
  demoLoadingTitle: 'Toggle loading',
  demoLoadingDesc: '`:loading="false"` показывает дефолтный слот вместо скелета.',
  demoRowsTitle: 'Свои строки',
  demoRowsDesc: '`:paragraph="{ rows, width }"` задаёт форму абзаца.',
  demoCardTitle: 'Сетка карточек',
  demoCardDesc: 'Composing нескольких Skeleton для итогового layout.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  tableSkeletonApi: 'API Skeleton',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Skeleton два собственных токена — `--sg-skeleton-bg` (заливка плейсхолдера) и `--sg-skeleton-shimmer` (блик анимации). Меняй оба на обёртке для тёмного режима или фирменного плейсхолдера.',

  propActive: 'Включить shimmer-анимацию',
  propAvatar: 'Показать аватар; объект `{ size, shape }` — настройки',
  propTitle: 'Показать заголовок; объект `{ width }` — кастомная ширина',
  propParagraph: 'Показать строки абзаца; `{ rows, width[] }` — настройки',
  propLoading: 'Если false — рендерим default-слот вместо скелета',
  propUnstyled: 'Снять sg-skeleton-* классы (сохранить aria-busy + порядок блоков)',

  cssSkeletonBg: 'Цвет заливки placeholder',
  cssSkeletonShimmer: 'Цвет highlight анимации',
  cssBorderRadiusSm: 'Радиус скругления полосок',
  cssMotionDurationSlow: 'Длительность shimmer',
}
