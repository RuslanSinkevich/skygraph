import type { EmptyDocStrings } from './en'

export const emptyDocRu: EmptyDocStrings = {
  pageTitle: 'Empty',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbEmpty: 'Empty',
  pageLead:
    'Лёгкий placeholder для пустых списков, таблиц, результатов поиска и дашбордов. Всегда давай recovery-действие.',
  pageWhen1: 'Списки / таблицы с нулём строк.',
  pageWhen2: 'Поиск или фильтр, не вернувший результатов.',
  pageWhen3: 'Онбординг для свежих аккаунтов / проектов.',

  demoBasicTitle: 'Базовая',
  demoBasicDesc: 'Дефолтная иллюстрация + caption "No Data".',
  demoDescriptionTitle: 'Описание',
  demoDescriptionDesc: 'Меняем caption под ситуацию (Vue: только строка — см. findings).',
  demoNoDescriptionTitle: 'Без описания',
  demoNoDescriptionDesc: '`:description="null"` скрывает caption — только картинка.',
  demoCustomImageTitle: 'Кастомная иллюстрация',
  demoCustomImageDesc: 'Слот `#image` — emoji, SVG, `<img>` или любой компонент.',
  demoWithActionsTitle: 'С кнопками',
  demoWithActionsDesc: 'Default-слот рендерится под описанием — идеально для CTA.',
  demoInCardTitle: 'В карточке',
  demoInCardDesc: 'Оборачиваем в bordered-поверхность — Empty «владеет» местом таблицы.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Локально переопределяем `--sg-color-text-disabled` / `--sg-color-text-tertiary`.',
  tableEmptyApi: 'API Empty',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Empty нет собственных токенов. Переопределяй `--sg-color-text-disabled` (цвет иллюстрации) и `--sg-color-text-tertiary` (цвет caption).',

  propDescription: 'Подпись под картинкой. `null` — скрыть. По умолчанию "No Data".',
  propUnstyled: 'Снять sg-empty-* классы — wrapper, слот image, параграф и default-слот остаются',
  propImageSlot: 'Слот `#image` для своей иллюстрации (по умолчанию — встроенный SVG)',
  propDefaultSlot: 'Default-слот — действия под описанием',

  cssTextDisabled: 'Цвет дефолтной иллюстрации',
  cssTextTertiary: 'Цвет текста caption',
  cssMarginXs: 'Вертикальный отступ между картинкой и описанием',
  cssMarginSm: 'Вертикальный отступ между описанием и footer',
}
