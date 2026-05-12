<script setup lang="ts">
/**
 * `dependencies` tells a field to re-validate whenever the listed fields
 * change. The validator receives `getFieldValue` so it can compare against
 * another field's current value — the classic "confirm password" pattern.
 * Mirrors React `examples/demo/src/demos/form/DependentFields.demo.tsx`.
 */
import { SgForm, SgField, SgInput, SgSubmitButton } from '@skygraph/vue'
import type { GetFieldValue } from '@skygraph/core'

function onFinish(values: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log(values)
}
</script>

<template>
  <SgForm
    layout="vertical"
    :default-values="{ password: '', confirm: '' }"
    style="max-width: 420px"
    @finish="onFinish"
  >
    <SgField
      name="password"
      label="Password"
      :rules="[
        { required: true, message: 'Required' },
        { min: 6, message: 'At least 6 characters' },
      ]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          type="password"
          :model-value="(value as string) ?? ''"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgField
      name="confirm"
      label="Confirm password"
      :dependencies="['password']"
      :rules="[
        { required: true, message: 'Required' },
        {
          validator: (value: unknown, getFieldValue: GetFieldValue) =>
            value && value !== getFieldValue('password') ? 'Passwords do not match' : null,
        },
      ]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          type="password"
          :model-value="(value as string) ?? ''"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgSubmitButton>Create account</SgSubmitButton>
  </SgForm>
</template>
