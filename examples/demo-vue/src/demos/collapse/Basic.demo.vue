<script setup lang="ts">
/**
 * Default behaviour — multiple panels may be open at once.
 * `defaultActiveKey` seeds the open set for the uncontrolled case.
 */
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
</script>

<template>
  <SgCollapse :items="sampleItems" :default-active-key="['1']" />
</template>
