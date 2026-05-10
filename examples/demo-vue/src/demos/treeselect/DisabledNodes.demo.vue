<script setup lang="ts">
/**
 * Per-node `disabled` greys a node out but keeps it visible for
 * context — `Operations → Finance` can't be picked in this demo.
 */
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree, orgTreeAllParentKeys } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Finance is disabled' },
  ru: { placeholder: 'Finance отключён' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="width: 340px">
    <SgTreeSelect
      :tree-data="orgTree"
      :default-expanded-keys="orgTreeAllParentKeys"
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
