<script setup lang="ts">
import { SgForm, SgField, SgInput, SgSelect, SgSwitch, SgButton } from '@skygraph/vue'
import type { SystemUser } from './data'
import { roles } from './data'
import { useAppLocale } from '../_shared'

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'Finance',
  'HR',
]

const props = withDefaults(
  defineProps<{
    initialValues?: Partial<SystemUser>
    submitLabel?: string
    showStatus?: boolean
  }>(),
  { showStatus: false },
)

const emit = defineEmits<{
  submit: [values: Partial<SystemUser>]
  cancel: []
}>()

const f = useAppLocale('admin').userForm

function onFinish(v: Record<string, unknown>) {
  emit('submit', v as Partial<SystemUser>)
}
</script>

<template>
  <SgForm :initial-values="props.initialValues" @finish="onFinish">
    <SgField name="name" :label="f.fullName" :rules="[{ required: true }]">
      <template #default="{ value, onChange }">
        <SgInput
          :value="(value as string) ?? ''"
          :placeholder="f.fullNamePh"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgField name="email" :label="f.email" :rules="[{ required: true, type: 'email' }]">
      <template #default="{ value, onChange }">
        <SgInput
          :value="(value as string) ?? ''"
          :placeholder="f.emailPh"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgField name="department" :label="f.department" :rules="[{ required: true }]">
      <template #default="{ value, onChange }">
        <SgSelect
          :value="value as string"
          :options="departments.map((d) => ({ label: d, value: d }))"
          :placeholder="f.deptPh"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgField name="role" :label="f.role" :rules="[{ required: true }]">
      <template #default="{ value, onChange }">
        <SgSelect
          :value="value as string"
          :options="roles.map((r) => ({ label: r.name, value: r.key }))"
          :placeholder="f.rolePh"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgField v-if="props.showStatus" name="status" :label="f.status">
      <template #default="{ value, onChange }">
        <SgSelect
          :value="value as string"
          :options="[
            { label: f.statusOptions.active, value: 'active' },
            { label: f.statusOptions.suspended, value: 'suspended' },
            { label: f.statusOptions.pending, value: 'pending' },
            { label: f.statusOptions.deactivated, value: 'deactivated' },
          ]"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgField name="twoFactor" :label="f.twoFa">
      <template #default="{ value, onChange }">
        <SgSwitch :model-value="!!value" @update:model-value="onChange" />
      </template>
    </SgField>
    <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px">
      <SgButton @click="emit('cancel')">{{ f.cancel }}</SgButton>
      <SgButton type="primary" html-type="submit">{{ props.submitLabel ?? '' }}</SgButton>
    </div>
  </SgForm>
</template>
