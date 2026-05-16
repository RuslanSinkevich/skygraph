<script setup lang="ts">
import { computed } from 'vue'
import { SgAvatar } from '@skygraph/vue'
import { initials, colorFromString } from './formatters'

/** Shared user-cell rendering helper (avatar + name + optional email). */
const props = withDefaults(
  defineProps<{
    name: string
    email?: string
    avatar?: string
    size?: 'small' | 'middle' | 'large'
  }>(),
  { size: 'small' },
)

const fallback = computed(() => props.avatar ?? initials(props.name))
const bgColor = computed(() => colorFromString(props.name))
</script>

<template>
  <div style="display: flex; align-items: center; gap: 8px">
    <SgAvatar :size="size" :style="{ background: bgColor }">{{ fallback }}</SgAvatar>
    <div style="min-width: 0">
      <div
        :style="{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }"
      >
        {{ name }}
      </div>
      <div
        v-if="email"
        :style="{
          fontSize: '12px',
          color: 'var(--sg-color-text-secondary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }"
      >
        {{ email }}
      </div>
    </div>
  </div>
</template>
