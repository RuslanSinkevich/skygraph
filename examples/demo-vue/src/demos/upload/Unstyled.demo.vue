<script setup lang="ts">
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([{ uid: '1', name: 'spec.pdf', size: 12_000, status: 'done' }])
</script>

<template>
  <SgUpload v-model="files" unstyled multiple />
</template>
