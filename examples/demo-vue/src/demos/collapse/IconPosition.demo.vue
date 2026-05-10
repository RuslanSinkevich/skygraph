<script setup lang="ts">
/**
 * `expand-icon-position="end"` flips the chevron to the trailing
 * edge — the classic FAQ layout. The header text stays left-
 * aligned and grows to fill the row.
 */
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
</script>

<template>
  <SgCollapse :items="sampleItems" expand-icon-position="end" :default-active-key="['1']" />
</template>
