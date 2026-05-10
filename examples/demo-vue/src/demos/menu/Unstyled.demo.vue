<script setup lang="ts">
/**
 * `unstyled` renders only semantic `<ul>/<li>` with correct ARIA roles
 * and open/close mechanics. Bring your own CSS.
 */
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'
</script>

<template>
  <div style="max-width: 256px">
    <SgMenu unstyled :items="sidebarItems" :default-selected-keys="['projects']" />
  </div>
</template>
