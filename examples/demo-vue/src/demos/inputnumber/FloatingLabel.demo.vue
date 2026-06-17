<script setup lang="ts">
/**
 * Floating label over the InputNumber field. The shared `FloatingField`
 * tracks focus via bubbling `focusin` / `focusout` and defers the blur one
 * frame, so stepping the value never makes the label flicker.
 */
import { ref, computed } from 'vue'
import { SgInputNumber } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { qty: 'Quantity', price: 'Unit price' },
  ru: { qty: 'Количество', price: 'Цена за единицу' },
} as const

const t = useDemoStrings(STRINGS)

const qty = ref<number | null>(null)
const price = ref<number | null>(19.99)

const qtyFilled = computed(() => qty.value != null)
const priceFilled = computed(() => price.value != null)
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; max-width: 560px">
    <div style="flex: 1 1 220px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.qty" :filled="qtyFilled">
        <SgInputNumber v-model="qty" :min="0" placeholder=" " />
      </FloatingField>
    </div>
    <div style="flex: 1 1 220px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.price" :filled="priceFilled">
        <SgInputNumber v-model="price" :min="0" :step="0.01" :precision="2" placeholder=" " />
      </FloatingField>
    </div>
  </div>
</template>
