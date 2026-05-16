<script setup lang="ts">
/**
 * `tree-checkable` renders checkboxes on every node and auto-selects
 * the whole subtree when a parent is ticked. Use this when you need
 * hierarchical groups rather than individual leaves.
 */
import { ref } from 'vue'
import { SgTreeSelect, type TreeKey } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Tick subtrees' },
  ru: { placeholder: 'Отметьте поддеревья' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<TreeKey[]>([])
</script>

<template>
  <div style="width: 380px">
    <SgTreeSelect
      v-model="value"
      :tree-data="orgTree"
      tree-checkable
      tree-default-expand-all
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
