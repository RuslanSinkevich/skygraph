<script setup lang="ts">
/**
 * Default vertical layout. Submenus open in a popover on hover.
 * One item selected via `defaultSelectedKeys`.
 */
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'
</script>

<template>
  <div style="max-width: 256px">
    <SgMenu :items="sidebarItems" :default-selected-keys="['dashboard']" />
  </div>
</template>
