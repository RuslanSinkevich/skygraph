<script setup lang="ts">
/**
 * `multiple` toggles the value on click. `model-value` becomes an
 * array of node keys. Selected nodes are rendered as removable tags
 * inside the trigger.
 */
import { ref } from 'vue'
import { SgTreeSelect, type TreeKey } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Pick multiple teams' },
  ru: { placeholder: 'Выберите несколько команд' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<TreeKey[]>([])
</script>

<template>
  <div style="width: 380px">
    <SgTreeSelect
      v-model="value"
      :tree-data="orgTree"
      multiple
      tree-default-expand-all
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
