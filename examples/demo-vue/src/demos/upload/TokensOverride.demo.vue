<script setup lang="ts">
/**
 * Upload has no component tokens — the file list, remove and error accents are
 * fully driven by global tokens. Three scoped recipes — branded green, dark
 * field, glass pick — reskin the rows.
 *
 * Mirrors React `examples/demo/src/demos/upload/TokensOverride.demo.tsx`.
 */
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'

const files = ref<UploadFile[]>([
  { uid: '1', name: 'brief.docx', size: 48_000, status: 'done' },
  { uid: '2', name: 'photo.png', size: 120_000, status: 'done' },
])
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgUpload v-model="files" multiple />
    </template>
  </TokenScopeCards>
</template>
