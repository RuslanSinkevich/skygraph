<script setup lang="ts">
/**
 * Two axes of disablement — either the whole control (via the
 * top-level `disabled` prop, also inherited from
 * `SgConfigProvider`) or individual options (`disabled` on the
 * option object).
 */
import { computed } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: { map: 'Map', transit: 'Transit', satellite: 'Satellite' },
  ru: { map: 'Карта', transit: 'Транспорт', satellite: 'Спутник' },
})

const plain = computed(() => [
  { label: t.value.map, value: 'Map' },
  { label: t.value.transit, value: 'Transit' },
  { label: t.value.satellite, value: 'Satellite' },
])

const mixed = computed(() => [
  { label: t.value.map, value: 'Map' },
  { label: t.value.transit, value: 'Transit', disabled: true },
  { label: t.value.satellite, value: 'Satellite' },
])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgSegmented :options="plain" disabled />
    <SgSegmented :options="mixed" default-value="Map" />
  </div>
</template>
