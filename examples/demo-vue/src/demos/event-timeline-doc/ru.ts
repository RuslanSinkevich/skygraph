import { eventTimelineDocEn } from './en'

export const eventTimelineDocRu: { [K in keyof typeof eventTimelineDocEn]: string } = {
  pageTitle: 'EventTimeline',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbEventTimeline: 'EventTimeline',
  pageLead:
    'Хронологический поток событий с опциональной группировкой (день / месяц / год) и горизонтальной либо вертикальной ориентацией. Сортировка по `date` выполняется автоматически; маркеры и содержимое полностью кастомизируются.',
  pageWhen1:
    'Когда у событий есть реальная `Date` и нужно расположить их во времени (история релизов, milestone-ы проекта, audit log).',
  pageWhen2:
    'Когда нужен горизонтальный трек для компактного changelog или вертикальная лента, сгруппированная по месяцу / году.',
  pageWhen3:
    'Для пошаговых упорядоченных списков без дат используйте `Timeline` (более простой примитив).',

  demoVerticalTitle: 'Вертикальный, дефолтная группировка',
  demoVerticalDesc:
    'События сортируются по дате, разделители отмечают границы дней. Точки берут `color` из события; цвет по умолчанию — `--sg-color-primary`.',
  demoHorizontalTitle: 'Горизонтальный',
  demoHorizontalDesc:
    'Трек идёт слева направо; удобно для release notes / changelog.',
  demoMonthTitle: 'Группировка по месяцу',
  demoMonthDesc:
    'Более крупная группировка для длинных диапазонов. `group-by="month"` группирует подряд идущие события по границе месяца.',

  tableEventTimelineApi: 'API EventTimeline',
  tableEventApi: 'TimelineEvent',
  tableCssVars: 'CSS-переменные',

  propEvents: 'События для отрисовки (внутри сортируются по `date`)',
  propOrientation: 'Ориентация трека',
  propGroupBy: 'Группировать подряд идущие события одного бакета; между группами рисуется разделитель (граница в UTC)',
  propUnstyled: 'Убрать дефолтные классы sg-event-timeline-*',

  propEventId: 'Стабильный id (Vue key + `data-event-id`)',
  propEventDate: 'Дата события — `Date` или epoch ms. Используется для позиционирования и группировки',
  propEventTitle: 'Заголовок маркера (обычно короткий)',
  propEventDescription: 'Опциональное вторичное описание под заголовком',
  propEventColor: 'Опциональный цвет заливки точки (перекрывает токен)',

  cssHint:
    'У EventTimeline нет локальных токенов — он использует глобальные: `--sg-color-primary` (точка по умолчанию), `--sg-color-text*` (заголовок и описание), `--sg-color-border-secondary` (разделители групп), отступы (`--sg-margin-*`, `--sg-padding-*`).',

  cssSgColorPrimary: 'Цвет точки по умолчанию (перекрывается через `color` у события)',
  cssSgColorBg: 'Внешнее кольцо вокруг точки (создаёт контрастный halo)',
  cssSgColorBorderSecondary: 'Линия-разделитель между группами',
  cssSgColorText: 'Цвет заголовка события',
  cssSgColorTextSecondary: 'Цвет описания события',
  cssSgColorTextTertiary: 'Цвет лейбла группы (заголовок-капс над бакетом)',
  cssSgFontSize: 'Размер шрифта тела',
  cssSgFontSizeSm: 'Размер шрифта лейбла группы и описания',
  cssSgLineHeight: 'Line-height заголовка и описания',
  cssSgMarginMd: 'Зазор между событиями',
  cssSgMarginSm: 'Зазор между маркером и контентом',
  cssSgMarginXs: 'Зазор между заголовком и описанием',
  cssSgPaddingMd: 'Горизонтальные отступы в горизонтальной группировке',
  cssSgPaddingXs: 'Вертикальные отступы лейбла группы',
  cssSgPaddingSm: 'Вертикальные отступы каждого item',
}
