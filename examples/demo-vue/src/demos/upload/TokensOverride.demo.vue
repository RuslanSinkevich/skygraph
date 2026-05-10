<script setup lang="ts">
/**
 * Upload has no component-scoped tokens — it is fully driven by global
 * tokens. Override them on a scoped wrapper to re-skin the file list
 * rows and the remove/error accents.
 */
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([
  { uid: '1', name: 'brief.docx', size: 48_000, status: 'done' },
  { uid: '2', name: 'upload-failure.log', size: 2_500, status: 'error' },
])
</script>

<template>
  <div
    :style="{
      '--sg-color-border-secondary': 'var(--sg-cyan-4)',
      '--sg-color-error': 'var(--sg-magenta-5)',
      '--sg-border-radius-sm': '999px',
      '--sg-font-size-sm': '13px',
      maxWidth: '420px',
    }"
  >
    <SgUpload v-model="files" multiple />
  </div>
</template>
