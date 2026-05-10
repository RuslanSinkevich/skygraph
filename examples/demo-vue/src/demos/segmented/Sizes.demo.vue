<script setup lang="ts">
/**
 * `size` controls item height, padding and font size together.
 * Use `small` inside toolbars / cards, `large` for landing or
 * onboarding screens.
 */
import { computed } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: { small: 'Small', middle: 'Middle', large: 'Large' },
  ru: { small: 'Маленький', middle: 'Средний', large: 'Большой' },
})

const options = computed(() => [t.value.small, t.value.middle, t.value.large])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgSegmented size="small" :options="options" />
    <SgSegmented :options="options" />
    <SgSegmented size="large" :options="options" />
  </div>
</template>
