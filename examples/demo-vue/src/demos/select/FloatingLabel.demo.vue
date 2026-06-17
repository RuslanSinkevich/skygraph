<script setup lang="ts">
/**
 * Floating label for the Select control. The shared `FloatingField` tracks
 * focus via bubbling `focusin` / `focusout` and defers the blur one frame, so
 * picking an option never makes the label flicker (focus/filled race).
 */
import { ref, computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { fruit: 'Favourite fruit', city: 'City' },
  ru: { fruit: 'Любимый фрукт', city: 'Город' },
} as const

const t = useDemoStrings(STRINGS)

const cityOptions = [
  { label: 'Moscow', value: 'moscow' },
  { label: 'Berlin', value: 'berlin' },
  { label: 'Tokyo', value: 'tokyo' },
]

const fruit = ref<string | number | undefined>(undefined)
const city = ref<string | number | undefined>('berlin')

const fruitFilled = computed(() => fruit.value != null && fruit.value !== '')
const cityFilled = computed(() => city.value != null && city.value !== '')
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; max-width: 560px">
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.fruit" :filled="fruitFilled">
        <SgSelect v-model="fruit" :options="fruitOptions" placeholder=" " />
      </FloatingField>
    </div>
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.city" :filled="cityFilled">
        <SgSelect v-model="city" :options="cityOptions" placeholder=" " />
      </FloatingField>
    </div>
  </div>
</template>
