<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface TimePickerProps {
  /** v-model binding (Vue idiom). */
  modelValue?: string
  /** Compat alias for `modelValue`. */
  value?: string
  /** Initial value when uncontrolled. */
  defaultValue?: string
  /** Placeholder text. */
  placeholder?: string
  /** Display format. */
  format?: string
  /** Use 12-hour clock with AM/PM column. */
  use12Hours?: boolean
  /** Step between hour values. */
  hourStep?: number
  /** Step between minute values. */
  minuteStep?: number
  /** Step between second values. */
  secondStep?: number
  /** Show seconds column. */
  showSecond?: boolean
  /** Show "Now" button. */
  showNow?: boolean
  /** Show clear control. */
  allowClear?: boolean
  /** Controlled visibility of the dropdown. */
  open?: boolean
  /** Disables interaction. */
  disabled?: boolean
  /** Shows a loading spinner and disables interaction. */
  loading?: boolean
  /** Size token. */
  size?: 'small' | 'middle' | 'large'
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  placeholder: 'Select time',
  use12Hours: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showSecond: true,
  showNow: true,
  allowClear: true,
  size: 'middle',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'openChange', open: boolean): void
}>()

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatTime(h: number, m: number, s: number, fmt: string, use12: boolean): string {
  if (use12) {
    const period = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return fmt
      .replace('hh', pad(h12))
      .replace('mm', pad(m))
      .replace('ss', pad(s))
      .replace('A', period)
  }
  return fmt.replace('HH', pad(h)).replace('mm', pad(m)).replace('ss', pad(s))
}

function parseTime(str: string): { h: number; m: number; s: number } | null {
  if (!str) return null
  const upper = str.toUpperCase()
  const isPM = upper.includes('PM')
  const cleaned = upper.replace(/(AM|PM)/g, '').trim()
  const parts = cleaned.split(':').map(Number)
  if (parts.some(isNaN)) return null
  let h = parts[0] ?? 0
  const m = parts[1] ?? 0
  const s = parts[2] ?? 0
  if (isPM && h < 12) h += 12
  if (!isPM && upper.includes('AM') && h === 12) h = 0
  return { h, m, s }
}

const fmt = computed(
  () => props.format ?? (props.use12Hours ? 'hh:mm:ss A' : props.showSecond ? 'HH:mm:ss' : 'HH:mm'),
)
const internal = ref<string>(props.modelValue ?? props.value ?? props.defaultValue ?? '')
watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v !== undefined) internal.value = v
  },
)
const current = computed(() => props.modelValue ?? props.value ?? internal.value)

const internalOpen = ref(false)
const isOpen = computed(() => props.open ?? internalOpen.value)

const parsed = computed(() => parseTime(current.value))
const hour = ref(parsed.value?.h ?? 0)
const minute = ref(parsed.value?.m ?? 0)
const second = ref(parsed.value?.s ?? 0)

watch(current, (v) => {
  const p = parseTime(v)
  if (p) {
    hour.value = p.h
    minute.value = p.m
    second.value = p.s
  }
})

const wrapperRef = ref<HTMLDivElement | null>(null)

const hours = computed(() => {
  const arr: number[] = []
  if (props.use12Hours) {
    for (let i = 1; i <= 12; i += props.hourStep) arr.push(i)
  } else {
    for (let i = 0; i < 24; i += props.hourStep) arr.push(i)
  }
  return arr
})
const minutes = computed(() => {
  const arr: number[] = []
  for (let i = 0; i < 60; i += props.minuteStep) arr.push(i)
  return arr
})
const seconds = computed(() => {
  const arr: number[] = []
  for (let i = 0; i < 60; i += props.secondStep) arr.push(i)
  return arr
})

const displayHour = computed(() => (props.use12Hours ? hour.value % 12 || 12 : hour.value))

function setOpen(v: boolean) {
  internalOpen.value = v
  emit('openChange', v)
}

function commit(h: number, m: number, s: number) {
  const str = formatTime(h, m, s, fmt.value, props.use12Hours)
  internal.value = str
  emit('update:modelValue', str)
  emit('change', str)
}

function setH(h: number) {
  const real = props.use12Hours
    ? h === 12
      ? hour.value >= 12
        ? 12
        : 0
      : hour.value >= 12
        ? h + 12
        : h
    : h
  hour.value = real
  commit(real, minute.value, second.value)
}
function setM(m: number) {
  minute.value = m
  commit(hour.value, m, second.value)
}
function setS(s: number) {
  second.value = s
  commit(hour.value, minute.value, s)
}

function handleNow() {
  const now = new Date()
  hour.value = now.getHours()
  minute.value = now.getMinutes()
  second.value = now.getSeconds()
  commit(hour.value, minute.value, second.value)
  setOpen(false)
}

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  internal.value = ''
  emit('update:modelValue', '')
  emit('change', '')
}

function openDropdown() {
  if (props.disabled || props.loading) return
  setOpen(true)
}

function handleOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    setOpen(false)
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutside))

const wrapperCls = computed(() =>
  props.unstyled
    ? ''
    : [
        'sg-timepicker',
        `sg-timepicker-${props.size}`,
        isOpen.value ? 'sg-timepicker-open' : '',
        props.disabled || props.loading ? 'sg-timepicker-disabled' : '',
        props.loading ? 'sg-timepicker-loading' : '',
      ]
        .filter(Boolean)
        .join(' '),
)

function setAm() {
  if (hour.value >= 12) {
    const h = hour.value - 12
    hour.value = h
    commit(h, minute.value, second.value)
  }
}
function setPm() {
  if (hour.value < 12) {
    const h = hour.value + 12
    hour.value = h
    commit(h, minute.value, second.value)
  }
}
</script>

<template>
  <div ref="wrapperRef" :class="wrapperCls">
    <div
      class="sg-timepicker-input"
      role="combobox"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      :aria-disabled="disabled"
      @click="openDropdown"
    >
      <span :class="current ? '' : 'sg-timepicker-placeholder'">{{ current || placeholder }}</span>
      <span class="sg-timepicker-suffix">
        <span v-if="loading && !unstyled" class="sg-spin sg-spin-small" aria-hidden="true" />
        <span v-else-if="allowClear && current" class="sg-timepicker-clear" @click="handleClear"
          >×</span
        >
      </span>
    </div>
    <div v-if="isOpen" class="sg-tp-dropdown">
      <div class="sg-tp-columns">
        <div class="sg-tp-col">
          <div
            v-for="n in hours"
            :key="n"
            :data-active="n === displayHour"
            :class="['sg-tp-cell', n === displayHour ? 'sg-tp-cell-active' : '']"
            @click="setH(n)"
          >
            {{ pad(n) }}
          </div>
        </div>
        <div class="sg-tp-col">
          <div
            v-for="n in minutes"
            :key="n"
            :data-active="n === minute"
            :class="['sg-tp-cell', n === minute ? 'sg-tp-cell-active' : '']"
            @click="setM(n)"
          >
            {{ pad(n) }}
          </div>
        </div>
        <div v-if="showSecond" class="sg-tp-col">
          <div
            v-for="n in seconds"
            :key="n"
            :data-active="n === second"
            :class="['sg-tp-cell', n === second ? 'sg-tp-cell-active' : '']"
            @click="setS(n)"
          >
            {{ pad(n) }}
          </div>
        </div>
        <div v-if="use12Hours" class="sg-tp-col sg-tp-col-ampm">
          <div :class="['sg-tp-cell', hour < 12 ? 'sg-tp-cell-active' : '']" @click="setAm">AM</div>
          <div :class="['sg-tp-cell', hour >= 12 ? 'sg-tp-cell-active' : '']" @click="setPm">
            PM
          </div>
        </div>
      </div>
      <div v-if="showNow" class="sg-tp-footer">
        <button class="sg-tp-now-btn" @click="handleNow">Now</button>
      </div>
    </div>
  </div>
</template>
