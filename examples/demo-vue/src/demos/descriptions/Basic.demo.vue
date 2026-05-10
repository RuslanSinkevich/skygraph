<script setup lang="ts">
/**
 * Defaults to 3 columns, horizontal layout, colon after each
 * label. Items flow across rows — use `span` to widen one.
 */
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
</script>

<template>
  <SgDescriptions title="User info" :items="userItems" />
</template>
