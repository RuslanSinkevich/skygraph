<script setup lang="ts">
/**
 * `layout="vertical"` stacks the label above the content in two
 * separate rows — ideal when the values are long enough that
 * side-by-side would wrap awkwardly.
 */
import { SgDescriptions } from '@skygraph/vue'
import { invoiceItems } from './data'
</script>

<template>
  <SgDescriptions layout="vertical" bordered title="Invoice" :items="invoiceItems" />
</template>
