import { notificationDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `notificationDocEn`, no extras.
 */
export const notificationDocRu: { [K in keyof typeof notificationDocEn]: string } = {
  pageTitle: 'Notification',
  pageBadge: 'Обратная связь',
  crumbCategory: 'Обратная связь',
  crumbNotification: 'Notification',
  pageLead:
    'Угловые тосты на основе глобального стора. Вызывайте `notification.open(config)` (или короткие хелперы) откуда угодно — главное, чтобы для нужного `placement` был смонтирован `SgNotificationContainer`.',
  pageWhen1: 'Системная обратная связь, для которой не хватает inline-message.',
  pageWhen2: 'Прогресс или завершение фоновых задач (загрузки, сохранения, длинные fetch).',
  pageWhen3: 'Анонсы, не привязанные к маршруту, из глубоких поддеревьев компонентов.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Простейший вариант — title + description, авто-закрытие через 4.5с.',
  demoTypesTitle: 'Типы',
  demoTypesDesc: 'Семантические варианты задают цвет иконки и акцентный фон.',
  demoDurationTitle: 'Duration',
  demoDurationDesc: '`duration` в мс; `0` отключает авто-закрытие.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc:
    'Тосты появляются в углу из `placement`. Для каждого угла нужен свой смонтированный `SgNotificationContainer`.',
  demoOnCloseTitle: 'Колбэк onClose',
  demoOnCloseDesc:
    'Узнавать, когда тост действительно удалился — вручную или по таймеру.',
  demoRichTitle: 'Rich-контент (Vue-ограничение)',
  demoRichDesc:
    '`message` и `description` — строки в `@skygraph/vue`; rich VNode/HTML из React не переносится 1:1. Используйте plain-text и опирайтесь на локаль.',
  demoDestroyTitle: 'Destroy all',
  demoDestroyDesc:
    '`notification.destroy()` чистит весь стор независимо от placement.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Визуал карточек — глобальные дизайн-токены; переопределите их на `:root` или обёртке, где также живёт `<SgNotificationContainer/>`.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc:
    'Снимите все классы `sg-notification-*` через `<SgNotificationContainer unstyled/>`. Стор и контейнер остаются — карточки рисуете сами.',

  tableConfig: 'NotificationConfig',
  tableContainer: 'SgNotificationContainer',
  tableUtility: 'утилита notification',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Все токены глобальные — стор рендерит тосты в предке, где находится `<SgNotificationContainer/>`, поэтому скоуп токенов внутри demo-блока до карточки не дойдёт. Переопределяйте на `:root`, на обёртке темы или поднимайте отдельный контейнер с уникальным `placement`.',

  cfgType: 'Визуальный вариант; задаёт иконку и акцентный цвет',
  cfgMessage: 'Основная строка (title) — только string в Vue.',
  cfgDescription: 'Вторая строка под message — только string в Vue.',
  cfgDuration: 'Время авто-закрытия в мс; `0` отключает авто-закрытие.',
  cfgPlacement: 'Стек угла; должен совпадать со смонтированным `SgNotificationContainer`.',
  cfgKey:
    'Стабильный id для дедупликации и ручного удаления. Авто-генерируется, если не задан.',
  cfgOnClose: 'Срабатывает после удаления тоста (вручную или по таймеру).',

  containerPlacement: 'Угол, который слушает этот контейнер. Один на каждый угол.',
  containerUnstyled: 'Снять все классы `sg-notification-*` с контейнера и карточек.',

  utilOpen: 'Открыть тост с полным конфигом.',
  utilSuccess: 'Шорткат для `{ type: "success" }`.',
  utilError: 'Шорткат для `{ type: "error" }`.',
  utilWarning: 'Шорткат для `{ type: "warning" }`.',
  utilInfo: 'Шорткат для `{ type: "info" }`.',
  utilDestroy: 'Удалить сразу все активные тосты.',

  cssZ: 'z-index для всех стеков `sg-notification-container`',
  cssPaddingXl: 'Отступ от угла viewport (top/right/bottom/left)',
  cssPaddingMd: 'Вертикальный padding карточки',
  cssPaddingLg: 'Горизонтальный padding карточки',
  cssPaddingSm: 'Зазор между иконкой / контентом / кнопкой закрытия',
  cssMarginSm: 'Зазор между стекированными тостами',
  cssMarginXs: 'Зазор между строками message и description',
  cssBgElevated: 'Фон карточки (elevated surface)',
  cssBorderSecondary: 'Граница карточки',
  cssRadiusLg: 'Радиус углов карточки',
  cssShadowLg: 'Тень карточки',
  cssTransitionDuration: 'Время enter/leave анимации и hover кнопки закрытия',
  cssTransitionTiming: 'Кривая enter/leave',
  cssFontSize: 'Размер шрифта message (title)',
  cssFontSizeSm: 'Размер description и глифа иконки',
  cssFontSizeLg: 'Размер кнопки закрытия (×)',
  cssText: 'Цвет message (title) и hover-цвет кнопки закрытия',
  cssTextSecondary: 'Цвет description',
  cssTextTertiary: 'Цвет кнопки × по умолчанию',
  cssSuccess: 'Цвет иконки `type="success"`',
  cssSuccessBg: 'Фон иконки `type="success"`',
  cssError: 'Цвет иконки `type="error"`',
  cssErrorBg: 'Фон иконки `type="error"`',
  cssWarning: 'Цвет иконки `type="warning"`',
  cssWarningBg: 'Фон иконки `type="warning"`',
  cssPrimary: 'Цвет иконки `type="info"`',
  cssPrimaryBg: 'Фон иконки `type="info"`',
}
