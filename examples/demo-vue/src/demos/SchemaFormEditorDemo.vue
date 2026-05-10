<script setup lang="ts">
/**
 * SchemaFormEditor aggregator (Wave 3.2 / Tab D).
 * Mirrors React `examples/demo/src/demos/SchemaFormEditorDemo.tsx`.
 * No CssVarsTable (parity with React; see decision §3).
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  type PropDef,
} from './components'
import { useSchemaFormEditorDocStrings } from './schema-form-editor-doc/useStrings'

import BuilderDemo from './schema-form-editor/Builder.demo.vue'
import BuilderSource from './schema-form-editor/Builder.demo.vue?raw'
import PrefilledDemo from './schema-form-editor/Prefilled.demo.vue'
import PrefilledSource from './schema-form-editor/Prefilled.demo.vue?raw'

const t = useSchemaFormEditorDocStrings()

const editorProps = computed<PropDef[]>(() => [
  { name: 'initialSchema', description: t.value.propInitialSchema, type: 'EditorSchema' },
  { name: 'store', description: t.value.propStore, type: 'SchemaEditorStore' },
  { name: 'paletteItems', description: t.value.propPaletteItems, type: 'PaletteItem[]' },
  { name: 'emptyText', description: t.value.propEmptyText, type: 'string', default: "'Drop a field here'" },
  { name: 'hideSchemaView', description: t.value.propHideSchemaView, type: 'boolean', default: 'false' },
  { name: '@change', description: t.value.propEmitChange, type: '(schema: EditorSchema) => void' },
])

const useSchemaEditorOpts = computed<PropDef[]>(() => [
  { name: 'initialSchema', description: t.value.optInitialSchema, type: 'EditorSchema' },
  { name: 'core', description: t.value.optCore, type: 'Core' },
  { name: 'onChange', description: t.value.optOnChange, type: '(schema: EditorSchema) => void' },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataEntry, t.crumbSchemaFormEditor]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBuilderTitle" :description="t.demoBuilderDesc" :code="BuilderSource">
      <BuilderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoPrefilledTitle"
      :description="t.demoPrefilledDesc"
      :code="PrefilledSource"
    >
      <PrefilledDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableEditorApi" :data="editorProps" />
      <PropsTable :title="t.tableUseSchemaEditorApi" :data="useSchemaEditorOpts" />
    </template>
  </ComponentDoc>
</template>
