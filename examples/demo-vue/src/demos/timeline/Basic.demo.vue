<script setup lang="ts">
/**
 * Each item renders a dot + connector + content. Pass any CSS
 * colour string in `color` to tint the default ring — the
 * content stays in the standard body colour.
 */
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'
</script>

<template>
  <SgTimeline :items="releaseItems" />
</template>
