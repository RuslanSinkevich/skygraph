<script setup lang="ts">
/**
 * Horizontal track grouped by year — useful for compact release /
 * changelog views where months provide enough context. The `event`
 * slot overrides the default body to render a small card.
 */
import { computed } from 'vue'
import { SgEventTimeline } from '@skygraph/vue'
import type { TimelineEvent } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    v01: 'Engines + hooks',
    v02: 'Tests + a11y',
    v03: 'Demo docs',
    v04: 'GraphEngine',
    v05: 'Charts + Dashboard',
  },
  ru: {
    v01: 'Engines + hooks',
    v02: 'Тесты + a11y',
    v03: 'Demo docs',
    v04: 'GraphEngine',
    v05: 'Charts + Dashboard',
  },
} as const

const t = useDemoStrings(STRINGS)

const releases = computed<TimelineEvent[]>(() => [
  { id: 'v01', date: Date.UTC(2025, 9, 1), title: 'v0.1', description: t.value.v01 },
  { id: 'v02', date: Date.UTC(2025, 11, 5), title: 'v0.2', description: t.value.v02 },
  { id: 'v03', date: Date.UTC(2026, 1, 10), title: 'v0.3', description: t.value.v03 },
  { id: 'v04', date: Date.UTC(2026, 3, 1), title: 'v0.4', description: t.value.v04 },
  { id: 'v05', date: Date.UTC(2026, 4, 1), title: 'v0.5', description: t.value.v05 },
])
</script>

<template>
  <SgEventTimeline :events="releases" orientation="horizontal" group-by="year">
    <template #event="{ event }">
      <div class="release-card">
        <strong>{{ event.title }}</strong>
        <div v-if="event.description" class="release-card__desc">
          {{ event.description }}
        </div>
      </div>
    </template>
  </SgEventTimeline>
</template>

<style scoped>
.release-card {
  border: 1px solid var(--sg-color-border-secondary, #d9d9d9);
  border-radius: 6px;
  padding: 8px 12px;
  background: var(--sg-color-bg-container, #fff);
  box-shadow: var(--sg-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06));
  min-width: 160px;
}
.release-card__desc {
  font-size: 12px;
  color: var(--sg-color-text-secondary, #595959);
  margin-top: 4px;
}
</style>
