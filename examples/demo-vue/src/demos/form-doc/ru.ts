import type { FormDocStrings } from './en'

export const formDocRu: FormDocStrings = {
  pageTitle: 'Форма',
  pageBadge: 'Ввод данных',
  crumbData: 'Ввод данных',
  crumbForm: 'Форма',
  pageLead:
    'Схема-агностичный движок форм: dotted-имена, валидация по правилам, контекст layout/size, распределённая композиция. Работает одинаково в плоских формах и в динамических массивах.',
  pageWhen1: 'Вы собираете данные от пользователя и хотите готовую валидацию, layout и фокус.',
  pageWhen2: 'Нужно общее контекст-состояние формы для произвольно вложенных компонентов.',

  demoBasicTitle: 'Базовая',
  demoBasicDesc: 'Несколько полей + submit. Default-slot выдаёт value/onChange/onBlur.',
  demoValidationTitle: 'Правила валидации',
  demoValidationDesc: 'required, length, regex и кастомные валидаторы с собственными сообщениями.',
  demoLayoutVTitle: 'Layout — vertical',
  demoLayoutVDesc: 'Дефолт: лейблы над контролами.',
  demoLayoutHTitle: 'Layout — horizontal',
  demoLayoutHDesc: '24-колоночная сетка через labelCol / wrapperCol.',
  demoLayoutITitle: 'Layout — inline',
  demoLayoutIDesc: 'Бары фильтров и поиска, где все поля в одной строке.',
  demoRequiredMarkTitle: 'Маркер обязательности',
  demoRequiredMarkDesc:
    'Звёздочка (дефолт), без маркера, либо «(optional)» — инвертированная схема.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc:
    'small / middle / large распространяется на все вложенные контролы через контекст.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'disabled на форме отключает все контролы одной командой.',
  demoNestedTitle: 'Вложенные поля',
  demoNestedDesc: 'Dotted-имена автоматически складываются во вложенные объекты в дереве значений.',
  demoControlsTitle: 'Галерея контролов',
  demoControlsDesc:
    'Select, RadioGroup, Switch, Checkbox, InputNumber, Slider — единый паттерн default-slot.',
  demoCompositionTitle: 'Распределённая композиция',
  demoCompositionDesc:
    'Три вложенных компонента делят один form-контекст — никакого drilling-а значений.',

  demoAsyncTitle: 'Асинхронная валидация',
  demoAsyncDesc:
    'Валидатор может вернуть Promise; поле показывает loading-состояние пока он pending.',
  demoDependentTitle: 'Зависимые поля',
  demoDependentDesc:
    '`dependencies` ревалидирует поле при изменении соседей — классика confirm-password.',
  demoFieldStatusTitle: 'Кастомный статус поля',
  demoFieldStatusDesc:
    '`validateStatus` красит success / warning / error / validating от внешнего источника.',
  demoLiveWatchTitle: 'Live watch',
  demoLiveWatchDesc:
    '`useWatch(core, path)` подписывается только на одно поле — соседи не ререндерятся.',
  demoLoginCardTitle: 'Карточка логина',
  demoLoginCardDesc: 'Реальный стиль: центрированная карта-обёртка, форма остаётся семантической.',
  demoSearchBarTitle: 'Бар поиска',
  demoSearchBarDesc: 'Inline-фильтр из текста / select / даты в одной строке.',
  demoSchemaBasicTitle: 'SchemaForm — базовая',
  demoSchemaBasicDesc: '`<SgSchemaForm>` строит поля, дефолты и правила из JSON Schema.',
  demoSchemaLayoutTitle: 'SchemaForm — layout',
  demoSchemaLayoutDesc: 'Horizontal + small и inline + disabled на одной и той же схеме.',
  demoFormListTitle: 'FormList — динамический',
  demoFormListDesc:
    '`<SgFormList>` регистрирует массивный путь и отдаёт операции `add` / `remove` / `move`; дочерние поля адресуют свои слоты через dotted-пути.',
  demoProgrammaticTitle: 'Программное управление',
  demoProgrammaticDesc:
    'Управляйте формой императивно через `useForm()` — вызывайте `reset`, `setFieldsValue`, `validateFields`, `submit` извне `<SgForm>`.',
  demoProfileSettingsTitle: 'Настройки профиля',
  demoProfileSettingsDesc:
    'Многосекционная форма с двухколоночной сеткой, switch-ами, date picker и upload — всё через единый form-контекст.',

  tableFormApi: 'API формы',
  tableFieldApi: 'API поля',

  propLayout: 'Layout label/control',
  propSize: 'Размер по умолчанию для вложенных контролов',
  propDisabled: 'Отключить все вложенные контролы одновременно',
  propRequiredMark: 'Как помечаются обязательные поля',
  propLabelCol: 'Сетка label-колонки (horizontal)',
  propWrapperCol: 'Сетка wrapper-колонки (horizontal)',
  propLabelAlign: 'Выравнивание текста label в horizontal',
  propValidateOn: 'Когда срабатывает валидация',
  propScroll: 'Прокрутить к первому невалидному полю после submit',
  propPreserve: 'Сохранять значения отмонтированных полей',
  propDefaultValues: 'Начальные значения при монтировании',
  propColon: 'Добавлять «:» к лейблам',
  emitFinish: 'Submit прошёл — payload это карта значений',
  emitFinishFailed: 'Submit упал — payload это карта ошибок',
  emitValuesChange: 'Изменилось любое значение поля',

  propFieldName: 'Путь поля в store формы (обязательный, dotted)',
  propFieldLabel: 'Текст лейбла над/рядом с контролом',
  propFieldRequired: 'Шорткат — добавляет required-правило',
  propFieldRules: 'Правила валидации, выполняются по порядку',
  propFieldHelp: 'Хелпер-текст под контролом',
  propFieldExtra: 'Дополнительный текст под хелпером',
  propFieldHidden: 'Скрыть поле, но сохранить значение в store',
  propFieldNoStyle: 'Только содержимое слота — без label, сообщения и обёртки',
  propFieldNormalize: 'Маппинг сырого значения перед коммитом',
  propFieldValidateFirst: 'Остановиться на первом упавшем правиле',
  propFieldTooltip: 'Tooltip на лейбле',
}
