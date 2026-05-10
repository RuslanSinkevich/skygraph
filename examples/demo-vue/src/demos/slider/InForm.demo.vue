<script setup lang="ts">
/**
 * Slider can live inside `<SgField>` like any other input. Because its
 * value is always defined (never `null`), you can skip the required
 * rule.
 */
import { SgForm, SgField, SgSlider, SgSubmitButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    volume: 'Volume',
    brightness: 'Brightness',
    save: 'Save',
  },
  ru: {
    volume: 'Громкость',
    brightness: 'Яркость',
    save: 'Сохранить',
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
    :default-values="{ volume: 50, brightness: 80 }"
    style="max-width: 420px"
    @finish="onFinish"
  >
    <SgField name="volume" :label="t.volume">
      <template #default="{ value, onChange }">
        <SgSlider
          :model-value="value as number"
          :min="0"
          :max="100"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgField name="brightness" :label="t.brightness">
      <template #default="{ value, onChange }">
        <SgSlider
          :model-value="value as number"
          :min="0"
          :max="100"
          :step="5"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgSubmitButton>{{ t.save }}</SgSubmitButton>
  </SgForm>
</template>
