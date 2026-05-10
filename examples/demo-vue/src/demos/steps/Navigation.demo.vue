<script setup lang="ts">
/**
 * `type="navigation"` drops the icons and underlines the active
 * step — good for page-level section tabs where numbers would
 * feel too heavy.
 */
import { ref } from 'vue'
import { SgSteps } from '@skygraph/vue'
import { checkoutSteps } from './data'

const current = ref(1)

function onChange(c: number) {
  current.value = c
}
</script>

<template>
  <SgSteps type="navigation" :current="current" :items="checkoutSteps" @change="onChange" />
</template>
