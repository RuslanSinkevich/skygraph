<script setup lang="ts">
/**
 * `width` and `height` accept any CSS length — a number is treated as
 * px. Use percentages for fully responsive drawers on mobile.
 */
import { computed, ref } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'

type Size = 'narrow' | 'wide' | 'full'

const config: Record<Size, { width: number | string; label: string }> = {
  narrow: { width: 280, label: 'Narrow (280px)' },
  wide: { width: 640, label: 'Wide (640px)' },
  full: { width: '90%', label: 'Responsive (90%)' },
}

const size = ref<Size | null>(null)
const isOpen = computed(() => size.value !== null)
const title = computed(() => (size.value ? config[size.value].label : ''))
const width = computed(() => (size.value ? config[size.value].width : 378))
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton @click="size = 'narrow'">Narrow</SgButton>
    <SgButton @click="size = 'wide'">Wide</SgButton>
    <SgButton @click="size = 'full'">Responsive</SgButton>
  </div>
  <SgDrawer :open="isOpen" :title="title" :width="width" @close="size = null">
    <p>Change `width` to any CSS length — px, %, vw all work.</p>
  </SgDrawer>
</template>
