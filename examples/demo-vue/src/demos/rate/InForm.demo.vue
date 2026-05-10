<script setup lang="ts">
/**
 * `SgRate` plugs into `<SgField>` like any controlled control. Add a
 * validator for "not zero" if a rating is required.
 */
import { SgForm, SgField, SgRate, SgSubmitButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'How was it?',
    required: 'Please leave a rating',
    submit: 'Submit',
  },
  ru: {
    label: 'Как вам?',
    required: 'Поставьте оценку',
    submit: 'Отправить',
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
    :default-values="{ rating: 0 }"
    style="max-width: 380px"
    @finish="onFinish"
  >
    <SgField
      name="rating"
      :label="t.label"
      :rules="[
        {
          validator: (v: unknown) =>
            typeof v === 'number' && v > 0 ? null : t.required,
        },
      ]"
    >
      <template #default="{ value, onChange }">
        <SgRate
          :model-value="(value as number) ?? 0"
          allow-half
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgSubmitButton>{{ t.submit }}</SgSubmitButton>
  </SgForm>
</template>
