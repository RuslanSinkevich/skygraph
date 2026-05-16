<script setup lang="ts">
/**
 * Single-node selection. `model-value` is a node `key` (string or
 * number). Clicking a non-selectable / disabled node does nothing.
 */
import { ref } from 'vue'
import { SgTreeSelect, type TreeKey } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Pick a team' },
  ru: { placeholder: 'Выберите команду' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<TreeKey | TreeKey[]>('')
</script>

<template>
  <div style="width: 320px">
    <SgTreeSelect
      v-model="value"
      :tree-data="orgTree"
      tree-default-expand-all
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
