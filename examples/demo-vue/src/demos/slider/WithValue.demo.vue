<script setup lang="ts">
/**
 * Pair the slider with an InputNumber for a "slider + precise value"
 * control. Both share the same state so the bar, handle and number
 * stay in sync via v-model.
 */
import { ref } from 'vue'
import { SgSlider, SgInputNumber } from '@skygraph/vue'

const value = ref(32)

function onNumberChange(v: number | null) {
  value.value = v ?? 0
}
</script>

<template>
  <div style="display: grid; gap: 16px; max-width: 360px">
    <SgSlider v-model="value" :min="0" :max="100" />
    <SgInputNumber
      :model-value="value"
      :min="0"
      :max="100"
      @update:model-value="onNumberChange"
    />
  </div>
</template>
