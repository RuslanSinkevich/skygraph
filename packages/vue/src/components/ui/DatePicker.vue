<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface DatePickerProps {
  /** v-model binding (Vue idiom). */
  modelValue?: Date | null
  /** Compat alias for `modelValue`. */
  value?: Date | null
  /** Initial value when uncontrolled. */
  defaultValue?: Date
  /** Placeholder text. */
  placeholder?: string
  /** Display format (YYYY/MM/DD/HH/mm/ss). */
  format?: string
  /** Picker level. */
  picker?: 'date' | 'month' | 'year'
  /** Show time-of-day picker columns. */
  showTime?: boolean
  /** Show "Today" footer button. */
  showToday?: boolean
  /** Show clear button when value exists. */
  allowClear?: boolean
  /** Disabled day predicate. */
  disabledDate?: (d: Date) => boolean
  /** Controlled visibility of the dropdown. */
  open?: boolean
  /** Disables interaction. */
  disabled?: boolean
  /** Size token. */
  size?: 'small' | 'middle' | 'large'
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: 'Select date',
  picker: 'date',
  showTime: false,
  showToday: true,
  allowClear: true,
  size: 'middle',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void
  (e: 'change', value: Date | null, dateString: string): void
  (e: 'openChange', open: boolean): void
}>()

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function pad(n: number) { return String(n).padStart(2, '0') }
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function toValidDate(input: unknown): Date | null {
  if (input == null || input === '') return null
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input
  if (typeof input === 'string' || typeof input === 'number') {
    const d = new Date(input)
    return isNaN(d.getTime()) ? null : d
  }
  return null
}
function formatDate(d: Date | null, fmt: string): string {
  if (!d) return ''
  return fmt
    .replace('YYYY', String(d.getFullYear()))
    .replace('MM', pad(d.getMonth() + 1))
    .replace('DD', pad(d.getDate()))
    .replace('HH', pad(d.getHours()))
    .replace('mm', pad(d.getMinutes()))
    .replace('ss', pad(d.getSeconds()))
}

const fmt = computed(() => props.format ?? (
  props.showTime ? 'YYYY-MM-DD HH:mm:ss'
  : props.picker === 'month' ? 'YYYY-MM'
  : props.picker === 'year' ? 'YYYY'
  : 'YYYY-MM-DD'
))

const initial = props.modelValue !== undefined ? toValidDate(props.modelValue) : (props.value !== undefined ? toValidDate(props.value) : toValidDate(props.defaultValue))
const internal = ref<Date | null>(initial)
watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v !== undefined) internal.value = toValidDate(v)
  },
)
const current = computed<Date | null>(() => {
  const ext = props.modelValue !== undefined ? props.modelValue : props.value
  if (ext !== undefined) return toValidDate(ext)
  return internal.value
})

const internalOpen = ref(false)
const isOpen = computed(() => props.open ?? internalOpen.value)

const viewYear = ref((current.value ?? new Date()).getFullYear())
const viewMonth = ref((current.value ?? new Date()).getMonth())

watch(current, (v) => {
  if (v) {
    viewYear.value = v.getFullYear()
    viewMonth.value = v.getMonth()
  }
})

const wrapperRef = ref<HTMLDivElement | null>(null)

function setOpen(v: boolean) {
  internalOpen.value = v
  emit('openChange', v)
}

function commit(d: Date | null) {
  internal.value = d
  emit('update:modelValue', d)
  emit('change', d, d ? formatDate(d, fmt.value) : '')
}

function handleSelect(d: Date) {
  commit(d)
  setOpen(false)
}

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  commit(null)
}

function handleToday() {
  commit(new Date())
  setOpen(false)
}

function openDropdown() {
  if (props.disabled) return
  setOpen(true)
}

function handleOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    setOpen(false)
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutside))

interface DayCell { date: Date; day: number; inMonth: boolean }

const weeks = computed<DayCell[][]>(() => {
  const y = viewYear.value
  const m = viewMonth.value
  const daysInMonth = getDaysInMonth(y, m)
  const firstDay = new Date(y, m, 1).getDay()
  const prevDays = getDaysInMonth(y, m - 1)
  const cells: DayCell[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(y, m - 1, prevDays - i), day: prevDays - i, inMonth: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(y, m, d), day: d, inMonth: true })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(y, m + 1, d), day: d, inMonth: false })
  }
  const out: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7))
  return out
})

const monthLabel = computed(() => `${MONTH_NAMES[viewMonth.value]} ${viewYear.value}`)
const displayText = computed(() => current.value ? formatDate(current.value, fmt.value) : '')

function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}
function prevMonth() {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}

function cellClass(cell: DayCell) {
  const selected = current.value ? isSameDay(cell.date, current.value) : false
  const today = isSameDay(cell.date, new Date())
  const disabled = props.disabledDate?.(cell.date) ?? false
  return [
    'sg-dp-cell',
    !cell.inMonth ? 'sg-dp-cell-outside' : '',
    selected ? 'sg-dp-cell-selected' : '',
    today ? 'sg-dp-cell-today' : '',
    disabled ? 'sg-dp-cell-disabled' : '',
  ].filter(Boolean).join(' ')
}

const wrapperCls = computed(() =>
  props.unstyled
    ? ''
    : [
        'sg-datepicker',
        `sg-datepicker-${props.size}`,
        isOpen.value ? 'sg-datepicker-open' : '',
        props.disabled ? 'sg-datepicker-disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
)
</script>

<template>
  <div ref="wrapperRef" :class="wrapperCls">
    <div
      class="sg-datepicker-input"
      role="combobox"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      :aria-disabled="disabled"
      @click="openDropdown"
    >
      <span :class="displayText ? 'sg-datepicker-input-text' : 'sg-datepicker-placeholder'">
        {{ displayText || placeholder }}
      </span>
      <span class="sg-datepicker-suffix">
        <span v-if="allowClear && current" class="sg-datepicker-clear" @click="handleClear">×</span>
      </span>
    </div>
    <div v-if="isOpen" class="sg-dp-dropdown">
      <div class="sg-dp-panel">
        <div class="sg-dp-panel-header">
          <button class="sg-dp-nav-btn" @click="viewYear--">«</button>
          <button class="sg-dp-nav-btn" @click="prevMonth">‹</button>
          <span class="sg-dp-panel-title">{{ monthLabel }}</span>
          <button class="sg-dp-nav-btn" @click="nextMonth">›</button>
          <button class="sg-dp-nav-btn" @click="viewYear++">»</button>
        </div>
        <table class="sg-dp-table">
          <thead>
            <tr>
              <th v-for="d in DAY_NAMES" :key="d" class="sg-dp-th">{{ d }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, wi) in weeks" :key="wi">
              <td
                v-for="cell in week"
                :key="cell.date.toISOString()"
                :class="cellClass(cell)"
                @click="!props.disabledDate?.(cell.date) && handleSelect(cell.date)"
              >
                <span class="sg-dp-cell-inner">{{ cell.day }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="showToday" class="sg-dp-footer">
          <button class="sg-dp-footer-btn sg-dp-today-btn" @click="handleToday">Today</button>
        </div>
      </div>
    </div>
  </div>
</template>
