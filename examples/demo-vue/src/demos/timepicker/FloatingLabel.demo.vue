<script setup lang="ts">
/**
 * Floating label over the TimePicker control. The shared `FloatingField`
 * tracks focus via bubbling `focusin` / `focusout` and defers the blur one
 * frame, so choosing a time never makes the label flicker.
 */
import { ref, computed } from 'vue'
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { from: 'Opens at', to: 'Closes at' },
  ru: { from: 'Открытие', to: 'Закрытие' },
} as const

const t = useDemoStrings(STRINGS)

const from = ref('')
const to = ref('18:00:00')

const fromFilled = computed(() => from.value.length > 0)
const toFilled = computed(() => to.value.length > 0)
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; max-width: 560px">
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.from" :filled="fromFilled">
        <SgTimePicker v-model="from" placeholder=" " />
      </FloatingField>
    </div>
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.to" :filled="toFilled">
        <SgTimePicker v-model="to" placeholder=" " />
      </FloatingField>
    </div>
  </div>
</template>
