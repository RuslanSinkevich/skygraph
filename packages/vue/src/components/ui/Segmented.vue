<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { useConfigWithDefaults } from './ConfigProvider.vue'
import type { SizeType } from '../../types'

export type SegmentedOption =
  | string
  | { label: string; value: string; disabled?: boolean }

export interface SegmentedProps {
  options: SegmentedOption[]
  /** Controlled selected value. */
  value?: string
  /** Initial value when uncontrolled. */
  defaultValue?: string
  /** Component size variant. */
  size?: SizeType
  /** Disables the control. */
  disabled?: boolean
  /** Stretches the control to full width. */
  block?: boolean
  /** Strips built-in styles when true. */
  unstyled?: boolean
}

const props = defineProps({
  options: {
    type: Array as PropType<SegmentedOption[]>,
    required: true,
  },
  value: { type: String, default: undefined },
  defaultValue: { type: String, default: undefined },
  size: { type: String as PropType<SizeType>, default: undefined },
  disabled: { type: Boolean, default: undefined },
  block: { type: Boolean, default: false },
  unstyled: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const { resolvedSize, resolvedDisabled } = useConfigWithDefaults(
  { size: undefined, disabled: undefined },
  {},
)
const realSize = computed<SizeType>(() => props.size ?? resolvedSize.value)
const realDisabled = computed(() => props.disabled ?? resolvedDisabled.value)

function normalize(opt: SegmentedOption) {
  if (typeof opt === 'string') return { label: opt, value: opt }
  return opt
}

const normalized = computed(() => props.options.map(normalize))

const internal = ref(
  props.value ?? props.defaultValue ?? normalized.value[0]?.value ?? '',
)
const currentValue = computed(() => props.value ?? internal.value)

function select(val: string, disabled?: boolean) {
  if (realDisabled.value || disabled) return
  internal.value = val
  emit('change', val)
}

const rootClasses = computed(() =>
  [
    'sg-segmented',
    `sg-segmented-${realSize.value}`,
    props.block ? 'sg-segmented-block' : '',
    realDisabled.value ? 'sg-segmented-disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <div v-if="unstyled" role="radiogroup">
    <label v-for="opt in normalized" :key="opt.value">
      <input
        type="radio"
        name="sg-segmented"
        :value="opt.value"
        :checked="opt.value === currentValue"
        :disabled="realDisabled || (opt as any).disabled"
        @change="select(opt.value, (opt as any).disabled)"
      />
      {{ opt.label }}
    </label>
  </div>
  <div v-else :class="rootClasses" role="radiogroup">
    <div
      v-for="opt in normalized"
      :key="opt.value"
      role="radio"
      :aria-checked="opt.value === currentValue"
      :class="[
        'sg-segmented-item',
        opt.value === currentValue ? 'sg-segmented-item-selected' : '',
        (opt as any).disabled ? 'sg-segmented-item-disabled' : '',
      ]"
      @click="select(opt.value, (opt as any).disabled)"
    >
      <span class="sg-segmented-item-label">{{ opt.label }}</span>
    </div>
  </div>
</template>
