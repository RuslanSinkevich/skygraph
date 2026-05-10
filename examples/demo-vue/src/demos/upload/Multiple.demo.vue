<script setup lang="ts">
/**
 * `multiple` lets the native picker select several files per dialog.
 * `max-count` caps the total list length — files past the cap are
 * dropped after `multiple` accumulation.
 */
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([])
</script>

<template>
  <SgUpload v-model="files" multiple :max-count="5" />
</template>
