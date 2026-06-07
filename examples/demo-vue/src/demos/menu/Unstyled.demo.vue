<script setup lang="ts">
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'
</script>

<template>
  <div style="max-width: 256px">
    <SgMenu unstyled :items="sidebarItems" :default-selected-keys="['projects']" />
  </div>
</template>
