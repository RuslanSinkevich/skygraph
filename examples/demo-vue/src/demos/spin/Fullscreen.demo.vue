<script setup lang="ts">
/**
 * `fullscreen` stretches Spin across the viewport with a dimmed
 * backdrop at `--sg-z-modal`. Use sparingly — for page-level
 * gates like initial hydration or route transitions.
 */
import { onBeforeUnmount, ref, watch } from 'vue'
import { SgSpin, SgButton } from '@skygraph/vue'

const open = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

watch(open, (next) => {
  if (timer) clearTimeout(timer)
  if (!next) return
  timer = setTimeout(() => {
    open.value = false
  }, 1500)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div>
    <SgButton type="primary" @click="open = true">
      Show fullscreen spinner (1.5s)
    </SgButton>
    <SgSpin v-if="open" fullscreen tip="Deploying..." />
  </div>
</template>
