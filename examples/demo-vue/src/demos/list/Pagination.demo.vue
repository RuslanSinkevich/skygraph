<script setup lang="ts">
/**
 * Pass a `pagination` config to enable the built-in Pagination in the
 * footer. When `total` is omitted the list uses `dataSource.length`
 * and pages through the array in memory.
 */
import { SgList } from '@skygraph/vue'

const dataSource = Array.from({ length: 9 }, (_, i) => `Row ${i + 1}`)
</script>

<template>
  <SgList bordered :data-source="dataSource" :pagination="{ pageSize: 3 }">
    <template #default="{ item }">{{ item }}</template>
  </SgList>
</template>
