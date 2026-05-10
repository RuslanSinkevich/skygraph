import type { ProgressDocStrings } from './en'

export const progressDocRu: ProgressDocStrings = {
  pageTitle: 'Progress',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbProgress: 'Progress',
  pageLead:
    'Determined-meter заполнения — line-полоса или круговое кольцо. Встроенные `success` / `error` / `active` состояния.',
  pageWhen1: 'Загрузки, скачивания, многошаговые формы.',
  pageWhen2: 'Quota / лимиты (storage, использование плана).',
  pageWhen3: 'Компактные dashboard-плитки (`type="circle"`).',

  demoLineTitle: 'Line bar',
  demoLineDesc: 'Стандартный горизонтальный layout — `success` авто на 100%.',
  demoCircleTitle: 'Circle',
  demoCircleDesc:
    '`type="circle"` рендерит SVG-кольцо; `width` / `strokeWidth` настраивают размер.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: '`size="small"` уменьшает полосу; `strokeWidth` перебивает пресет.',
  demoNoInfoTitle: 'Без info',
  demoNoInfoDesc: '`:show-info="false"` скрывает label с процентом.',
  demoActiveTitle: 'Active',
  demoActiveDesc: '`status="active"` запускает shimmer по заполненной области.',
  demoCustomColorTitle: 'Свой цвет',
  demoCustomColorDesc: '`strokeColor` перекрывает тему для заполненной части.',
  demoDynamicTitle: 'Dynamic',
  demoDynamicDesc: 'Управляем `percent` из state — clamped в [0, 100].',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Локально переопределяем глобальные цветовые токены для всех полос / колец.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` сохраняет `role="progressbar"`, убирает все классы.',

  tableProgressApi: 'API Progress',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Progress нет собственных токенов. Переопределяй `--sg-color-primary` (заполнение), `--sg-color-bg-hover` (trail), `--sg-color-success` / `--sg-color-error` (статусы) для ребрендинга.',

  propPercent: 'Значение заполнения [0..100] — clamp',
  propType: '`line` (горизонтальная полоса) или `circle` (SVG-кольцо)',
  propStatus: 'Визуальный статус — `normal` становится `success` на 100%',
  propShowInfo: 'Показывать label с процентом / inner-text',
  propStrokeWidth: 'Высота полосы или толщина кольца (px)',
  propStrokeColor: 'Свой цвет заполненной части',
  propSize: 'Компактный пресет для line bars',
  propWidth: 'Внешний размер SVG для `type="circle"`',
  propUnstyled: 'Снять sg-progress-* классы (сохранить aria + percent)',

  cssPrimary: 'Цвет заполнения по умолчанию',
  cssBgHover: 'Цвет trail (незаполненной части)',
  cssSuccess: 'Цвет заполнения на 100% / status="success"',
  cssError: 'Цвет заполнения при status="error"',
  cssMotionDuration: 'Длительность transition при смене процента',
  cssMotionDurationActive: 'Длительность shimmer для status="active"',
}
