import type { TableDocStrings } from './en'

export const tableDocRu: TableDocStrings = {
  pageTitle: 'Таблица',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbTable: 'Таблица',
  pageLead:
    'Headless `useTable()` + оболочка `<SgTable>` — сортировка, фильтр, поиск, пагинация, выбор строк, expandable, дерево, виртуальный скролл и inline-редактирование.',
  pageWhen1: 'Выводим коллекцию структурированных записей.',
  pageWhen2: 'Нужны сорт/поиск/пагинация/фильтр без тяжёлой data-grid.',
  pageWhen3:
    'Нужны expandable-строки, древовидные данные, виртуальный скролл, inline-редактирование.',

  demoBasicTitle: 'Базовая',
  demoBasicDesc: 'Колонки + строки — больше ничего не нужно.',
  demoSortableTitle: 'Сортировка',
  demoSortableDesc: 'Клик по `sortable`-заголовку: asc → desc → none.',
  demoSelectionTitle: 'Выбор строк',
  demoSelectionDesc:
    'Чекбоксы через `rowSelection.selectedKeys` + `onChange`. Чекбокс в шапке выделяет всё видимое.',
  demoExpandableTitle: 'Expandable-строки',
  demoExpandableDesc:
    'Передайте `expandable.expandedRowRender` чтобы раскрывать произвольный контент под строкой. Vue рендерит результат через слот `#expandedRow`.',
  demoTreeDataTitle: 'Дерево',
  demoTreeDataDesc:
    'Передайте `tree` и используйте `data.children` для иерархии. Стрелки разворота появляются автоматически в первой колонке.',
  demoColumnGroupsTitle: 'Группы колонок',
  demoColumnGroupsDesc:
    'У любой колонки может быть `children`; родитель рендерится как спаннящий заголовок над листьями.',
  demoFixedColumnsTitle: 'Закреплённые колонки',
  demoFixedColumnsDesc:
    '`fixed: "left"` или `fixed: "right"` — колонка прилипает, середина скроллится горизонтально.',
  demoResizableTitle: 'Изменение ширины',
  demoResizableDesc: 'Тяните правый край заголовка — ширина сохраняется в state таблицы.',
  demoEditableTitle: 'Inline-редактирование',
  demoEditableDesc:
    'Двойной клик по `editable`-ячейке. Enter сохраняет, Esc отменяет. `@cellEdit` отдаёт (id, column, value).',
  demoFiltersTitle: 'Фильтры колонок',
  demoFiltersDesc:
    '`filters` на колонке рендерит дропдаун в шапке; `onFilter` решает соответствие.',
  demoSearchFilterTitle: 'Поиск-фильтр',
  demoSearchFilterDesc: 'Тулбар-поиск по всем видимым колонкам — встроен через `searchable`.',
  demoCustomFilterDropdownTitle: 'Свой фильтр-дропдаун',
  demoCustomFilterDropdownDesc:
    'Замените всплывающее меню фильтра через слот `#filterDropdown`. В слот приходят selectedKeys / setSelectedKeys / confirm / clearFilters / close.',
  demoGlobalSearchTitle: 'Глобальный поиск',
  demoGlobalSearchDesc:
    '`searchable` рендерит инпут в тулбаре, который ищет подстроку во всех видимых колонках.',
  demoSummaryTitle: 'Summary-строки',
  demoSummaryDesc:
    '`summary` возвращает строки ячеек с `colSpan` / `align`. Идеально для тоталов, среднего и кастомных футеров.',
  demoLoadingTitle: 'Загрузка',
  demoLoadingDesc:
    '`loading` показывает оверлей со спиннером и блокирует взаимодействия. Кнопка переключает состояние.',
  demoEmptyStateTitle: 'Пустое состояние',
  demoEmptyStateDesc: 'Пустой массив → плейсхолдер. Слот `#empty` заменяет текст.',
  demoStyledSlotsTitle: 'Стилизация слотов',
  demoStyledSlotsDesc:
    'Класс-хуки на слоты через `classNames` — свой BEM на header rows, body cells, pagination.',
  demoCustomTokensTitle: 'Кастомные токены',
  demoCustomTokensDesc:
    'Перекрыть `--sg-table-*` токены на враппере, чтобы перекрасить только эту таблицу.',
  demoConditionalRowsTitle: 'Условный стиль строк',
  demoConditionalRowsDesc:
    '`rowClassName`-функция красит строки по данным — archived dim, paused warning.',
  demoProgressCellsTitle: 'Прогресс-ячейки',
  demoProgressCellsDesc:
    'Слот `#cell` рендерит Progress / Tag / цветные числа — тон ячейки зависит от значения.',
  demoFinanceStyleTitle: 'Финансовая стилизация',
  demoFinanceStyleDesc:
    '«Стоковый терминал» только на публичных пропсах — `classNames.root` + слот `#cell`. Без глубоких селекторов.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Снять Skygraph CSS — приклеить свою дизайн-систему. DOM не меняется.',
  demoVirtualTitle: 'Виртуальный скролл',
  demoVirtualDesc:
    '`virtual` держит DOM ≈ viewport + overscan даже на тысячах строк. Число в `rowHeight` — быстрый fixed-путь.',
  demoKitchenSinkTitle: 'Все фичи сразу',
  demoKitchenSinkDesc:
    'Большинство фич вместе — selection + expand + sort + filter + search + resize + fixed + editable + summary.',
  demoAdvancedFiltersTitle: 'Расширенные фильтры',
  demoAdvancedFiltersDesc:
    'Операторные диалоги фильтра по типу колонки (числа / текст / теги) через `#filterDropdown`. Зеркало `filterMode="advanced"` из React.',
  demoGroupingTitle: 'Группировка и агрегаты',
  demoGroupingDesc:
    'Колоночный `aggregate` запускает sum / avg / count / min / max / свой редьюсер по видимым строкам; включите `footer` чтобы увидеть тотал.',
  demoVirtualDynamicTitle: 'Виртуальный — динамическая высота',
  demoVirtualDynamicDesc:
    'Передайте функцию `rowHeight(row)` для разных высот; `estimateRowHeight` сглаживает layout-jank до измерения.',
  demoLargeDatasetTitle: 'Большой датасет',
  demoLargeDatasetDesc: '1 000 строк через `pageSize`. Для тысяч записей включайте `virtual`.',
  demoRealtimeTitle: 'Realtime',
  demoRealtimeDesc:
    'Реактивный `data` — мутируем массив, таблица перерисовывается. progress тикает каждые 800 мс.',

  tableTableApi: 'API таблицы',
  tableColumnApi: 'API колонки',
  tableCssVars: 'CSS-переменные',

  propColumns: 'Описание колонок',
  propData: 'Строки: `{ id, data }[]`',
  propPageSize: 'Размер страницы',
  propShowPagination: 'Показывать блок пагинации',
  propBordered: 'Линии вокруг таблицы',
  propSize: 'Плотность',
  propLoading: 'Оверлей-загрузка над телом таблицы',
  propSearchable: 'Поиск в тулбаре по видимым колонкам',
  propScroll: 'Горизонтальные/вертикальные ограничения скролла',
  propRowSelection: 'Состояние выбора строк',
  propExpandable: 'Inline-разворот строки',
  propTree: 'Древовидные данные (рендерит `data.children`)',
  propSummary: 'Кастомные summary-строки под телом',
  propOnCellEdit: 'Коммит inline-редактирования ячейки',
  propRowClassName: 'Класс строки (строка или функция)',
  propSticky: 'Sticky-шапка при скролле',
  propLocale: 'Свои локализационные строки',
  propVirtual: 'Виртуализация (fixed или динамическая высота)',
  propUnstyled: 'Снять стили Skygraph',
  propClassNames: 'Класс-хуки на слоты',
  propStyles: 'Стили на слоты',
  propFooter: 'Показывать строку-агрегатор внизу таблицы',
  emitRowClick: 'Клик по строке',
  emitPageChange: 'Клик по пагинации',
  emitSortChange: 'Сменилась сортировка',
  emitCellEdit: 'Inline-редактирование закоммитили',
  emitExpand: 'Тоггл expand-строки',

  colKey: 'Уникальный ключ колонки',
  colTitle: 'Заголовок колонки',
  colWidth: 'Ширина колонки в px',
  colMinWidth: 'Минимальная ширина при ресайзе',
  colSortable: 'Включить click-to-sort',
  colAlign: 'Выравнивание текста',
  colFixed: 'Sticky-позиция колонки',
  colResizable: 'Включить drag-handle на заголовке',
  colEditable: 'Разрешить inline-редактирование когда задан `onCellEdit`',
  colHidden: 'Скрыть колонку',
  colFilters: 'Опции фильтра в шапке',
  colOnFilter: 'Предикат соответствия фильтру',
  colFilterMultiple: 'Разрешить мульти-выбор в меню фильтра',
  colChildren: 'Дочерние колонки для сгруппированных заголовков',
  colAggregate: 'Агрегат футера (имя или свой редьюсер)',
  colOnCell: 'Возвращает rowSpan / colSpan для ячейки',

  cssHint:
    'Применяйте на враппере, чтобы перекрасить одну таблицу; на :root — для всего приложения.',
  cssSgTableRowHeight: 'Минимальная высота строки',
  cssSgTableRowBg: 'Фон строки (перебивается hover / selected)',
  cssSgTableRowHoverBg: 'Фон строки при hover',
  cssSgTableHeaderBg: 'Фон строки заголовка',
  cssSgTableBorderColor: 'Цвет внешних/header границ',
  cssSgTableBorderColorSecondary: 'Цвет разделителей строк',
  cssSgTableCellPadding: 'Падинг ячейки (плотность)',
  cssSgTableCellSolidBg: 'Непрозрачный фон для grid и sticky fixed-cells',
}
