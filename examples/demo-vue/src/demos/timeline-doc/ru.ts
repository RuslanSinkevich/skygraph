import type { TimelineDocStrings } from './en'

export const timelineDocRu: TimelineDocStrings = {
  pageTitle: 'Timeline',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbTimeline: 'Timeline',
  pageLead:
    'Вертикальная цепочка «точка + коннектор + контент». Варианты — left / right / alternate ось, pending-хвост, цвет / dot per-item.',
  pageWhen1: 'Changelogs и release-история.',
  pageWhen2: 'Step-by-step процессы (deploy, онбординг).',
  pageWhen3: 'Audit-логи и incident timelines.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Дефолтный layout — ось слева.',
  demoReverseTitle: 'Reverse',
  demoReverseDesc: '`reverse` переворачивает визуальный порядок.',
  demoRightModeTitle: 'Ось справа',
  demoRightModeDesc: '`mode="right"` зеркалит ось.',
  demoAlternateTitle: 'Alternate',
  demoAlternateDesc: 'Чередуем стороны — нечётные слева, чётные справа.',
  demoWithLabelTitle: 'С label',
  demoWithLabelDesc: '`label` — боковая колонка, видна в `alternate` mode.',
  demoCustomColorTitle: 'Свой цвет',
  demoCustomColorDesc: '`color` подкрашивает дефолтное кольцо.',
  demoCustomDotTitle: 'Кастомный dot',
  demoCustomDotDesc:
    'Scoped-слот `#dot` заменяет кольцо любой VNode (emoji, иконка, буквенный бейдж).',
  demoPendingTitle: 'Pending',
  demoPendingDesc:
    '`pending` добавляет приглушённый хвост; через слот `#dot` с `isPending` можно подменить маркер (аналог React `pendingDot`).',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Локально переопределяем глобальные цветовые токены для всей timeline.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` рендерит «голый» `<ul>` — без оси / коннектора.',

  tableTimelineApi: 'API Timeline',
  tableTimelineItemApi: 'TimelineItem',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Timeline берёт `--sg-color-primary` для кольца, `--sg-color-border-secondary` для коннектора, `--sg-color-text-tertiary` для pending. Переопредели их на wrapper-е.',

  propItems: 'Упорядоченный список шагов',
  propMode: 'Layout — `left` / `right` / `alternate`',
  propPending: 'Хвост — `string` для текста, `true` для пустого placeholder-а',
  propReverse: 'Перевернуть визуальный порядок',
  propUnstyled: 'Снять sg-timeline-* классы — `<ul>` без оси',
  propContentSlot: 'Override содержимого per-item; `isPending` = `true` для синтетического хвоста',
  propLabelSlot: 'Override `label` per-item (заменяет `item.label`)',
  propDotSlot:
    'Override маркера per-item; `isPending` = `true` для хвоста — аналог React `pendingDot`',

  itemContent: 'Основной текст (для VNode — слот `#content`)',
  itemLabel: 'Опциональный label (для VNode — слот `#label`; виден в `alternate` mode)',
  itemColor: 'Цвет рамки / текста для дефолтного кольца',
  itemDot: 'Кастомный маркер (для VNode — слот `#dot`)',
  itemPosition: 'Зафиксировать сторону (`left` / `right`)',

  cssPrimary: 'Цвет дефолтного кольца',
  cssBorderSecondary: 'Цвет линии коннектора',
  cssTextTertiary: 'Цвет pending-текста',
  cssText: 'Цвет тела',
  cssTextSecondary: 'Цвет label',
  cssBg: 'Фон',
}
