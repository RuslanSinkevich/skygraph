<script setup lang="ts">
import { ref } from 'vue'
import {
  SgCollapse,
  SgForm,
  SgField,
  SgInput,
  SgSelect,
  SgDatePicker,
  SgInputNumber,
  SgButton,
  SgSteps,
  notification,
} from '@skygraph/vue'
import { useAppLocale } from '../_shared'

const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance']

const o = useAppLocale('hrPortal').onboarding
const step = ref(0)

function onPersonal(values: Record<string, unknown>) {
  notification.success(o.toasts.personalSaved, JSON.stringify(values))
  step.value = 1
}

function onComplete() {
  notification.success(o.toasts.complete)
  step.value = 0
}

const items = [
  { key: 'personal', label: o.panels.personal, content: '' },
  { key: 'equipment', label: o.panels.equipment, content: '' },
  { key: 'training', label: o.panels.training, content: '' },
]
</script>

<template>
  <div style="max-width: 720px">
    <SgSteps
      :current="step"
      :items="[
        { title: o.steps.personal },
        { title: o.steps.equipment },
        { title: o.steps.training },
      ]"
      size="small"
    />

    <div style="margin-top: 20px">
      <SgCollapse :items="items" :default-active-key="['personal']">
        <template #panel="{ item }">
          <template v-if="item.key === 'personal'">
            <SgForm @finish="onPersonal">
              <SgField name="fullName" :label="o.fields.fullName" :rules="[{ required: true }]">
                <template #default="{ value, onChange }">
                  <SgInput
                    :value="(value as string) ?? ''"
                    :placeholder="o.fields.fullNamePh"
                    @update:model-value="onChange"
                  />
                </template>
              </SgField>
              <SgField
                name="email"
                :label="o.fields.email"
                :rules="[{ required: true, type: 'email' }]"
              >
                <template #default="{ value, onChange }">
                  <SgInput
                    :value="(value as string) ?? ''"
                    :placeholder="o.fields.emailPh"
                    @update:model-value="onChange"
                  />
                </template>
              </SgField>
              <SgField name="department" :label="o.fields.department" :rules="[{ required: true }]">
                <template #default="{ value, onChange }">
                  <SgSelect
                    :value="value as string"
                    :options="departments.map((d) => ({ label: d, value: d }))"
                    :placeholder="o.fields.deptPh"
                    @update:model-value="onChange"
                  />
                </template>
              </SgField>
              <SgField name="role" :label="o.fields.role" :rules="[{ required: true }]">
                <template #default="{ value, onChange }">
                  <SgInput
                    :value="(value as string) ?? ''"
                    :placeholder="o.fields.rolePh"
                    @update:model-value="onChange"
                  />
                </template>
              </SgField>
              <SgField name="startDate" :label="o.fields.startDate">
                <template #default="{ value, onChange }">
                  <SgDatePicker
                    :value="value as Date | null"
                    :placeholder="o.fields.datePh"
                    @update:model-value="onChange"
                  />
                </template>
              </SgField>
              <SgField name="salary" :label="o.fields.salary">
                <template #default="{ value, onChange }">
                  <SgInputNumber
                    :value="value as number"
                    :placeholder="o.fields.salaryPh"
                    :min="0"
                    :style="{ width: '100%' }"
                    @update:model-value="onChange"
                  />
                </template>
              </SgField>
              <SgButton type="primary" html-type="submit" :style="{ marginTop: '8px' }">
                {{ o.continueEquipment }}
              </SgButton>
            </SgForm>
          </template>
          <template v-else-if="item.key === 'equipment'">
            <div style="font-size: 13px">
              <p style="color: var(--sg-color-text-secondary)">{{ o.equipmentLead }}</p>
              <ul style="padding-left: 20px; margin-top: 8px; line-height: 2">
                <li>✓ {{ o.equipmentList.laptop }}</li>
                <li>✓ {{ o.equipmentList.email }}</li>
                <li>✓ {{ o.equipmentList.vpn }}</li>
                <li>○ {{ o.equipmentList.slack }}</li>
                <li>○ {{ o.equipmentList.github }}</li>
              </ul>
              <SgButton type="primary" :style="{ marginTop: '12px' }" @click="step = 2">
                {{ o.continueTraining }}
              </SgButton>
            </div>
          </template>
          <template v-else-if="item.key === 'training'">
            <div class="hr-training">
              <p>{{ o.trainingPlan.week1 }}</p>
              <p>{{ o.trainingPlan.week2 }}</p>
              <p>{{ o.trainingPlan.week3 }}</p>
              <p>{{ o.trainingPlan.week4 }}</p>
              <SgButton type="primary" :style="{ marginTop: '12px' }" @click="onComplete">
                {{ o.completeBtn }}
              </SgButton>
            </div>
          </template>
        </template>
      </SgCollapse>
    </div>
  </div>
</template>

<style scoped>
.hr-training {
  font-size: 13px;
  color: var(--sg-color-text-secondary);
  line-height: 1.8;
}
</style>
