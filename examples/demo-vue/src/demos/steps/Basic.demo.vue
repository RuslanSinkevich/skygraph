<script setup lang="ts">
/**
 * `current` is zero-based. Indices below it render as `finish`
 * (check icon), `current` itself is `process` (primary fill),
 * and anything above stays `wait` (muted).
 */
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'
</script>

<template>
  <SgSteps :current="1" :items="basicSteps" />
</template>
