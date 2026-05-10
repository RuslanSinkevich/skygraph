<script setup lang="ts">
/**
 * `active` turns on a 1.5s gradient sweep that signals "still
 * working". Drop it on any long-lived placeholder to avoid the
 * "is the UI frozen?" question.
 */
import { SgSkeleton } from '@skygraph/vue'
</script>

<template>
  <SgSkeleton active />
</template>
