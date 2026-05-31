<script setup lang="ts">
/**
 * Drive the bar from state. `percent` is clamped into [0, 100]
 * so you can lazily increment without an upstream min / max
 * guard.
 */
import { ref } from 'vue'
import { SgProgress, SgButton } from '@skygraph/vue'

const percent = ref(30)

function bump(delta: number) {
  percent.value = Math.min(100, Math.max(0, percent.value + delta))
}
</script>

<template>
  <div style="width: 100%; max-width: 400px">
    <SgProgress :percent="percent" />
    <div style="margin-top: 12px; display: flex; gap: 8px">
      <SgButton size="small" @click="bump(-10)">−10</SgButton>
      <SgButton size="small" @click="bump(10)">+10</SgButton>
      <SgButton size="small" @click="percent = 0">Reset</SgButton>
    </div>
  </div>
</template>
