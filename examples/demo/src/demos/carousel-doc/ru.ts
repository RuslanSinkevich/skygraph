import { carouselDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `carouselDocEn`, no extras.
 */
export const carouselDocRu: { [K in keyof typeof carouselDocEn]: string } = {
  pageTitle: 'Carousel',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbCarousel: 'Carousel',
  pageLead:
    'Контейнер с прокруткой слайдов, dot-навигацией, четырьмя позициями точек и переходами slide / fade.',
  pageWhen1:
    'Когда группе равноправного контента нужно по очереди показываться в одной области — hero-баннеры, отзывы.',
  pageWhen2:
    'Когда ограниченное горизонтальное пространство должно прокручивать пару элементов, а не скроллиться.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Дефолтный slide-переход, точки внизу по центру.',
  demoAutoplayTitle: 'Автопрокрутка',
  demoAutoplayDesc: 'Авто-переключение каждые `autoplaySpeed` мс.',
  demoFadeTitle: 'Fade',
  demoFadeDesc: 'Кросс-фейд слайдов через opacity.',
  demoDotPositionTitle: 'Позиция точек',
  demoDotPositionDesc:
    'Top, bottom (по умолчанию), left или right — left / right разворачивает раскладку вертикально.',
  demoHiddenDotsTitle: 'Скрытые точки',
  demoHiddenDotsDesc: '`dots={false}` для декоративных каруселей.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tableCarouselApi: 'API Carousel',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Carousel нет локальных токенов. Цвета точек берутся из глобальной палитры — для ребрендинга скоупьте `--sg-color-primary` + `--sg-color-text-disabled` + `--sg-color-text-tertiary`.',

  propAutoplay: 'Переключаться на следующий слайд по интервалу',
  propAutoplaySpeed: 'Интервал между шагами автопрокрутки (мс)',
  propDots: 'Отрисовывать строку точек навигации',
  propDotPosition: 'Где разместить точки (left / right разворачивает раскладку вертикально)',
  propEffect: 'Стиль перехода — горизонтальный slide или crossfade',
  propChildren: 'Каждый прямой child — один слайд',
  propClassName: 'Дополнительный class на корне',
  propStyle: 'Inline-стиль на корне',
  propUnstyled:
    'Убрать стили sg-carousel-* — рендерится только активный слайд и нумерованные кнопки',

  cssPrimary: 'Цвет активной точки (более широкая «таблетка»)',
  cssTextDisabled: 'Цвет неактивной точки',
  cssTextTertiary: 'Цвет точки при наведении',
  cssFontSize: 'Наследуемый размер шрифта внутри track',
  cssPaddingXs: 'Зазор между точками',
  cssPaddingSm: 'Отступы вокруг строки точек',
  cssTransitionDuration: 'Длительность slide / fade + переход цвета точек',
  cssTransitionTiming: 'Общая кривая сглаживания переходов',
}
