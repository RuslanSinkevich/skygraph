<script setup lang="ts">
import { SgCheckbox } from '@skygraph/vue'
</script>

<template>
  <div style="display: grid; gap: 6px">
    <SgCheckbox unstyled default-checked>Checked</SgCheckbox>
    <SgCheckbox unstyled indeterminate>Indeterminate</SgCheckbox>
    <SgCheckbox unstyled disabled>Disabled</SgCheckbox>
  </div>
</template>
