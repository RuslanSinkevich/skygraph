<script setup lang="ts">
/**
 * `loading` overlays a Spin on the items area without removing the
 * current rows — good for "refresh" UX where you want to signal work
 * while keeping context.
 */
import { ref } from 'vue'
import { SgList, SgButton } from '@skygraph/vue'

const loading = ref(false)

function refresh() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgButton @click="refresh">Refresh</SgButton>
    <SgList
      bordered
      :loading="loading"
      header="Inbox"
      :data-source="['Message 1', 'Message 2', 'Message 3']"
    >
      <template #default="{ item }">{{ item }}</template>
    </SgList>
  </div>
</template>
