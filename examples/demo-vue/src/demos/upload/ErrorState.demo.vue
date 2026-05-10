<script setup lang="ts">
/**
 * Every row has a status variant — `error` applies the red theme + a
 * remove button. Typical use: surface server validation failures
 * ("file too large", "wrong mime", "signature rejected").
 */
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([
  { uid: 'a', name: 'spec.pdf', size: 24_000, status: 'done' },
  { uid: 'b', name: 'broken.zip', size: 900_000, status: 'error' },
  { uid: 'c', name: 'in-flight.mp4', size: 4_500_000, status: 'uploading', percent: 35 },
])
</script>

<template>
  <SgUpload v-model="files" multiple />
</template>
