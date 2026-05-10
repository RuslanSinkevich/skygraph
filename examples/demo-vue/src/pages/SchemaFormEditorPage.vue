<script setup lang="ts">
import { SgSchemaFormEditor } from '@skygraph/vue'
import type { EditorSchema } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'SchemaFormEditor',
    lead: 'Three-pane editor (palette / canvas / inspector) producing JSON Schema.',
    when1: 'Build forms by drag/drop without writing code.',
    when2: 'Settings/admin UIs that need user-defined forms.',
    basicTitle: 'Basic',
    basicDesc: 'Drag from the palette to the canvas. Inspector edits each field.',
    seededTitle: 'With initial schema',
    seededDesc: 'Boot with a pre-existing field set.',
    note: 'Editor exposes Undo/Redo (Ctrl+Z / Ctrl+Y) and a live preview tab.',
  },
  ru: {
    title: 'SchemaFormEditor',
    lead: 'Three-pane редактор (palette / canvas / inspector), результат — JSON Schema.',
    when1: 'Конструктор форм без кода.',
    when2: 'Settings/admin-UI с user-defined формами.',
    basicTitle: 'Basic',
    basicDesc: 'Перетащи из palette на canvas. Inspector — редактор поля.',
    seededTitle: 'С initialSchema',
    seededDesc: 'Старт с готовым набором полей.',
    note: 'Редактор поддерживает Undo/Redo (Ctrl+Z / Ctrl+Y) и live-preview.',
  },
})

const initialSchema: EditorSchema = {
  fields: [
    { id: 'f1', name: 'fullName', type: 'string', label: 'Full name', required: true },
    { id: 'f2', name: 'email', type: 'email', label: 'Email', required: true },
    {
      id: 'f3',
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
    },
    { id: 'f4', name: 'newsletter', type: 'switch', label: 'Subscribe to newsletter' },
  ],
}

const propsData: PropDef[] = [
  { name: 'initialSchema', description: 'Seed editor with existing schema.', type: 'EditorSchema' },
  {
    name: 'store',
    description: 'External store from `useSchemaEditor()`.',
    type: 'SchemaEditorStore',
  },
  { name: 'paletteItems', description: 'Override palette content.', type: 'PaletteItem[]' },
  { name: 'emptyText', description: 'Canvas placeholder text.', type: 'string' },
  {
    name: 'hideSchemaView',
    description: 'Hide the bottom Preview/Schema tabs.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: '@change',
    description: 'Fires with the latest schema.',
    type: '(schema: EditorSchema) => void',
  },
]

const BASIC = `<SgSchemaFormEditor @change="onSchemaChange" />`
const SEEDED = `<SgSchemaFormEditor :initial-schema="initialSchema" @change="onSchemaChange" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'SchemaFormEditor']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <div style="height: 540px">
        <SgSchemaFormEditor />
      </div>
    </DemoBox>

    <DemoBox :title="t.seededTitle" :description="t.seededDesc" :code="SEEDED">
      <div style="height: 540px">
        <SgSchemaFormEditor :initial-schema="initialSchema" />
      </div>
    </DemoBox>

    <p style="font-size: 13px; color: var(--sg-color-text-secondary); margin-top: 16px">
      {{ t.note }}
    </p>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
