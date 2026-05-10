<script setup lang="ts">
/**
 * `multiple` toggles the value on click. `model-value` becomes an
 * array of node values. Selected nodes are joined into the trigger
 * label.
 */
import { ref } from 'vue'
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree, orgTreeAllParentKeys } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Pick multiple teams' },
  ru: { placeholder: 'Выберите несколько команд' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<(string | number)[]>([])
</script>

<template>
  <div style="width: 380px">
    <SgTreeSelect
      v-model="value"
      :tree-data="orgTree"
      multiple
      :default-expanded-keys="orgTreeAllParentKeys"
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
