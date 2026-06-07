import { treeSelectDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `treeSelectDocEn`,
 * no extras.
 */
export const treeSelectDocRu: { [K in keyof typeof treeSelectDocEn]: string } = {
  pageTitle: 'TreeSelect',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbTreeSelect: 'TreeSelect',
  pageLead:
    'Дропдаун с деревом значений. Выбор одного узла, нескольких или отметка поддеревьев через `tree-checkable`.',
  pageWhen1: 'Когда опции образуют иерархию (оргструктуры, регионы, таксономии).',
  pageWhen2: 'Multi-select c чекбоксами на каждом узле (`tree-checkable`).',
  pageWhen3: 'Внутри форм — обернуть в `<SgField>` для валидации.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Single-value picker.',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc: 'Выбор нескольких узлов — selections склеиваются в подпись триггера.',
  demoCheckableTitle: 'Checkable',
  demoCheckableDesc: 'Чекбоксы на каждом узле — отметка родителя каскадно отмечает всё поддерево.',
  demoSearchTitle: 'Поиск',
  demoSearchDesc: 'Фильтр узлов вводом.',
  demoDisabledNodesTitle: 'Disabled-узлы',
  demoDisabledNodesDesc: 'Per-node `disabled` затемняет конкретные строки.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Три размера, одна структура.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc:
    'Три скоупа на токенах TreeSelect: зелёный бренд, тёмное поле (с деревом dropdown) и glass pick.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись на контроле TreeSelect: уезжает вверх при фокусе или когда узел выбран.',

  tableTreeSelectApi: 'API TreeSelect',
  tableTreeNodeData: 'TreeNodeData',
  tableCssVars: 'CSS-переменные',

  propTreeData: 'Иерархические узлы',
  propModelValue: 'Выбранное значение(я) (`v-model`); массив при `multiple`',
  propValue: 'Совместимый псевдоним `modelValue`',
  propDefaultValue: 'Начальный выбор (неуправляемый)',
  propMultiple: 'Включить multi-select',
  propTreeCheckable: 'Чекбоксы per node с каскадом по поддереву',
  propShowSearch: 'Показать фильтр-инпут в дропдауне',
  propAllowClear: 'Кнопка очистки при наличии значения',
  propPlaceholder: 'Placeholder при пустом значении',
  propTreeDefaultExpandAll: 'Раскрыть все ветки при первом рендере',
  propTreeDefaultExpandedKeys: 'Изначально раскрытые ключи (перекрывают `treeDefaultExpandAll`)',
  propSize: 'Размер контрола',
  propDisabled: 'Отключить весь селектор',
  propUnstyled: 'Без стилей SkyGraph',
  emitUpdateModelValue: 'Эмитится с новым значением (используется `v-model`)',
  emitChange: 'Зеркало `update:modelValue`',
  emitSearch: 'Эмитится с текущим текстом поиска',

  nodeKey: 'Уникальный идентификатор, используемый в `model-value`',
  nodeTitle: 'Подпись (строка)',
  nodeChildren: 'Вложенные узлы',
  nodeDisabled: 'Заблокировать выбор узла',

  cssHint:
    'TreeSelect использует Input-токены для контрола; дропдаун — те же overlay/hover-переменные, что Select.',

  cssSgColorPrimary: 'Цвет focused/active узла и выбранной таблетки',
  cssSgColorPrimaryBg: 'Focus-ring контрола',
  cssSgColorPrimaryHover: 'Hover-бордер контрола',
  cssSgInputBg: 'Фон контрола (общий с Input)',
  cssSgInputBorder: 'Цвет бордера контрола',
  cssSgInputRadius: 'Радиус контрола',
  cssSgInputHeight: 'Min-height контрола',
  cssSgColorBgElevated: 'Фон панели дропдауна',
  cssSgShadowLg: 'Тень панели дропдауна',
  cssSgColorBgHover: 'Фон строки на ховере',
  cssSgColorBorderSecondary: 'Бордер тегов в multi-select',
  cssSgBorderRadiusSm: 'Радиус выбранных тегов',
}
