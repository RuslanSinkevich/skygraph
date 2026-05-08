<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface RadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface RadioGroupProps {
  /** v-model binding (Vue idiom). */
  modelValue?: string | number
  /** Compat alias for `modelValue`. */
  value?: string | number
  /** Initial value when uncontrolled. */
  defaultValue?: string | number
  /** Options rendered as radio controls. */
  options: RadioOption[]
  /** Stack direction. */
  direction?: 'horizontal' | 'vertical'
  /** Disables all options. */
  disabled?: boolean
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'horizontal',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const internal = ref<string | number | undefined>(
  props.modelValue ?? props.value ?? props.defaultValue,
)

watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v !== undefined) internal.value = v
  },
)

const current = computed(() => props.modelValue ?? props.value ?? internal.value)

function select(opt: RadioOption) {
  if (opt.disabled || props.disabled) return
  internal.value = opt.value
  emit('update:modelValue', opt.value)
  emit('change', opt.value)
}

const groupClass = computed(() =>
  props.unstyled
    ? ''
    : ['sg-radio-group', `sg-radio-group-${props.direction}`].filter(Boolean).join(' '),
)
</script>

<template>
  <div :class="groupClass" role="radiogroup">
    <label
      v-for="opt in options"
      :key="opt.value"
      :class="
        unstyled
          ? ''
          : [
              'sg-radio',
              current === opt.value ? 'sg-radio-checked' : '',
              opt.disabled || disabled ? 'sg-radio-disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')
      "
    >
      <input
        type="radio"
        role="radio"
        :class="unstyled ? '' : 'sg-radio-input'"
        :aria-checked="current === opt.value"
        :checked="current === opt.value"
        :disabled="opt.disabled || disabled"
        @change="select(opt)"
      />
      <span :class="unstyled ? '' : 'sg-radio-label'">{{ opt.label }}</span>
    </label>
  </div>
</template>
