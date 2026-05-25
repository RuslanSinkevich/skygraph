<script setup lang="ts">
/**
 * Roadmap page (`/roadmap`) — Vue port of
 * `examples/demo/src/pages/Roadmap/Roadmap.tsx`.
 *
 * Layout (mirror of the React redesign):
 *   1. Hero          — title + 4 KPI chips + overall progress bar.
 *   2. Latest round  — focus card for the newest changelog entry.
 *   3. Filters       — `<SgSegmented>` + `<SgInput>` (sticky at top).
 *   4. Active        — TODO sections with progress bars; collapsible cards.
 *   5. Archive       — grid of every round (topic / commit count + summary).
 *   6. Sidebar       — sticky "what's next" + jump-to-source links.
 *
 * Re-uses `roadmap.css` (1:1 with React surface).
 */
import { computed, ref } from 'vue'
import { SgEmpty, SgInput, SgProgress, SgSegmented, SgTag, SgTooltip } from '@skygraph/vue'
import {
  GITHUB_URL,
  parseChangelog,
  parseTodo,
  type ChangelogRound,
  type TodoItem,
  type TodoSection,
} from '@skygraph-examples/shared'
import todoMd from '../../../../TODO.md?raw'
import changelogMd from '../../../../CHANGELOG.md?raw'
import { useI18n } from '../i18n'
import './roadmap.css'

const { t } = useI18n()

type Filter = 'all' | 'shipped' | 'planned'

const CHANGELOG_GITHUB_URL =
  'https://github.com/RuslanSinkevich/skygraph-public/blob/master/CHANGELOG.md'

const filter = ref<Filter>('all')
const query = ref('')

interface SectionView extends TodoSection {
  closed: number
  total: number
  pct: number
  isComplete: boolean
}

interface RoundMeta {
  number: number
  summary: string
  preview: string
  subsectionCount: number
  shaCount: number
}

const sections = computed<TodoSection[]>(() => parseTodo(todoMd))
const rounds = computed<RoundMeta[]>(() => parseRounds(changelogMd))
const latestRound = computed<RoundMeta | null>(() => {
  const arr = rounds.value
  return arr.length > 0 ? arr[arr.length - 1] : null
})

const stats = computed(() => {
  let closed = 0
  let open = 0
  for (const s of sections.value) {
    for (const i of s.items) {
      if (i.status === 'closed') closed++
      else open++
    }
  }
  const total = closed + open
  const pct = total === 0 ? 0 : Math.round((closed / total) * 100)
  return { closed, open, total, pct }
})

const filteredSections = computed<SectionView[]>(() => {
  const q = query.value.trim().toLowerCase()
  const f = filter.value
  const out: SectionView[] = []
  for (const s of sections.value) {
    const items = s.items.filter((it) => {
      if (f === 'shipped' && it.status !== 'closed') return false
      if (f === 'planned' && it.status !== 'open') return false
      if (!q) return true
      return it.title.toLowerCase().includes(q) || it.body.some((l) => l.toLowerCase().includes(q))
    })
    if (items.length === 0) continue
    const closed = items.filter((i) => i.status === 'closed').length
    const total = items.length
    const pct = total === 0 ? 0 : Math.round((closed / total) * 100)
    out.push({
      ...s,
      items,
      closed,
      total,
      pct,
      isComplete: closed === total,
    })
  }
  return out
})

const filteredRounds = computed<RoundMeta[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return rounds.value
  return rounds.value.filter(
    (r) => r.summary.toLowerCase().includes(q) || r.preview.toLowerCase().includes(q),
  )
})

const reversedRounds = computed<RoundMeta[]>(() => [...filteredRounds.value].reverse())

// Local UI state: which section cards are expanded. Defaults: the first
// two visible cards open, all others collapsed.
const expandedKeys = ref<Set<string>>(new Set())

function sectionKey(s: TodoSection): string {
  return s.id || s.title || 'untitled'
}

function isExpanded(s: TodoSection, idx: number): boolean {
  const key = sectionKey(s)
  if (expandedKeys.value.has(`open:${key}`)) return true
  if (expandedKeys.value.has(`closed:${key}`)) return false
  return idx < 2
}

function toggleExpanded(s: TodoSection) {
  const key = sectionKey(s)
  const openKey = `open:${key}`
  const closedKey = `closed:${key}`
  const idx = filteredSections.value.findIndex((x) => sectionKey(x) === key)
  const defaultOpen = idx >= 0 && idx < 2
  const currentlyOpen = isExpanded(s, idx)
  expandedKeys.value.delete(openKey)
  expandedKeys.value.delete(closedKey)
  if (currentlyOpen === defaultOpen) {
    expandedKeys.value.add(currentlyOpen ? closedKey : openKey)
  }
  expandedKeys.value = new Set(expandedKeys.value)
}

const openItems = computed<Array<{ item: TodoItem; section: TodoSection }>>(() => {
  const out: Array<{ item: TodoItem; section: TodoSection }> = []
  for (const s of sections.value) {
    for (const it of s.items) {
      if (it.status === 'open') out.push({ item: it, section: s })
    }
  }
  return out.sort((a, b) => compareIds(a.item.id, b.item.id))
})

const topOpenItems = computed(() => openItems.value.slice(0, 8))

const filterOptions = computed(() => [
  { value: 'all', label: t.value.roadmap.filterAll },
  { value: 'shipped', label: t.value.roadmap.filterShipped },
  { value: 'planned', label: t.value.roadmap.filterPlanned },
])

function onFilterChange(v: string | number) {
  const s = String(v)
  if (s === 'all' || s === 'shipped' || s === 'planned') {
    filter.value = s
  }
}

// ────────────────────────────────────────────────────────────────────────
// Parsing helpers — direct ports of the React-side helpers.

function parseRounds(md: string): RoundMeta[] {
  const entries = parseChangelog(md)
  const flat: RoundMeta[] = []
  for (const entry of entries) {
    for (const round of entry.rounds) {
      const meta = roundMeta(round)
      if (meta) flat.push(meta)
    }
  }
  return flat.sort((a, b) => a.number - b.number)
}

function roundMeta(round: ChangelogRound): RoundMeta | null {
  const m = round.title.match(/^Round\s+(\d+(?:\.\d+)?)/i)
  if (!m) return null
  const number = parseFloat(m[1])
  const summary = round.title.replace(/^Round\s+\d+(?:\.\d+)?\s*[—\-–]\s*/i, '').trim()
  const preview = pickPreview(round)
  const allText = [...round.body, ...round.subsections.flatMap((s) => s.body)]
  const shaSet = new Set<string>()
  for (const line of allText) {
    const matches = line.match(/`([0-9a-f]{7})`/g)
    if (matches) for (const sha of matches) shaSet.add(sha)
  }
  return {
    number,
    summary,
    preview,
    subsectionCount: round.subsections.length,
    shaCount: shaSet.size,
  }
}

function pickPreview(round: ChangelogRound): string {
  const lines = round.body.length > 0 ? round.body : (round.subsections[0]?.body ?? [])
  for (const raw of lines) {
    const line = stripInline(raw)
    if (line.length === 0) continue
    return line.length > 200 ? line.slice(0, 197) + '…' : line
  }
  return ''
}

function detectRound(body: string[]): number | null {
  let best: number | null = null
  for (const line of body) {
    const re = /round\s+(\d+)/gi
    let m: RegExpExecArray | null
    while ((m = re.exec(line)) !== null) {
      const n = parseInt(m[1], 10)
      if (!Number.isNaN(n) && (best === null || n > best)) best = n
    }
  }
  return best
}

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
  return item.body
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 2)
    .map(stripInline)
    .join(' ')
}

function format(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
}

function topicWord(n: number): string {
  return n === 1
    ? (t.value.roadmap.topicSingular ?? 'topic')
    : (t.value.roadmap.topicPlural ?? 'topics')
}

function commitWord(n: number): string {
  return n === 1
    ? (t.value.roadmap.commitSingular ?? 'commit')
    : (t.value.roadmap.commitPlural ?? 'commits')
}
</script>

<template>
  <div class="roadmap">
    <!-- ── Hero ───────────────────────────────────────────────── -->
    <header class="roadmap-hero">
      <div class="roadmap-hero-text">
        <div class="roadmap-eyebrow">{{ t.roadmap.sourceLabel }}</div>
        <h1 class="roadmap-title">{{ t.roadmap.title }}</h1>
        <p class="roadmap-lead">{{ t.roadmap.lead }}</p>
      </div>
      <div class="roadmap-hero-progress">
        <div class="roadmap-hero-progress-head">
          <span class="roadmap-hero-progress-label">
            {{ t.roadmap.overallProgressLabel ?? 'Overall progress' }}
          </span>
          <span class="roadmap-hero-progress-pct">{{ stats.pct }}%</span>
        </div>
        <SgProgress
          :percent="stats.pct"
          :status="stats.pct === 100 ? 'success' : 'active'"
          :show-info="false"
        />
        <div class="roadmap-hero-progress-foot">
          <span
            ><strong>{{ stats.closed }}</strong> {{ t.roadmap.statClosed }}</span
          >
          <span>·</span>
          <span
            ><strong>{{ stats.open }}</strong> {{ t.roadmap.statOpen }}</span
          >
          <span>·</span>
          <span
            ><strong>{{ stats.total }}</strong> {{ t.roadmap.statTotal }}</span
          >
        </div>
      </div>
    </header>

    <!-- ── Metrics row ────────────────────────────────────────── -->
    <div class="roadmap-metrics" role="list">
      <div role="listitem" class="roadmap-metric roadmap-metric--primary">
        <span class="roadmap-metric-value">{{ rounds.length }}</span>
        <span class="roadmap-metric-label">{{ t.roadmap.metricRounds }}</span>
      </div>
      <div role="listitem" class="roadmap-metric roadmap-metric--success">
        <span class="roadmap-metric-value">{{ stats.closed }}</span>
        <span class="roadmap-metric-label">{{ t.roadmap.statClosed }}</span>
      </div>
      <div role="listitem" class="roadmap-metric roadmap-metric--warning">
        <span class="roadmap-metric-value">{{ stats.open }}</span>
        <span class="roadmap-metric-label">{{ t.roadmap.statOpen }}</span>
      </div>
    </div>

    <!-- ── Latest round focus card ────────────────────────────── -->
    <section v-if="latestRound" class="roadmap-latest">
      <div class="roadmap-latest-head">
        <div class="roadmap-latest-eyebrow">
          {{ t.roadmap.latestEyebrow ?? 'Latest release' }}
        </div>
        <h2 class="roadmap-latest-title">
          <span class="roadmap-latest-tag">
            {{ t.roadmap.roundLabel }} {{ latestRound.number }}
          </span>
          <span v-if="latestRound.summary" class="roadmap-latest-summary">
            {{ latestRound.summary }}
          </span>
        </h2>
        <p v-if="latestRound.preview" class="roadmap-latest-preview">
          {{ latestRound.preview }}
        </p>
      </div>
      <div class="roadmap-latest-meta">
        <div class="roadmap-latest-stat">
          <span class="roadmap-latest-stat-value">
            {{ latestRound.subsectionCount }}
          </span>
          <span class="roadmap-latest-stat-label">
            {{ topicWord(latestRound.subsectionCount) }}
          </span>
        </div>
        <div class="roadmap-latest-stat">
          <span class="roadmap-latest-stat-value">
            {{ latestRound.shaCount }}
          </span>
          <span class="roadmap-latest-stat-label">
            {{ commitWord(latestRound.shaCount) }}
          </span>
        </div>
        <a
          class="roadmap-latest-link"
          :href="CHANGELOG_GITHUB_URL"
          target="_blank"
          rel="noreferrer noopener"
        >
          {{ t.roadmap.changelogLink ?? 'Read full changelog →' }}
        </a>
      </div>
    </section>

    <!-- ── Filter bar ─────────────────────────────────────────── -->
    <div class="roadmap-filter">
      <SgSegmented :options="filterOptions" :value="filter" @change="onFilterChange" />
      <span class="roadmap-search-wrap">
        <SgInput
          class="roadmap-search"
          :placeholder="t.roadmap.searchPlaceholder"
          :model-value="query"
          allow-clear
          @update:model-value="query = $event"
        />
      </span>
    </div>

    <!-- ── Two-column: sections (left) + sidebar (right) ──────── -->
    <div class="roadmap-columns">
      <section class="roadmap-block roadmap-col-main">
        <div class="roadmap-block-header">
          <h2 class="roadmap-block-title">{{ t.roadmap.sectionsHeading }}</h2>
          <p class="roadmap-block-lead">{{ t.roadmap.sectionsLead }}</p>
        </div>

        <SgEmpty v-if="filteredSections.length === 0" :description="t.roadmap.emptyLabel" />
        <div v-else class="roadmap-section-list">
          <article
            v-for="(section, idx) in filteredSections"
            :key="sectionKey(section)"
            :class="[
              'roadmap-section-card',
              section.isComplete && 'roadmap-section-card--complete',
            ]"
          >
            <button
              type="button"
              class="roadmap-section-button"
              :aria-expanded="isExpanded(section, idx)"
              @click="toggleExpanded(section)"
            >
              <div class="roadmap-section-header">
                <div class="roadmap-section-title">
                  <span v-if="section.id" class="roadmap-section-id"> § {{ section.id }} </span>
                  <span>{{ section.title }}</span>
                  <SgTag :color="section.isComplete ? 'success' : 'warning'">
                    {{
                      section.isComplete
                        ? t.roadmap.sectionStatusComplete
                        : t.roadmap.sectionStatusActive
                    }}
                  </SgTag>
                </div>
                <div class="roadmap-section-progress">
                  <SgProgress
                    :percent="section.pct"
                    size="small"
                    :status="section.isComplete ? 'success' : 'active'"
                    :show-info="false"
                  />
                  <span class="roadmap-section-progress-text">
                    {{
                      format(t.roadmap.sectionProgressCount, {
                        closed: String(section.closed),
                        total: String(section.total),
                      })
                    }}
                  </span>
                </div>
              </div>
              <span
                class="roadmap-section-chevron"
                :data-open="isExpanded(section, idx)"
                aria-hidden="true"
              />
            </button>
            <div v-if="isExpanded(section, idx)" class="roadmap-section-body">
              <ul class="roadmap-items">
                <li
                  v-for="item in section.items"
                  :key="`${item.id || ''}-${item.title}`"
                  :class="[
                    'roadmap-item',
                    item.status === 'closed' ? 'roadmap-item--closed' : 'roadmap-item--open',
                  ]"
                >
                  <span
                    :class="[
                      'roadmap-item-marker',
                      item.status === 'closed'
                        ? 'roadmap-item-marker--closed'
                        : 'roadmap-item-marker--open',
                    ]"
                    aria-hidden="true"
                  />
                  <div class="roadmap-item-body">
                    <div class="roadmap-item-title">
                      <span v-if="item.id" class="roadmap-item-id"> § {{ item.id }} </span>
                      <span>{{ stripInline(item.title) }}</span>
                      <SgTag :color="item.status === 'closed' ? 'success' : 'warning'">
                        {{
                          item.status === 'closed'
                            ? t.roadmap.itemBadgeShipped
                            : t.roadmap.itemBadgePlanned
                        }}
                      </SgTag>
                      <SgTag v-if="detectRound(item.body) !== null" color="processing">
                        {{
                          format(t.roadmap.itemRound, {
                            n: String(detectRound(item.body)),
                          })
                        }}
                      </SgTag>
                    </div>
                    <div v-if="summarize(item)" class="roadmap-item-summary">
                      {{ summarize(item) }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <aside class="roadmap-block roadmap-col-side">
        <div class="roadmap-block-header">
          <h2 class="roadmap-block-title">{{ t.roadmap.nextHeading }}</h2>
          <p class="roadmap-block-lead">{{ t.roadmap.nextLead }}</p>
        </div>

        <div v-if="openItems.length === 0" class="roadmap-empty roadmap-empty--small">
          {{ t.roadmap.nextEmpty }}
        </div>
        <ul v-else class="roadmap-next-list">
          <li
            v-for="entry in topOpenItems"
            :key="`${entry.section.id}-${entry.item.id}`"
            class="roadmap-next-item"
          >
            <div class="roadmap-next-title">
              <span v-if="entry.item.id" class="roadmap-next-id"> § {{ entry.item.id }} </span>
              <span>{{ stripInline(entry.item.title) }}</span>
            </div>
            <div v-if="entry.section.title" class="roadmap-next-section">
              <template v-if="entry.section.id">§{{ entry.section.id }} · </template>
              {{ entry.section.title }}
            </div>
          </li>
        </ul>

        <div v-if="openItems.length > 8" class="roadmap-next-more">
          + {{ openItems.length - 8 }} {{ t.roadmap.moreLabel ?? 'more' }}
        </div>

        <a class="roadmap-source-link" :href="GITHUB_URL" target="_blank" rel="noreferrer noopener">
          GitHub →
        </a>
      </aside>
    </div>

    <!-- ── Rounds archive grid ────────────────────────────────── -->
    <section v-if="filteredRounds.length > 0" class="roadmap-block">
      <div class="roadmap-block-header">
        <h2 class="roadmap-block-title">{{ t.roadmap.timelineHeading }}</h2>
        <p class="roadmap-block-lead">{{ t.roadmap.timelineLead }}</p>
      </div>

      <ol class="roadmap-rounds-grid">
        <li v-for="r in reversedRounds" :key="r.number" class="roadmap-round-card">
          <div class="roadmap-round-card-head">
            <span class="roadmap-round-card-num">#{{ r.number }}</span>
            <span class="roadmap-round-card-meta">
              <SgTooltip
                v-if="r.subsectionCount > 0"
                :title="`${r.subsectionCount} ${topicWord(r.subsectionCount)}`"
              >
                <SgTag color="default">⊞ {{ r.subsectionCount }}</SgTag>
              </SgTooltip>
              <SgTooltip v-if="r.shaCount > 0" :title="`${r.shaCount} ${commitWord(r.shaCount)}`">
                <SgTag color="processing">◆ {{ r.shaCount }}</SgTag>
              </SgTooltip>
            </span>
          </div>
          <div v-if="r.summary" class="roadmap-round-card-title">
            {{ r.summary }}
          </div>
          <p v-if="r.preview" class="roadmap-round-card-preview">
            {{ r.preview }}
          </p>
        </li>
      </ol>
    </section>

    <div class="roadmap-footnote">
      <a :href="GITHUB_URL" target="_blank" rel="noreferrer noopener"> GitHub → </a>
    </div>
  </div>
</template>
