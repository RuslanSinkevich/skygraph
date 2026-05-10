<script setup lang="ts">
/**
 * `checkable` adds checkboxes. Checks cascade to the whole subtree —
 * see `CheckStrictly.demo.vue` for the independent variant.
 */
import { ref } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeKey } from '@skygraph/vue'
import { orgTree } from './data'

const checked = ref<TreeKey[]>([])
</script>

<template>
  <div>
    <SgTree
      checkable
      default-expand-all
      :tree-data="orgTree"
      v-model:checkedKeys="checked"
    />
    <div style="margin-top: 10px; font-size: 13px; color: var(--sg-color-text-secondary)">
      Checked: <code>{{ checked.length ? checked.join(', ') : '(none)' }}</code>
    </div>
  </div>
</template>
