<script setup lang="ts">
/**
 * Whole-control `disabled` (also inherits from `ConfigProvider`) vs
 * per-item `disabled` on the data object. Disabled items stay visible
 * but can't be selected or moved.
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { rolePermissions } from './data'

const targetKeys = ref<string[]>(['users.read', 'billing.write'])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgTransfer v-model="targetKeys" :data-source="rolePermissions" />
    <SgTransfer v-model="targetKeys" disabled :data-source="rolePermissions" />
  </div>
</template>
