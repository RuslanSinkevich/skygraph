<script setup lang="ts">
/**
 * `type: 'group'` adds a titled non-selectable section. `type: 'divider'`
 * draws a horizontal rule. `danger: true` styles an item with the error
 * palette — use for destructive actions.
 */
import { SgMenu } from '@skygraph/vue'
import { groupedItems } from './data'
</script>

<template>
  <div style="max-width: 256px">
    <SgMenu mode="inline" :items="groupedItems" :default-selected-keys="['dashboard']" />
  </div>
</template>
