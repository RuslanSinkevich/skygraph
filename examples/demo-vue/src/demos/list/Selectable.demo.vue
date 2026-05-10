<script setup lang="ts">
/**
 * `selectable` turns rows into single-select buttons; combine with
 * `multi-select` and `Ctrl/Cmd + click` for multi-pick. Vue emits
 * `@selectionChange(keys, items)`.
 */
import { ref } from 'vue'
import { SgList } from '@skygraph/vue'
import { users, type User } from './data'

const picked = ref<string[]>([])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgList
      bordered
      selectable
      multi-select
      :data-source="users"
      @selection-change="(_keys: number[], items: User[]) => (picked = items.map((u) => u.name))"
    >
      <template #default="{ item }">
        {{ item.name }} — {{ item.role }}
      </template>
    </SgList>
    <div style="color: var(--sg-color-text-secondary); font-size: 12px">
      Selected: {{ picked.length === 0 ? 'none' : picked.join(', ') }}
      (hold Ctrl/Cmd for multi-pick)
    </div>
  </div>
</template>
