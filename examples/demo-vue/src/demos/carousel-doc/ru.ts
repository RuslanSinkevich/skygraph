import type { CarouselDocStrings } from './en'

/** Russian translations for Carousel doc page. Keep keys aligned with `en.ts`. */
export const carouselDocRu: CarouselDocStrings = {
  pageTitle: 'Carousel',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbCarousel: 'Carousel',
  pageLead:
    'Карусель слайдов с навигацией точками, четырьмя позициями точек и анимациями slide / fade.',
  pageWhen1:
    'Когда нужно прокручивать группу контента одного уровня в одной области — баннеры, отзывы.',
  pageWhen2: 'Когда мало места по горизонтали — карусель вместо обычной прокрутки.',

  demoBasicTitle: 'Базовая',
  demoBasicDesc: 'Стандартная анимация slide, точки снизу по центру.',
  demoAutoplayTitle: 'Автопрокрутка',
  demoAutoplayDesc: 'Авто-сдвиг каждые `autoplaySpeed` мс.',
  demoFadeTitle: 'Fade',
  demoFadeDesc: 'Кросс-фейд слайдов через opacity.',
  demoDotPositionTitle: 'Положение точек',
  demoDotPositionDesc: 'Top, bottom (по умолчанию), left или right — left / right вертикально.',
  demoHiddenDotsTitle: 'Без точек',
  demoHiddenDotsDesc: '`:dots="false"` для декоративных каруселей.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Локально переопределяем цвета точек под бренд.',
  tableCarouselApi: 'API карусели',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У карусели нет собственных токенов. Цвета точек берутся из глобальной палитры — для ребрендинга переопредели `--sg-color-primary`, `--sg-color-text-disabled`, `--sg-color-text-tertiary`.',

  propAutoplay: 'Автопереключение слайдов по таймеру',
  propAutoplaySpeed: 'Интервал автопрокрутки (мс)',
  propDots: 'Показывать ли полоску навигации',
  propDotPosition: 'Где разместить точки (left / right переключают на вертикальный layout)',
  propEffect: 'Тип перехода — slide (горизонтальный) или fade (плавный)',
  propChildren: 'Каждый прямой ребёнок — один слайд (Vue: дефолтный слот)',
  propUnstyled: 'Убрать sg-carousel-* стили — рендерим только активный слайд и нумерованные кнопки',

  cssPrimary: 'Цвет активной точки (расширенная «пилюля»)',
  cssTextDisabled: 'Цвет неактивной точки',
  cssTextTertiary: 'Цвет точки при наведении',
  cssFontSize: 'Унаследованный размер шрифта внутри трека',
  cssPaddingXs: 'Отступ между точками',
  cssPaddingSm: 'Внутренний отступ полоски точек',
  cssTransitionDuration: 'Длительность slide / fade и смены цвета точек',
  cssTransitionTiming: 'Общий easing переходов',
}
