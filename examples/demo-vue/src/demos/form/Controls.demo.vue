<script setup lang="ts">
/**
 * One form wired to every supported control — Select, Checkbox,
 * RadioGroup, Switch, InputNumber, Slider. Showcases the default-slot
 * pattern across primitives.
 */
import {
  SgForm,
  SgField,
  SgInput,
  SgInputNumber,
  SgSelect,
  SgSwitch,
  SgCheckbox,
  SgRadio,
  SgSlider,
  SgButton,
} from '@skygraph/vue'
import { roleOptions, statusOptions } from './shared'
</script>

<template>
  <SgForm
    :default-values="{
      name: 'Ada',
      role: 'admin',
      status: 'active',
      seats: 5,
      progress: 40,
      enabled: true,
      news: true,
    }"
  >
    <SgField name="name" label="Name">
      <template #default="{ value, onChange }">
        <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="role" label="Role (Select)">
      <template #default="{ value, onChange }">
        <SgSelect :value="value as string" :options="roleOptions" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="status" label="Status (RadioGroup)">
      <template #default="{ value, onChange }">
        <SgRadio :value="value as string" :options="statusOptions" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="seats" label="Seats (InputNumber)">
      <template #default="{ value, onChange }">
        <SgInputNumber :value="value as number" :min="1" :max="50" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="progress" label="Progress (Slider)">
      <template #default="{ value, onChange }">
        <SgSlider :model-value="value as number" :min="0" :max="100" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="enabled" label="Enabled (Switch)">
      <template #default="{ value, onChange }">
        <SgSwitch :model-value="!!value" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgField name="news" label="Subscribe (Checkbox)">
      <template #default="{ value, onChange }">
        <SgCheckbox :model-value="!!value" @update:modelValue="onChange" />
      </template>
    </SgField>
    <SgButton type="primary" htmlType="submit">Save</SgButton>
  </SgForm>
</template>
