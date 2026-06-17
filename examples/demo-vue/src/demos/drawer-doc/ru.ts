import { drawerDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `drawerDocEn`, no extras.
 */
export const drawerDocRu: { [K in keyof typeof drawerDocEn]: string } = {
  pageTitle: 'Drawer',
  pageBadge: 'Обратная связь',
  crumbCategory: 'Обратная связь',
  crumbDrawer: 'Drawer',
  pageLead:
    'Панель, прикреплённая к краю экрана, выезжает с любой стороны. Использует focus trap, закрытие по ESC и опциональную маску. Тело прокручивается, header / footer — закреплены.',
  pageWhen1: 'Редактировать запись или фильтровать список без потери контекста страницы.',
  pageWhen2: 'Показать дополнительную навигацию или панель уведомлений.',
  pageWhen3:
    'Показать боковую форму, которая слишком тяжёлая для Popover и слишком лёгкая для Modal.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Drawer справа с focus trap и ESC.',
  demoPlacementTitle: 'Размещение',
  demoPlacementDesc: 'Выезжает с любого края; width / height переключаются автоматически.',
  demoSizeTitle: 'Свой размер',
  demoSizeDesc: 'Любая CSS-длина — px, %, vw. Для адаптивных drawer на мобиле используйте %.',
  demoFooterTitle: 'Sticky-футер',
  demoFooterDesc: 'Тело прокручивается, footer закреплён (через слот `#footer`).',
  demoNoMaskTitle: 'Опции маски',
  demoNoMaskDesc: 'Отключить маску или оставить, но запретить закрытие кликом по ней.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  tableDrawerApi: 'API Drawer',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Drawer нет приватных токенов — панель использует `--sg-color-bg-elevated`, маска — `--sg-color-overlay`, тень — `--sg-shadow-lg`. Переопределите их на обёртке, чтобы перекрасить без правки глобальной темы.',

  propOpen: 'Видим ли Drawer',
  propTitle: 'Текст заголовка рядом с кнопкой закрытия',
  propPlacement: 'Край, с которого выезжает панель',
  propWidth: 'Ширина панели (горизонтальное размещение)',
  propHeight: 'Высота панели (вертикальное размещение)',
  propClosable: 'Показывать кнопку × в шапке',
  propMask: 'Рендерить затемнённый backdrop',
  propMaskClosable: 'Клик по маске эмитит @close',
  propUnstyled: 'Убрать все классы sg-drawer-* (headless-режим)',
  emitClose: 'Эмитится при ESC, клике по маске или кнопке ×',
  slotDefault: 'Прокручиваемое содержимое тела',
  slotFooter: 'Sticky-футер с действиями',

  cssBgElevated: 'Фон панели',
  cssOverlay: 'Цвет и прозрачность маски',
  cssBorderSecondary: 'Разделитель header / footer',
  cssText: 'Цвет заголовка',
  cssTextTertiary: 'Цвет кнопки × закрытия',
  cssFontSizeLg: 'Размер шрифта заголовка',
  cssFontSizeXl: 'Размер глифа × закрытия',
  cssPaddingMd: 'Вертикальный padding header / footer',
  cssPaddingXl: 'Padding тела и горизонтальный header / footer',
  cssShadowLg: 'Тень панели',
  cssTransitionDuration: 'Скорость slide-in / fade-in',
  cssTransitionTiming: 'Общая кривая сглаживания',
  cssZModal: 'Слой стека для корня drawer',
}
