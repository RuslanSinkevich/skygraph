<script setup lang="ts">
/**
 * `display-render` replaces the default "A / B / C" trigger label.
 * Vue `SgCascader` returns a string (no VNode override yet), so the
 * formatter rebuilds the label as a plain string with a different
 * separator.
 */
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'

function format(labels: string[]) {
  if (!labels.length) return ''
  if (labels.length === 1) return labels[0]
  return `${labels[0]} › ${labels[labels.length - 1]}`
}
</script>

<template>
  <div style="max-width: 420px">
    <SgCascader
      :options="regionOptions"
      :default-value="['zhejiang', 'hangzhou', 'xihu']"
      :display-render="format"
    />
  </div>
</template>
