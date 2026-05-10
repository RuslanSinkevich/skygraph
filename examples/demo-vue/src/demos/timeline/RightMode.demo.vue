<script setup lang="ts">
/**
 * `mode="right"` flips the axis to the opposite side — use it
 * when the timeline should hug the right edge of a panel
 * instead of the left.
 */
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'
</script>

<template>
  <SgTimeline mode="right" :items="releaseItems" />
</template>
