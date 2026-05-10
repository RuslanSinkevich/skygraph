<script setup lang="ts">
/**
 * Inside `<SgForm>`, use `<SgField>` and the scoped slot to pipe
 * boolean values into `:checked` / `@change`. Validation works via
 * the standard rules prop — here we require the terms checkbox to be
 * `true`.
 */
import { SgForm, SgField, SgCheckbox, SgSubmitButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    news: 'Subscribe to monthly release notes',
    beta: 'Enable experimental (beta) components',
    terms: 'I accept the Terms of Service',
    termsRequired: 'You must accept to continue',
    submit: 'Save preferences',
  },
  ru: {
    news: 'Подписаться на ежемесячные релизы',
    beta: 'Включить экспериментальные (beta) компоненты',
    terms: 'Я принимаю условия использования',
    termsRequired: 'Нужно согласиться, чтобы продолжить',
    submit: 'Сохранить настройки',
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
    :default-values="{ news: true, beta: false, terms: false }"
    style="max-width: 420px"
    @finish="onFinish"
  >
    <SgField name="news" no-style>
      <template #default="{ value, onChange }">
        <SgCheckbox :checked="!!value" @change="onChange">{{ t.news }}</SgCheckbox>
      </template>
    </SgField>
    <SgField name="beta" no-style>
      <template #default="{ value, onChange }">
        <SgCheckbox :checked="!!value" @change="onChange">{{ t.beta }}</SgCheckbox>
      </template>
    </SgField>
    <SgField
      name="terms"
      :rules="[
        { validator: (v: unknown) => (v === true ? null : t.termsRequired) },
      ]"
    >
      <template #default="{ value, onChange }">
        <SgCheckbox :checked="!!value" @change="onChange">{{ t.terms }}</SgCheckbox>
      </template>
    </SgField>
    <div style="margin-top: 8px">
      <SgSubmitButton>{{ t.submit }}</SgSubmitButton>
    </div>
  </SgForm>
</template>
