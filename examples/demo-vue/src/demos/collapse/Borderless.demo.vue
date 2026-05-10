<script setup lang="ts">
/**
 * `:bordered="false"` removes the outer frame but keeps panel
 * separators and the header background. Best when Collapse sits
 * inside a card that already has its own border.
 */
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
</script>

<template>
  <SgCollapse :items="sampleItems" :bordered="false" :default-active-key="['1']" />
</template>
