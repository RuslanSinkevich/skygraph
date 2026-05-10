<script setup lang="ts">
/**
 * Inline mode — submenus expand in place with indentation. Ideal for
 * sidebar navigation in apps with deep trees.
 */
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'
</script>

<template>
  <div style="max-width: 256px">
    <SgMenu
      mode="inline"
      :items="sidebarItems"
      :default-open-keys="['team']"
      :default-selected-keys="['members']"
    />
  </div>
</template>
