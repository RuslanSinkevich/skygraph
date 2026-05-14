<script setup lang="ts">
/**
 * Horizontal track grouped by year — useful for compact release /
 * changelog views where months provide enough context. The `event`
 * slot overrides the default body to render a small card.
 */
import { SgEventTimeline } from '@skygraph/vue'
import type { TimelineEvent } from '@skygraph/vue'

const releases: TimelineEvent[] = [
  { id: 'v01', date: Date.UTC(2025, 9, 1), title: 'v0.1', description: 'Engines + hooks' },
  { id: 'v02', date: Date.UTC(2025, 11, 5), title: 'v0.2', description: 'Tests + a11y' },
  { id: 'v03', date: Date.UTC(2026, 1, 10), title: 'v0.3', description: 'Demo docs' },
  { id: 'v04', date: Date.UTC(2026, 3, 1), title: 'v0.4', description: 'GraphEngine' },
  { id: 'v05', date: Date.UTC(2026, 4, 1), title: 'v0.5', description: 'Charts + Dashboard' },
]
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
  background: var(--sg-color-fill-quaternary, #fafafa);
  min-width: 160px;
}
.release-card__desc {
  font-size: 12px;
  color: var(--sg-color-text-secondary, #595959);
  margin-top: 4px;
}
</style>
