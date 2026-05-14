<script setup lang="ts">
/**
 * `disabled` on the form turns off every control in one go; individual fields
 * can opt out via their own `disabled={false}`.
 */
import { SgForm, SgField, SgInput, SgCheckbox } from '@skygraph/vue'
</script>

<template>
  <SgForm disabled>
    <SgField name="x" label="Name">
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="y" label="Notify me">
      <template #default="{ value, onChange }">
        <SgCheckbox :model-value="!!value" @update:modelValue="onChange" />
      </template>
    </SgField>
  </SgForm>
</template>
