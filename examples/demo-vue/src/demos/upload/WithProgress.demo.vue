<script setup lang="ts">
/**
 * Vue note: `SgUpload` already renders a `percent` indicator inline
 * for `uploading` rows. To pair it with a richer progress bar (e.g.
 * `SgProgress`), keep the `percent` updates in `customRequest` and
 * render parallel UI from the controlled `fileList`.
 */
import { computed, ref } from 'vue'
import { SgUpload, SgProgress } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([])
const uploading = computed(() => files.value.filter((f) => f.status === 'uploading'))

function customRequest({
  file: _file,
  onProgress,
  onSuccess,
}: {
  file: File
  onProgress: (percent: number) => void
  onSuccess: (response?: unknown) => void
  onError: (err: unknown) => void
}) {
  let value = 0
  const timer = setInterval(() => {
    value += 10 + Math.floor(Math.random() * 15)
    onProgress(Math.min(100, value))
    if (value >= 100) {
      clearInterval(timer)
      onSuccess()
    }
  }, 220)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px">
    <SgUpload v-model="files" multiple :custom-request="customRequest" />
    <div
      v-if="uploading.length > 0"
      style="display: flex; flex-direction: column; gap: 8px"
    >
      <div
        v-for="f in uploading"
        :key="f.uid"
        style="display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: center"
      >
        <SgProgress :percent="f.percent ?? 0" />
        <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
          {{ f.name }}
        </span>
      </div>
    </div>
  </div>
</template>
