<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useSlots, watch } from 'vue'
import { useField } from '../../composables/useField'
import { formContextKey } from '../Form/context'
import type { Rule, ValidationMode } from '@skygraph/core'

export interface FieldProps {
  /** Path of this field in the form store (required). */
  name: string
  /** Visible label text. */
  label?: string
  /** Validation rules. */
  rules?: Rule[]
  /** Warning rules — produce warnings without failing validation. */
  warningRules?: Rule[]
  /** When `true`, prepends a required rule in addition to `rules`. */
  required?: boolean
  /** Re-validates this field when any listed field changes. */
  dependencies?: string[]
  /** Events that trigger validation. */
  trigger?: ValidationMode | ValidationMode[]
  /** Helper text shown below the control when there are no errors / warnings. */
  help?: string
  /** When `true`, value is preserved on unregister. */
  preserve?: boolean
}

const props = withDefaults(defineProps<FieldProps>(), {
  rules: () => [],
  required: false,
})

defineSlots<{
  default(props: {
    value: unknown
    onChange: (v: unknown) => void
    onBlur: () => void
    errors: string[]
    error: string | null
    warnings: string[]
    touched: boolean
    dirty: boolean
    validating: boolean
    status: string | undefined
  }): unknown
  label(props: Record<string, never>): unknown
}>()

const injected = inject(formContextKey, null)
if (!injected) {
  throw new Error('[skygraph/vue] <SgField> must be used inside an <SgForm>')
}
const ctx = injected

const field = useField(ctx.core, ctx.form, props.name)

function registerField() {
  const allRules: Rule[] = [...props.rules]
  if (props.required) {
    allRules.unshift({ required: true })
  }
  ctx.form.register(props.name, {
    rules: allRules,
    warningRules: props.warningRules,
    dependencies: props.dependencies,
    validateOn: Array.isArray(props.trigger) ? props.trigger[0] : props.trigger,
    label: props.label,
    preserve: props.preserve,
  })
}

registerField()

watch(
  () => [props.rules, props.required, props.warningRules, props.dependencies],
  () => {
    registerField()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  ctx.form.unregister(props.name)
})

const hasErrors = computed(() => field.errors.value.length > 0)
const hasWarnings = computed(() => field.warnings.value.length > 0)

const fieldClasses = computed(() =>
  [
    'sg-field',
    ctx.layout === 'horizontal' ? 'sg-field-horizontal' : '',
    hasErrors.value ? 'sg-field-has-error' : '',
    hasWarnings.value && !hasErrors.value ? 'sg-field-has-warning' : '',
    field.status.value ? `sg-field-status-${field.status.value}` : '',
  ]
    .filter(Boolean)
    .join(' '),
)

const inputValue = computed({
  get: () => (field.value.value as string) ?? '',
  set: (v: string) => field.onChange(v),
})

const slots = useSlots()
const hasLabelSlot = computed(() => Boolean(slots.label))
</script>

<template>
  <div :class="fieldClasses" :data-field-name="name">
    <label v-if="label || hasLabelSlot" class="sg-field-label">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="sg-field-required">*</span>
    </label>
    <div class="sg-field-control">
      <slot
        :value="field.value.value"
        :on-change="field.onChange"
        :on-blur="field.onBlur"
        :errors="field.errors.value"
        :error="field.error.value"
        :warnings="field.warnings.value"
        :touched="field.touched.value"
        :dirty="field.dirty.value"
        :validating="field.validating.value"
        :status="field.status.value"
      >
        <input
          class="sg-input"
          type="text"
          :value="inputValue"
          @input="(e) => field.onChange((e.target as HTMLInputElement).value)"
          @blur="field.onBlur"
        />
      </slot>
    </div>
    <div v-if="hasErrors" class="sg-field-error" role="alert">
      <div v-for="(err, i) in field.errors.value" :key="i">{{ err }}</div>
    </div>
    <div v-else-if="hasWarnings" class="sg-field-warning">
      <div v-for="(w, i) in field.warnings.value" :key="i">{{ w }}</div>
    </div>
    <div v-else-if="help" class="sg-field-help">{{ help }}</div>
  </div>
</template>
