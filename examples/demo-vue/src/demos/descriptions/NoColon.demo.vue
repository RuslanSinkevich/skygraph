<script setup lang="ts">
/**
 * `:colon="false"` drops the trailing colon after every label —
 * handy when the design language prefers dashes, pipes or
 * nothing at all.
 */
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
</script>

<template>
  <SgDescriptions :colon="false" bordered title="User info" :items="userItems" />
</template>
