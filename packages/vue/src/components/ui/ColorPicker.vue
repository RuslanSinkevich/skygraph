<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface ColorPickerProps {
  /** v-model binding (Vue idiom). */
  modelValue?: string
  /** Compat alias for `modelValue`. */
  value?: string
  /** Initial value when uncontrolled. */
  defaultValue?: string
  /** Optional preset swatches grouped by label. */
  presets?: Array<{ label: string; colors: string[] }>
  /** When true, show formatted text beside the swatch. */
  showText?: boolean
  /** Output format. */
  format?: 'hex' | 'rgb'
  /** Trigger interaction. */
  trigger?: 'click' | 'hover'
  /** Controlled open state of the picker panel. */
  open?: boolean
  /** Disables interaction. */
  disabled?: boolean
  /** Size token. */
  size?: 'small' | 'middle' | 'large'
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  format: 'hex',
  trigger: 'click',
  size: 'middle',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'openChange', open: boolean): void
}>()

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2]
      : clean
  const num = parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
}

function formatColor(hex: string, fmt: 'hex' | 'rgb'): string {
  if (fmt === 'rgb') {
    const [r, g, b] = hexToRgb(hex)
    return `rgb(${r}, ${g}, ${b})`
  }
  return hex
}

function parseColor(input: string): string | null {
  const trimmed = input.trim()
  if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(trimmed)) {
    const clean = trimmed.replace('#', '')
    const full =
      clean.length === 3
        ? '#' + clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2]
        : trimmed
    return full.toLowerCase()
  }
  const m = trimmed.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i)
  if (m) {
    const r = Math.min(255, parseInt(m[1]))
    const g = Math.min(255, parseInt(m[2]))
    const b = Math.min(255, parseInt(m[3]))
    return rgbToHex(r, g, b)
  }
  return null
}

const DEFAULT_COLOR = '#1677ff'

const internal = ref<string>(
  (props.modelValue ?? props.value ?? props.defaultValue ?? DEFAULT_COLOR).toLowerCase(),
)

watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v !== undefined) internal.value = v.toLowerCase()
  },
)

const current = computed(() => props.modelValue ?? props.value ?? internal.value)
const internalOpen = ref(false)
const isOpen = computed(() => props.open ?? internalOpen.value)

const wrapperRef = ref<HTMLDivElement | null>(null)
const textInput = ref(formatColor(current.value, props.format))

watch(current, (v) => {
  textInput.value = formatColor(v, props.format)
})

function setOpenState(v: boolean) {
  internalOpen.value = v
  emit('openChange', v)
}

function emitChange(hex: string) {
  internal.value = hex
  textInput.value = formatColor(hex, props.format)
  const out = formatColor(hex, props.format)
  emit('update:modelValue', out)
  emit('change', out)
}

function handleTriggerClick() {
  if (props.disabled || props.trigger !== 'click') return
  setOpenState(!isOpen.value)
}

function handleTextInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  textInput.value = val
  const parsed = parseColor(val)
  if (parsed) emitChange(parsed)
}

function handlePresetClick(c: string) {
  const parsed = parseColor(c)
  if (parsed) emitChange(parsed)
}

function handleOutside(e: MouseEvent) {
  if (!isOpen.value) return
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    setOpenState(false)
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutside))

const wrapperClass = computed(() =>
  props.unstyled
    ? ''
    : ['sg-colorpicker-wrapper', `sg-colorpicker-${props.size}`, props.disabled ? 'sg-colorpicker-disabled' : '']
        .filter(Boolean)
        .join(' '),
)
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClass">
    <button
      type="button"
      class="sg-colorpicker-trigger"
      :disabled="disabled"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      aria-label="Pick color"
      @click="handleTriggerClick"
    >
      <span class="sg-colorpicker-swatch" :style="{ background: current }" />
      <span v-if="showText" class="sg-colorpicker-text">{{ formatColor(current, format) }}</span>
    </button>
    <div v-if="isOpen" class="sg-colorpicker-dropdown">
      <div class="sg-colorpicker-input-row">
        <span class="sg-colorpicker-preview" :style="{ background: current }" />
        <input
          class="sg-colorpicker-input"
          :value="textInput"
          spellcheck="false"
          @input="handleTextInput"
        />
      </div>
      <div v-for="group in (presets ?? [])" :key="group.label" class="sg-colorpicker-preset-group">
        <div class="sg-colorpicker-preset-label">{{ group.label }}</div>
        <div class="sg-colorpicker-preset-grid">
          <button
            v-for="c in group.colors"
            :key="c"
            type="button"
            class="sg-colorpicker-preset-color"
            :style="{ background: c }"
            :title="c"
            @click="handlePresetClick(c)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
