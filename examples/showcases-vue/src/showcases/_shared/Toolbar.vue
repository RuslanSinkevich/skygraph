<script setup lang="ts">
import { SgInput } from '@skygraph/vue'

/**
 * Shared toolbar wrapper. Parity with the React `Toolbar` showcase helper.
 * Slots:
 *   - `filters`  left-side controls after search (filters / segmented / dropdowns)
 *   - `actions`  right-side actions (primary buttons, exports)
 */
export interface ToolbarProps {
  searchValue?: string
  searchPlaceholder?: string
  searchWidth?: number
  hideSearch?: boolean
  className?: string
}

const props = withDefaults(defineProps<ToolbarProps>(), {
  searchValue: '',
  searchPlaceholder: 'Search...',
  searchWidth: 240,
  hideSearch: false,
  className: '',
})

const emit = defineEmits<{
  'update:searchValue': [value: string]
}>()

function onInput(v: string) {
  emit('update:searchValue', v)
}
</script>

<template>
  <div :class="['sc-toolbar', props.className].filter(Boolean).join(' ')">
    <SgInput
      v-if="!hideSearch"
      :value="searchValue"
      :placeholder="searchPlaceholder"
      :style="{ width: `${searchWidth}px` }"
      @update:model-value="onInput"
    />
    <slot name="filters" />
    <div class="sc-toolbar-spacer" />
    <slot name="actions" />
  </div>
</template>
