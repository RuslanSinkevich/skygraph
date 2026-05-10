<script setup lang="ts">
/**
 * `show-search` puts a search box at the top of the dropdown. Vue
 * `SgCascader` exposes `showSearch` as a boolean only — the React
 * `{ filter }` overload is not yet supported (see
 * `findings/T-Vue-Demo-Forms.md` → `cascader-feature-gaps-in-vue`).
 */
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Type a city or district' },
  ru: { placeholder: 'Введите город или район' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 340px">
    <SgCascader :options="regionOptions" show-search :placeholder="t.placeholder" />
  </div>
</template>
