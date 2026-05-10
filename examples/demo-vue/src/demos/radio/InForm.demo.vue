<script setup lang="ts">
/**
 * Wrap `SgRadio` in `<SgField>` to bind it to a named path. Required
 * validation makes the group an explicit choice (no silent default).
 */
import { SgForm, SgField, SgRadio, SgSubmitButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'Choose a plan',
    required: 'Pick a plan to continue',
    hobby: 'Hobby — free, 1 user',
    pro: 'Pro — $12/mo per user',
    team: 'Team — $30/mo per user',
    enterprise: 'Enterprise — contact us',
    submit: 'Continue',
  },
  ru: {
    label: 'Выберите план',
    required: 'Выберите план, чтобы продолжить',
    hobby: 'Hobby — бесплатно, 1 пользователь',
    pro: 'Pro — $12/мес за пользователя',
    team: 'Team — $30/мес за пользователя',
    enterprise: 'Enterprise — свяжитесь с нами',
    submit: 'Продолжить',
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
    :default-values="{ plan: '' }"
    style="max-width: 420px"
    @finish="onFinish"
  >
    <SgField
      name="plan"
      :label="t.label"
      :rules="[{ required: true, message: t.required }]"
    >
      <template #default="{ value, onChange }">
        <SgRadio
          :model-value="value as string | number"
          direction="vertical"
          :options="[
            { label: t.hobby, value: 'hobby' },
            { label: t.pro, value: 'pro' },
            { label: t.team, value: 'team' },
            { label: t.enterprise, value: 'enterprise' },
          ]"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgSubmitButton>{{ t.submit }}</SgSubmitButton>
  </SgForm>
</template>
