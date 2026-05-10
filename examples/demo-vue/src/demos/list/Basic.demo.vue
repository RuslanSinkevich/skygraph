<script setup lang="ts">
/**
 * The minimum List setup — `dataSource` + default slot. `header`
 * and `footer` pick up the secondary background; `bordered` wraps
 * the list in a card.
 */
import { SgList } from '@skygraph/vue'
import { shortData } from './data'
</script>

<template>
  <SgList header="Header" footer="Footer" bordered :data-source="shortData">
    <template #default="{ item }">
      <div style="padding: 8px 0">{{ item }}</div>
    </template>
  </SgList>
</template>
