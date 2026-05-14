<script setup lang="ts">
/**
 * Drive a form imperatively. `useForm()` returns an instance that exposes
 * `reset`, `setFieldsValue`, `validateFields`, `getFieldsValue`, and `submit`.
 * Pass it via the `form` prop to share state with code outside `<SgForm>`.
 */
import { ref } from 'vue'
import { SgForm, SgField, SgInput, SgButton, useForm } from '@skygraph/vue'

const form = useForm({ defaultValues: { name: '', email: '' } })
const snapshot = ref<string>('')

async function validate() {
  const res = await form.validateFields()
  snapshot.value = res.valid
    ? 'OK: ' + JSON.stringify(form.getFieldsValue())
    : 'Errors: ' + Object.keys(res.errors).join(', ')
}

function onFinish(values: Record<string, unknown>) {
  snapshot.value = 'Submitted: ' + JSON.stringify(values)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <SgButton type="default" @click="form.reset()">Reset</SgButton>
      <SgButton
        type="default"
        @click="form.setFieldsValue({ name: 'Ada Lovelace', email: 'ada@example.com' })"
      >
        Fill sample
      </SgButton>
      <SgButton type="default" @click="validate">Validate</SgButton>
      <SgButton type="primary" @click="form.submit()">Trigger submit</SgButton>
    </div>

    <SgForm :form="form" layout="vertical" style="max-width: 460px" @finish="onFinish">
      <SgField name="name" label="Name" :rules="[{ required: true }]">
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
      <SgButton type="primary" html-type="submit">Save</SgButton>
    </SgForm>

    <pre
      v-if="snapshot"
      style="
        margin: 0;
        padding: 10px 14px;
        background: var(--sg-color-bg-secondary);
        border-radius: var(--sg-border-radius);
        border: 1px solid var(--sg-color-border-secondary);
        font-size: 12px;
        color: var(--sg-color-text-secondary);
        white-space: pre-wrap;
      "
      >{{ snapshot }}</pre
    >
  </div>
</template>
