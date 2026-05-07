import { descriptionsDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `descriptionsDocEn`, no extras.
 */
export const descriptionsDocRu: { [K in keyof typeof descriptionsDocEn]: string } = {
  pageTitle: 'Descriptions',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbDescriptions: 'Описания',
  pageLead:
    'Read-only таблица «ключ — значение» для страниц деталей. Поддерживает горизонтальную и вертикальную раскладку, bordered-вариант, переменное число колонок и `span` на элемент.',
  pageWhen1:
    'Блок read-only полей — счета, сводки профиля, детали инцидента.',
  pageWhen2:
    'Когда полноценная таблица слишком тяжела, а голый `<dl>` — слишком минималистичен.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'По умолчанию: 3 колонки, горизонтальная раскладка.',
  demoBorderedTitle: 'С границей',
  demoBorderedDesc: 'Рамка + тонированная колонка лейблов.',
  demoVerticalTitle: 'Вертикальная раскладка',
  demoVerticalDesc: 'Лейблы над значениями — удобно для длинного контента.',
  demoColumnsTitle: 'Колонки',
  demoColumnsDesc: 'Меняйте плотность колонок; `span` расширяет элементы.',
  demoNoColonTitle: 'Без двоеточия',
  demoNoColonDesc: 'Убрать двоеточие после лейблов.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Пресеты small и middle для отступов и шрифта.',
  demoRichContentTitle: 'Богатый контент',
  demoRichContentDesc: 'Лейблы и значения принимают любой ReactNode — Badge, Tag, ссылки…',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоупните токены фона лейбла / границы для смены оформления рамки.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Голая `<table>` — приносите свой CSS.',

  tableDescriptionsApi: 'API Descriptions',
  tableDescriptionsItem: 'DescriptionsItem',
  tableCssVars: 'CSS-переменные',

  propTitle: 'Необязательный заголовок над таблицей',
  propItems: 'Пары лейбл / значение, рендерятся по `column` и `span` элемента',
  propBordered: 'Оборачивает таблицу в рамку и тонирует колонку лейблов',
  propColumn: 'Число пар лейбл / значение в строке',
  propLayout: 'Лейблы над значениями (`vertical`) или рядом (`horizontal`)',
  propColon: 'Добавить `:` после каждого лейбла',
  propSize: 'Пресет отступов / шрифта — наследуется от ConfigProvider',
  propClassName: 'Дополнительный класс на корне',
  propStyle: 'Inline-стиль на корне',
  propUnstyled: 'Убрать все классы sg-descriptions-*; рендерить голую `<table>`',

  itemKey: 'Стабильный ключ для reconciliation',
  itemLabel: 'Лейбл первой ячейки / заголовка строки',
  itemChildren: 'Содержимое значения',
  itemSpan: 'Span колонок (ограничен пропсом `column`)',

  cssHint:
    'У Descriptions нет собственных токенов. Ребрендинг — через глобальную палитру: `--sg-color-bg-secondary` (фон колонки лейблов в bordered) и `--sg-color-border-secondary` (разделители).',

  cssSgColorText: 'Цвет значения и заголовка',
  cssSgColorTextSecondary: 'Цвет лейбла',
  cssSgColorBgSecondary: 'Фон колонки лейблов в `bordered`',
  cssSgColorBorderSecondary: 'Граница таблицы и разделители строк в `bordered`',
  cssSgBorderRadius: 'Внешние углы bordered-таблицы',
  cssSgFontSize: 'Базовый размер шрифта ячейки',
  cssSgFontSizeSm: 'Размер шрифта при `size="small"`',
  cssSgFontSizeLg: 'Размер шрифта заголовка',
  cssSgLineHeight: 'Line-height для лейблов / значений / заголовка',
  cssSgPaddingXs: 'Вертикальный padding при `size="small"`',
  cssSgPaddingSm: 'Вертикальный padding по умолчанию / горизонтальный в small-bordered',
  cssSgPaddingMd: 'Горизонтальный padding по умолчанию между лейблом и значением',
  cssSgPaddingLg: 'Горизонтальный padding в bordered-режиме',
  cssSgMarginSm: 'Правый margin двоеточия',
  cssSgMarginMd: 'Расстояние между заголовком и таблицей',
}
