import { formDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `formDocEn`, no extras.
 */
export const formDocRu: { [K in keyof typeof formDocEn]: string } = {
  pageTitle: 'Form',
  pageLead:
    'Высокопроизводительная форма с валидацией на уровне поля, зависимостями, динамическими массивами и императивным управлением.',
  pageWhen1: 'Когда нужно создавать или редактировать данные с валидацией.',
  pageWhen2: 'Когда форма имеет зависимые поля (например, confirm password).',
  pageWhen3: 'Для динамических массивов — телефоны, теги, адреса.',
  pageWhen4: 'Для search/filter-баров через `layout="inline"`.',

  demoBasicTitle: 'Базовая',
  demoBasicDesc: 'Минимальная форма: два поля с правилами и кнопка submit.',
  demoValidationRulesTitle: 'Правила валидации',
  demoValidationRulesDesc:
    'Required, длина, regex, встроенные типы (`email`, `url`) и кастомные валидаторы — у каждого своё сообщение.',
  demoDependentFieldsTitle: 'Зависимые поля',
  demoDependentFieldsDesc:
    '`dependencies` запускает повторную валидацию при изменении связанного поля. Классический паттерн password / confirm.',
  demoAsyncValidationTitle: 'Асинхронная валидация',
  demoAsyncValidationDesc: 'Валидаторы могут возвращать Promise. Поле показывает спиннер во время проверки.',
  demoLayoutVerticalTitle: 'Layout — vertical',
  demoLayoutVerticalDesc: 'Подписи над контролами. По умолчанию и рекомендуется для signup / profile.',
  demoLayoutHorizontalTitle: 'Layout — horizontal',
  demoLayoutHorizontalDesc: '24-колонная сетка через `labelCol` / `wrapperCol`. Удобно для админ-настроек.',
  demoLayoutInlineTitle: 'Layout — inline',
  demoLayoutInlineDesc: 'Всё в одну строку — идеально для search / filter-баров.',
  demoRequiredMarkTitle: 'Required mark',
  demoRequiredMarkDesc:
    'Выберите, как подсвечивать обязательные поля: звёздочка, ничего или инвертированная конвенция «optional».',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: '`size` на форме применяется ко всем контролам внутри.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc:
    'Disable на уровне формы выключает все контролы разом; отдельные поля могут включаться/выключаться.',
  demoControlsTitle: 'Галерея контролов',
  demoControlsDesc:
    'Одна форма со всеми поддерживаемыми контролами — Select, Checkbox, RadioGroup, Switch, InputNumber, DatePicker, TimePicker, AutoComplete, Slider, Rate.',
  demoFieldStatusTitle: 'Статус поля и feedback',
  demoFieldStatusDesc:
    '`validateStatus` + `hasFeedback` для ручного статуса (success / warning / error / validating).',
  demoFormListTitle: 'Динамический список (FormList)',
  demoFormListDesc:
    'Add / remove / reorder элементов массива. Каждая строка — независимый `<Field>` со своей валидацией.',
  demoNestedFieldsTitle: 'Вложенные поля',
  demoNestedFieldsDesc: 'Имена через точку (`address.city`) автоматически складываются во вложенные объекты.',
  demoDistributedTitle: 'Распределённая композиция',
  demoDistributedDesc:
    'Три вложенных компонента — корневой держит `<Form>`, средний добавляет chrome секции, листовой рендерит `<Field>`. Один контекст формы; никакого prop-drilling значений.',
  demoProgrammaticTitle: 'Программное управление',
  demoProgrammaticDesc:
    '`useForm()` отдаёт `reset`, `setFieldsValue`, `validate`, `submit`. Шарьте инстанс через prop `form`.',
  demoLiveWatchTitle: 'Live-значения (useWatch)',
  demoLiveWatchDesc:
    '`useWatch(core, path)` ререндерится только при изменении этого поля — идеально для live-превью.',
  demoLoginCardTitle: 'Login card',
  demoLoginCardDesc:
    'Реальный стилизованный контейнер — сама форма остаётся семантичной, весь look-and-feel в `.demo-login-card`.',
  demoSearchBarTitle: 'Search bar',
  demoSearchBarDesc:
    'Inline-layout в стилизованной карточке. Панель собирает `q`, role, status и фильтр по дате.',
  demoProfileSettingsTitle: 'Настройки профиля',
  demoProfileSettingsDesc:
    'Многоколоночная форма с секциями: личные данные, уведомления (Switches) и загрузка аватара.',
  demoSchemaFormBasicTitle: 'SchemaForm — JSON Schema',
  demoSchemaFormBasicDesc:
    '`<SchemaForm schema={...}/>` выводит поля, правила и значения по умолчанию из JSON Schema. Передайте Zod-схему — она конвертируется через `zodToJsonSchema` перед рендерингом.',
  demoSchemaFormLayoutTitle: 'SchemaForm — layout и size',
  demoSchemaFormLayoutDesc:
    '`layout`, `size`, `disabled`, `labelCol`, `wrapperCol` пробрасываются в Form — обёртка не нужна.',

  tableFormApi: 'API Form',
  tableFieldApi: 'API Field',
  tableFormListApi: 'API FormList',
  tableSchemaFormApi: 'API SchemaForm',
  tableCssVars: 'CSS-переменные',

  formLayout: 'Раскладка формы',
  formDefaultValues: 'Начальные значения формы',
  formOnSubmit: 'Обработчик submit',
  formOnSubmitInvalid: 'Вызывается, если валидация падает на submit',
  formOnValuesChange: 'Callback при изменении любого значения',
  formValidateTrigger: 'Когда валидировать',
  formScrollToFirstError: 'Прокрутить к первой ошибке на submit',
  formPreserve: 'Сохранять значения unmounted-полей',
  formDisabled: 'Отключить все контролы формы',
  formSize: 'Размер контролов формы',
  formRequiredMark: 'Как помечаются обязательные поля',
  formColon: 'Добавлять двоеточие после labels',
  formLabelCol: 'Сетка labels (horizontal layout)',
  formWrapperCol: 'Сетка контролов (horizontal layout)',
  formLabelAlign: 'Выравнивание labels (horizontal layout)',
  formFeedbackIcons: 'Кастомные иконки на состояние валидации',
  formFormProp: 'Внешний инстанс useForm (для императивного управления)',

  fieldName: 'Имя поля (путь в значениях формы)',
  fieldLabel: 'Подпись поля',
  fieldRequired: 'Сокращение для правила `{ required: true }`',
  fieldRules: 'Массив правил валидации',
  fieldWarningRules: 'Правила, дающие warning (не блокируют)',
  fieldDependencies: 'Поля для re-валидации',
  fieldType: 'Встроенный тип input, если children не переданы',
  fieldPlaceholder: 'Текст плейсхолдера',
  fieldDisabled: 'Отключает это поле (переопределяет form-level)',
  fieldHidden: 'Скрывает поле, но сохраняет регистрацию значения',
  fieldTooltip: 'Help-tooltip рядом с label',
  fieldHelp: 'Help-текст под контролом',
  fieldExtra: 'Дополнительный контент ниже',
  fieldValidateStatus: 'Ручной бейдж состояния валидации',
  fieldHasFeedback: 'Показать иконку статуса внутри контрола',
  fieldNormalize: 'Маппинг raw-значений перед коммитом',
  fieldValuePropName: 'Имя prop, хранящего значение в дочернем контроле',
  fieldValidateFirst: 'Остановить после первого упавшего правила',
  fieldPreserve: 'Сохранять значение при unregister (переопределяет form)',
  fieldLabelCol: 'Переопределяет labelCol формы для этого поля',
  fieldWrapperCol: 'Переопределяет wrapperCol формы для этого поля',
  fieldChildren: 'Render-prop для кастомных контролов',

  formListName: 'Имя array-поля в значениях формы',
  formListInitialValue: 'Seed-значение, если путь пустой при mount',
  formListDraggable: 'Дать dragProps на каждой строке для HTML5 DnD',
  formListChildren: '(fields, { add, remove, move, replace }, meta) => ReactNode',

  schemaFormSchema: 'JSON Schema объект или Zod-схема (есть `_def`) — конвертируется в JSON Schema внутри',
  schemaFormOnSubmit: 'Получает все значения после успешного submit',
  schemaFormLayout: 'Пробрасывается во внутреннюю Form',
  schemaFormSize: 'Размер всех генерируемых полей',
  schemaFormDisabled: 'Отключает все генерируемые контролы и внутреннюю Form',
  schemaFormLabelCol: '24-колонный span для labels (horizontal layout)',
  schemaFormWrapperCol: '24-колонный span для контролов (horizontal layout)',
  schemaFormForm: 'Внешний инстанс `useForm()` (пропустить внутренний из defaults схемы)',
  schemaFormSubmitText: 'Подпись дефолтной кнопки submit, когда `children` опущен',
  schemaFormChildren: 'Кастомная кнопка submit / footer (заменяет дефолтный `<button type="submit">`)',

  cssHint:
    'Form наследует большинство стилей от внутреннего Input. Переопределяйте здесь, чтобы перенастроить ошибки, spacing или типографику только для этой формы.',

  cssSgColorError: 'Текст и граница ошибки на невалидных полях',
  cssSgColorErrorBg: 'Тинт focus ring на невалидных полях',
  cssSgColorText: 'Цвет текста label и input',
  cssSgColorTextTertiary: 'Подсказки help / extra',
  cssSgFontSize: 'Размер текста поля',
  cssSgFontSizeSm: 'Размер сообщения help / error',
  cssSgMarginXs: 'Зазор между label и контролом',
  cssSgMarginMd: 'Нижний spacing между полями',
  cssSgPaddingMd: 'Горизонтальный зазор в horizontal-layout',
  cssSgPaddingSm: 'Зазор между контролами в inline-layout',
  cssSgLineHeight: 'line-height для label / help',
  cssSgInputBorder: 'Переопределяется на --sg-color-error для невалидного поля (через токены Input)',
}
