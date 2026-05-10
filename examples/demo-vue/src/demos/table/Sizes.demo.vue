<script setup lang="ts">
/**
 * Three densities — `small`, `middle` (default), `large`.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(4)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 4px">small</div>
      <SgTable size="small" :columns="userColumns" :data="data" />
    </div>
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 4px">middle (default)</div>
      <SgTable size="middle" :columns="userColumns" :data="data" />
    </div>
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 4px">large</div>
      <SgTable size="large" :columns="userColumns" :data="data" />
    </div>
  </div>
</template>
