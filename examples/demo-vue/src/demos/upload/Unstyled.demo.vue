<script setup lang="ts">
/**
 * `unstyled` keeps the mechanics (hidden input, click trigger, file
 * list) but drops every SkyGraph class — perfect for embedding inside
 * Tailwind, shadcn-style or a custom design system.
 */
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([
  { uid: '1', name: 'spec.pdf', size: 12_000, status: 'done' },
])
</script>

<template>
  <SgUpload v-model="files" unstyled multiple />
</template>
