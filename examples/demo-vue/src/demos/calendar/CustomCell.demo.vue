<script setup lang="ts">
/**
 * The `#cell` slot injects arbitrary content under the day number —
 * here we draw coloured "load" dots for each day to mimic a team
 * capacity view.
 */
import { SgCalendar } from '@skygraph/vue'

function loadFor(date: Date) {
  return (date.getDate() * 13) % 5
}

function dotColor(load: number) {
  if (load >= 4) return 'var(--sg-color-error, #ff4d4f)'
  if (load >= 2) return 'var(--sg-color-warning, #faad14)'
  return 'var(--sg-color-success, #52c41a)'
}
</script>

<template>
  <SgCalendar :fullscreen="false">
    <template #cell="{ date, type }">
      <div v-if="type === 'date'" class="load-dots">
        <span
          v-for="i in loadFor(date)"
          :key="i"
          class="load-dot"
          :style="{ background: dotColor(loadFor(date)) }"
        />
      </div>
    </template>
  </SgCalendar>
</template>

<style scoped>
.load-dots {
  display: flex;
  gap: 3px;
  justify-content: center;
  margin-top: 2px;
}
.load-dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
}
</style>
