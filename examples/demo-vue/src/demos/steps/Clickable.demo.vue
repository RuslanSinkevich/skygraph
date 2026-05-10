<script setup lang="ts">
/**
 * Vue-side delta vs React: steps are clickable by default — `@change`
 * always fires, no opt-in. Pair with prev / next buttons for a full
 * wizard surface.
 */
import { ref } from 'vue'
import { SgSteps, SgButton } from '@skygraph/vue'
import { basicSteps } from './data'

const current = ref(1)
const last = basicSteps.length - 1

function onChange(c: number) {
  current.value = c
}
function prev() {
  current.value = Math.max(0, current.value - 1)
}
function next() {
  current.value = Math.min(last, current.value + 1)
}
</script>

<template>
  <div>
    <SgSteps :current="current" :items="basicSteps" @change="onChange" />
    <div style="margin-top: 16px; display: flex; gap: 8px">
      <SgButton :disabled="current <= 0" @click="prev">Previous</SgButton>
      <SgButton type="primary" :disabled="current >= last" @click="next">Next</SgButton>
    </div>
  </div>
</template>
