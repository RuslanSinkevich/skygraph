<script setup lang="ts">
import { SgInput, SgTextarea } from '@skygraph/vue'
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 360px">
    <SgInput unstyled class="demo-unstyled-input" placeholder="Native input + custom class" />
    <SgTextarea
      unstyled
      class="demo-unstyled-input"
      placeholder="Native textarea + custom class"
      :rows="3"
    />
  </div>
</template>
