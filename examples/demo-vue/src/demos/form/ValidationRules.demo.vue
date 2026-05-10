<script setup lang="ts">
/**
 * Required, length, regex and custom validators — each with its own
 * message. Validation runs on the configured `validateOn` trigger
 * (default: `change`).
 */
import { SgForm, SgField, SgInput, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgForm>
    <SgField
      name="username"
      label="Username"
      required
      :rules="[
        { required: true, message: 'Username is required' },
        { min: 3, max: 16, message: 'Length 3..16' },
        { pattern: /^[a-z0-9_]+$/, message: 'a-z, 0-9, underscore' },
      ]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" @blur="onBlur" />
      </template>
    </SgField>
    <SgField
      name="email"
      label="Email"
      required
      :rules="[{ pattern: /.+@.+\..+/, message: 'Invalid email' }]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" @blur="onBlur" />
      </template>
    </SgField>
    <SgField
      name="even"
      label="Even number"
      :rules="[{ validator: (v: unknown) => (Number(v) % 2 === 0 ? null : 'Must be even') }]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" @blur="onBlur" />
      </template>
    </SgField>
    <SgButton type="primary" htmlType="submit">Submit</SgButton>
  </SgForm>
</template>
