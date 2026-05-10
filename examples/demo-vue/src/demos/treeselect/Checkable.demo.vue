<script setup lang="ts">
/**
 * `tree-checkable` renders checkboxes on every node. Note: Vue
 * `SgTreeSelect` toggles a single node per click — it does **not**
 * cascade selection to children automatically (parity gap, see
 * `findings/T-Vue-Demo-Forms.md` → `treeselect-no-cascade-in-vue`).
 */
import { ref } from 'vue'
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree, orgTreeAllParentKeys } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Tick nodes' },
  ru: { placeholder: 'Отметьте узлы' },
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
      tree-checkable
      :default-expanded-keys="orgTreeAllParentKeys"
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
