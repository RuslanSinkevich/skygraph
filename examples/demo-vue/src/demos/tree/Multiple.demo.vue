<script setup lang="ts">
/**
 * `multiple` allows multi-select via `Ctrl+click` (or `Shift+click` for
 * a range). The current selection is exposed via `v-model:selectedKeys`.
 */
import { ref } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeKey } from '@skygraph/vue'
import { orgTree } from './data'

const selected = ref<TreeKey[]>([])
</script>

<template>
  <div>
    <SgTree
      multiple
      default-expand-all
      :tree-data="orgTree"
      v-model:selectedKeys="selected"
    />
    <div style="margin-top: 8px; font-size: 13px; color: var(--sg-color-text-secondary)">
      Selected: <code>{{ selected.length ? selected.join(', ') : '(none)' }}</code>
    </div>
  </div>
</template>
