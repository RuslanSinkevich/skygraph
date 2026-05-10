<script setup lang="ts">
/**
 * `virtual` windowing renders only the rows currently visible.
 * `itemHeight` must be constant for every row — measure once and
 * hardcode it.
 */
import { SgList } from '@skygraph/vue'

const bigDataSet = Array.from({ length: 10000 }, (_, i) => `Row ${i + 1}`)
</script>

<template>
  <SgList
    bordered
    :data-source="bigDataSet"
    :virtual="{ itemHeight: 48, height: 320, overscan: 4 }"
  >
    <template #default="{ item }">{{ item }}</template>
  </SgList>
</template>
