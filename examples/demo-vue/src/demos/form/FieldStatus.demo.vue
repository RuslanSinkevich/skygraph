<script setup lang="ts">
/**
 * `validateStatus` paints the field with a custom state (`success` /
 * `warning` / `error` / `validating`) regardless of rules — useful when
 * status comes from an external source (API, server validation).
 *
 * Vue: `hasFeedback` is not part of `<SgField>` yet, so the badge is
 * omitted. The status class still applies (`sg-field-status-*`).
 * Mirrors React `examples/demo/src/demos/form/FieldStatus.demo.tsx`.
 */
import { SgForm, SgField, SgInput, SgSubmitButton } from '@skygraph/vue'
</script>

<template>
  <SgForm
    layout="vertical"
    :default-values="{
      ok: 'ada@example.com',
      warn: 'Weak123',
      err: '',
      busy: '',
    }"
    style="max-width: 460px"
  >
    <SgField name="ok" label="Success" validate-status="success" help="Looks good!">
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          :model-value="(value as string) ?? ''"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgField
      name="warn"
      label="Warning"
      validate-status="warning"
      help="Password is OK, but could be stronger"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          :model-value="(value as string) ?? ''"
          status="warning"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgField name="err" label="Error" validate-status="error" help="Field is required">
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          :model-value="(value as string) ?? ''"
          status="error"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgField
      name="busy"
      label="Validating"
      validate-status="validating"
      help="Checking with server…"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          :model-value="(value as string) ?? ''"
          :loading="true"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>

    <SgSubmitButton>Continue</SgSubmitButton>
  </SgForm>
</template>
