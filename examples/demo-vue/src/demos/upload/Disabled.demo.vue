<script setup lang="ts">
/**
 * `disabled` blocks the trigger and any drag interaction.
 *
 * Vue delta: `SgUpload` has no `loading` prop — the React variant that
 * swaps the trigger for a spinner is dropped.
 */
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'

const files = ref<UploadFile[]>([
  { uid: 'x', name: 'locked.pdf', size: 90_000, status: 'done' },
  { uid: 'y', name: 'pending.dat', size: 1_500_000, status: 'uploading', percent: 60 },
])
</script>

<template>
  <SgUpload v-model="files" disabled />
</template>
