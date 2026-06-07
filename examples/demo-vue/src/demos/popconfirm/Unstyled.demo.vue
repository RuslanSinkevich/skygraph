<script setup lang="ts">
import { SgButton, SgPopconfirm } from '@skygraph/vue'
</script>

<template>
  <SgPopconfirm unstyled title="Proceed?" ok-text="Yes" cancel-text="No">
    <SgButton>Click me</SgButton>
  </SgPopconfirm>
</template>
