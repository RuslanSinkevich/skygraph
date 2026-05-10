<script setup lang="ts">
/** Three sizes track the rest of SkyGraph's controls. */
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { small: 'Small', middle: 'Default', large: 'Large' },
  ru: { small: 'Маленький', middle: 'По умолчанию', large: 'Большой' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <div style="width: 260px">
      <SgTreeSelect size="small" :tree-data="orgTree" :placeholder="t.small" allow-clear />
    </div>
    <div style="width: 300px">
      <SgTreeSelect :tree-data="orgTree" :placeholder="t.middle" allow-clear />
    </div>
    <div style="width: 340px">
      <SgTreeSelect size="large" :tree-data="orgTree" :placeholder="t.large" allow-clear />
    </div>
  </div>
</template>
