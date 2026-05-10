<script setup lang="ts">
/**
 * `mode="alternate"` places odd items on the left and even on
 * the right of a central axis — good for changelogs where the
 * label column needs to breathe on both sides.
 */
import { SgTimeline } from '@skygraph/vue'
import { releaseLabels } from './data'
</script>

<template>
  <SgTimeline mode="alternate" :items="releaseLabels" />
</template>
