<script setup lang="ts">
/**
 * Single-node selection. `model-value` is a node `value` (string or
 * number). Vue lacks `treeDefaultExpandAll`, so we pass the list of
 * parent keys via `default-expanded-keys` to mimic it.
 */
import { ref } from 'vue'
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree, orgTreeAllParentKeys } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Pick a team' },
  ru: { placeholder: 'Выберите команду' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<string | number | (string | number)[]>('')
</script>

<template>
  <div style="width: 320px">
    <SgTreeSelect
      v-model="value"
      :tree-data="orgTree"
      :default-expanded-keys="orgTreeAllParentKeys"
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
