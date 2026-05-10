<script setup lang="ts">
/**
 * Minimal form: name + email + age + role + notify, with submit
 * handler. Vue uses default-slot props on `SgField` to drive controls
 * (idiomatic alternative to React's `children` render-prop).
 */
import { ref } from 'vue'
import {
  SgForm,
  SgField,
  SgInput,
  SgInputNumber,
  SgSelect,
  SgSwitch,
  SgButton,
} from '@skygraph/vue'
import { roleOptions } from './shared'

const submitted = ref<string>('')

function onFinish(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <SgForm
    :default-values="{ name: '', email: '', age: 18, role: 'viewer', notify: true }"
    @finish="onFinish"
  >
    <SgField name="name" label="Name" required>
      <template #default="{ value, onChange, onBlur }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" @blur="onBlur" />
      </template>
    </SgField>
    <SgField name="email" label="Email" required>
      <template #default="{ value, onChange, onBlur }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" @blur="onBlur" />
      </template>
    </SgField>
    <SgField name="age" label="Age">
      <template #default="{ value, onChange }">
        <SgInputNumber :value="value as number" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="role" label="Role">
      <template #default="{ value, onChange }">
        <SgSelect :value="value as string" :options="roleOptions" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="notify" label="Notify me">
      <template #default="{ value, onChange }">
        <SgSwitch :model-value="!!value" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgButton type="primary" htmlType="submit">Submit</SgButton>
    <pre v-if="submitted" style="margin-top: 12px; font-size: 12px">{{ submitted }}</pre>
  </SgForm>
</template>
