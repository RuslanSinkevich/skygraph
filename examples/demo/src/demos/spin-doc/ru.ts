import { spinDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `spinDocEn`, no extras.
 */
export const spinDocRu: { [K in keyof typeof spinDocEn]: string } = {
  pageTitle: 'Spin',
  pageLead:
    'Индикатор загрузки — инлайн, в контейнере (с overlay) или fullscreen. Поддерживает delay, кастомные индикаторы и переопределение цвета через один токен.',
  pageWhen1: 'Асинхронные секции, которые скоро покажут реальный контент.',
  pageWhen2: 'Кнопки и формы, которым нужна loading-маска для блокировки повторных submit.',
  pageWhen3: 'Переходы между роутами / страницами — в паре с `fullscreen`.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Отдельностоящий спиннер.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small / middle / large.',
  demoContainerTitle: 'Оборачивание children',
  demoContainerDesc: 'Размытие + маска для обёрнутого контента, пока `spinning`.',
  demoTipTitle: 'Подпись',
  demoTipDesc: 'Короткий статус под спиннером.',
  demoDelayTitle: 'Задержка',
  demoDelayDesc: 'Полностью пропустить спиннер для быстрых запросов.',
  demoCustomColorTitle: 'Свой цвет',
  demoCustomColorDesc: 'Переопределите `--sg-spin-color` в скоупе — без возни с классами.',
  demoCustomIndicatorTitle: 'Свой индикатор',
  demoCustomIndicatorDesc: 'Заменить кольцо на любой ReactNode.',
  demoFullscreenTitle: 'Fullscreen',
  demoFullscreenDesc: 'Overlay на весь viewport на слое z-modal.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tableSpinApi: 'API Spin',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Spin открывает два локальных токена: `--sg-spin-color` для кольца и `--sg-spin-overlay-bg` для подложки overlay / fullscreen. Скоупьте их на обёртке, чтобы перекрасить один раздел, не трогая глобальный primary.',

  propSpinning: 'Видимость спиннера',
  propSize: 'Размер кольца — 12 / 24 / 36px для small / middle / large',
  propDelay: 'Отложить показ спиннера на N мс (предотвращает мерцание)',
  propTip: 'Подпись под спиннером',
  propFullscreen: 'Закрыть viewport затемнённой подложкой на z-modal',
  propIndicator: 'Заменить кольцо на свой node',
  propChildren: 'Контент для оверлея спиннером',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы sg-spin-* (headless-режим)',

  cssSpinColor: 'Цвет кольца — локальный для Spin, по умолчанию = глобальный primary',
  cssSpinOverlayBg: 'Цвет подложки для overlay контейнера / fullscreen',
  cssPrimary: 'Дефолтный цвет кольца (читается через `--sg-spin-color`) + цвет подписи',
  cssFontSizeSm: 'Размер шрифта подписи',
  cssMarginSm: 'Зазор между спиннером и подписью (standalone / overlay / fullscreen)',
  cssRadius: 'Скругление углов overlay (совпадает с обёрнутым блоком)',
  cssZLoading: 'z-index overlay контейнера',
  cssZModal: 'z-index подложки fullscreen',
}
