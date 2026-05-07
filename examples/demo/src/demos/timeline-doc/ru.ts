import { timelineDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `timelineDocEn`, no extras.
 */
export const timelineDocRu: { [K in keyof typeof timelineDocEn]: string } = {
  pageTitle: 'Timeline',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbTimeline: 'Таймлайн',
  pageLead:
    'Хронологический вертикальный список с осью, точками, опциональными лейблами и pending-хвостом.',
  pageWhen1:
    'Когда серию событий нужно упорядочить по времени (логи аудита, changelog, отслеживание доставки).',
  pageWhen2: 'Когда события надо связать визуально, а не просто стекать в плоский список.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Левая ось по умолчанию + индивидуальный цвет для элементов.',
  demoRightModeTitle: 'Режим справа',
  demoRightModeDesc: 'Сместить ось к правому краю контейнера.',
  demoAlternateTitle: 'Чередование',
  demoAlternateDesc: 'События чередуются по обе стороны центральной оси.',
  demoWithLabelTitle: 'С лейблом',
  demoWithLabelDesc: 'Колонка лейбла рендерится в режиме `alternate`.',
  demoPendingTitle: 'Pending',
  demoPendingDesc: 'Добавляет приглушённый хвост для незавершённой работы.',
  demoReverseTitle: 'Reverse',
  demoReverseDesc: 'Перевернуть порядок без изменения исходного массива.',
  demoCustomDotTitle: 'Своя точка',
  demoCustomDotDesc: 'Заменить кольцо любой иконкой или эмодзи.',
  demoCustomColorTitle: 'Свой цвет',
  demoCustomColorDesc: 'Подкрасить кольцо по умолчанию через prop `color`.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Перекрасить ось / коннектор через скоупленные CSS-переменные.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Голый `<ul>` — приносите свой CSS.',

  tableTimelineApi: 'API Timeline',
  tableTimelineItem: 'TimelineItem',
  tableCssVars: 'CSS-переменные',

  propItems: 'Упорядоченные шаги таймлайна',
  propMode: 'Позиция оси — слева, справа или чередование',
  propPending:
    'Приглушённая pending-строка в конце. Передайте node для своей подписи, `true` — для placeholder',
  propPendingDot: 'Маркер для синтетической pending-строки',
  propReverse: 'Перевернуть визуальный порядок (включая pending)',
  propClassName: 'Дополнительный класс на корневом `<ul>`',
  propStyle: 'Inline-стиль на корневом `<ul>`',
  propUnstyled: 'Убрать ось и коннектор — рендерить голый список',

  itemChildren: 'Содержимое строки',
  itemColor: 'CSS-цвет, применяемый к кольцу по умолчанию (border + text)',
  itemDot: 'Заменить кольцо любым узлом (иконка, эмодзи, буквенный значок)',
  itemLabel: 'Вторичный лейбл рядом с маркером (только в `alternate`)',
  itemPosition: 'Принудительно left / right для этого элемента (перекрывает `mode`)',

  cssHint:
    'У Timeline нет собственных токенов. Ребрендинг — через глобальную палитру: `--sg-color-primary` (кольца), `--sg-color-border-secondary` (коннектор), семейство `--sg-color-text*` (содержимое / лейбл).',

  cssSgColorPrimary: 'Цвет кольца по умолчанию (можно переопределить per-item через `color`)',
  cssSgColorBg: 'Заливка кольца (видна внутри 2px-границы)',
  cssSgColorBorderSecondary: 'Коннектор между элементами',
  cssSgColorText: 'Цвет содержимого строки',
  cssSgColorTextSecondary: 'Цвет текста колонки `label`',
  cssSgColorTextTertiary: 'Цвет содержимого pending-строки',
  cssSgColorTextDisabled: 'Цвет кольца pending-строки',
  cssSgFontSize: 'Размер шрифта содержимого',
  cssSgFontSizeSm: 'Размер шрифта колонки лейбла',
  cssSgFontSizeLg: 'Размер шрифта для кастомных `dot`',
  cssSgLineHeight: 'Line-height содержимого',
  cssSgPaddingMd: 'Горизонтальный padding между осью и содержимым / лейблом',
  cssSgPaddingXl: 'Вертикальный зазор между элементами',
  cssSgMarginXs: 'Top-margin линии коннектора',
}
