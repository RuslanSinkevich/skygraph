<script setup lang="ts">
/**
 * Choose how required fields are highlighted: asterisk (default), no
 * marker (`required-mark="false"`), or the inverted "(optional)"
 * convention (`required-mark="optional"`).
 */
import { SgForm, SgField, SgInput } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        Default — asterisk on required fields
      </div>
      <SgForm>
        <SgField name="a" label="Required" required>
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
        <SgField name="b" label="Optional">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </div>
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        <code>requiredMark="optional"</code> — mark optional, not required
      </div>
      <SgForm required-mark="optional">
        <SgField name="c" label="Required" required>
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
        <SgField name="d" label="Optional">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </div>
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        <code>:required-mark="false"</code> — no marker
      </div>
      <SgForm :required-mark="false">
        <SgField name="e" label="Required" required>
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </div>
  </div>
</template>
