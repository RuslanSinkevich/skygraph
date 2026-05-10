<script setup lang="ts">
/**
 * Horizontal layout — 24-column grid via `labelCol` / `wrapperCol`.
 * Works well for admin settings panels with dense columns.
 */
import { SgForm, SgField, SgInput, SgSelect, SgButton } from '@skygraph/vue'
import { roleOptions } from './shared'
</script>

<template>
  <SgForm layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
    <SgField name="name" label="Name" required>
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="email" label="Email">
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="role" label="Role">
      <template #default="{ value, onChange }">
        <SgSelect :value="value as string" :options="roleOptions" @update:modelValue="onChange" />
      </template>
    </SgField>
    <div style="display: grid; grid-template-columns: 1fr 3fr; margin-top: 8px">
      <div></div>
      <SgButton type="primary" htmlType="submit">Save</SgButton>
    </div>
  </SgForm>
</template>
