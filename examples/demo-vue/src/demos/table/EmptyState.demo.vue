<script setup lang="ts">
/**
 * Empty data array → table renders an empty placeholder. The
 * `#empty` slot lets you replace the default text with custom UI.
 */
import { SgTable, SgButton } from '@skygraph/vue'
import { userColumns } from './_data'
</script>

<template>
  <SgTable :columns="userColumns" :data="[]">
    <template #empty>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px">
        <div style="font-size: 28px">📋</div>
        <div style="font-size: 14px; color: var(--sg-color-text-secondary)">No records yet</div>
        <SgButton size="small" type="primary">Create one</SgButton>
      </div>
    </template>
  </SgTable>
</template>
