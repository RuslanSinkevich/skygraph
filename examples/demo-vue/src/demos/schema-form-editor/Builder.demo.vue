<script setup lang="ts">
/**
 * Empty-canvas builder. Drag fields from the palette on the left onto the
 * canvas, edit them in the inspector on the right, and inspect the
 * generated JSON Schema in the bottom "Schema" tab.
 *
 * Mirrors React `examples/demo/src/demos/schema-form-editor/Builder.demo.tsx`.
 */
import { ref } from 'vue'
import { SgSchemaFormEditor } from '@skygraph/vue'
import type { EditorSchema } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    mutations: 'Mutations so far:',
    emptyText: 'Drop a field here',
  },
  ru: {
    mutations: 'Изменений:',
    emptyText: 'Перетащите поле сюда',
  },
} as const

const t = useDemoStrings(STRINGS)
const count = ref(0)

function onChange(_schema: EditorSchema) {
  count.value += 1
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.mutations }} {{ count }}
    </span>
    <div style="height: 600px">
      <SgSchemaFormEditor :empty-text="t.emptyText" @change="onChange" />
    </div>
  </div>
</template>
