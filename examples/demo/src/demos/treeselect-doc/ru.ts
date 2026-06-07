import { treeSelectDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `treeSelectDocEn`, no extras.
 */
export const treeSelectDocRu: { [K in keyof typeof treeSelectDocEn]: string } = {
  pageTitle: 'TreeSelect',
  pageLead:
    'Селектор-dropdown поверх дерева. Выбирайте один лист, несколько листов или каскадно целые поддеревья.',
  pageWhen1: 'Когда у опций есть иерархия (оргсхемы, регионы, таксономии).',
  pageWhen2: 'Когда нужен multi-select с каскадом parent/child (`treeCheckable`).',
  pageWhen3: 'Внутри форм — оборачивайте в <Field> для валидации.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Селектор одного значения.',
  demoMultipleTitle: 'Множественный выбор',
  demoMultipleDesc: 'Выбор нескольких листьев — отображаются как теги.',
  demoCheckableTitle: 'С чекбоксами',
  demoCheckableDesc: 'Чекбоксы с каскадом по поддереву.',
  demoSearchTitle: 'Поиск',
  demoSearchDesc: 'Фильтрация узлов по вводу.',
  demoDisabledNodesTitle: 'Отключённые узлы',
  demoDisabledNodesDesc: 'Per-node `disabled` затемняет конкретные строки.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Три размера, одинаковая структура.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc:
    'Три скоупа — зелёный бренд, тёмное поле, glass pick — перекрашивают один TreeSelect.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись над триггером — уезжает вверх при фокусе или после выбора узла.',

  tableTreeSelectApi: 'API TreeSelect',
  tableTreeNodeData: 'TreeNodeData',
  tableCssVars: 'CSS-переменные',

  propTreeData: 'Иерархические узлы',
  propValue: 'Выбранный ключ (или ключи)',
  propDefaultValue: 'Начальный выбор (неконтролируемый)',
  propOnChange: 'Callback изменения выбора',
  propMultiple: 'Включить multi-select (теги)',
  propTreeCheckable: 'Чекбоксы и каскадный выбор поддеревьев',
  propShowSearch: 'Показать input фильтра в dropdown',
  propAllowClear: 'Показать кнопку очистки при наличии значения',
  propPlaceholder: 'Плейсхолдер при пустом значении',
  propTreeDefaultExpandAll: 'Раскрыть всех родителей при монтировании',
  propSize: 'Размер контрола',
  propDisabled: 'Отключить весь селектор',
  propUnstyled: 'Рендер без стилей SkyGraph',

  nodeKey: 'Уникальный идентификатор, используемый в `value`',
  nodeTitle: 'Отображаемая подпись',
  nodeChildren: 'Вложенные дочерние узлы',
  nodeDisabled: 'Блокировать выбор этого узла',
  nodeSelectable: 'Per-node разрешение выбора',
  nodeCheckable: 'Per-node разрешение чекбокса',

  cssHint:
    'TreeSelect использует control-токены Input; dropdown переиспользует те же overlay + hover переменные, что и Select.',

  cssSgColorPrimary: 'Узел в фокусе / активный + заливка выбранного pill',
  cssSgColorPrimaryBg: 'Focus ring вокруг контрола',
  cssSgColorPrimaryHover: 'Граница контрола при наведении',
  cssSgInputBg: 'Фон контрола (общий с Input)',
  cssSgInputBorder: 'Цвет границы контрола',
  cssSgInputRadius: 'Радиус контрола',
  cssSgInputHeight: 'Минимальная высота контрола',
  cssSgColorBgElevated: 'Фон панели dropdown',
  cssSgShadowLg: 'Тень панели dropdown',
  cssSgColorBgHover: 'Фон строки при наведении в dropdown',
  cssSgColorBorderSecondary: 'Граница тега в режиме multi-select',
  cssSgBorderRadiusSm: 'Радиус выбранного тега',
}
