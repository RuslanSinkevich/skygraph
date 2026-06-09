<script setup lang="ts">
/**
 * Shared floating-label wrapper used by input-bearing components
 * (ColorPicker, Select, DatePicker, …).
 *
 * Mirrors React `examples/demo/src/demos/_shared/FloatingField.tsx`.
 *
 * The label sits over the control and glides to the top-left when the field
 * gains focus or already holds a value. Focus is tracked from the bubbling
 * `focusin` / `focusout` events, so it works regardless of the inner DOM
 * (real `<input>` vs. a `<div role="combobox">` trigger). `filled` is supplied
 * by the demo from its controlled value.
 */
import { ref } from 'vue'

defineProps<{
  label: string
  filled?: boolean
}>()

const focused = ref(false)
</script>

<template>
  <div
    class="demo-ff"
    :data-floated="focused || filled ? 'true' : undefined"
    @focusin="focused = true"
    @focusout="focused = false"
  >
    <slot />
    <label class="demo-ff-label">{{ label }}</label>
  </div>
</template>

<style>
.demo-ff {
  position: relative;
  width: 100%;
  --demo-ff-surface: var(--sg-color-bg-container, var(--sg-color-bg, #ffffff));
}
.demo-ff > .sg-input,
.demo-ff > .sg-input-number,
.demo-ff > .sg-select,
.demo-ff > .sg-timepicker,
.demo-ff > .sg-datepicker,
.demo-ff > .sg-colorpicker-wrapper,
.demo-ff > .sg-cascader,
.demo-ff > .sg-tree-select {
  width: 100%;
}
.demo-ff-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  line-height: 1;
  color: var(--sg-color-text-secondary);
  pointer-events: none;
  padding: 0 4px;
  background: transparent;
  transition:
    top 180ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
    color 180ms ease;
  white-space: nowrap;
  z-index: 2;
}
.demo-ff[data-floated='true'] .demo-ff-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
  background: var(--demo-ff-surface);
}
</style>
