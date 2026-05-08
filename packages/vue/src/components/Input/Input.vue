<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface InputProps {
  /** v-model value. */
  modelValue?: string
  /** Placeholder text when the field is empty. */
  placeholder?: string
  /** Native input type. */
  type?: 'text' | 'email' | 'password' | 'number'
  /** Size token. */
  size?: 'small' | 'middle' | 'large'
  /** Disables editing. */
  disabled?: boolean
  /** Marks the field as read-only. */
  readOnly?: boolean
  /** Optional input id forwarded to the underlying `<input>`. */
  id?: string
  /** Whether to render a clear button. */
  allowClear?: boolean
  /** Validation status badge. */
  status?: 'error' | 'warning'
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'middle',
  disabled: false,
  readOnly: false,
  allowClear: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', evt: FocusEvent): void
  (e: 'blur', evt: FocusEvent): void
  (e: 'clear'): void
}>()

defineSlots<{
  prefix(props: Record<string, never>): unknown
  suffix(props: Record<string, never>): unknown
}>()

const wrapperClasses = computed(() =>
  [
    'sg-input-wrapper',
    `sg-input-wrapper-${props.size}`,
    props.readOnly ? 'sg-input-wrapper-readonly' : '',
    props.disabled ? 'sg-input-wrapper-disabled' : '',
    props.status ? `sg-input-wrapper-status-${props.status}` : '',
  ]
    .filter(Boolean)
    .join(' '),
)

const inputClasses = computed(() =>
  [
    'sg-input',
    `sg-input-${props.size}`,
    props.readOnly ? 'sg-input-readonly' : '',
    props.status ? `sg-input-status-${props.status}` : '',
  ]
    .filter(Boolean)
    .join(' '),
)

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  emit('change', target.value)
}

function onFocus(e: FocusEvent) {
  emit('focus', e)
}

function onBlur(e: FocusEvent) {
  emit('blur', e)
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
}

const showClear = computed(
  () => props.allowClear && !props.disabled && !props.readOnly && !!props.modelValue,
)

const slots = useSlots()
const hasPrefix = computed(() => Boolean(slots.prefix))
const hasSuffix = computed(() => Boolean(slots.suffix))
</script>

<template>
  <span :class="wrapperClasses">
    <span v-if="hasPrefix" class="sg-input-prefix">
      <slot name="prefix" />
    </span>
    <input
      :id="id"
      :type="type"
      :class="inputClasses"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readOnly"
      :aria-readonly="readOnly || undefined"
      :aria-invalid="status === 'error' || undefined"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <button
      v-if="showClear"
      type="button"
      class="sg-input-clear"
      aria-label="Clear"
      @click="clear"
    >
      ×
    </button>
    <span v-if="hasSuffix" class="sg-input-suffix">
      <slot name="suffix" />
    </span>
  </span>
</template>
