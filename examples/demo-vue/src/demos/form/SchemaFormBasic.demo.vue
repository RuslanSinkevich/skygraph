<script setup lang="ts">
/**
 * `<SgSchemaForm>` turns a JSON Schema into a fully wired form. Field
 * controls, default values, and validation rules are derived from the
 * schema; no manual `<SgField>` per property required.
 * Mirrors React `examples/demo/src/demos/form/SchemaFormBasic.demo.tsx`.
 */
import { ref } from 'vue'
import { SgSchemaForm } from '@skygraph/vue'
import type { JSONSchema } from '@skygraph/vue'

const profileSchema: JSONSchema = {
  properties: {
    name: { type: 'string', title: 'Full name', minLength: 2, maxLength: 60 },
    email: { type: 'string', format: 'email', title: 'Email' },
    age: { type: 'number', title: 'Age', minimum: 0, maximum: 120 },
    role: {
      type: 'string',
      title: 'Role',
      enum: ['admin', 'user', 'editor'],
      enumNames: ['Administrator', 'User', 'Editor'],
    },
    bio: { type: 'string', title: 'Bio', maxLength: 500 },
    active: { type: 'boolean', title: 'Active' },
  },
  required: ['name', 'email'],
}

const submitted = ref<string | null>(null)

function onSubmit(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px">
    <SgSchemaForm :schema="profileSchema" submit-text="Save profile" @submit="onSubmit" />
    <pre
      v-if="submitted"
      style="
        margin: 0;
        padding: 12px;
        background: var(--sg-color-bg-secondary);
        border-radius: var(--sg-border-radius);
        font-size: 12px;
        overflow: auto;
      "
      >{{ submitted }}</pre
    >
  </div>
</template>
