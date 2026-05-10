<script setup lang="ts">
/**
 * Bind a Switch to a form field. `<SgField>`'s scoped slot exposes
 * `value` (the boolean) and `onChange` — wire them to `:model-value`
 * and `@update:model-value` on `SgSwitch`.
 */
import { SgForm, SgField, SgSwitch, SgSubmitButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    emailNotifications: 'Email notifications',
    marketing: 'Marketing updates',
    save: 'Save',
  },
  ru: {
    emailNotifications: 'Почтовые уведомления',
    marketing: 'Маркетинговые рассылки',
    save: 'Сохранить',
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
    :default-values="{ notifications: true, marketing: false }"
    style="max-width: 380px"
    @finish="onFinish"
  >
    <SgField name="notifications" :label="t.emailNotifications">
      <template #default="{ value, onChange }">
        <SgSwitch :model-value="value as boolean" @update:model-value="onChange" />
      </template>
    </SgField>
    <SgField name="marketing" :label="t.marketing">
      <template #default="{ value, onChange }">
        <SgSwitch :model-value="value as boolean" @update:model-value="onChange" />
      </template>
    </SgField>
    <SgSubmitButton>{{ t.save }}</SgSubmitButton>
  </SgForm>
</template>
