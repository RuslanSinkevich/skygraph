import { schemaFormEditorDocEn } from './en'

export const schemaFormEditorDocRu: { [K in keyof typeof schemaFormEditorDocEn]: string } = {
  pageTitle: 'SchemaFormEditor',
  pageBadge: 'Ввод данных',
  crumbDataEntry: 'Ввод данных',
  crumbSchemaFormEditor: 'SchemaFormEditor',
  pageLead:
    'Визуальный конструктор поверх SchemaForm: перетаскивайте поля из палитры на canvas, редактируйте их в инспекторе и наблюдайте JSON Schema в реальном времени.',
  pageWhen1: 'Админ-панели, где конечные пользователи сами собирают формы.',
  pageWhen2: 'Прототипирование JSON-Schema payload с live-preview.',
  pageWhen3: 'В паре с SchemaForm — превращайте output редактора в форму.',

  demoBuilderTitle: 'Пустой canvas',
  demoBuilderDesc: 'Перетащите любое поле из палитры на canvas, чтобы начать.',
  demoPrefilledTitle: 'С готовой схемой',
  demoPrefilledDesc:
    'Редактор инициализирован пятью полями. Reset откатывает схему к исходной.',

  tableEditorApi: 'SchemaFormEditor API',
  tableUseSchemaEditorApi: 'useSchemaEditor() — опции',

  propInitialSchema: 'Стартовая EditorSchema (uncontrolled)',
  propStore: 'Внешний store из useSchemaEditor() (controlled)',
  propPaletteItems: 'Переопределить набор полей в палитре',
  propEmitChange: 'Срабатывает после каждой успешной мутации',
  propEmptyText: 'Текст для пустого canvas',
  propHideSchemaView: 'Скрыть нижние вкладки Preview / Schema',

  optInitialSchema: 'Начальная схема; по умолчанию — пустая',
  optCore: 'Использовать свой инстанс Core',
  optOnChange: 'Срабатывает после каждой успешной мутации',
}
