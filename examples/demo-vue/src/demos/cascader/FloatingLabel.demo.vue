<script setup lang="ts">
/**
 * Floating label over the Cascader control. The shared `FloatingField`
 * tracks focus via bubbling `focusin` / `focusout` and defers the blur one
 * frame, so choosing a path never makes the label flicker.
 */
import { ref, computed } from 'vue'
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { region: 'Region', origin: 'Origin' },
  ru: { region: 'Регион', origin: 'Происхождение' },
} as const

const t = useDemoStrings(STRINGS)

const region = ref<(string | number)[]>([])
const origin = ref<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu'])

const regionFilled = computed(() => region.value.length > 0)
const originFilled = computed(() => origin.value.length > 0)
</script>

<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap; max-width: 560px">
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.region" :filled="regionFilled">
        <SgCascader v-model="region" :options="regionOptions" placeholder=" " />
      </FloatingField>
    </div>
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.origin" :filled="originFilled">
        <SgCascader v-model="origin" :options="regionOptions" placeholder=" " />
      </FloatingField>
    </div>
  </div>
</template>
