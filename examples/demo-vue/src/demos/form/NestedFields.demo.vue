<script setup lang="ts">
/**
 * Dotted names (`address.city`) auto-store into nested objects on the
 * form value tree. Submit prints the resulting structure.
 */
import { ref } from 'vue'
import { SgForm, SgField, SgInput, SgButton } from '@skygraph/vue'

const submitted = ref('')
function onFinish(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <SgForm
    :default-values="{ address: { city: '', street: '', zip: '' } }"
    @finish="onFinish"
  >
    <SgField name="address.city" label="City" required>
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="address.street" label="Street">
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="address.zip" label="ZIP">
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgButton type="primary" htmlType="submit">Submit</SgButton>
    <pre v-if="submitted" style="margin-top: 12px; font-size: 12px">{{ submitted }}</pre>
  </SgForm>
</template>
