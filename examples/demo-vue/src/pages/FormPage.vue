<script setup lang="ts">
import { ref } from 'vue'
import {
  SgButton,
  SgCheckbox,
  SgField,
  SgForm,
  SgInput,
  SgInputNumber,
  SgSelect,
  SgSwitch,
} from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Form',
    lead: 'Form orchestration: register fields, validate them, submit. Built on `useForm()`.',
    when1: 'Anything multi-field with validation and submission.',
    when2: 'When you need consistent label / error / help styling.',
    basicTitle: 'Basic',
    basicDesc: '`SgForm` + `SgField` with default-slot props.',
    validationTitle: 'Validation rules',
    validationDesc: 'Required and pattern rules trigger on change/blur.',
    layoutTitle: 'Layout',
    layoutDesc: 'Switch between vertical / horizontal / inline.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three densities for compact or generous forms.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Disable the entire form at once.',
    submit: 'Submit',
    name: 'Name',
    email: 'Email',
    age: 'Age',
    role: 'Role',
    notify: 'Notify me',
    submittedLabel: 'Submitted:',
  },
  ru: {
    title: 'Form',
    lead: 'Оркестрация формы: регистрация полей, валидация, submit. Поверх `useForm()`.',
    when1: 'Любая многополевая форма с валидацией и отправкой.',
    when2: 'Когда нужны согласованные label / error / help.',
    basicTitle: 'Basic',
    basicDesc: '`SgForm` + `SgField` со слот-пропсами.',
    validationTitle: 'Правила валидации',
    validationDesc: 'Required и pattern на change/blur.',
    layoutTitle: 'Layout',
    layoutDesc: 'Vertical / horizontal / inline.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три плотности — компактные и просторные формы.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Отключить всю форму сразу.',
    submit: 'Отправить',
    name: 'Имя',
    email: 'Email',
    age: 'Возраст',
    role: 'Роль',
    notify: 'Уведомлять',
    submittedLabel: 'Отправлено:',
  },
})

const submitted = ref<string>('')

function onFinish(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

const formProps: PropDef[] = [
  {
    name: 'layout',
    description: 'Label / control layout.',
    type: "'horizontal' | 'vertical' | 'inline'",
    default: "'vertical'",
  },
  {
    name: 'defaultValues / initialValues',
    description: 'Initial values seeded into the engine.',
    type: 'Record<string, unknown>',
  },
  {
    name: 'size',
    description: 'Default control size for context consumers.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable all fields that read context.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'colon', description: 'Append colon after labels.', type: 'boolean', default: 'true' },
  {
    name: 'requiredMark',
    description: 'How required fields are marked.',
    type: "boolean | 'optional'",
    default: 'true',
  },
  {
    name: 'labelCol / wrapperCol',
    description: 'Grid spans for horizontal layout.',
    type: '{ span?: number; offset?: number }',
  },
  { name: 'labelAlign', description: 'Label text alignment.', type: "'left' | 'right'" },
  { name: 'validateOn', description: 'Trigger to run validation.', type: 'ValidationMode' },
  {
    name: 'scrollToFirstError',
    description: 'Scroll to first error after submit.',
    type: 'boolean',
  },
  { name: 'preserve', description: 'Keep unmounted field values.', type: 'boolean' },
]

const fieldProps: PropDef[] = [
  { name: 'name', description: 'Path of the field in the store.', type: 'string' },
  { name: 'label', description: 'Visible label.', type: 'string' },
  { name: 'rules', description: 'Validation rules.', type: 'Rule[]' },
  { name: 'warningRules', description: 'Rules that produce warnings only.', type: 'Rule[]' },
  { name: 'required', description: 'Prepend a required rule.', type: 'boolean', default: 'false' },
  { name: 'dependencies', description: 'Re-validate when these fields change.', type: 'string[]' },
  {
    name: 'trigger',
    description: 'Validation trigger.',
    type: 'ValidationMode | ValidationMode[]',
  },
  { name: 'help / extra', description: 'Helper text below the control.', type: 'string' },
  { name: 'hidden', description: 'Render nothing.', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable just this control.', type: 'boolean' },
  {
    name: 'validateStatus',
    description: 'Manual status badge.',
    type: "'success' | 'warning' | 'error' | 'validating'",
  },
  {
    name: 'noStyle',
    description: 'Render only the control without chrome.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'normalize',
    description: 'Map raw value before commit.',
    type: '(value, prevValue) => unknown',
  },
  { name: 'tooltip', description: 'Tooltip wrapping the label.', type: 'string' },
  {
    name: 'labelCol / wrapperCol',
    description: 'Per-field grid override.',
    type: '{ span?: number; offset?: number }',
  },
]

const BASIC = `<SgForm @finish="onFinish">
  <SgField name="name" label="Name" required>
    <template #default="{ value, onChange }">
      <SgInput :value="(value as string)" @update:modelValue="onChange" />
    </template>
  </SgField>
  <SgButton type="primary" htmlType="submit">Submit</SgButton>
</SgForm>`

const VALID = `<SgField
  name="email"
  label="Email"
  required
  :rules="[{ pattern: /.+@.+\\..+/, message: 'Invalid email' }]"
/>`

const LAY = `<SgForm layout="horizontal">…</SgForm>
<SgForm layout="inline">…</SgForm>`

const SIZ = `<SgForm size="small"|"middle"|"large">…</SgForm>`

const DIS = `<SgForm disabled>…</SgForm>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Form']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgForm
        :default-values="{ name: '', email: '', age: 18, role: 'viewer', notify: true }"
        @finish="onFinish"
      >
        <SgField name="name" :label="t.name" required>
          <template #default="{ value, onChange, onBlur }">
            <SgInput
              :value="(value as string) ?? ''"
              @update:modelValue="onChange"
              @blur="onBlur"
            />
          </template>
        </SgField>
        <SgField name="email" :label="t.email" required>
          <template #default="{ value, onChange, onBlur }">
            <SgInput
              :value="(value as string) ?? ''"
              @update:modelValue="onChange"
              @blur="onBlur"
            />
          </template>
        </SgField>
        <SgField name="age" :label="t.age">
          <template #default="{ value, onChange }">
            <SgInputNumber :value="value as number" @update:modelValue="onChange" />
          </template>
        </SgField>
        <SgField name="role" :label="t.role">
          <template #default="{ value, onChange }">
            <SgSelect
              :value="value as string"
              :options="roleOptions"
              @update:modelValue="onChange"
            />
          </template>
        </SgField>
        <SgField name="notify" :label="t.notify">
          <template #default="{ value, onChange }">
            <SgSwitch :model-value="!!value" @update:modelValue="onChange" />
          </template>
        </SgField>
        <SgButton type="primary" htmlType="submit">{{ t.submit }}</SgButton>
        <pre v-if="submitted" style="margin-top: 12px; font-size: 12px"
          >{{ t.submittedLabel }} {{ submitted }}</pre
        >
      </SgForm>
    </DemoBox>

    <DemoBox :title="t.validationTitle" :description="t.validationDesc" :code="VALID">
      <SgForm>
        <SgField
          name="email"
          :label="t.email"
          required
          :rules="[{ pattern: /.+@.+\..+/, message: 'Invalid email' }]"
        >
          <template #default="{ value, onChange, onBlur }">
            <SgInput
              :value="(value as string) ?? ''"
              @update:modelValue="onChange"
              @blur="onBlur"
            />
          </template>
        </SgField>
      </SgForm>
    </DemoBox>

    <DemoBox :title="t.layoutTitle" :description="t.layoutDesc" :code="LAY">
      <SgForm layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <SgField name="a" :label="t.name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
        <SgField name="b" :label="t.email">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>

      <SgForm layout="inline" style="margin-top: 16px">
        <SgField name="c" :label="t.name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
        <SgField name="d" :label="t.role">
          <template #default="{ value, onChange }">
            <SgSelect
              :value="value as string"
              :options="roleOptions"
              @update:modelValue="onChange"
            />
          </template>
        </SgField>
      </SgForm>
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZ">
      <SgForm size="small">
        <SgField name="s" :label="t.name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
      <SgForm size="middle">
        <SgField name="m" :label="t.name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
      <SgForm size="large">
        <SgField name="l" :label="t.name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DIS">
      <SgForm disabled>
        <SgField name="x" :label="t.name">
          <template #default="{ value, onChange }">
            <SgInput :value="(value as string) ?? ''" @update:modelValue="onChange" />
          </template>
        </SgField>
        <SgField name="y" :label="t.notify">
          <template #default="{ value, onChange }">
            <SgCheckbox :model-value="!!value" @update:modelValue="onChange" />
          </template>
        </SgField>
      </SgForm>
    </DemoBox>

    <template #api>
      <h3 style="margin-top: 24px">SgForm</h3>
      <PropsTable :data="formProps" />
      <h3 style="margin-top: 24px">SgField</h3>
      <PropsTable :data="fieldProps" />
    </template>
  </ComponentDoc>
</template>
