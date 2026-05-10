<script setup lang="ts">
/**
 * Controlled mode — pass `activeKey` + `@change` to own the open
 * set. Great for URL-persisted state or "expand all / collapse all"
 * toolbars like this one.
 */
import { ref, computed } from 'vue'
import { SgCollapse, SgButton } from '@skygraph/vue'
import { sampleItems } from './data'

const active = ref<string[]>(['1'])
const allKeys = computed(() => sampleItems.map((item) => item.key))
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 8px">
      <SgButton size="small" @click="active = allKeys">Expand all</SgButton>
      <SgButton size="small" @click="active = []">Collapse all</SgButton>
    </div>
    <SgCollapse :items="sampleItems" :active-key="active" @change="active = $event" />
  </div>
</template>
