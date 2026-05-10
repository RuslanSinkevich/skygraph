<script setup lang="ts">
/**
 * `SgInput` and `SgTextarea` plug into `<SgForm>` via `<SgField>`'s
 * scoped slot. The slot exposes `value` / `onChange` / `onBlur` —
 * wire them to the control's `v-model` + `@blur` to round-trip values
 * and validation status.
 */
import { SgForm, SgField, SgInput, SgTextarea, SgSubmitButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    name: 'Name',
    namePlaceholder: 'Jane Doe',
    email: 'Email',
    emailPlaceholder: 'name@example.com',
    bio: 'Short bio',
    bioPlaceholder: 'A line or two about you',
    required: 'Required',
    looksOff: 'Looks off',
    keepUnder: 'Keep it under 200 chars',
    submit: 'Save',
  },
  ru: {
    name: 'Имя',
    namePlaceholder: 'Иван Петров',
    email: 'Email',
    emailPlaceholder: 'имя@example.com',
    bio: 'Короткое био',
    bioPlaceholder: 'Пара строк о себе',
    required: 'Обязательное поле',
    looksOff: 'Похоже на ошибку',
    keepUnder: 'Не больше 200 символов',
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
    :default-values="{ name: '', email: '', bio: '' }"
    style="max-width: 420px"
    @finish="onFinish"
  >
    <SgField
      name="name"
      :label="t.name"
      :rules="[{ required: true, message: t.required }]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          :model-value="(value as string) ?? ''"
          :placeholder="t.namePlaceholder"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>

    <SgField
      name="email"
      :label="t.email"
      :rules="[
        { required: true, message: t.required },
        {
          validator: (v: unknown) =>
            typeof v === 'string' && v.includes('@') ? null : t.looksOff,
        },
      ]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          type="email"
          :model-value="(value as string) ?? ''"
          :placeholder="t.emailPlaceholder"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>

    <SgField
      name="bio"
      :label="t.bio"
      :rules="[{ max: 200, message: t.keepUnder }]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgTextarea
          :model-value="(value as string) ?? ''"
          :rows="3"
          :max-length="200"
          show-count
          :placeholder="t.bioPlaceholder"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>

    <SgSubmitButton>{{ t.submit }}</SgSubmitButton>
  </SgForm>
</template>
