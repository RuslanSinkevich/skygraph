<script setup lang="ts">
import { SgProgress } from '@skygraph/vue'

/**
 * Shared KPI / stats card row used by every "dashboard-style" Vue showcase.
 * Visual + API parity with `examples/showcases/src/showcases/_shared/StatsRow.tsx`.
 *
 * Slots:
 *   - `label:<key>`    custom label rendering for an item (key = item.key or index)
 *   - `value:<key>`    custom value rendering
 *   - `sub:<key>`      custom sub-line rendering
 */
export interface StatItem {
  key?: string
  label?: string | number
  value?: string | number
  sub?: string | number
  subTone?: 'default' | 'success' | 'error' | 'warning'
  progress?: number
  progressStatus?: 'success' | 'active' | 'error'
  icon?: string
}

export interface StatsRowProps {
  items: StatItem[]
  className?: string
  minColumnWidth?: number
}

const props = withDefaults(defineProps<StatsRowProps>(), {
  className: '',
  minColumnWidth: 180,
})

const TONE_VAR: Record<NonNullable<StatItem['subTone']>, string> = {
  default: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))',
  success: 'var(--sg-color-success, #52c41a)',
  error: 'var(--sg-color-error, #ff4d4f)',
  warning: 'var(--sg-color-warning, #faad14)',
}

function toneFor(item: StatItem): string {
  return TONE_VAR[item.subTone ?? 'default']
}

function slotKey(item: StatItem, i: number): string {
  return item.key ?? String(i)
}
</script>

<template>
  <div
    :class="['stats-row', props.className].filter(Boolean).join(' ')"
    :style="{ gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))` }"
  >
    <div v-for="(it, i) of items" :key="it.key ?? i" class="stat-card">
      <div class="stat-card-label">
        <span v-if="it.icon" style="margin-right: 6px">{{ it.icon }}</span>
        <slot :name="`label:${slotKey(it, i)}`" :item="it">{{ it.label }}</slot>
      </div>
      <div class="stat-card-value">
        <slot :name="`value:${slotKey(it, i)}`" :item="it">{{ it.value }}</slot>
      </div>
      <SgProgress
        v-if="it.progress !== undefined"
        :percent="it.progress"
        :show-info="false"
        :status="it.progressStatus ?? 'active'"
      />
      <div
        v-if="it.sub !== undefined || $slots[`sub:${slotKey(it, i)}`]"
        class="stat-card-sub"
        :style="{ color: toneFor(it) }"
      >
        <slot :name="`sub:${slotKey(it, i)}`" :item="it">{{ it.sub }}</slot>
      </div>
    </div>
  </div>
</template>
