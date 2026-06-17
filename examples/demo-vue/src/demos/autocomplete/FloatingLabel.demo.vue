<script setup lang="ts">
/**
 * Floating label over the AutoComplete field. The shared `FloatingField`
 * tracks focus via bubbling `focusin` / `focusout` and defers the blur one
 * frame, so picking a suggestion never makes the label flicker.
 */
import { ref, computed } from 'vue'
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { framework: 'Framework', stack: 'Preferred stack' },
  ru: { framework: 'Фреймворк', stack: 'Предпочитаемый стек' },
} as const

const t = useDemoStrings(STRINGS)

const a = ref('')
const b = ref('Vue')

const aFilled = computed(() => a.value.length > 0)
const bFilled = computed(() => b.value.length > 0)
</script>

<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap; max-width: 560px">
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.framework" :filled="aFilled">
        <SgAutoComplete v-model="a" :options="frameworkOptions" placeholder=" " />
      </FloatingField>
    </div>
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.stack" :filled="bFilled">
        <SgAutoComplete v-model="b" :options="frameworkOptions" placeholder=" " />
      </FloatingField>
    </div>
  </div>
</template>
