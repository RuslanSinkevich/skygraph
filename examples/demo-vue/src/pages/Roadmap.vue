<script setup lang="ts">
/**
 * Roadmap page (`/roadmap`) — Wave 3.4 port of
 * `examples/demo/src/pages/Roadmap/Roadmap.tsx`.
 *
 * Same data flow:
 *   1. Read TODO.md as raw text via `?raw` import.
 *   2. Parse with `parseTodo` from `@skygraph-examples/shared`.
 *   3. Decorate items, sort (closed first, then open by id).
 *   4. Render through `<EventTimeline>` with a custom marker + custom
 *      title/body (uses the `event` slot because Vue EventTimeline only
 *      stringifies `title` / `description`).
 *
 * Stylesheet `roadmap.css` is a 1:1 copy of the React-side stylesheet.
 */
import { computed } from 'vue'
import { SgEventTimeline, type TimelineEvent } from '@skygraph/vue'
import { parseTodo, type TodoItem, type TodoSection } from '@skygraph-examples/shared'
import todoMd from '../../../../TODO.md?raw'
import { useI18n } from '../i18n'
import './roadmap.css'

const { t } = useI18n()

interface DecoratedItem {
  item: TodoItem
  section: TodoSection
}

const sections = computed(() => parseTodo(todoMd))

const decorated = computed<DecoratedItem[]>(() => {
  const out: DecoratedItem[] = []
  for (const section of sections.value) {
    for (const item of section.items) out.push({ item, section })
  }
  return out
})

const stats = computed(() => {
  let closed = 0
  let open = 0
  for (const { item } of decorated.value) {
    if (item.status === 'closed') closed++
    else open++
  }
  return { closed, open, total: decorated.value.length }
})

interface RoadmapEvent extends TimelineEvent {
  /** Original decorated entry, consumed by the `event` slot. */
  decorated: DecoratedItem
}

const events = computed<RoadmapEvent[]>(() => {
  const baseTime = new Date('2026-01-01T00:00:00Z').getTime()
  const sorted = [...decorated.value].sort((a, b) => {
    if (a.item.status !== b.item.status) {
      return a.item.status === 'closed' ? -1 : 1
    }
    return compareIds(a.item.id, b.item.id)
  })
  return sorted.map((d, idx) => ({
    id: `${d.section.id}-${d.item.id || idx}`,
    date: baseTime + idx * 86_400_000,
    title: stripInline(d.item.title),
    color: d.item.status === 'closed' ? 'var(--sg-color-success)' : undefined,
    decorated: d,
  }))
})

function compareIds(a: string, b: string): number {
  const pa = a.split('.').map((s) => parseInt(s, 10) || 0)
  const pb = b.split('.').map((s) => parseInt(s, 10) || 0)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const da = pa[i] ?? 0
    const db = pb[i] ?? 0
    if (da !== db) return da - db
  }
  return 0
}

function stripInline(line: string): string {
  return line
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^\s*[-*]\s+/, '· ')
    .replace(/^~~(.+?)~~/, '$1')
    .trim()
}

function summarize(item: TodoItem): string {
  const lines = item.body
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 3)
    .map(stripInline)
  return lines.join('\n')
}
</script>

<template>
  <div class="roadmap">
    <header class="roadmap-header">
      <h1 class="roadmap-title">{{ t.roadmap.title }}</h1>
      <p class="roadmap-lead">{{ t.roadmap.lead }}</p>
    </header>

    <div class="roadmap-stats" role="list" aria-label="Roadmap stats">
      <span class="roadmap-stat roadmap-stat--closed" role="listitem">
        <span class="roadmap-stat-dot" aria-hidden="true" />
        {{ stats.closed }} {{ t.roadmap.statClosed }}
      </span>
      <span class="roadmap-stat roadmap-stat--open" role="listitem">
        <span class="roadmap-stat-dot" aria-hidden="true" />
        {{ stats.open }} {{ t.roadmap.statOpen }}
      </span>
      <span class="roadmap-stat roadmap-stat--total" role="listitem">
        <span class="roadmap-stat-dot" aria-hidden="true" />
        {{ stats.total }} {{ t.roadmap.statTotal }}
      </span>
    </div>

    <div class="roadmap-source">{{ t.roadmap.sourceLabel }}</div>

    <div v-if="events.length === 0" class="roadmap-empty">{{ t.roadmap.emptyLabel }}</div>
    <SgEventTimeline v-else :events="events" orientation="vertical">
      <template #marker="{ event }">
        <span
          :class="
            event.color
              ? 'roadmap-marker roadmap-marker--closed'
              : 'roadmap-marker roadmap-marker--open'
          "
          aria-hidden="true"
        />
      </template>
      <template #event="{ event }">
        <div class="roadmap-event-title">
          <span v-if="(event as RoadmapEvent).decorated.item.id" class="roadmap-event-id">
            § {{ (event as RoadmapEvent).decorated.item.id }}
          </span>
          <span>{{ stripInline((event as RoadmapEvent).decorated.item.title) }}</span>
          <span
            :class="
              (event as RoadmapEvent).decorated.item.status === 'closed'
                ? 'roadmap-event-status roadmap-event-status--closed'
                : 'roadmap-event-status roadmap-event-status--open'
            "
          >
            {{
              (event as RoadmapEvent).decorated.item.status === 'closed'
                ? t.roadmap.statClosed
                : t.roadmap.statOpen
            }}
          </span>
        </div>
        <div v-if="(event as RoadmapEvent).decorated.section.title" class="roadmap-event-section">
          <template v-if="(event as RoadmapEvent).decorated.section.id">
            §{{ (event as RoadmapEvent).decorated.section.id }} ·
          </template>
          {{ (event as RoadmapEvent).decorated.section.title }}
        </div>
        <div v-if="summarize((event as RoadmapEvent).decorated.item)" class="roadmap-event-body">
          {{ summarize((event as RoadmapEvent).decorated.item) }}
        </div>
      </template>
    </SgEventTimeline>
  </div>
</template>
