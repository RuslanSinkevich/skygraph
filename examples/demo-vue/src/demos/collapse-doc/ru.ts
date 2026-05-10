import type { CollapseDocStrings } from './en'

/** Russian translations for Collapse doc page. Keep keys aligned with `en.ts`. */
export const collapseDocRu: CollapseDocStrings = {
  pageTitle: 'Collapse',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbCollapse: 'Collapse',
  pageLead:
    'Группа вертикально сложенных раскрывающихся панелей — детали без перегрузки страницы.',
  pageWhen1: 'FAQ-стиль с одним вопросом на панель.',
  pageWhen2: 'Группы настроек, фильтров или онбординга с опциональными разделами.',
  pageWhen3: 'Списки, где одновременно может быть открыт только один блок (`accordion`).',

  demoBasicTitle: 'Базовая',
  demoBasicDesc: 'Несколько панелей одновременно. `defaultActiveKey` задаёт стартовый набор.',
  demoAccordionTitle: 'Accordion',
  demoAccordionDesc: 'Одна открытая — клик по другой переключает выбор.',
  demoBorderlessTitle: 'Без рамки',
  demoBorderlessDesc: '`:bordered="false"` убирает внешний фрейм.',
  demoControlledTitle: 'Управляемое',
  demoControlledDesc:
    'Сами держим набор открытых через `activeKey` + `@change` — для тулбаров, URL-state.',
  demoDisabledTitle: 'Отключённый элемент',
  demoDisabledDesc: 'Панель с `disabled` нельзя ни открыть, ни сфокусировать.',
  demoExtraTitle: 'Доп.контент в шапке',
  demoExtraDesc: 'Короткий текстовый статус справа от заголовка.',
  demoGhostTitle: 'Ghost',
  demoGhostDesc: '`ghost` убирает рамки и фоны панелей.',
  demoIconPositionTitle: 'Положение иконки',
  demoIconPositionDesc: 'Шеврон уезжает в правый край — классический FAQ.',
  demoNoArrowTitle: 'Без стрелки',
  demoNoArrowDesc: 'Скрываем шеврон через `showArrow: false`.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc:
    'Три размера меняют padding, min-height шапки и (для `large`) размер шрифта.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Локально переопределяем глобальные surface / border токены.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` снимает классы — aria + accordion-логика остаются.',

  tableCollapseApi: 'API Collapse',
  tableCollapseItemApi: 'CollapseItem',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Collapse нет собственных токенов — берутся глобальные surface- и border-токены. Переопределяй `--sg-color-bg-container`, `--sg-color-bg-secondary`, `--sg-color-bg-hover`, `--sg-color-border-secondary` для ребрендинга.',

  propItems: 'Список панелей в порядке отображения',
  propActiveKey: 'Управляемый набор открытых ключей',
  propDefaultActiveKey: 'Начальный набор открытых ключей (неуправляемый режим)',
  propAccordion: 'Открыта одновременно только одна панель',
  propBordered: 'Рисовать внешнюю рамку',
  propExpandIconPosition: 'Где разместить шеврон',
  propGhost: 'Прозрачный стиль — без рамки и фонов',
  propSize: 'Пресет padding / min-height шапки',
  propUnstyled: 'Снять sg-collapse-* классы (оставить aria + accordion-логику)',
  propOnChange: 'Сообщает новый массив активных ключей (`@change`)',

  itemKey: 'Уникальный ключ панели',
  itemLabel: 'Текст заголовка',
  itemContent: 'Содержимое, показываемое при раскрытии',
  itemExtra:
    'Короткий текст справа от заголовка (Vue: только строка — см. findings)',
  itemShowArrow: 'Показывать ли шеврон у этой панели',
  itemDisabled: 'Заблокировать панель — заголовок серый и не фокусится',

  cssBgContainer: 'Фон панели и шапки',
  cssBgSecondary: 'Фон тела открытой панели',
  cssBgHover: 'Фон шапки при наведении',
  cssBorderSecondary: 'Рамка и разделители панелей',
  cssText: 'Цвет текста заголовка',
  cssTextSecondary: 'Цвет текста тела',
  cssBorderRadiusLg: 'Радиус скругления внешней рамки',
}
