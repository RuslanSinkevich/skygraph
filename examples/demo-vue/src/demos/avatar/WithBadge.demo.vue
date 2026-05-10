<script setup lang="ts">
/**
 * Wrap an Avatar in a Badge to pin presence / notification dots. The
 * Badge's `offset` nudges the dot inside the circular edge so it
 * doesn't float off the glyph.
 */
import { SgAvatar, SgBadge } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center">
    <SgBadge dot color="var(--sg-color-success)" :offset="[-4, 4]">
      <SgAvatar
        size="large"
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=9"
        alt="Alice"
      />
    </SgBadge>
    <SgBadge :count="4" :offset="[-4, 4]">
      <SgAvatar
        size="large"
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=10"
        alt="Bob"
      />
    </SgBadge>
    <SgBadge dot color="var(--sg-color-warning)" :offset="[-4, 4]">
      <SgAvatar size="large">CD</SgAvatar>
    </SgBadge>
  </div>
</template>
