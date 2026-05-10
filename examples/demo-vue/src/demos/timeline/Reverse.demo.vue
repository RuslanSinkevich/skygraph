<script setup lang="ts">
/**
 * `reverse` flips the visual order in-place — useful when the
 * source data is chronological but the screen should show the
 * latest event first.
 */
import { ref } from 'vue'
import { SgTimeline, SgButton } from '@skygraph/vue'
import { releaseItems } from './data'

const reverse = ref(false)
</script>

<template>
  <div>
    <SgButton size="small" @click="reverse = !reverse">
      {{ reverse ? 'Oldest first' : 'Newest first' }}
    </SgButton>
    <div style="margin-top: 16px">
      <SgTimeline :reverse="reverse" :items="releaseItems" />
    </div>
  </div>
</template>
