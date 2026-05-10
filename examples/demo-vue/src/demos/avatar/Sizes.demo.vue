<script setup lang="ts">
/**
 * Three preset sizes (`small` 24px, `middle` 32px, `large` 40px) or
 * any number for a custom px size. Font size auto-scales at 45%
 * of the avatar diameter.
 */
import { SgAvatar } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgAvatar size="small">U</SgAvatar>
    <SgAvatar>U</SgAvatar>
    <SgAvatar size="large">U</SgAvatar>
    <SgAvatar :size="56">U</SgAvatar>
    <SgAvatar :size="72">U</SgAvatar>
  </div>
</template>
