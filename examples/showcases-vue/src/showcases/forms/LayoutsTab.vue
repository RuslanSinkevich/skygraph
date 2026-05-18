<script setup lang="ts">
import { ref } from 'vue'
import {
  SgButton,
  SgInput,
  SgSwitch,
  SgSelect,
  SgSegmented,
  SgForm,
  SgField,
  notification,
} from '@skygraph/vue'
import { useAppLocale } from '../_shared'

const l = useAppLocale('forms').layouts
const layout = ref<'vertical' | 'horizontal' | 'inline'>('vertical')
const sizeMode = ref<'small' | 'middle' | 'large'>('middle')
const requiredMark = ref<boolean | 'optional'>(true)

function onFinish(values: Record<string, unknown>) {
  notification.success(l.submittedToast, JSON.stringify(values))
}

function parseRequired(v: string): boolean | 'optional' {
  return v === 'true' ? true : v === 'optional' ? 'optional' : false
}
</script>

<template>
  <div class="forms-section">
    <div class="forms-toolbar">
      <div>
        <label class="forms-label">{{ l.layoutLabel }}</label>
        <SgSegmented
          :value="layout"
          :options="[
            { label: 'vertical', value: 'vertical' },
            { label: 'horizontal', value: 'horizontal' },
            { label: 'inline', value: 'inline' },
          ]"
          @change="
            (v: string | number) => (layout = String(v) as 'vertical' | 'horizontal' | 'inline')
          "
        />
      </div>
      <div>
        <label class="forms-label">{{ l.sizeLabel }}</label>
        <SgSegmented
          :value="sizeMode"
          :options="[
            { label: 'small', value: 'small' },
            { label: 'middle', value: 'middle' },
            { label: 'large', value: 'large' },
          ]"
          @change="(v: string | number) => (sizeMode = String(v) as 'small' | 'middle' | 'large')"
        />
      </div>
      <div>
        <label class="forms-label">{{ l.requiredMarkLabel }}</label>
        <SgSegmented
          :value="String(requiredMark)"
          :options="[
            { label: l.requiredOptions.show, value: 'true' },
            { label: l.requiredOptions.optional, value: 'optional' },
            { label: l.requiredOptions.hide, value: 'false' },
          ]"
          @change="(v: string | number) => (requiredMark = parseRequired(String(v)))"
        />
      </div>
    </div>

    <div class="forms-preview">
      <SgForm
        :layout="layout"
        :size="sizeMode"
        :required-mark="requiredMark"
        :label-col="layout === 'horizontal' ? { span: 6 } : undefined"
        :wrapper-col="layout === 'horizontal' ? { span: 18 } : undefined"
        @finish="onFinish"
      >
        <SgField name="firstName" :label="l.fields.firstName" required>
          <template #default="{ value, onChange, onBlur }">
            <SgInput
              :value="(value as string) ?? ''"
              :placeholder="l.placeholders.first"
              @update:model-value="onChange"
              @blur="onBlur"
            />
          </template>
        </SgField>
        <SgField name="lastName" :label="l.fields.lastName" required>
          <template #default="{ value, onChange, onBlur }">
            <SgInput
              :value="(value as string) ?? ''"
              :placeholder="l.placeholders.last"
              @update:model-value="onChange"
              @blur="onBlur"
            />
          </template>
        </SgField>
        <SgField name="dept" :label="l.fields.department">
          <template #default="{ value, onChange }">
            <SgSelect
              :value="value as string"
              :options="[
                { label: l.deptOptions.eng, value: 'eng' },
                { label: l.deptOptions.design, value: 'design' },
                { label: l.deptOptions.marketing, value: 'marketing' },
              ]"
              :placeholder="l.placeholders.select"
              @update:model-value="onChange"
            />
          </template>
        </SgField>
        <SgField name="active" :label="l.fields.active">
          <template #default="{ value, onChange }">
            <SgSwitch :model-value="!!value" @update:model-value="onChange" />
          </template>
        </SgField>
        <div
          :style="{
            display: 'flex',
            gap: '8px',
            marginTop: '8px',
            marginLeft: layout === 'horizontal' ? '25%' : '0',
          }"
        >
          <SgButton type="primary" html-type="submit">{{ l.save }}</SgButton>
          <SgButton html-type="reset">{{ l.reset }}</SgButton>
        </div>
      </SgForm>
    </div>
  </div>
</template>

<style scoped>
.forms-preview {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
}
</style>
