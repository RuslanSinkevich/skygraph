import type { DescriptionsDocStrings } from './en'

export const descriptionsDocRu: DescriptionsDocStrings = {
  pageTitle: 'Descriptions',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbDescriptions: 'Descriptions',
  pageLead:
    'Read-only список «label / value» для структурированных данных — профиль, инвойс, сводка настроек.',
  pageWhen1: 'Панель деталей после клика по строке списка/таблицы.',
  pageWhen2: 'Сводки аккаунта / биллинга / заказа, где правки живут отдельно.',
  pageWhen3: 'Print-friendly виды — пары рендерятся настоящим `<table>`.',

  demoBasicTitle: 'Базовая',
  demoBasicDesc: 'Три колонки, горизонтальный layout, двоеточие после label.',
  demoBorderedTitle: 'С рамкой',
  demoBorderedDesc: 'Внешняя рамка + подкрашенная колонка label.',
  demoColumnsTitle: 'Колонки',
  demoColumnsDesc: '`:column` задаёт число пар на строку; `span` расширяет элемент.',
  demoVerticalTitle: 'Вертикальный layout',
  demoVerticalDesc: 'Label над value — для длинных значений.',
  demoNoColonTitle: 'Без двоеточия',
  demoNoColonDesc: '`:colon="false"` убирает двоеточие в конце label.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Два пресета — `small` и default.',
  demoRichContentTitle: 'Богатый контент',
  demoRichContentDesc:
    'Vue: `value` — это `string`. React поддерживает `ReactNode` — см. findings.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Локально переопределяем глобальные surface / border токены.',
  tableDescriptionsApi: 'API Descriptions',
  tableDescriptionsItemApi: 'DescriptionsItem',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Descriptions берёт глобальные surface / border токены. Переопредели `--sg-color-bg-secondary` (фон колонки label), `--sg-color-border-secondary` (разделители), `--sg-border-radius` (скругление) для ребрендинга.',

  propTitle: 'Опциональный заголовок над таблицей',
  propItems: 'Строки, собранные из этих элементов',
  propBordered: 'Рендерить таблицу с рамкой',
  propColumn: 'Сколько колонок в строке',
  propLayout: 'Горизонтальный (label | value) или вертикальный (label сверху, value снизу)',
  propColon: 'Добавлять `:` после label',
  propSize: 'Компактный `small` vs дефолтный padding',
  propUnstyled: 'Снять sg-descriptions-* классы — остаётся только `<table>`',

  itemKey: 'Опциональный стабильный ключ',
  itemLabel: 'Текст label',
  itemValue: 'Значение (Vue: только строка — см. findings)',
  itemSpan: 'Кол-во колонок (≤ `column`)',

  cssBgSecondary: 'Фон колонки label (bordered)',
  cssBorderSecondary: 'Рамка и разделители строк',
  cssTextSecondary: 'Цвет текста label',
  cssText: 'Цвет текста value',
  cssBorderRadius: 'Радиус скругления внешней рамки',
  cssFontSize: 'Размер шрифта value (default)',
  cssFontSizeSm: 'Размер шрифта value (small)',
}
