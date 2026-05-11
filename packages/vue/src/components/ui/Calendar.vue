<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface CalendarEvent {
  id?: string
  key?: string
  date: Date
  title: string
  type?: string
  color?: string
}

export interface CalendarProps {
  /** v-model binding (Vue idiom) — the currently selected date. */
  modelValue?: Date
  /** Compat alias. */
  value?: Date
  /** Initial date when uncontrolled. */
  defaultValue?: Date
  /** View mode: month grid or year overview. */
  mode?: 'month' | 'year'
  /** Calendar events to highlight in cells. */
  events?: CalendarEvent[]
  /** Maximum number of event-dots shown per cell. */
  maxEvents?: number
  /** First day of the week (0 = Sunday). */
  weekStartDay?: number
  /** Show ISO week numbers in month view. */
  showWeekNumber?: boolean
  /**
   * Legacy alias of `showWeekNumber` — kept for backward compatibility,
   * prefer `showWeekNumber`.
   */
  showWeekNumbers?: boolean
  /** Fullscreen layout (with footer and select-header). */
  fullscreen?: boolean
  /** Disabled-day predicate. */
  disabledDate?: (d: Date) => boolean
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<CalendarProps>(), {
  mode: 'month',
  weekStartDay: 0,
  showWeekNumber: false,
  showWeekNumbers: false,
  fullscreen: true,
  maxEvents: 3,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void
  (e: 'select', value: Date): void
  (e: 'panelChange', value: Date, mode: 'month' | 'year'): void
  (e: 'modeChange', mode: 'month' | 'year'): void
  (e: 'change', value: Date): void
}>()

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const internal = ref<Date>(props.modelValue ?? props.value ?? props.defaultValue ?? new Date())
watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v) internal.value = v
  },
)
const current = computed(() => props.modelValue ?? props.value ?? internal.value)

const internalMode = ref<'month' | 'year'>(props.mode)
watch(
  () => props.mode,
  (m) => {
    internalMode.value = m
  },
)
const currentMode = computed(() => internalMode.value)

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}
function isToday(d: Date) {
  return isSameDay(d, new Date())
}
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

const showWeek = computed(() => props.showWeekNumber || props.showWeekNumbers)

const panelDate = ref<Date>(current.value)
watch(current, (v) => {
  panelDate.value = v
})

const panelYear = computed(() => panelDate.value.getFullYear())
const panelMonth = computed(() => panelDate.value.getMonth())

interface DayCell {
  date: Date
  day: number
  inMonth: boolean
}

const monthGrid = computed<DayCell[][]>(() => {
  const y = panelYear.value
  const m = panelMonth.value
  const daysInMonth = getDaysInMonth(y, m)
  const firstDayRaw = new Date(y, m, 1).getDay()
  const firstDay = (firstDayRaw - props.weekStartDay + 7) % 7
  const prevMonthDays = getDaysInMonth(y, m - 1)
  const cells: DayCell[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(y, m - 1, prevMonthDays - i),
      day: prevMonthDays - i,
      inMonth: false,
    })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(y, m, day), day, inMonth: true })
  }
  const remaining = 42 - cells.length
  for (let day = 1; day <= remaining; day++) {
    cells.push({ date: new Date(y, m + 1, day), day, inMonth: false })
  }
  const weeks: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
})

const yearOptions = computed(() => {
  const arr: number[] = []
  for (let y = panelYear.value - 10; y <= panelYear.value + 10; y++) arr.push(y)
  return arr
})

function eventsForDate(d: Date): CalendarEvent[] {
  return (props.events ?? []).filter((ev) => isSameDay(ev.date, d))
}

function selectDate(d: Date) {
  if (props.disabledDate?.(d)) return
  internal.value = d
  panelDate.value = d
  emit('update:modelValue', d)
  emit('select', d)
  emit('change', d)
}

function selectMonth(monthIdx: number) {
  const d = new Date(panelYear.value, monthIdx, 1)
  panelDate.value = d
  internal.value = d
  emit('update:modelValue', d)
  emit('select', d)
  emit('change', d)
  internalMode.value = 'month'
  emit('modeChange', 'month')
  emit('panelChange', d, 'month')
}

function shiftMonth(delta: number) {
  const d = new Date(panelYear.value, panelMonth.value + delta, 1)
  panelDate.value = d
  emit('panelChange', d, currentMode.value)
}

function shiftYear(delta: number) {
  const d = new Date(panelYear.value + delta, panelMonth.value, 1)
  panelDate.value = d
  emit('panelChange', d, currentMode.value)
}

function setMode(m: 'month' | 'year') {
  internalMode.value = m
  emit('modeChange', m)
  emit('panelChange', panelDate.value, m)
}

function handleToday() {
  const today = new Date()
  selectDate(today)
}

function handleMonthSelectChange(e: Event) {
  const v = Number((e.target as HTMLSelectElement).value)
  const d = new Date(panelYear.value, v, 1)
  panelDate.value = d
  emit('panelChange', d, currentMode.value)
}

function handleYearSelectChange(e: Event) {
  const v = Number((e.target as HTMLSelectElement).value)
  const d = new Date(v, panelMonth.value, 1)
  panelDate.value = d
  emit('panelChange', d, currentMode.value)
}

const dayNames = computed(() => {
  const arr: string[] = []
  for (let i = 0; i < 7; i++) arr.push(DAY_NAMES[(props.weekStartDay + i) % 7])
  return arr
})

const wrapperCls = computed(() =>
  props.unstyled
    ? ''
    : [
        'sg-calendar',
        props.fullscreen ? 'sg-calendar-fullscreen' : 'sg-calendar-mini',
        `sg-calendar-${currentMode.value}`,
      ]
        .filter(Boolean)
        .join(' '),
)

function cellClasses(cell: DayCell) {
  return [
    'sg-calendar-cell',
    cell.inMonth ? '' : 'sg-calendar-cell-outside',
    isToday(cell.date) ? 'sg-calendar-cell-today' : '',
    isSameDay(cell.date, current.value) ? 'sg-calendar-cell-selected' : '',
    props.disabledDate?.(cell.date) ? 'sg-calendar-cell-disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function monthCellClasses(monthIdx: number) {
  const d = new Date(panelYear.value, monthIdx, 1)
  return [
    'sg-calendar-month-cell',
    isSameMonth(d, current.value) ? 'sg-calendar-month-cell-selected' : '',
    isSameMonth(d, new Date()) ? 'sg-calendar-month-cell-current' : '',
  ]
    .filter(Boolean)
    .join(' ')
}
</script>

<template>
  <div :class="wrapperCls">
    <div class="sg-calendar-header">
      <div class="sg-calendar-header-left">
        <button
          type="button"
          class="sg-calendar-nav-btn"
          title="Previous year"
          aria-label="Previous year"
          @click="shiftYear(-1)"
        >
          &laquo;
        </button>
        <button
          v-if="currentMode === 'month'"
          type="button"
          class="sg-calendar-nav-btn"
          title="Previous month"
          aria-label="Previous month"
          @click="shiftMonth(-1)"
        >
          &lsaquo;
        </button>
      </div>

      <div class="sg-calendar-header-center">
        <select
          class="sg-calendar-month-select"
          aria-label="Month"
          :value="panelMonth"
          @change="handleMonthSelectChange"
        >
          <option v-for="(name, i) in MONTH_NAMES" :key="i" :value="i">{{ name }}</option>
        </select>
        <select
          class="sg-calendar-year-select"
          aria-label="Year"
          :value="panelYear"
          @change="handleYearSelectChange"
        >
          <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
        </select>
        <div class="sg-calendar-mode-switch">
          <button
            type="button"
            :class="[
              'sg-calendar-mode-btn',
              currentMode === 'month' ? 'sg-calendar-mode-btn-active' : '',
            ]"
            @click="setMode('month')"
          >
            Month
          </button>
          <button
            type="button"
            :class="[
              'sg-calendar-mode-btn',
              currentMode === 'year' ? 'sg-calendar-mode-btn-active' : '',
            ]"
            @click="setMode('year')"
          >
            Year
          </button>
        </div>
      </div>

      <div class="sg-calendar-header-right">
        <button
          v-if="currentMode === 'month'"
          type="button"
          class="sg-calendar-nav-btn"
          title="Next month"
          aria-label="Next month"
          @click="shiftMonth(1)"
        >
          &rsaquo;
        </button>
        <button
          type="button"
          class="sg-calendar-nav-btn"
          title="Next year"
          aria-label="Next year"
          @click="shiftYear(1)"
        >
          &raquo;
        </button>
      </div>
    </div>

    <div class="sg-calendar-body">
      <table v-if="currentMode === 'month'" class="sg-calendar-table">
        <thead>
          <tr>
            <th v-if="showWeek" class="sg-calendar-week-header">W</th>
            <th v-for="d in dayNames" :key="d" class="sg-calendar-day-header">{{ d }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, wi) in monthGrid" :key="wi" class="sg-calendar-week-row">
            <td v-if="showWeek" class="sg-calendar-week-number">
              {{ getISOWeekNumber(week[0].date) }}
            </td>
            <td
              v-for="cell in week"
              :key="cell.date.toISOString()"
              :class="cellClasses(cell)"
              @click="selectDate(cell.date)"
            >
              <div class="sg-calendar-cell-inner">
                <span class="sg-calendar-cell-date">{{ cell.day }}</span>
                <div v-if="eventsForDate(cell.date).length > 0" class="sg-calendar-cell-events">
                  <span
                    v-for="(ev, i) in eventsForDate(cell.date).slice(0, maxEvents)"
                    :key="ev.key ?? ev.id ?? i"
                    class="sg-calendar-event-dot"
                    :style="{ backgroundColor: ev.color ?? 'var(--sg-primary, #1677ff)' }"
                    :title="ev.title"
                  />
                  <span
                    v-if="eventsForDate(cell.date).length > maxEvents"
                    class="sg-calendar-event-more"
                    >+{{ eventsForDate(cell.date).length - maxEvents }}</span
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="sg-calendar-month-grid">
        <div
          v-for="(name, i) in MONTH_NAMES"
          :key="i"
          :class="monthCellClasses(i)"
          @click="selectMonth(i)"
        >
          <div class="sg-calendar-month-cell-inner">
            <span class="sg-calendar-month-cell-name">{{ name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="fullscreen" class="sg-calendar-footer">
      <button type="button" class="sg-calendar-today-btn" @click="handleToday">Today</button>
    </div>
  </div>
</template>
