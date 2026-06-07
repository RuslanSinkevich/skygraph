import { notificationDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `notificationDocEn`, no extras.
 */
export const notificationDocRu: { [K in keyof typeof notificationDocEn]: string } = {
  pageTitle: 'Notification',
  pageLead:
    'Тосты в углах экрана с глобальным стором. Вызывайте `notification.open(config)` (или короткие хелперы) откуда угодно — главное, чтобы для нужного `placement` был смонтирован `NotificationContainer`.',
  pageWhen1: 'Системный фидбек, которому мало простого инлайн-сообщения.',
  pageWhen2: 'Прогресс или завершение фоновой задачи (загрузки, сохранения, длинные запросы).',
  pageWhen3: 'Объявления, не зависящие от роутинга, из глубины дерева компонентов.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Простейшее использование — title + description, авто-закрытие через 4.5 с.',
  demoTypesTitle: 'Типы',
  demoTypesDesc: 'Семантические варианты задают цвет иконки и акцентный фон.',
  demoDurationTitle: 'Длительность',
  demoDurationDesc: 'Задайте `duration` в мс; `0` отключает авто-закрытие.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc:
    'Тосты появляются в углу из `placement`. Для каждого угла нужен свой смонтированный `NotificationContainer` (демо монтирует три — `topRight`, `topLeft`, `bottomRight`; `bottomLeft` — для примера Unstyled).',
  demoOnCloseTitle: 'Колбэк onClose',
  demoOnCloseDesc: 'Поймайте момент удаления тоста — вручную или по таймеру авто-закрытия.',
  demoRichTitle: 'Сложное содержимое',
  demoRichDesc:
    '`message` и `description` принимают любой ReactNode — кнопки, ссылки, прогресс-бары.',
  demoDestroyTitle: 'Удалить все',
  demoDestroyDesc: '`notification.destroy()` чистит весь стор, независимо от placement.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Визуал карточек собирается из глобальных дизайн-токенов — переопределяйте их на `:root` или на верхнеуровневой обёртке, где также живёт `<NotificationContainer/>`.',

  tableConfig: 'NotificationConfig',
  tableContainer: 'NotificationContainer',
  tableUtility: 'Утилита notification',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Все токены глобальные — стор рендерит тосты в предке, где находится `<NotificationContainer/>`, поэтому скоуп токенов внутри demo-блока до карточки не дойдёт. Переопределяйте на `:root`, на обёртке темы или поднимайте отдельный контейнер внутри scoped-обёртки с уникальным `placement`.',

  cfgType: 'Визуальный вариант; задаёт иконку и акцентный цвет',
  cfgMessage: 'Основная строка (заголовок).',
  cfgDescription: 'Вторичная информация под заголовком.',
  cfgDuration: 'Задержка авто-закрытия в мс; `0` отключает авто-закрытие.',
  cfgPlacement: 'Стек угла; должен совпадать со смонтированным `NotificationContainer`.',
  cfgKey: 'Стабильный id для React-ключа и ручного удаления. Генерируется, если не задан.',
  cfgOnClose: 'Срабатывает, когда тост удалён из стора (вручную или авто).',

  containerPlacement:
    'Угол, который слушает данный экземпляр. Один контейнер на каждый используемый угол.',
  containerUnstyled: 'Снять классы `sg-notification-*` с контейнера и карточек.',
  containerClassName: 'Дополнительный className обёртки.',
  containerStyle: 'Inline-стиль обёртки.',

  utilOpen: 'Открыть тост с полным конфигом.',
  utilSuccess: 'Шорткат для `{ type: "success" }`.',
  utilError: 'Шорткат для `{ type: "error" }`.',
  utilWarning: 'Шорткат для `{ type: "warning" }`.',
  utilInfo: 'Шорткат для `{ type: "info" }`.',
  utilDestroy: 'Удалить все активные тосты разом.',

  cssZ: 'z-index для всех стеков `sg-notification-container`',
  cssPaddingXl: 'Расстояние от угла viewport (top/right/bottom/left)',
  cssPaddingMd: 'Вертикальные отступы карточки',
  cssPaddingLg: 'Горизонтальные отступы карточки',
  cssPaddingSm: 'Зазор между иконкой / контентом / кнопкой закрытия',
  cssMarginSm: 'Зазор между тостами в стеке',
  cssMarginXs: 'Зазор между строками заголовка и описания',
  cssBgElevated: 'Фон карточки (поверхность elevated)',
  cssBorderSecondary: 'Граница карточки',
  cssRadiusLg: 'Скругление углов карточки',
  cssShadowLg: 'Тень карточки',
  cssTransitionDuration: 'Длительность анимации появления / ухода + hover кнопки закрытия',
  cssTransitionTiming: 'Кривая сглаживания появления / ухода',
  cssFontSize: 'Размер шрифта заголовка',
  cssFontSizeSm: 'Размер описания и глифа иконки',
  cssFontSizeLg: 'Размер кнопки закрытия (×)',
  cssText: 'Цвет заголовка + hover кнопки закрытия',
  cssTextSecondary: 'Цвет описания',
  cssTextTertiary: 'Дефолтный цвет кнопки закрытия (×)',
  cssSuccess: 'Цвет иконки `type="success"`',
  cssSuccessBg: 'Фон иконки `type="success"`',
  cssError: 'Цвет иконки `type="error"`',
  cssErrorBg: 'Фон иконки `type="error"`',
  cssWarning: 'Цвет иконки `type="warning"`',
  cssWarningBg: 'Фон иконки `type="warning"`',
  cssPrimary: 'Цвет иконки `type="info"`',
  cssPrimaryBg: 'Фон иконки `type="info"`',
}
