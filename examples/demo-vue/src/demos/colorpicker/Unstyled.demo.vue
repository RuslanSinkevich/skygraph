<script setup lang="ts">
import { SgColorPicker } from '@skygraph/vue'
</script>

<template>
  <div
    style="
      padding: 12px;
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 8px;
      width: fit-content;
    "
  >
    <SgColorPicker unstyled default-value="#38bdf8" show-text />
  </div>
</template>
