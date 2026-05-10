<script setup lang="ts">
/**
 * `:description="null"` hides the caption entirely — image only.
 * Omitting the prop falls back to the default "No Data" string.
 */
import { SgEmpty } from '@skygraph/vue'
</script>

<template>
  <SgEmpty :description="null" />
</template>
