<script setup lang="ts">
/**
 * `SgInputNumber` plugs into `<SgField>` via the scoped slot. The
 * `value` is a `number | null`, so `required` + range validators are
 * the typical guards.
 */
import { SgForm, SgField, SgInputNumber, SgSubmitButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    quantity: 'Quantity',
    pickQty: 'Pick a quantity',
    qtyRange: 'Must be between 1 and 99',
    budget: 'Budget (USD)',
    enterBudget: 'Please enter a budget',
    submit: 'Save',
  },
  ru: {
    quantity: 'Количество',
    pickQty: 'Выберите количество',
    qtyRange: 'Должно быть от 1 до 99',
    budget: 'Бюджет (USD)',
    enterBudget: 'Введите бюджет',
    submit: 'Сохранить',
  },
} as const

const t = useDemoStrings(STRINGS)

function onFinish(values: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log(values)
}
</script>

<template>
  <SgForm
    layout="vertical"
    :default-values="{ quantity: 1, budget: null }"
    style="max-width: 360px"
    @finish="onFinish"
  >
    <SgField
      name="quantity"
      :label="t.quantity"
      :rules="[
        { required: true, message: t.pickQty },
        {
          validator: (v: unknown) =>
            typeof v === 'number' && v >= 1 && v <= 99 ? null : t.qtyRange,
        },
      ]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInputNumber
          :model-value="value as number | null"
          :min="1"
          :max="99"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>

    <SgField
      name="budget"
      :label="t.budget"
      :rules="[{ required: true, message: t.enterBudget }]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInputNumber
          :model-value="value as number | null"
          :min="0"
          :step="50"
          placeholder="0"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>

    <SgSubmitButton>{{ t.submit }}</SgSubmitButton>
  </SgForm>
</template>
