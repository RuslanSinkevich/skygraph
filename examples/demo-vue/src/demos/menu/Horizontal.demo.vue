<script setup lang="ts">
/**
 * Horizontal mode — intended for top nav bars. Submenus drop down
 * on hover.
 */
import { SgMenu } from '@skygraph/vue'
import { topItems } from './data'
</script>

<template>
  <SgMenu mode="horizontal" :items="topItems" :default-selected-keys="['mail']" />
</template>
