<script setup lang="ts">
/**
 * Controlled single-select. User drills province → city → district;
 * `@change` delivers the full value path and the resolved option chain.
 */
import { ref } from 'vue'
import { SgCascader, type CascaderOption } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Select region', empty: 'Nothing selected' },
  ru: { placeholder: 'Выберите регион', empty: 'Ничего не выбрано' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<(string | number)[]>([])
const labels = ref<string[]>([])

function onChange(v: (string | number)[], selected: CascaderOption[]) {
  value.value = v
  labels.value = selected.map((o) => o.label)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 340px">
    <SgCascader
      :options="regionOptions"
      :placeholder="t.placeholder"
      :model-value="value"
      @change="onChange"
    />
    <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{
        value.length
          ? `Value: [${value.join(', ')}] · Labels: ${labels.join(' / ')}`
          : t.empty
      }}
    </div>
  </div>
</template>
