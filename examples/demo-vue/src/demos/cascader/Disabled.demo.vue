<script setup lang="ts">
/**
 * Disable the whole control, or mark individual options via
 * `option.disabled` (see `Sichuan` in the data — it cannot be opened).
 */
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Sichuan row is disabled' },
  ru: { placeholder: 'Опция Sichuan отключена' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 340px">
    <SgCascader
      :options="regionOptions"
      disabled
      :default-value="['zhejiang', 'hangzhou']"
    />
    <SgCascader :options="regionOptions" :placeholder="t.placeholder" />
  </div>
</template>
