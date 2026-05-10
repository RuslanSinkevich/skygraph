<script setup lang="ts">
/**
 * `unstyled` drops every CSS class and renders a native radio
 * group — behaviour stays (`role="radiogroup"`, keyboard,
 * disabled), but styling is 100% yours.
 */
import { computed } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: { map: 'Map', transit: 'Transit', satellite: 'Satellite' },
  ru: { map: 'Карта', transit: 'Транспорт', satellite: 'Спутник' },
})

const options = computed(() => [
  { label: t.value.map, value: 'Map' },
  { label: t.value.transit, value: 'Transit' },
  { label: t.value.satellite, value: 'Satellite' },
])
</script>

<template>
  <SgSegmented unstyled class="demo-radio-group" default-value="Map" :options="options" />
</template>

<style scoped>
.demo-radio-group {
  display: inline-flex;
  gap: 16px;
}

.demo-radio-group :deep(label) {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.demo-radio-group :deep(input[disabled] + *) {
  opacity: 0.4;
}
</style>
