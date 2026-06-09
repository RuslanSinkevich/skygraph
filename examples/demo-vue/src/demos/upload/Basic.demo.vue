<script setup lang="ts">
/**
 * Single-file trigger with the built-in file list. The component
 * tracks `uploading → done` transitions itself when no `customRequest`
 * is provided (`done` is set synchronously after pick).
 */
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([])

function handleCustomRequest({
  file,
  onSuccess,
}: {
  file: File
  onProgress: (percent: number) => void
  onSuccess: (response?: unknown) => void
  onError: (err: unknown) => void
}) {
  console.log('[Upload] picked', file.name)
  setTimeout(() => onSuccess({ name: file.name }), 900)
}
</script>

<template>
  <SgUpload v-model="files" :custom-request="handleCustomRequest" />
</template>
