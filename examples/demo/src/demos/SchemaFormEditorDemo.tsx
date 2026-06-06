import { ConfigProvider, en_US, ru_RU } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useDemoStrings, useI18n } from '../i18n'

import { BuilderDemo } from './schema-form-editor/Builder.demo'
import BuilderSource from './schema-form-editor/Builder.demo?raw'
import { PrefilledDemo } from './schema-form-editor/Prefilled.demo'
import PrefilledSource from './schema-form-editor/Prefilled.demo?raw'

const STRINGS = {
  en: {
    pageDescription:
      'Visual constructor over SchemaForm: drag fields from a palette onto a canvas, edit them in an inspector, and inspect the generated JSON Schema in real time.',
    when1: 'Build admin panels where end-users design their own forms.',
    when2: 'Prototype JSON-Schema payloads with a live preview.',
    when3: 'Pair with SchemaForm to turn the editor output into a runtime form.',

    demoEmptyTitle: 'Empty canvas',
    demoEmptyDesc: 'Drag any field from the palette onto the canvas to start building.',
    demoPrefilledTitle: 'Pre-filled schema',
    demoPrefilledDesc:
      'Editor seeded with five fields. Hit Reset to roll the schema back to the original payload.',

    tableEditorApi: 'SchemaFormEditor API',
    tableHookApi: 'useSchemaEditor() Options',

    propInitialSchema: 'Starting EditorSchema (uncontrolled)',
    propStore: 'External store from useSchemaEditor() (controlled)',
    propPaletteItems: 'Override palette catalogue',
    propOnChange: 'Fires after every successful mutation',
    propEmptyText: 'Empty-state CTA text',
    propHideSchemaView: 'Hide the bottom Preview / Schema toggle',

    hookInitialSchema: 'Starting schema; defaults to empty',
    hookCore: 'Bring your own Core instance',
    hookOnChange: 'Fires after every successful mutation',
  },
  ru: {
    pageDescription:
      'Визуальный конструктор поверх SchemaForm: перетаскивайте поля из палитры на холст, редактируйте их в инспекторе и наблюдайте сгенерированную JSON-схему в реальном времени.',
    when1: 'Админ-панели, где пользователи сами проектируют формы.',
    when2: 'Прототипирование JSON-Schema с живым предпросмотром.',
    when3: 'В связке со SchemaForm — превратить вывод редактора в рабочую форму.',

    demoEmptyTitle: 'Пустой холст',
    demoEmptyDesc: 'Перетащите любое поле из палитры на холст, чтобы начать.',
    demoPrefilledTitle: 'Заполненная схема',
    demoPrefilledDesc:
      'Редактор с пятью полями. Нажмите «Сбросить», чтобы вернуть схему к исходной.',

    tableEditorApi: 'API SchemaFormEditor',
    tableHookApi: 'Опции useSchemaEditor()',

    propInitialSchema: 'Начальная EditorSchema (неконтролируемый режим)',
    propStore: 'Внешний store из useSchemaEditor() (контролируемый режим)',
    propPaletteItems: 'Переопределить каталог палитры',
    propOnChange: 'Срабатывает после каждой успешной мутации',
    propEmptyText: 'Текст призыва в пустом состоянии',
    propHideSchemaView: 'Скрыть нижний переключатель Предпросмотр / Схема',

    hookInitialSchema: 'Начальная схема; по умолчанию пустая',
    hookCore: 'Использовать свой экземпляр Core',
    hookOnChange: 'Срабатывает после каждой успешной мутации',
  },
} as const

export function SchemaFormEditorDemo() {
  const t = useDemoStrings(STRINGS)
  const { locale } = useI18n()
  // The editor's palette / inspector / tabs read strings from ConfigProvider,
  // so feed it the matching bundle to keep the whole page localized.
  const sgLocale = locale === 'ru' ? ru_RU : en_US

  const editorProps: PropDef[] = [
    { name: 'initialSchema', description: t.propInitialSchema, type: 'EditorSchema' },
    { name: 'store', description: t.propStore, type: 'SchemaEditorStore' },
    { name: 'paletteItems', description: t.propPaletteItems, type: 'PaletteItem[]' },
    { name: 'onChange', description: t.propOnChange, type: '(schema: EditorSchema) => void' },
    {
      name: 'emptyText',
      description: t.propEmptyText,
      type: 'string',
      default: "'Drop a field here'",
    },
    {
      name: 'hideSchemaView',
      description: t.propHideSchemaView,
      type: 'boolean',
      default: 'false',
    },
  ]

  const useSchemaEditorProps: PropDef[] = [
    { name: 'initialSchema', description: t.hookInitialSchema, type: 'EditorSchema' },
    { name: 'core', description: t.hookCore, type: 'Core' },
    { name: 'onChange', description: t.hookOnChange, type: '(schema: EditorSchema) => void' },
  ]

  return (
    <ComponentDoc
      title="SchemaFormEditor"
      description={t.pageDescription}
      whenToUse={[t.when1, t.when2, t.when3]}
    >
      <DemoBox title={t.demoEmptyTitle} description={t.demoEmptyDesc} code={BuilderSource}>
        <ConfigProvider locale={sgLocale}>
          <BuilderDemo />
        </ConfigProvider>
      </DemoBox>

      <DemoBox
        title={t.demoPrefilledTitle}
        description={t.demoPrefilledDesc}
        code={PrefilledSource}
      >
        <ConfigProvider locale={sgLocale}>
          <PrefilledDemo />
        </ConfigProvider>
      </DemoBox>

      <PropsTable title={t.tableEditorApi} data={editorProps} />
      <PropsTable title={t.tableHookApi} data={useSchemaEditorProps} />
    </ComponentDoc>
  )
}
