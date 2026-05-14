<script setup lang="ts">
/**
 * `SgFormList` registers an array path and exposes `add` / `remove` / `move`
 * operations. Child fields address array items with dotted paths
 * (`phones.0`, `phones.1`, …). Each item validates independently.
 */
import { SgForm, SgField, SgFormList, SgInput, SgButton } from '@skygraph/vue'
import './styles.css'

function onFinish(values: Record<string, unknown>) {
  console.log('phones', values)
}
</script>

<template>
  <SgForm :default-values="{ phones: [''] }" style="max-width: 520px" @finish="onFinish">
    <label class="sg-field-label">Phone numbers</label>
    <SgFormList name="phones" :initial-value="['']">
      <template #default="{ fields, operation }">
        <div class="demo-form-list">
          <div v-for="(f, i) in fields" :key="f.key" class="demo-form-list-row">
            <SgField
              :name="`phones.${f.index}`"
              :placeholder="`Phone #${f.index + 1}`"
              :rules="[
                { required: true, message: 'Required' },
                { pattern: /^[+\d\s()-]+$/, message: 'Invalid phone' },
              ]"
              style="margin-bottom: 0"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInput
                  :value="(value as string) ?? ''"
                  :placeholder="`Phone #${f.index + 1}`"
                  @update:modelValue="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
            <span title="Move up">
              <SgButton type="text" :disabled="i === 0" @click="operation.move(i, i - 1)">
                ↑
              </SgButton>
            </span>
            <span title="Move down">
              <SgButton
                type="text"
                :disabled="i === fields.length - 1"
                @click="operation.move(i, i + 1)"
              >
                ↓
              </SgButton>
            </span>
            <span title="Remove">
              <SgButton
                type="text"
                :disabled="fields.length <= 1"
                @click="operation.remove(f.index)"
              >
                ×
              </SgButton>
            </span>
          </div>
          <SgButton
            type="dashed"
            style="align-self: flex-start; margin-top: 4px"
            @click="operation.add('')"
          >
            + Add phone
          </SgButton>
        </div>
      </template>
    </SgFormList>

    <div style="margin-top: 16px">
      <SgButton type="primary" html-type="submit">Save contacts</SgButton>
    </div>
  </SgForm>
</template>
