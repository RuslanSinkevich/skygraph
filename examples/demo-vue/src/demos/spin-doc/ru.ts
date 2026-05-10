import type { SpinDocStrings } from './en'

export const spinDocRu: SpinDocStrings = {
  pageTitle: 'Spin',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbSpin: 'Spin',
  pageLead:
    'Индикатор загрузки — inline-кольцо, container-overlay или fullscreen-гейт. С `aria-live="polite"`.',
  pageWhen1: 'Async-запросы, которые завершаются < 1 сек и не требуют скелета.',
  pageWhen2: 'Обернуть карточку / форму, чтобы блокировать контент во время обновления.',
  pageWhen3: 'Page-level гейты (гидрация, app boot) через `fullscreen`.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Standalone inline-кольцо без детей.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Small / default / large кольца, обводка масштабируется.',
  demoTipTitle: 'Tip',
  demoTipDesc: '`tip` добавляет caption под кольцом.',
  demoContainerTitle: 'Container',
  demoContainerDesc: 'Оборачиваем детей — `:spinning` блокирует контент.',
  demoDelayTitle: 'Delay',
  demoDelayDesc: 'Показываем кольцо только после N мс — без мерцаний на быстрых запросах.',
  demoCustomIndicatorTitle: 'Кастомный индикатор',
  demoCustomIndicatorDesc: 'Заменяем кольцо через слот `#indicator`.',
  demoFullscreenTitle: 'Fullscreen',
  demoFullscreenDesc: '`fullscreen` покрывает viewport с backdrop.',
  demoCustomColorTitle: 'Свой цвет',
  demoCustomColorDesc: 'Локальные оттенки через `--sg-spin-color`.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Перекрашиваем кольцо + overlay через `--sg-spin-color` / `--sg-spin-overlay-bg`.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Снимаем классы, сохраняем логику — pair с кастомным индикатором.',

  tableSpinApi: 'API Spin',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Spin два собственных токена: `--sg-spin-color` (цвет кольца), `--sg-spin-overlay-bg` (фон overlay). Размеры берутся из глобальных motion / size токенов.',

  propSpinning: 'Показывать ли loading-состояние (учитывает `delay`)',
  propSize: 'Размер индикатора — small (12px) / middle (24px) / large (36px)',
  propDelay: 'Ждать `delay` мс до показа кольца — anti-flicker',
  propTip: 'Опциональная подпись под индикатором',
  propFullscreen: 'Покрыть viewport backdrop-ом',
  propUnstyled:
    'Снять sg-spin-* классы (сохранить `delay` / `spinning` / overlay-логику)',
  propIndicatorSlot: 'Слот `#indicator` для кастомного кольца',
  propDefaultSlot:
    'Default-слот — дети блокируются overlay во время спиннера',

  cssSpinColor: 'Цвет кольца индикатора',
  cssSpinOverlayBg: 'Цвет overlay над обёрнутыми детьми',
  cssMotionDuration: 'Скорость вращения',
  cssZModal: 'z-index для fullscreen',
  cssBorderRadius: 'Радиус скругления overlay',
}
