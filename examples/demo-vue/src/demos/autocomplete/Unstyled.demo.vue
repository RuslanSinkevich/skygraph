<script setup lang="ts">
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
</script>

<template>
  <SgAutoComplete
    unstyled
    :options="frameworkOptions"
    placeholder="Headless combobox"
    style="max-width: 320px"
  />
</template>
