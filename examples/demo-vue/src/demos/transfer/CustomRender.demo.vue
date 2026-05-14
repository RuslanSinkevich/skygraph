<script setup lang="ts">
/**
 * The `item` slot lets you swap the default title for a richer label —
 * here: primary title + grey description. The rendered node still sits
 * inside the per-row Checkbox.
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import type { TransferItem } from '@skygraph/vue'
import { rolePermissions } from './data'

const targetKeys = ref<string[]>(['users.read'])
</script>

<template>
  <SgTransfer
    v-model="targetKeys"
    show-search
    :titles="['Available', 'Granted']"
    :data-source="rolePermissions"
    :list-height="260"
  >
    <template #item="{ item }: { item: TransferItem }">
      <div style="display: flex; flex-direction: column; gap: 2px">
        <strong>{{ item.title }}</strong>
        <span
          v-if="item.description"
          style="font-size: 12px; color: var(--sg-color-text-secondary)"
        >
          {{ item.description }}
        </span>
      </div>
    </template>
  </SgTransfer>
</template>
