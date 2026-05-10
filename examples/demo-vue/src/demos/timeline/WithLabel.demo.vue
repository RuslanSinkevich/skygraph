<script setup lang="ts">
/**
 * `label` is a secondary column on the axis side — typically a
 * timestamp. It only renders in `alternate` mode.
 */
import { SgTimeline } from '@skygraph/vue'
import { releaseLabels } from './data'
</script>

<template>
  <SgTimeline mode="alternate" :items="releaseLabels" />
</template>
