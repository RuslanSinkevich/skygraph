<script setup lang="ts">
/**
 * Passed straight to the native `<input accept>`. Mixing MIME and
 * extension groups (`image/*, .pdf`) is the most reliable across
 * browsers.
 */
import { SgUpload } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <SgUpload accept="image/*" />
    <SgUpload accept=".pdf,.doc,.docx" />
    <SgUpload accept="video/mp4" />
  </div>
</template>
