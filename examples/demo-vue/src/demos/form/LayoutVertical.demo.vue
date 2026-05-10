<script setup lang="ts">
/**
 * Default layout — labels above controls. Recommended for signup /
 * profile / settings forms.
 */
import { SgForm, SgField, SgInput, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgForm layout="vertical">
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
    <SgButton type="primary" htmlType="submit">Submit</SgButton>
  </SgForm>
</template>
