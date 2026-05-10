<script setup lang="ts">
/**
 * Pre-filled editor with five fields. The "Reset" button rolls the schema
 * back to the original payload via the imperative `setSchema` action on
 * the external store from `useSchemaEditor`.
 *
 * Mirrors React `Prefilled.demo.tsx`.
 */
import { ref, computed } from 'vue'
import { SgSchemaFormEditor, useSchemaEditor, SgButton } from '@skygraph/vue'
import type { EditorSchema } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { reset: 'Reset' },
  ru: { reset: 'Сбросить' },
} as const

const t = useDemoStrings(STRINGS)

const initialSchema: EditorSchema = {
  title: 'Sign-up form',
  fields: [
    { id: 'sf1', name: 'fullName', label: 'Full name', type: 'string', required: true, min: 2 },
    { id: 'sf2', name: 'email', label: 'Email', type: 'email', required: true },
    { id: 'sf3', name: 'age', label: 'Age', type: 'number', min: 13, max: 120 },
    {
      id: 'sf4',
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
    },
    { id: 'sf5', name: 'newsletter', label: 'Subscribe to newsletter', type: 'boolean' },
  ],
}

const store = useSchemaEditor({ initialSchema })
const resetCount = ref(0)
const resetLabel = computed(() =>
  resetCount.value > 0 ? `${t.value.reset} (×${resetCount.value})` : t.value.reset,
)

function reset() {
  store.setSchema(initialSchema)
  resetCount.value += 1
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div>
      <SgButton @click="reset">{{ resetLabel }}</SgButton>
    </div>
    <div style="height: 600px">
      <SgSchemaFormEditor :store="store" />
    </div>
  </div>
</template>
