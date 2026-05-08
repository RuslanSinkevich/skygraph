<script setup lang="ts">
import { computed, provide } from 'vue'
import { useForm, type UseFormReturn } from '../../composables/useForm'
import { formContextKey } from './context'
import type { FormOptions, ValidationMode } from '@skygraph/core'

export interface FormProps {
  /** Initial field values; passed straight to the underlying engine. */
  defaultValues?: Record<string, unknown>
  /** Layout of label / control. */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** Field/control size for context consumers. */
  size?: 'small' | 'middle' | 'large'
  /** Disables fields that read this value from form context. */
  disabled?: boolean
  /** Label column span (out of 24) for horizontal layout. */
  labelCol?: number
  /** Wrapper column span (out of 24) for horizontal layout. */
  wrapperCol?: number
  /** Pre-existing form instance from `useForm()`. When provided, the
   *  internal one is not created. */
  form?: UseFormReturn
  /** Validation mode forwarded to the engine. */
  validateOn?: ValidationMode
}

const props = withDefaults(defineProps<FormProps>(), {
  layout: 'vertical',
  size: 'middle',
  disabled: false,
})

const emit = defineEmits<{
  (
    e: 'submit',
    payload: { values: Record<string, unknown>; valid: boolean },
  ): void
  (e: 'valuesChange', values: Record<string, unknown>): void
}>()

defineSlots<{
  default(props: { form: UseFormReturn }): unknown
}>()

const formOptions = computed<FormOptions>(() => ({
  defaultValues: props.defaultValues,
  validateOn: props.validateOn,
  onValuesChange: (_changed, all) => {
    emit('valuesChange', all)
  },
}))

const internalForm = props.form ?? useForm(formOptions.value)
const formApi = internalForm

const classes = computed(() =>
  [
    'sg-form',
    `sg-form-${props.layout}`,
    `sg-form-${props.size}`,
    props.disabled ? 'sg-form-disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
)

provide(formContextKey, {
  core: formApi.core,
  form: formApi.form,
  formApi,
  layout: props.layout,
  size: props.size,
  disabled: props.disabled,
  labelCol: props.labelCol,
  wrapperCol: props.wrapperCol,
})

async function handleSubmit(e: Event) {
  e.preventDefault()
  await formApi.submit()
  const result = await formApi.validateFields()
  emit('submit', {
    values: formApi.getFieldsValue(),
    valid: result.valid,
  })
}

defineExpose({
  formApi,
  submit: () => formApi.submit(),
  reset: (values?: Record<string, unknown>) => formApi.reset(values),
  validate: () => formApi.validateFields(),
})
</script>

<template>
  <form :class="classes" novalidate @submit="handleSubmit">
    <slot :form="formApi" />
  </form>
</template>
