<script setup lang="ts">
/**
 * `:column` sets how many label/value pairs fit per row. The
 * built-in layout engine respects per-item `span` and wraps to
 * the next row when the total span would overflow.
 */
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgDescriptions :column="1" bordered title="1 column" :items="userItems" />
    <SgDescriptions :column="2" bordered title="2 columns" :items="userItems" />
    <SgDescriptions :column="4" bordered title="4 columns" :items="userItems" />
  </div>
</template>
