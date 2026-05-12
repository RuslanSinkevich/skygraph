<script setup lang="ts">
/**
 * Inline search bar pattern — wraps `<SgForm layout="inline">` in a styled
 * card. Collects `{ q, role, status, createdAfter }` and reports the last
 * submitted snapshot below.
 * Mirrors React `examples/demo/src/demos/form/SearchBar.demo.tsx`.
 */
import { ref } from 'vue'
import {
  SgForm,
  SgField,
  SgInput,
  SgSelect,
  SgDatePicker,
  SgSubmitButton,
  SgButton,
} from '@skygraph/vue'
import { roleOptions, statusOptions } from './shared'
import './styles.css'

const last = ref<Record<string, unknown> | null>(null)

function onFinish(values: Record<string, unknown>) {
  last.value = values
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgForm
      layout="inline"
      class="demo-search-bar"
      :default-values="{ q: '', role: '', status: 'active', createdAfter: null }"
      @finish="onFinish"
    >
      <SgField name="q">
        <template #default="{ value, onChange, onBlur }">
          <SgInput
            :model-value="(value as string) ?? ''"
            placeholder="Search by name or email…"
            style="min-width: 220px"
            @update:model-value="onChange"
            @blur="onBlur"
          />
        </template>
      </SgField>
      <SgField name="role">
        <template #default="{ value, onChange }">
          <SgSelect
            :value="value as string"
            :options="[{ label: 'Any role', value: '' }, ...roleOptions]"
            placeholder="Any role"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="status">
        <template #default="{ value, onChange }">
          <SgSelect
            :value="value as string"
            :options="statusOptions"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="createdAfter">
        <template #default="{ value, onChange }">
          <SgDatePicker
            :value="(value as Date | undefined) ?? undefined"
            placeholder="Created after"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgSubmitButton>Search</SgSubmitButton>
      <SgButton type="default">Reset</SgButton>
    </SgForm>

    <pre
      v-if="last"
      style="
        margin: 0;
        padding: 10px 14px;
        background: var(--sg-color-bg-secondary);
        border-radius: var(--sg-border-radius);
        border: 1px solid var(--sg-color-border-secondary);
        font-size: 12px;
        color: var(--sg-color-text-secondary);
      "
      >{{ JSON.stringify(last, null, 2) }}</pre
    >
  </div>
</template>
