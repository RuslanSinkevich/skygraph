import { progressDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `progressDocEn`, no extras.
 */
export const progressDocRu: { [K in keyof typeof progressDocEn]: string } = {
  pageTitle: 'Progress',
  pageLead:
    'Линейный или круговой индикатор прогресса с состояниями success/error/active и встроенной шиммер-анимацией для долгих операций.',
  pageWhen1: 'Загрузка, обработка файлов, синхронизации — любая задача с измеримым процентом.',
  pageWhen2: 'Дашборды, отслеживающие выполнение KPI относительно цели.',
  pageWhen3: 'Визарды и онбординги, показывающие, насколько пользователь продвинулся.',

  demoLineTitle: 'Линейный',
  demoLineDesc: 'Стандартная горизонтальная полоса с цветами по статусу.',
  demoCircleTitle: 'Круговой',
  demoCircleDesc: 'SVG-кольцо для компактных дашбордов и карточек.',
  demoActiveTitle: 'Активный шиммер',
  demoActiveDesc: '`status="active"` пускает блик по заливке.',
  demoDynamicTitle: 'Динамический',
  demoDynamicDesc: 'Управляйте `percent` через React state; ограничение значений встроено.',
  demoCustomColorTitle: 'Свой цвет',
  demoCustomColorDesc: '`strokeColor` перебивает цвет, заданный статусом.',
  demoSizesTitle: 'Размеры и strokeWidth',
  demoSizesDesc:
    '`size="small"` делает полосу тоньше; `strokeWidth` побеждает, если нужно точное значение.',
  demoNoInfoTitle: 'Скрыть подпись',
  demoNoInfoDesc: '`showInfo={false}` убирает процент справа / по центру.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tableProgressApi: 'API Progress',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Progress нет приватных токенов компонента. Заливка следует `--sg-color-primary` / `--sg-color-success` / `--sg-color-error` в зависимости от `status`; трек — `--sg-color-bg-hover`. Переопределяйте эти глобальные токены на обёртке (или на `:root`) для ребрендинга.',

  propPercent: 'Значение прогресса 0–100 (с ограничением)',
  propType: 'Горизонтальная полоса или круговое кольцо',
  propStatus: 'Визуальное состояние — `normal` авто-переключается на `success` при 100%',
  propShowInfo: 'Отрисовывать подпись с процентом',
  propStrokeWidth: 'Высота полосы (line) или толщина кольца (circle), в px',
  propStrokeColor: 'Свой цвет заливки, перебивает цвет статуса',
  propWidth: 'Внешний размер SVG для `type="circle"`',
  propSize: 'Берёт размер из ConfigProvider; `small` делает полосу 6px',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы sg-progress-* (headless-режим)',

  cssPrimary: 'Цвет заливки полосы / кольца для `status="normal" | "active"`',
  cssSuccess: 'Цвет заливки + оттенок подписи для `status="success"`',
  cssError: 'Цвет заливки + оттенок подписи для `status="error"`',
  cssBgHover: 'Фон трека line + контур trail для circle',
  cssText: 'Цвет подписи в центре кольца',
  cssTextSecondary: 'Цвет подписи процента у line',
  cssFontSizeSm: 'Размер подписи процента у line',
  cssFontSizeXl: 'Размер подписи процента у circle',
  cssPaddingSm: 'Зазор между полосой и подписью справа',
  cssTransitionDuration: 'Переход ширины заливки / stroke-dashoffset',
  cssTransitionTiming: 'Общая кривая сглаживания',
}
