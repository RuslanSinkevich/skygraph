<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([
  { uid: '1', name: 'brief.docx', size: 48_000, status: 'done' },
  { uid: '2', name: 'photo.png', size: 120_000, status: 'done' },
])

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-border': '#475569',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-error': '#f87171',
}
</script>

<template>
  <div :style="dark">
    <SgUpload v-model="files" multiple />
  </div>
</template>
