<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgAvatar,
  SgTag,
  SgDrawer,
  SgDescriptions,
  SgProgress,
  SgRate,
  SgButton,
  SgSegmented,
} from '@skygraph/vue'
import { performanceReviews, type PerformanceReview } from './reviewsData'
import { Toolbar, statusColor, percent, ratingBarTone, useAppLocale } from '../_shared'

const lc = useAppLocale('hrPortal')
const r = lc.reviews
const filter = ref('all')
const selected = ref<PerformanceReview | null>(null)

const filtered = computed(() =>
  filter.value === 'all'
    ? performanceReviews
    : performanceReviews.filter((rv) => rv.status === filter.value),
)

const avg = performanceReviews.reduce((s, rv) => s + rv.overall, 0) / performanceReviews.length

function statusTone(rv: PerformanceReview): string {
  return rv.status === 'completed' ? 'success' : rv.status === 'pending' ? 'warning' : 'default'
}

function reviewStatusLabel(s: string): string {
  return (lc.reviewStatusLabel as Record<string, string>)[s] ?? s
}

function ratingPct(value: number, max = 5): number {
  return Math.max(0, Math.min(100, (value / max) * 100))
}
</script>

<template>
  <Toolbar hide-search>
    <template #filters>
      <SgSegmented
        :value="filter"
        :options="[
          { label: r.filters.all, value: 'all' },
          { label: r.filters.pending, value: 'pending' },
          { label: r.filters.draft, value: 'draft' },
          { label: r.filters.completed, value: 'completed' },
        ]"
        @change="(v: string | number) => (filter = String(v))"
      />
    </template>
    <template #actions>
      <SgTag color="processing">{{ r.avgOverall(avg.toFixed(2)) }}</SgTag>
    </template>
  </Toolbar>

  <div class="sc-card-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))">
    <div
      v-for="rv of filtered"
      :key="rv.id"
      class="sc-card sc-card--clickable"
      @click="selected = rv"
    >
      <div style="display: flex; align-items: center; gap: 10px">
        <SgAvatar size="middle">{{ rv.employee.avatar }}</SgAvatar>
        <div style="flex: 1">
          <div style="font-weight: 600">{{ rv.employee.name }}</div>
          <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
            {{ rv.employee.role }} · {{ rv.period }}
          </div>
        </div>
        <SgTag :color="statusColor(statusTone(rv))">{{ reviewStatusLabel(rv.status) }}</SgTag>
      </div>
      <div style="margin-top: 8px">
        <div style="display: flex; align-items: center; gap: 6px">
          <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{
            r.overall
          }}</span>
          <div class="hr-rating-bar">
            <div
              class="hr-rating-fill"
              :style="{
                width: `${ratingPct(rv.overall)}%`,
                background: ratingBarTone(rv.overall),
              }"
            />
          </div>
          <span style="font-size: 12px; min-width: 28px">{{ rv.overall.toFixed(1) }}</span>
        </div>
      </div>
      <div class="hr-review-grid">
        <span
          >{{ r.tech }}: <strong>{{ rv.technical }}</strong></span
        >
        <span
          >{{ r.collab }}: <strong>{{ rv.collaboration }}</strong></span
        >
        <span
          >{{ r.leadAbbr }}: <strong>{{ rv.leadership }}</strong></span
        >
        <span
          >{{ r.delivery }}: <strong>{{ rv.delivery }}</strong></span
        >
      </div>
      <div class="hr-review-reviewer">{{ r.reviewer }}: {{ rv.reviewerName }}</div>
    </div>
  </div>

  <SgDrawer
    :open="!!selected"
    :title="selected ? `${selected.employee.name} — ${selected.period}` : ''"
    :width="520"
    @close="selected = null"
  >
    <template v-if="selected">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div style="display: flex; align-items: center; gap: 12px">
          <SgAvatar size="large">{{ selected.employee.avatar }}</SgAvatar>
          <div style="flex: 1">
            <div style="font-weight: 600; font-size: 16px">{{ selected.employee.name }}</div>
            <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
              {{ selected.employee.role }} · {{ selected.employee.department }}
            </div>
          </div>
          <SgTag :color="statusColor(statusTone(selected))">
            {{ reviewStatusLabel(selected.status) }}
          </SgTag>
        </div>

        <SgDescriptions
          :column="2"
          size="small"
          :items="[
            { label: r.drawer.period, value: selected.period },
            { label: r.drawer.reviewer, value: selected.reviewerName },
            { label: r.drawer.score, value: selected.overall.toFixed(2) },
          ]"
        />

        <div style="display: flex; align-items: center; gap: 12px">
          <span style="font-weight: 500">{{ r.drawer.overall }}:</span>
          <SgRate :value="selected.overall" disabled allow-half />
        </div>

        <h4 style="margin: 0">{{ r.drawer.breakdown }}</h4>
        <div
          v-for="row of [
            [r.drawer.technical, selected.technical],
            [r.drawer.collaboration, selected.collaboration],
            [r.drawer.leadership, selected.leadership],
            [r.drawer.delivery, selected.delivery],
          ]"
          :key="String(row[0])"
        >
          <div class="hr-row-head">
            <span>{{ row[0] }}</span>
            <span>{{ row[1] }}</span>
          </div>
          <SgProgress :percent="(Number(row[1]) / 5) * 100" :show-info="false" />
        </div>

        <h4 style="margin: 0">{{ r.drawer.goals }}</h4>
        <div v-for="(g, i) of selected.goals" :key="i">
          <div class="hr-row-head">
            <span>{{ g.title }}</span>
            <span>{{ percent(g.progress, 0) }}</span>
          </div>
          <SgProgress
            :percent="g.progress"
            :status="g.progress >= 100 ? 'success' : 'active'"
            :show-info="false"
          />
        </div>

        <div>
          <h4>{{ r.drawer.highlights }}</h4>
          <p style="font-size: 13px; color: var(--sg-color-text-secondary)">
            {{ selected.highlights }}
          </p>
        </div>
        <div>
          <h4>{{ r.drawer.improvements }}</h4>
          <p style="font-size: 13px; color: var(--sg-color-text-secondary)">
            {{ selected.improvements }}
          </p>
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-end">
          <SgButton>{{ r.drawer.exportPdf }}</SgButton>
          <SgButton v-if="selected.status !== 'completed'" type="primary">{{
            r.drawer.complete
          }}</SgButton>
        </div>
      </div>
    </template>
  </SgDrawer>
</template>

<style scoped>
.hr-rating-bar {
  flex: 1;
  height: 6px;
  background: var(--sg-color-border-secondary, #f0f0f0);
  border-radius: 3px;
  overflow: hidden;
}
.hr-rating-fill {
  height: 100%;
  border-radius: 3px;
}
.hr-review-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-top: 6px;
  font-size: 11px;
}
.hr-review-reviewer {
  font-size: 11px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
}
.hr-row-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 2px;
}
</style>
