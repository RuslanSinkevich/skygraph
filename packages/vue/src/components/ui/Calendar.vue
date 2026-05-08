<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface CalendarEvent {
  id?: string
  date: Date
  title: string
  type?: string
}

export interface CalendarProps {
  /** v-model binding (Vue idiom) — the currently selected date. */
  modelValue?: Date
  /** Compat alias. */
  value?: Date
  /** Initial date when uncontrolled. */
  defaultValue?: Date
  /** Mode: month grid, week, or year overview. */
  mode?: 'month' | 'week' | 'year'
  /** Calendar events to highlight in cells. */
  events?: CalendarEvent[]
  /** First day of the week (0 = Sunday). */
  weekStartDay?: number
  /** Show ISO week numbers in month view. */
  showWeekNumbers?: boolean
  /** Disabled-day predicate. */
  disabledDate?: (d: Date) => boolean
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<CalendarProps>(), {
  mode: 'month',
  weekStartDay: 0,
  showWeekNumbers: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void
  (e: 'select', value: Date): void
  (e: 'panelChange', value: Date, mode: 'month' | 'week' | 'year'): void
}>()

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
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

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function isToday(d: Date) { return isSameDay(d, new Date()) }
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

const viewYear = ref(current.value.getFullYear())
const viewMonth = ref(current.value.getMonth())

watch(current, (v) => {
  viewYear.value = v.getFullYear()
  viewMonth.value = v.getMonth()
})

interface DayCell { date: Date; day: number; inMonth: boolean }

const monthGrid = computed<DayCell[][]>(() => {
  const y = viewYear.value
  const m = viewMonth.value
  const daysInMonth = getDaysInMonth(y, m)
  const firstDayRaw = new Date(y, m, 1).getDay()
  const firstDay = (firstDayRaw - props.weekStartDay + 7) % 7
  const prevMonthDays = getDaysInMonth(y, m - 1)
  const cells: DayCell[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(y, m - 1, prevMonthDays - i), day: prevMonthDays - i, inMonth: false })
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

function eventsForDate(d: Date) {
  return (props.events ?? []).filter((ev) => isSameDay(ev.date, d))
}

function selectDate(d: Date) {
  if (props.disabledDate?.(d)) return
  internal.value = d
  emit('update:modelValue', d)
  emit('select', d)
}

function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
  emit('panelChange', new Date(viewYear.value, viewMonth.value, 1), props.mode)
}
function prevMonth() {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
  emit('panelChange', new Date(viewYear.value, viewMonth.value, 1), props.mode)
}

const dayNames = computed(() => {
  const arr: string[] = []
  for (let i = 0; i < 7; i++) arr.push(DAY_NAMES[(props.weekStartDay + i) % 7])
  return arr
})

const monthLabel = computed(() => `${MONTH_NAMES[viewMonth.value]} ${viewYear.value}`)

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

const wrapperCls = computed(() =>
  props.unstyled ? '' : ['sg-calendar', `sg-calendar-${props.mode}`].filter(Boolean).join(' '),
)
</script>

<template>
  <div :class="wrapperCls">
    <div class="sg-calendar-header">
      <button class="sg-calendar-nav" @click="prevMonth">‹</button>
      <span class="sg-calendar-title">{{ monthLabel }}</span>
      <button class="sg-calendar-nav" @click="nextMonth">›</button>
    </div>
    <table class="sg-calendar-table">
      <thead>
        <tr>
          <th v-for="d in dayNames" :key="d" class="sg-calendar-th">{{ d }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, wi) in monthGrid" :key="wi">
          <td
            v-for="cell in week"
            :key="cell.date.toISOString()"
            :class="cellClasses(cell)"
            @click="selectDate(cell.date)"
          >
            <span class="sg-calendar-cell-day">{{ cell.day }}</span>
            <ul v-if="eventsForDate(cell.date).length > 0" class="sg-calendar-events">
              <li
                v-for="(ev, i) in eventsForDate(cell.date)"
                :key="i"
                class="sg-calendar-event"
              >{{ ev.title }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
