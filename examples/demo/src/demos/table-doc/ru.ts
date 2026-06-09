import { tableDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `tableDocEn`, no extras.
 */
export const tableDocRu: { [K in keyof typeof tableDocEn]: string } = {
  pageTitle: 'Table',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbTable: 'Таблица',
  pageLead:
    'Таблица отображает строки данных. Построена на div + CSS Grid для максимальной гибкости.',
  pageWhen1: 'Для отображения коллекции структурированных данных.',
  pageWhen2: 'Для сортировки, поиска, пагинации и фильтрации данных.',
  pageWhen3: 'Для отображения иерархических данных через tree-режим.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Простая таблица с сортировкой и кастомным рендером.',
  demoSortableTitle: 'Сортировка',
  demoSortableDesc:
    'Сортируемые колонки. Клик по заголовку — toggle asc/desc; shift+клик — мультисорт.',
  demoSelectionTitle: 'Выбор строк',
  demoSelectionDesc: 'Выбор чекбоксами с select-all. Контролируемое состояние.',
  demoExpandableTitle: 'Раскрываемые строки',
  demoExpandableDesc: 'Клик по стрелке раскрывает строку и показывает доп. содержимое.',
  demoTreeDataTitle: 'Tree-данные',
  demoTreeDataDesc:
    'Иерархическая оргструктура с вложенными потомками. Клик по стрелкам — expand / collapse.',
  demoColumnGroupsTitle: 'Группы колонок',
  demoColumnGroupsDesc: 'Многоуровневый header с группированными колонками (Contact Info, Work).',
  demoFixedColumnsTitle: 'Фиксированные колонки',
  demoFixedColumnsDesc: 'Name закреплён слева, Action — справа. Прокрутка по горизонтали.',
  demoResizableTitle: 'Resizable-колонки',
  demoResizableDesc:
    'Тяните правый край заголовка для изменения ширины. Удобно для контента переменной длины.',
  demoDraggableColumnsTitle: 'Перетаскивание колонок',
  demoDraggableColumnsDesc:
    'Меняйте порядок колонок перетаскиванием заголовков. Подпишитесь на `onColumnOrderChange`, чтобы сохранить порядок.',
  demoEditableTitle: 'Редактируемые ячейки',
  demoEditableDesc:
    'Двойной клик по ячейке для редактирования. Enter — сохранить, Escape — отмена.',
  demoFiltersTitle: 'Фильтры колонок',
  demoFiltersDesc: 'Мультивыбор чекбоксами на колонках Role и Status.',
  demoSearchFilterTitle: 'Search-фильтр',
  demoSearchFilterDesc:
    "Name и Email используют filterMode='search' — введите текст для фильтра по подстроке.",
  demoCustomFilterDropdownTitle: 'Свой фильтр-dropdown',
  demoCustomFilterDropdownDesc: 'Полностью свой UI фильтра через prop filterDropdown.',
  demoGlobalSearchTitle: 'Глобальный поиск',
  demoGlobalSearchDesc: 'Введите в поле поиска для фильтрации по всем колонкам.',
  demoSummaryTitle: 'Summary-строка',
  demoSummaryDesc: 'Footer-строка с итогами и средними.',
  demoLoadingTitle: 'Состояние загрузки',
  demoLoadingDesc: 'Таблица с loading-оверлеем. Тогглите, чтобы увидеть эффект.',
  demoEmptyStateTitle: 'Пустое состояние',
  demoEmptyStateDesc: 'Таблица без данных и кастомный текст пустого состояния.',
  demoStyledSlotsTitle: 'Стилизация: classNames / styles (слоты)',
  demoStyledSlotsDesc:
    'Стилизуйте стабильные DOM-слоты без глубоких селекторов. Также показано column.headerClassName.',
  demoCustomTokensTitle: 'Стилизация: токены компонента (на инстанс)',
  demoCustomTokensDesc:
    'Переопределите токены `--sg-table-*` на обёртке для рестайла одной таблицы.',
  demoConditionalRowsTitle: 'Условный цвет строк',
  demoConditionalRowsDesc:
    'rowClassName помечает строки по состоянию. CSS делает остальное — без глубоких селекторов.',
  demoProgressCellsTitle: 'Прогресс-ячейки',
  demoProgressCellsDesc:
    'column.render возвращает progress bars, статус-капсулы и числа с динамическим цветом.',
  demoFinanceStyleTitle: 'Финансовый стиль (Stock Terminal)',
  demoFinanceStyleDesc:
    'Моноширинные тикеры, зелёные / красные дельты, табулярные числа. Только слоты и render.',
  demoVirtualTitle: 'Virtual scroll',
  demoVirtualDesc: 'Эффективный рендер тысяч строк — монтируется только видимое в viewport.',
  demoKitchenSinkTitle: 'Kitchen Sink',
  demoKitchenSinkDesc:
    'Все возможности вместе: selection, expand, sort, filter, search, resize, фиксированные колонки, editable, summary.',
  demoAdvancedFiltersTitle: 'Расширенные фильтры',
  demoAdvancedFiltersDesc:
    "filterMode='advanced' с операторами по типу колонки: числовые eq/lt/gt/between, строковые contains/startsWith, enum in/notIn, диапазон дат и кастомный dropdown `contains/notContains` для массива тегов. В футере — счётчик отфильтрованных и глобальный reset.",
  demoGroupingTitle: 'Группировка',
  demoGroupingDesc:
    'groupBy с переключаемым полем + column.aggregate (sum / sum / max через свой reducer). Группы раскрываются / сворачиваются; футер считает общие итоги по датасету.',
  demoVirtualDynamicTitle: 'Virtual scroll: динамические высоты строк',
  demoVirtualDynamicDesc:
    'rowHeight как функция: длинные сообщения — 120px, короткие — 48px. estimateRowHeight покрывает строки вне viewport. Load more увеличивает датасет за 4000 строк, в DOM при этом — только видимое + overscan.',
  demoLargeDatasetTitle: 'Большой датасет (стресс-тест)',
  demoLargeDatasetDesc:
    '10 000 строк с virtual + sort + filter + groupBy + pinning колонок + selection одновременно. Smoke-тест на плавность скролла и интерактивность на реалистичных объёмах.',
  demoRealtimeTitle: 'Realtime-обновления',
  demoRealtimeDesc:
    '100 ticker-строк, обновляются раз в 1.5с. Ячейка price моргает зелёным / красным на изменение (CSS keyframe); сортировка и фильтры не сбрасываются — строки ключуются по id.',

  tableTableApi: 'API Table',
  tableColumnApi: 'API Column',
  tableCssVars: 'CSS-переменные',

  propColumns: 'Конфигурация колонок таблицы',
  propData: 'Строки данных с полями id и data',
  propPageSize: 'Строк на странице',
  propShowPagination: 'Показывать пагинацию',
  propBordered: 'Показывать все границы',
  propSize: 'Плотность таблицы',
  propLoading: 'Показать loading-оверлей',
  propSearchable: 'Показать глобальное поле поиска',
  propScroll: 'Ширина горизонтальной прокрутки',
  propRowSelection: 'Конфиг выбора строк',
  propExpandable: 'Конфиг раскрываемых строк',
  propTree: 'Конфиг tree-данных',
  propSummary: 'Функция рендера summary-строки',
  propDraggable: 'Включить drag & drop реордер колонок',
  propOnColumnOrderChange: 'Колбэк при реордере колонок',
  propOnCellEdit: 'Колбэк при редактировании ячейки',
  propRowClassName: 'Кастомный класс для строк',
  propClassNames: 'Слот-классы (root/toolbar/headerCell/bodyCell/row/...)',
  propStyles: 'Inline-стили слотов (root/toolbar/headerCell/bodyCell/row/...)',
  propLocale: 'Переопределение локали',
  propVirtual: 'Конфиг virtual scroll',
  propUnstyled: 'Убрать все встроенные стили',

  colKey: 'Уникальный ключ колонки (соответствует полю в data)',
  colTitle: 'Текст заголовка колонки',
  colWidth: 'Ширина колонки в px',
  colAlign: 'Выравнивание текста',
  colSortable: 'Включить сортировку',
  colFixed: 'Зафиксировать позицию колонки',
  colResizable: 'Включить изменение ширины колонки',
  colEditable: 'Включить inline-редактирование ячеек',
  colEllipsis: 'Обрезать текст с многоточием',
  colRender: 'Функция кастомного рендера ячейки',
  colHeaderClassName: 'Класс для header-ячейки этой колонки',
  colFilters: 'Пункты меню фильтра',
  colOnFilter: 'Функция логики фильтра',
  colFilterMultiple: 'Разрешить несколько значений фильтра',
  colFilterMode: 'Использовать поле поиска вместо чекбоксов',
  colFilterSearch: 'Показать поиск в dropdown фильтра',
  colFilterDropdown: 'Кастомный рендер dropdown фильтра',
  colFilterIcon: 'Кастомная иконка фильтра',
  colDefaultFilteredValue: 'Стартовые значения фильтра на mount',
  colChildren: 'Вложенные колонки для групп',
  colOnCell: 'Кастомные атрибуты ячейки (row/col span)',

  cssHint:
    'Скоупайте на обёртке, чтобы перекрасить одну таблицу; ставьте на :root — для всех таблиц приложения.',

  cssSgTableRowHeight: 'Минимальная высота строки тела',
  cssSgTableRowBg: 'Фон строки (перекрывается hover/selected)',
  cssSgTableRowHoverBg: 'Фон строки при наведении',
  cssSgTableHeaderBg: 'Фон строки header',
  cssSgTableHeaderColor: 'Цвет текста в header',
  cssSgTableBorderColor: 'Border header + внешние',
  cssSgTableBorderColorSecondary: 'Разделитель между строками',
  cssSgTableCellPadding: 'Padding каждой ячейки (настройка плотности)',
  cssSgTableCellSolidBg: 'Непрозрачная база для grid + sticky фиксированных ячеек',
}
