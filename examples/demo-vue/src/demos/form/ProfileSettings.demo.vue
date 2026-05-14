<script setup lang="ts">
/**
 * Multi-section profile editor — shows how to compose sections, a 2-column
 * grid, toggles, a date picker, and an upload inside one form. Styling is
 * fully contained in `./styles.css` (`.demo-profile-*`).
 */
import { ref } from 'vue'
import {
  SgForm,
  SgField,
  SgInput,
  SgSelect,
  SgSwitch,
  SgDatePicker,
  SgUpload,
  SgButton,
} from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'
import { countryOptions } from './shared'
import './styles.css'

const files = ref<UploadFile[]>([])

function onFinish(values: Record<string, unknown>) {
  console.log('profile', { ...values, avatar: files.value.map((f) => f.name) })
}
</script>

<template>
  <SgForm
    layout="vertical"
    :default-values="{
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      country: 'ru',
      birthDate: null,
      emailNotifications: true,
      pushNotifications: false,
      marketing: false,
    }"
    @finish="onFinish"
  >
    <div class="demo-profile-section-title">Personal info</div>
    <div class="demo-profile-grid">
      <SgField name="firstName" label="First name" :rules="[{ required: true }]">
        <template #default="{ value, onChange, onBlur }">
          <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" @blur="onBlur" />
        </template>
      </SgField>
      <SgField name="lastName" label="Last name" :rules="[{ required: true }]">
        <template #default="{ value, onChange, onBlur }">
          <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" @blur="onBlur" />
        </template>
      </SgField>
      <SgField name="email" label="Email" :rules="[{ required: true }, { type: 'email' }]">
        <template #default="{ value, onChange, onBlur }">
          <SgInput
            :value="(value as string) ?? ''"
            type="email"
            @update:modelValue="onChange"
            @blur="onBlur"
          />
        </template>
      </SgField>
      <SgField name="country" label="Country">
        <template #default="{ value, onChange }">
          <SgSelect
            :value="value as string"
            :options="countryOptions"
            @update:modelValue="onChange"
          />
        </template>
      </SgField>
      <SgField name="birthDate" label="Birth date">
        <template #default="{ value, onChange }">
          <SgDatePicker
            :model-value="(value as Date | null) ?? null"
            @update:modelValue="onChange"
          />
        </template>
      </SgField>
    </div>

    <div class="demo-profile-section-title">Notifications</div>
    <div class="demo-profile-grid">
      <SgField name="emailNotifications" label="Email notifications">
        <template #default="{ value, onChange }">
          <SgSwitch :model-value="!!value" @update:modelValue="onChange" />
        </template>
      </SgField>
      <SgField name="pushNotifications" label="Push notifications">
        <template #default="{ value, onChange }">
          <SgSwitch :model-value="!!value" @update:modelValue="onChange" />
        </template>
      </SgField>
      <SgField name="marketing" label="Marketing emails" help="Product updates, tips, and offers">
        <template #default="{ value, onChange }">
          <SgSwitch :model-value="!!value" @update:modelValue="onChange" />
        </template>
      </SgField>
    </div>

    <div class="demo-profile-section-title">Avatar</div>
    <SgUpload v-model="files" accept="image/*" />

    <div style="display: flex; gap: 8px; margin-top: 20px">
      <SgButton type="primary" html-type="submit">Save changes</SgButton>
      <SgButton type="default">Cancel</SgButton>
    </div>
  </SgForm>
</template>
