<script setup lang="ts">
import { computed } from 'vue'

export interface SubmitButtonProps {
  /** Disables the button. */
  disabled?: boolean
  /** Shows a loading state on the button. */
  loading?: boolean
}

const props = withDefaults(defineProps<SubmitButtonProps>(), {
  disabled: false,
  loading: false,
})

defineSlots<{
  default(props: Record<string, never>): unknown
}>()

const isDisabled = computed(() => props.disabled || props.loading)
const classes = computed(() =>
  [
    'sg-button',
    'sg-button-primary',
    'sg-button-middle',
    props.loading ? 'sg-button-loading' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <button type="submit" :class="classes" :disabled="isDisabled" :aria-busy="loading">
    <span v-if="loading" class="sg-button-spin sg-spin sg-spin-small" aria-hidden="true" />
    <slot>Submit</slot>
  </button>
</template>
