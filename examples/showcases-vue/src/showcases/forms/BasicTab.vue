<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgInput,
  SgInputNumber,
  SgTextarea,
  SgSelect,
  SgCheckbox,
  SgRadio,
  SgSwitch,
  SgSlider,
  SgRate,
  SgDatePicker,
  SgRangePicker,
  SgTimePicker,
  SgAutoComplete,
  SgColorPicker,
  SgSegmented,
  SgInputPassword,
  SgSearchInput,
  SgTagInput,
  SgPinInput,
  SgInlineEdit,
  SgInputGroup,
  notification,
  type SelectOption,
  type AutoCompleteOption,
} from '@skygraph/vue'
import { useAppLocale } from '../_shared'

const l = useAppLocale('forms').basic
const text = ref('')
const password = ref('')
const search = ref('')
const numVal = ref(42)
const textarea = ref('')
const selectVal = ref<string | number>('')
const checked = ref(false)
const indeterminate = ref(true)
const radio = ref('a')
const switchOn = ref(true)
const slider = ref(30)
const rate = ref(3)
const tags = ref(['React', 'TypeScript', 'SkyGraph'])
const pin = ref('')
const color = ref('#1677ff')
const segment = ref('daily')
const inlineVal = ref(l.inlineDefault)
const autoVal = ref('')

const autoOptions = computed<AutoCompleteOption[]>(() => {
  if (!autoVal.value) return []
  return ['gmail.com', 'outlook.com', 'yahoo.com'].map((d) => ({
    label: `${autoVal.value}@${d}`,
    value: `${autoVal.value}@${d}`,
  }))
})

const selectOptions: SelectOption[] = [
  { label: l.options.alpha, value: 'alpha' },
  { label: l.options.beta, value: 'beta' },
  { label: l.options.gamma, value: 'gamma' },
  { label: l.options.disabled, value: 'disabled', disabled: true },
]
</script>

<template>
  <div class="forms-gallery">
    <h3>{{ l.sections.textInputs }}</h3>
    <div class="forms-grid">
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.input }}</label>
        <SgInput
          :value="text"
          :placeholder="l.placeholders.basic"
          @update:model-value="(v: string) => (text = v)"
        />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.passwordStrength }}</label>
        <SgInputPassword
          :value="password"
          :placeholder="l.placeholders.password"
          show-strength
          @update:model-value="(v: string) => (password = v)"
        />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.searchInput }}</label>
        <SgSearchInput
          :value="search"
          enter-button="Go"
          @update:model-value="(v: string) => (search = v)"
          @search="(v: string) => notification.info(l.toasts.searching(v))"
        />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.inputNumber }}</label>
        <SgInputNumber
          :value="numVal"
          :min="0"
          :max="100"
          :step="5"
          @update:model-value="(v: number | null) => (numVal = v ?? 0)"
        />
      </div>
      <div class="forms-cell" style="grid-column: span 2">
        <label class="forms-label">{{ l.labels.textarea }}</label>
        <SgTextarea
          :value="textarea"
          :placeholder="l.placeholders.multiLine"
          @update:model-value="(v: string) => (textarea = v)"
        />
      </div>
    </div>

    <h3>{{ l.sections.inputGroup }}</h3>
    <div class="forms-grid">
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.protocolAddon }}</label>
        <SgInputGroup before="https://">
          <SgInput :placeholder="l.placeholders.example" />
        </SgInputGroup>
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.unitAddon }}</label>
        <SgInputGroup after="kg">
          <SgInputNumber :placeholder="l.placeholders.weight" :style="{ width: '100%' }" />
        </SgInputGroup>
      </div>
    </div>

    <h3>{{ l.sections.selection }}</h3>
    <div class="forms-grid">
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.select }}</label>
        <SgSelect
          :value="selectVal"
          :options="selectOptions"
          :placeholder="l.placeholders.chooseOption"
          @update:model-value="(v) => (selectVal = v as string | number)"
        />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.autoComplete }}</label>
        <SgAutoComplete
          :value="autoVal"
          :options="autoOptions"
          :placeholder="l.placeholders.autoEmail"
          @update:model-value="(v: string) => (autoVal = v)"
        />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.segmented }}</label>
        <SgSegmented
          :value="segment"
          :options="[
            { label: l.options.daily, value: 'daily' },
            { label: l.options.weekly, value: 'weekly' },
            { label: l.options.monthly, value: 'monthly' },
          ]"
          @change="(v: string | number) => (segment = String(v))"
        />
      </div>
      <div class="forms-cell" style="grid-column: span 2">
        <label class="forms-label">{{ l.labels.radioGroup }}</label>
        <SgRadio
          :value="radio"
          :options="[
            { label: l.options.a, value: 'a' },
            { label: l.options.b, value: 'b' },
            { label: l.options.c, value: 'c' },
            { label: l.options.disabledRadio, value: 'd', disabled: true },
          ]"
          @update:model-value="(v) => (radio = String(v))"
        />
      </div>
    </div>

    <h3>{{ l.sections.toggleRange }}</h3>
    <div class="forms-grid">
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.checkbox }}</label>
        <div style="display: flex; gap: 16px">
          <SgCheckbox :model-value="checked" @update:model-value="(v: boolean) => (checked = v)">
            {{ l.agreeTerms }}
          </SgCheckbox>
          <SgCheckbox
            :indeterminate="indeterminate"
            @update:model-value="() => (indeterminate = false)"
          >
            {{ l.selectAll }}
          </SgCheckbox>
        </div>
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.switch }}</label>
        <div style="display: flex; gap: 16px; align-items: center">
          <SgSwitch :model-value="switchOn" @update:model-value="(v: boolean) => (switchOn = v)">
            <template #checkedChildren>{{ l.on }}</template>
            <template #unCheckedChildren>{{ l.off }}</template>
          </SgSwitch>
          <span style="color: var(--sg-color-text-secondary)">
            {{ switchOn ? l.enabled : l.disabledLabel }}
          </span>
        </div>
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.sliderValue(slider) }}</label>
        <SgSlider :model-value="slider" @update:model-value="(v: number) => (slider = v)" />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.rate }}</label>
        <SgRate :value="rate" @update:model-value="(v: number) => (rate = v)" />
      </div>
    </div>

    <h3>{{ l.sections.dateTime }}</h3>
    <div class="forms-grid">
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.datePicker }}</label>
        <SgDatePicker :placeholder="l.placeholders.pickDate" />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.rangePicker }}</label>
        <SgRangePicker />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.timePicker }}</label>
        <SgTimePicker :placeholder="l.placeholders.pickTime" />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.colorPicker }}</label>
        <SgColorPicker :value="color" @update:model-value="(v: string) => (color = v)" />
      </div>
    </div>

    <h3>{{ l.sections.specialised }}</h3>
    <div class="forms-grid">
      <div class="forms-cell" style="grid-column: span 2">
        <label class="forms-label">{{ l.labels.tagInput }}</label>
        <SgTagInput
          :value="tags"
          :max-tags="8"
          :placeholder="l.placeholders.tagInput"
          tag-color="processing"
          @update:model-value="(v: string[]) => (tags = v)"
        />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.pinInputDigits }}</label>
        <SgPinInput
          :value="pin"
          :length="6"
          type="numeric"
          @update:model-value="(v: string) => (pin = v)"
          @complete="(v: string) => notification.success(l.toasts.pinComplete(v))"
        />
      </div>
      <div class="forms-cell">
        <label class="forms-label">{{ l.labels.pinInputMasked }}</label>
        <SgPinInput :length="4" mask type="alphanumeric" />
      </div>
      <div class="forms-cell" style="grid-column: span 2">
        <label class="forms-label">{{ l.labels.inlineEdit }}</label>
        <div style="display: flex; gap: 24px; align-items: center">
          <SgInlineEdit
            :value="inlineVal"
            @save="
              (v: string) => {
                inlineVal = v
                notification.info(l.toasts.saved(v))
              }
            "
          />
          <SgInlineEdit :default-value="l.inlineNoButtons" :show-buttons="false" save-on-blur />
          <SgInlineEdit disabled :default-value="l.inlineDisabled" />
        </div>
      </div>
    </div>
  </div>
</template>
