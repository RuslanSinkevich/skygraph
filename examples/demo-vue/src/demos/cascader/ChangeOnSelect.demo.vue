<script setup lang="ts">
/**
 * By default Cascader commits only when a leaf is reached.
 * `change-on-select` emits every intermediate path — useful for
 * taxonomies where parents are valid selections (e.g. "Frontend"
 * alone is meaningful).
 */
import { SgCascader } from '@skygraph/vue'
import { categoryOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Pick any level' },
  ru: { placeholder: 'Выберите любой уровень' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="max-width: 340px">
    <SgCascader :options="categoryOptions" change-on-select :placeholder="t.placeholder" />
  </div>
</template>
