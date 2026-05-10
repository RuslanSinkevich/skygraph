<script setup lang="ts">
/**
 * Finished / process steps pull from `--sg-color-primary` for the
 * fill and tail; errors use `--sg-color-error`. Scope either to
 * rebrand an entire wizard.
 */
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'
</script>

<template>
  <div
    :style="{
      '--sg-color-primary': '#16a34a',
      '--sg-color-error': '#dc2626',
    } as Record<string, string>"
  >
    <SgSteps :current="1" :items="basicSteps" />
  </div>
</template>
