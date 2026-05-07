import { drawerDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `drawerDocEn`, no extras.
 */
export const drawerDocRu: { [K in keyof typeof drawerDocEn]: string } = {
  pageTitle: 'Drawer',
  pageLead:
    'Боковая панель, выезжающая с любой стороны экрана. Focus trap, закрытие по ESC, опциональная подложка. Body прокручивается, шапка и подвал закреплены.',
  pageWhen1: 'Редактирование записи или фильтров без потери контекста страницы.',
  pageWhen2: 'Дополнительная навигация или панель уведомлений.',
  pageWhen3: 'Боковая форма — слишком тяжёлая для Popover, но слишком лёгкая для Modal.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Drawer справа с focus trap и поддержкой ESC.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc: 'Выезд с любой стороны; ширина и высота переключаются автоматически.',
  demoSizeTitle: 'Кастомный размер',
  demoSizeDesc: 'Любая CSS-длина — px, %, vw. Используйте % для мобильной адаптации.',
  demoFooterTitle: 'Закреплённый подвал',
  demoFooterDesc: 'Body скроллится, подвал остаётся на месте.',
  demoNoMaskTitle: 'Опции подложки',
  demoNoMaskDesc: 'Отключите подложку или оставьте, но требуйте × / ESC.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоуп токенов поверхности на обёртке для тёмной темы Drawer.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Сохранить a11y + ESC / focus trap; раскраска ваша.',

  tableDrawerApi: 'API Drawer',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Drawer нет собственных токенов — панель использует `--sg-color-bg-elevated`, подложка `--sg-color-overlay`, тень `--sg-shadow-lg`. Переопределяйте на обёртке без правки глобальной темы.',

  propOpen: 'Видим ли Drawer',
  propOnClose: 'Вызывается на ESC, клик по подложке или × ',
  propTitle: 'Содержимое шапки рядом с кнопкой закрытия',
  propChildren: 'Прокручиваемое содержимое body',
  propFooter: 'Закреплённый ряд кнопок внизу',
  propPlacement: 'Сторона, с которой выезжает панель',
  propWidth: 'Ширина панели (горизонтальное размещение)',
  propHeight: 'Высота панели (вертикальное размещение)',
  propClosable: 'Показывать × в шапке',
  propMask: 'Отрисовывать затемнённую подложку',
  propMaskClosable: 'Клик по подложке вызывает onClose',
  propClassName: 'className панели',
  propStyle: 'Inline-стиль панели',
  propUnstyled: 'Убрать классы sg-drawer-* (headless-режим)',

  cssBgElevated: 'Фон панели',
  cssOverlay: 'Цвет и прозрачность подложки',
  cssBorderSecondary: 'Разделитель шапки / подвала',
  cssText: 'Цвет заголовка',
  cssTextTertiary: 'Цвет кнопки × ',
  cssFontSizeLg: 'Размер шрифта заголовка',
  cssFontSizeXl: 'Размер глифа × ',
  cssPaddingMd: 'Вертикальные отступы шапки / подвала',
  cssPaddingXl: 'Отступы body + горизонтальные отступы шапки / подвала',
  cssShadowLg: 'Тень панели',
  cssTransitionDuration: 'Скорость выезда / появления',
  cssTransitionTiming: 'Общая кривая сглаживания',
  cssZModal: 'Слой стекинга корня Drawer',
}
