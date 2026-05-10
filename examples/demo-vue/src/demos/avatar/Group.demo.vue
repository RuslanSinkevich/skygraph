<script setup lang="ts">
/**
 * Stacking avatars with negative margin + a matching border creates a
 * compact "who's here" group. Reserve the last slot for a +N count
 * and swap in a neutral fill.
 */
import { SgAvatar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    morePeople: 'more people',
  },
  ru: {
    morePeople: 'ещё человек',
  },
} as const

const t = useDemoStrings(STRINGS)

const people = [
  { name: 'Alice', seed: 1 },
  { name: 'Bob', seed: 2 },
  { name: 'Carol', seed: 3 },
  { name: 'Dmitry', seed: 4 },
]
const extra = 3
</script>

<template>
  <div style="display: flex">
    <SgAvatar
      v-for="(p, i) in people"
      :key="p.name"
      :src="`https://api.dicebear.com/7.x/miniavs/svg?seed=${p.seed}`"
      :alt="p.name"
      size="large"
      :style="{
        marginLeft: i === 0 ? '0' : '-10px',
        border: '2px solid var(--sg-color-bg-container)',
      }"
    />
    <SgAvatar
      size="large"
      :style="{
        marginLeft: '-10px',
        background: 'var(--sg-color-fill-secondary, #e5e7eb)',
        color: 'var(--sg-color-text, #111)',
        border: '2px solid var(--sg-color-bg-container)',
        fontSize: '12px',
      }"
      :aria-label="`${extra} ${t.morePeople}`"
    >
      +{{ extra }}
    </SgAvatar>
  </div>
</template>
