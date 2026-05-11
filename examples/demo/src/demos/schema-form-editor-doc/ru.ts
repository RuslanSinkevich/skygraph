import { schemaFormEditorDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `schemaFormEditorDocEn`, no extras.
 */
export const schemaFormEditorDocRu: {
  [K in keyof typeof schemaFormEditorDocEn]: string
} = {
  pageTitle: 'SchemaFormEditor',
  pageBadge: 'Ввод данных',
  crumbDataEntry: 'Ввод данных',
  crumbSchemaFormEditor: 'SchemaFormEditor',
  pageLead:
    'Визуальный конструктор поверх SchemaForm: перетаскивайте поля из палитры на холст, редактируйте их в инспекторе и наблюдайте сгенерированный JSON Schema в реальном времени.',
  pageWhen1: 'Админ-панели, где конечные пользователи сами проектируют формы.',
  pageWhen2: 'Прототипирование JSON-Schema c живым превью.',
  pageWhen3: 'В паре с SchemaForm — превращение результата редактора в работающую форму.',

  demoBuilderTitle: 'Пустой холст',
  demoBuilderDesc: 'Перетащите любое поле из палитры на холст, чтобы начать.',
  demoPrefilledTitle: 'Заполненная схема',
  demoPrefilledDesc:
    'Редактор открыт с пятью полями. Нажмите «Сброс», чтобы вернуть исходную схему.',

  tableEditorApi: 'API SchemaFormEditor',
  tableHookApi: 'Опции useSchemaEditor()',

  propInitialSchema: 'Начальная EditorSchema (неуправляемый режим)',
  propStore: 'Внешнее хранилище из useSchemaEditor() (управляемый режим)',
  propPaletteItems: 'Переопределение каталога палитры',
  propOnChange: 'Срабатывает после каждой успешной мутации',
  propEmptyText: 'Текст CTA в пустом состоянии',
  propHideSchemaView: 'Скрыть переключатель «Preview / Schema» внизу',

  propHookInitialSchema: 'Начальная схема; по умолчанию пустая',
  propHookCore: 'Свой экземпляр Core',
  propHookOnChange: 'Срабатывает после каждой успешной мутации',
}
