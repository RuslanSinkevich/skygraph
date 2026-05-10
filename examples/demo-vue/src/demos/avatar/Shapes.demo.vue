<script setup lang="ts">
/**
 * `shape` chooses between a full circle and a rounded square. Square
 * avatars use `--sg-border-radius` so they pair with Cards and
 * Buttons tonally.
 */
import { SgAvatar } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgAvatar size="large">C</SgAvatar>
    <SgAvatar shape="square" size="large">S</SgAvatar>
    <SgAvatar
      size="large"
      src="https://api.dicebear.com/7.x/miniavs/svg?seed=42"
      alt="Lisa"
    />
    <SgAvatar
      shape="square"
      size="large"
      src="https://api.dicebear.com/7.x/miniavs/svg?seed=42"
      alt="Lisa"
    />
  </div>
</template>
