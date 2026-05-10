<script setup lang="ts">
/**
 * Stack vertically for dense sidebars or long wizards. The tail
 * connector is drawn down the left edge between icons.
 */
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'
</script>

<template>
  <SgSteps direction="vertical" :current="1" :items="basicSteps" />
</template>
