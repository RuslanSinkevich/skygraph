<script setup lang="ts">
/**
 * `theme="dark"` flips the menu to a dark palette. Wrap it in a dark
 * surface to complete the look.
 */
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'
</script>

<template>
  <div style="max-width: 256px; background: #111827; padding: 8px; border-radius: 8px">
    <SgMenu
      theme="dark"
      mode="inline"
      :items="sidebarItems"
      :default-open-keys="['settings']"
      :default-selected-keys="['billing']"
    />
  </div>
</template>
