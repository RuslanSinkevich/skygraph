<script setup lang="ts">
/**
 * Three vertical-padding presets. `size` is List-specific (it doesn't
 * delegate to `ConfigProvider`).
 */
import { SgList } from '@skygraph/vue'
import { shortData } from './data'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <SgList size="small" bordered header="Small" :data-source="shortData">
      <template #default="{ item }">{{ item }}</template>
    </SgList>
    <SgList bordered header="Default" :data-source="shortData">
      <template #default="{ item }">{{ item }}</template>
    </SgList>
    <SgList size="large" bordered header="Large" :data-source="shortData">
      <template #default="{ item }">{{ item }}</template>
    </SgList>
  </div>
</template>
