<script setup lang="ts">
/**
 * `checkStrictly` decouples parents and children — toggle the parent and
 * its descendants stay where they are. Useful for permission / role
 * pickers where every key is meaningful on its own.
 */
import { ref } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeKey } from '@skygraph/vue'
import { orgTree } from './data'

const checked = ref<TreeKey[]>(['eng-web'])
</script>

<template>
  <div>
    <SgTree
      checkable
      check-strictly
      default-expand-all
      :tree-data="orgTree"
      v-model:checkedKeys="checked"
    />
    <div style="margin-top: 10px; font-size: 13px; color: var(--sg-color-text-secondary)">
      Checked: <code>{{ checked.length ? checked.join(', ') : '(none)' }}</code>
    </div>
  </div>
</template>
