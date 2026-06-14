import { stylingShowcaseDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `stylingShowcaseDocEn`,
 * no extras.
 */
export const stylingShowcaseDocRu: { [K in keyof typeof stylingShowcaseDocEn]: string } = {
  pageTitle: 'Styling Showcase',
  pageBadge: 'Контракт',
  crumbGuide: 'Руководство',
  crumbStylingShowcase: 'Styling Showcase',
  pageLead:
    'Сжатый тур по стилизации SkyGraph. Всё здесь — публичный стабильный API: токены, корневые классы, ключи slot-ов, props classNames/styles и режим unstyled.',
  pageWhen1: 'Изучить три уровня стилизации: токены → classNames/styles → unstyled.',
  pageWhen2:
    'Копировать рецепты в реальные приложения. Все они работают без !important и без глубоких селекторов.',
  pageWhen3: 'Визуально проверить styling-контракт перед релизом.',
  notesPart1: 'Полный справочник: ',
  notesPart2: ', практические рецепты: ',
  notesPart3: '. Каждый slot, показанный здесь, перечислен в §4 контракта.',

  listItem1: 'Переопределяйте токены глобально или per-instance.',
  listItem2: 'Используйте classNames/styles для slot-ов сложных компонентов.',
  listItem3: 'Используйте unstyled для полного контроля.',
  listItem4: 'rowClassName, headerClassName, slot #cell — условная стилизация без !important.',

  recipePaletteTitle: 'Токены палитры',
  recipePaletteDesc:
    'Стабильные числовые шкалы для каждого акцентного цвета. Безопасно читать из любого CSS.',

  recipeSemanticTitle: 'Семантические токены',
  recipeSemanticDesc:
    'Эти токены автоматически переключаются с data-sg-theme. Переопределите их в скоупе, чтобы перекрасить всё внутри.',
  swatchSemanticBadge: 'semantic',

  recipeScopedBrandTitle: 'Бренд в скоупе через токены',
  recipeScopedBrandDesc:
    'Оберните любое поддерево и переопределите семантические токены. Всё внутри подхватит их — кнопки, инпуты, switch, progress, всё, что читает токены.',
  recipeScopedBrandHeading: 'Карточка бренда в скоупе',
  scopedBrandPrimary: 'Primary',
  scopedBrandDefault: 'Default',
  scopedBrandInputPlaceholder: 'Наследует токены',

  recipeDarkTitle: 'Тёмный скоуп (data-sg-theme="dark")',
  recipeDarkDesc:
    'Поставьте атрибут на ЛЮБОЙ контейнер — все семантические токены внутри переключатся на dark. Лейаут и палитра не меняются.',
  darkPrimary: 'Primary',
  darkDefault: 'Default',
  darkInputPlaceholder: 'Тёмный input',

  recipeBtnTokensTitle: 'Component-токены — Button',
  recipeBtnTokensDesc:
    'Переопределите --sg-btn-* в локальном скоупе. Только эти кнопки станут pill, остальное приложение не тронуто.',
  pillPrimary: 'Pill primary',
  pillDefault: 'Pill default',
  pillDashed: 'Pill dashed',

  recipeInputTokensTitle: 'Component-токены — Input / Select',
  recipeInputTokensDesc: 'Тот же приём для инпутов. Токены — per-component, описаны в контракте.',
  roundedInputPlaceholder: 'Скруглённый soft-input',
  matchingSelectPlaceholder: 'Подходящий select',

  recipeTableTokensTitle: 'Component-токены — Table',
  recipeTableTokensDesc:
    'Меняйте плотность, фон шапки, цвет hover через --sg-table-* без переопределения классов.',

  recipeSlotsTableTitle: 'Slot-ы — Table (classNames + styles)',
  recipeSlotsTableDesc:
    'Целитесь в стабильные DOM-ноды по ключу slot. Без глубоких селекторов, без !important. Каждый ключ slot документирован в §4 контракта.',

  recipeHeaderColTitle: 'headerClassName per-column',
  recipeHeaderColDesc:
    'Стилизуйте одну ячейку шапки, не трогая остальные — удобно для числовых / статусных колонок.',

  recipeCondRowsTitle: 'Условные строки (rowClassName)',
  recipeCondRowsDesc: 'Лучшие по очкам получают featured-фон. Чистый CSS-класс, ноль !important.',

  recipeCondCellsTitle: 'Условные ячейки (slot #cell)',
  recipeCondCellsDesc:
    'Slot :cell позволяет обернуть ячейку тела в свой элемент с условным классом — Vue-идиома, эквивалент React column.cellClassName.',

  recipeSlotsListTitle: 'Slot-ы — List (classNames + styles)',
  recipeSlotsListDesc:
    'Тот же API, что у Table. Каждый ключ slot объявлен в контракте: root / header / footer / items / item / empty / pagination.',
  slotsListHeader: 'Принципы стилизации',
  slotsListFooter: 'Все три уровня компонуются.',

  recipeCondListTitle: 'Условные элементы List (rowClassName)',
  recipeCondListDesc:
    'Выделяйте элементы динамически — pinned, featured, read, unread — одной функцией.',
  condListItem1: 'Переопределение токенов',
  condListItem2: 'classNames/styles slot-ов',
  condListItem3: 'Unstyled',
  condListItem4: 'Тёмная тема через data-sg-theme',

  recipeUnstyledTitle: 'Unstyled: полный визуальный контроль',
  recipeUnstyledDesc:
    'Каждый компонент в режиме unstyled сохраняет семантику (roles, aria-*, focus trap), но не отдаёт никакого дефолтного CSS.',
  unstyledWrapperTitle: 'Unstyled-обёртка',
  unstyledOpenButton: 'Открыть кастомный modal',
  unstyledInputPlaceholder: 'Подключите свой CSS',
  unstyledModalTitle: 'Кастомный modal',
  unstyledModalBody:
    'Этот modal приехал без CSS из библиотеки. Семантика (role, aria-modal, focus trap) при этом подключена.',
  unstyledModalClose: 'Закрыть',

  recipePerFeatureTitle: 'Бренд per-feature (композитный)',
  recipePerFeatureDesc:
    'Интерактив: подвиньте слайдер, выберите цвет. Один скоуп перекрашивает целую фичу — кнопки, инпуты, шапку таблицы, row hover — без пересборки.',
  perFeatureLabelPrimary: 'Primary',
  perFeatureLabelRadius: 'Radius',
  perFeaturePrimary: 'Primary',
  perFeatureDefault: 'Default',
  perFeatureInputPlaceholder: 'Scoped input',
}
