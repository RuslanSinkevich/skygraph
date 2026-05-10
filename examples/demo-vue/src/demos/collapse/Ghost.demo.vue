<script setup lang="ts">
/**
 * `ghost` drops the outer border, panel backgrounds and body
 * separators. The headers still hover, so it works as a stealth
 * FAQ list on any surface colour.
 */
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
</script>

<template>
  <SgCollapse :items="sampleItems" ghost :default-active-key="['2']" />
</template>
