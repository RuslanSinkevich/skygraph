<script setup lang="ts">
/**
 * Inline layout — every field on a single row. Perfect for
 * search / filter bars.
 */
import { SgForm, SgField, SgInput, SgSelect, SgButton } from '@skygraph/vue'
import { statusOptions } from './shared'
</script>

<template>
  <SgForm layout="inline">
    <SgField name="q" label="Query">
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" placeholder="Search…" />
      </template>
    </SgField>
    <SgField name="status" label="Status">
      <template #default="{ value, onChange }">
        <SgSelect :value="value as string" :options="statusOptions" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgButton type="primary" htmlType="submit">Apply</SgButton>
  </SgForm>
</template>
