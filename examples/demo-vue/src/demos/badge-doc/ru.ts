import type { badgeDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `badgeDocEn`, no extras.
 */
export const badgeDocRu: { [K in keyof typeof badgeDocEn]: string } = {
  pageTitle: 'Badge',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbBadge: 'Бейдж',
  pageLead:
    'Маленький счётчик или индикатор статуса. Прикрепляется к дочернему элементу или рендерится как отдельная строка статуса.',
  pageWhen1:
    'Показ счётчиков непрочитанного / новых / в ожидании на иконках, аватарах, пунктах меню.',
  pageWhen2:
    'Отображение живого статуса процесса (подключение, синхронизация, ошибка) в компактной строке.',
  pageWhen3: 'Сигнал «есть активность» небольшой точкой, когда точное число неважно.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Прикрепите счётчик к любому элементу; 0 скрыт, если не задан showZero.',
  demoOverflowTitle: 'Переполнение',
  demoOverflowDesc: 'Числа выше overflowCount сворачиваются в «{N}+».',
  demoDotTitle: 'Точка',
  demoDotDesc: 'Индикатор без капсулы — для сигналов «есть активность».',
  demoStatusTitle: 'Строка статуса',
  demoStatusDesc: 'Отдельная точка с подписью; processing пульсирует.',
  demoCustomColorTitle: 'Пользовательский цвет',
  demoCustomColorDesc: 'Передайте ссылку на токен (тема-aware) или сырой hex.',
  demoOffsetTitle: 'Смещение',
  demoOffsetDesc: 'Сдвиньте прикреплённый счётчик на [right, top] пикселей.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа на токенах Badge: зелёный бренд, тёмная поверхность и glass pick (счётчики и точки).',
  tableBadgeApi: 'API Badge',
  tableCssVars: 'CSS-переменные',

  propCount: 'Число для показа; скрыто при 0, если не задан showZero',
  propDot: 'Рендерить точку без капсулы вместо счётчика',
  propOverflowCount: 'Порог, при котором count становится «{N}+»',
  propShowZero: 'Показывать badge, даже когда count = 0',
  propColor: 'Пользовательский фон для счётчика / точки (любой CSS-цвет)',
  propStatus: 'Рендерит отдельную строку с точкой статуса и текстом',
  propText: 'Подпись рядом с точкой статуса',
  propOffset: 'Пиксельный сдвиг [right, top] (применяется как right + marginTop)',
  propChildren: 'Элемент, к которому прикрепляется badge (Vue: default-слот)',
  propUnstyled: 'Убрать классы sg-badge (headless-режим)',

  cssHint:
    'Badge собирается из палитровых токенов — фон счётчика по умолчанию `--sg-color-error`, точки статусов используют `--sg-color-{preset}`. Для разовой подмены — prop `color`, для смены темы — переопределите палитровые токены на обёртке.',

  cssSgColorError: 'Фон счётчика и точки по умолчанию',
  cssSgColorWhite: 'Цвет текста счётчика',
  cssSgColorBg: 'Тонкий контур вокруг прикреплённого счётчика / точки',
  cssSgColorSuccess: 'Цвет точки при `status="success"`',
  cssSgColorWarning: 'Цвет точки при `status="warning"`',
  cssSgColorPrimary: 'Цвет точки при `status="processing"` (пульсирует)',
  cssSgColorTextDisabled: 'Цвет точки при `status="default"`',
  cssSgColorText: 'Цвет текста статуса',
  cssSgFontSize: 'Размер шрифта статуса',
  cssSgFontSizeSm: 'Размер шрифта числа в счётчике',
  cssSgPaddingSm: 'Зазор между точкой статуса и текстом',
  cssSgLineHeight: 'Line-height строки статуса',
  cssSgZBase: 'Слой стека для прикреплённого счётчика / точки',
}
