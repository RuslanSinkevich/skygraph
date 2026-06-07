<script setup lang="ts">
import { SgRadio } from '@skygraph/vue'
</script>

<template>
  <SgRadio
    unstyled
    default-value="first"
    :options="[
      { label: 'First', value: 'first' },
      { label: 'Second', value: 'second' },
      { label: 'Third', value: 'third' },
    ]"
  />
</template>
