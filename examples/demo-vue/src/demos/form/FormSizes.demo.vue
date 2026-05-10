<script setup lang="ts">
/**
 * `size` on the form propagates to every control inside via context —
 * small / middle / large.
 */
import { SgForm, SgField, SgInput } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        small
      </div>
      <SgForm size="small">
        <SgField name="s" label="Name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </div>
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        middle (default)
      </div>
      <SgForm size="middle">
        <SgField name="m" label="Name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </div>
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        large
      </div>
      <SgForm size="large">
        <SgField name="l" label="Name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </div>
  </div>
</template>
