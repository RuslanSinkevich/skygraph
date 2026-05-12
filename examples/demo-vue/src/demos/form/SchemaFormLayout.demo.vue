<script setup lang="ts">
/**
 * `<SgSchemaForm>` honours the same layout / size / disabled / labelCol /
 * wrapperCol props as `<SgForm>`. Two sections illustrate horizontal +
 * small and inline + disabled.
 * Mirrors React `examples/demo/src/demos/form/SchemaFormLayout.demo.tsx`.
 */
import { SgSchemaForm } from '@skygraph/vue'
import type { JSONSchema } from '@skygraph/vue'

const contactSchema: JSONSchema = {
  properties: {
    firstName: { type: 'string', title: 'First name' },
    lastName: { type: 'string', title: 'Last name' },
    email: { type: 'string', format: 'email', title: 'Email' },
  },
  required: ['firstName', 'email'],
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <section>
      <h4 style="margin: 0 0 8px">layout="horizontal" + size="small"</h4>
      <SgSchemaForm
        :schema="contactSchema"
        layout="horizontal"
        size="small"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        submit-text="Send"
      />
    </section>
    <section>
      <h4 style="margin: 0 0 8px">layout="inline" + disabled</h4>
      <SgSchemaForm :schema="contactSchema" layout="inline" :disabled="true" submit-text="Send" />
    </section>
  </div>
</template>
