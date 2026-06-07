<script setup lang="ts">
import { SgSpin } from '@skygraph/vue'
</script>

<template>
  <SgSpin unstyled tip="Bring your own style">
    <template #indicator>
      <span style="font-size: 22px" aria-hidden="true">🌀</span>
    </template>
  </SgSpin>
</template>
