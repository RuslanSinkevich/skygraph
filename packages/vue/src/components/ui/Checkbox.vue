<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'

export interface CheckboxProps {
  /** v-model binding (Vue idiom). */
  modelValue?: boolean
  /** Compat alias — controls the checked state. */
  checked?: boolean
  /** Initial checked state when uncontrolled. */
  defaultChecked?: boolean
  /** Renders the native checkbox in indeterminate state. */
  indeterminate?: boolean
  /** Disables interaction. */
  disabled?: boolean
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', checked: boolean): void
  (e: 'change', checked: boolean): void
}>()

defineSlots<{
  default(props: Record<string, never>): unknown
}>()

const internal = ref<boolean>(props.modelValue ?? props.checked ?? props.defaultChecked ?? false)

watch(
  () => props.modelValue ?? props.checked,
  (v) => {
    if (v !== undefined) internal.value = v
  },
)

const current = computed(() => props.modelValue ?? props.checked ?? internal.value)

const inputRef = ref<HTMLInputElement | null>(null)
watch(
  () => props.indeterminate,
  (v) => {
    if (inputRef.value) inputRef.value.indeterminate = v ?? false
  },
  { immediate: true },
)

function onChange(e: Event) {
  const v = (e.target as HTMLInputElement).checked
  internal.value = v
  emit('update:modelValue', v)
  emit('change', v)
}

const wrapperClass = computed(() =>
  props.unstyled
    ? ''
    : ['sg-checkbox', props.disabled ? 'sg-checkbox-disabled' : ''].filter(Boolean).join(' '),
)

const slots = useSlots()
const hasDefaultSlot = computed(() => slots.default !== undefined)
</script>

<template>
  <label :class="wrapperClass">
    <input
      ref="inputRef"
      type="checkbox"
      :class="unstyled ? '' : 'sg-checkbox-input'"
      :aria-checked="current"
      :checked="current"
      :disabled="disabled"
      @change="onChange"
    />
    <span v-if="hasDefaultSlot" :class="unstyled ? '' : 'sg-checkbox-label'">
      <slot />
    </span>
  </label>
</template>
