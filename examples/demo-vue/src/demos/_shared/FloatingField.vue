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
import { onBeforeUnmount, ref } from 'vue'

defineProps<{
  label: string
  filled?: boolean
}>()

const focused = ref(false)
// Picking an option (Select / AutoComplete) blurs the trigger one tick before
// the controlled `filled` prop flips to true. Clearing `focused` synchronously
// would defloat the label for that single frame, then refloat it once `filled`
// arrives — the visible "jump". Deferring the blur to the next frame lets
// `filled` settle first. A refocus in between cancels the pending blur.
let blurFrame: number | null = null

function cancelPendingBlur() {
  if (blurFrame !== null) {
    window.cancelAnimationFrame(blurFrame)
    blurFrame = null
  }
}

function handleFocusIn() {
  cancelPendingBlur()
  focused.value = true
}

function handleFocusOut() {
  cancelPendingBlur()
  blurFrame = window.requestAnimationFrame(() => {
    blurFrame = null
    focused.value = false
  })
}

onBeforeUnmount(cancelPendingBlur)
</script>

<template>
  <div
    class="demo-ff"
    :data-floated="focused || filled ? 'true' : undefined"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
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
.demo-ff > .sg-input-number .sg-input-number-input {
  text-align: left;
  padding-left: 12px;
}
.demo-ff > .sg-select .sg-select-selector,
.demo-ff > .sg-timepicker .sg-timepicker-input {
  padding-left: 14px;
}
.demo-ff > .sg-timepicker .sg-timepicker-input {
  width: 100%;
}
.demo-ff > .sg-timepicker .sg-timepicker-placeholder,
.demo-ff > .sg-timepicker .sg-timepicker-value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* ColorPicker trigger is intrinsically tiny (swatch + text). Stretch it to
 * fill the field so the floating label captions the whole box instead of
 * overhanging a small swatch. */
.demo-ff > .sg-colorpicker-wrapper .sg-colorpicker-trigger {
  width: 100%;
  justify-content: flex-start;
}
.demo-ff-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
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
  /* Never let a long label spill past the field — clamp + ellipsis. */
  max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
}
.demo-ff[data-floated='true'] .demo-ff-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  color: var(--sg-color-primary);
  background: var(--demo-ff-surface);
}
</style>
