<script setup lang="ts">
/**
 * Semantic variants map to icon colour + accent background.
 * Same store and container — only `type` (and the helper) differ.
 */
import { SgButton, notification } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton @click="notification.success('Success', 'Operation completed successfully.')">
      Success
    </SgButton>
    <SgButton @click="notification.error('Error', 'Something went wrong.')">Error</SgButton>
    <SgButton @click="notification.warning('Warning', 'Double-check your input.')">
      Warning
    </SgButton>
    <SgButton @click="notification.info('Info', 'Here is some information for you.')">
      Info
    </SgButton>
  </div>
</template>
